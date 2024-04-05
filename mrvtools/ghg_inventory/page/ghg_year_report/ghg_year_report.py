# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt
chart_label = []
co2_value = []
ch4_value = []
n2o_value = []
import frappe
@frappe.whitelist()
def execute(inventory_unit, to_year, from_year):
	columns, data = getColumns(to_year, from_year),getData(inventory_unit, from_year, to_year)
	return columns, data


@frappe.whitelist()
def getColumns(to_year, from_year):
	columns = [
				{
			"name": "categories",
			"id": "categories",
			"width": 485
		}

    ]
	
	val = f"""
			SELECT 
				name 
			FROM 
				`tabGHG Inventory Master Report` 
			WHERE 
				name >= '{from_year}' 
			AND 
				name <= '{to_year}' 
			ORDER BY 
				year ASC;

		"""
	data = frappe.db.sql(val,as_dict =1)
	
	for i in data:
		columns.append(
			{
                "name": f'{i.name}',
                "id": f'{i.name}',
                "width": 100
            },
            # f'{i.name}'+":Float:160"
        )
	return columns

@frappe.whitelist()
def getData(inventory_unit, from_year, to_year):
	global chart_label
	global co2_value
	global ch4_value
	global n2o_value
	chart_label = []
	co2_value = []
	ch4_value = []
	n2o_value = []
	if not inventory_unit or inventory_unit == 'tCO2e':

		if from_year:
			query = f"""
					Select
						category_name as categories,indent
					from
						`tabGHG Inventory Report Categories`
					order by
						display_order asc
					"""
			data = frappe.db.sql(query,as_dict =1)

			val = f"""
					SELECT 
						name
					FROM 
						`tabGHG Inventory Master Report` 
					WHERE 
						name >= '{from_year}' 
					AND 
						name <= '{to_year}' 
					ORDER BY 
						year ASC;

				"""
			value = frappe.db.sql(val,as_dict = 1)

			for i in value:
				chart_label.append(i.name)

			for each in data:
				for i in value:
					get_total_co2 = f"""
									SELECT 
										total_co2_eq,parent
									FROM 
										`tabGHG Inventory Master Report ChildTable` 
									WHERE 
										parent = '{i.name}' 
									AND
										categories = '{each.Categories}'
									ORDER BY 
										idx
								"""
					
					total_co2 = frappe.db.sql(get_total_co2,as_dict =1)

					each[f'{i.name}'] = total_co2[0].total_co2_eq if total_co2 and total_co2[0].total_co2_eq else 0

					chart_value = f"""
							SELECT 
										co2,
										ch4',
										n2o'
									FROM 
										`tabGHG Inventory Master Report ChildTable` 
									WHERE 
										parent = '{i.name}' 
									AND
										categories = 'Total National Emissions and Removals'
						"""
					chart_data = frappe.db.sql(chart_value,as_dict =1)
					co2_value.append(chart_data[0].co2 if chart_data[0].co2 else 0)
					ch4_value.append(chart_data[0].ch4 if chart_data[0].ch4 else 0)
					n2o_value.append(chart_data[0].n2o if chart_data[0].n2o else 0)
			return data

	if inventory_unit == 'GgCO2e':
		query = f"""
				Select
					category_name as categories
				from
					`tabGHG Inventory Report Categories`
				order by
					display_order asc
				"""
		data = frappe.db.sql(query,as_dict =1)
		val = f"""
				SELECT 
					name 
				FROM 
					`tabGHG Inventory Master Report` 
				WHERE 
					name >= '{from_year}' 
				AND 
					name <= '{to_year}' 
				ORDER BY 
					year ASC;

			"""

		value = frappe.db.sql(val,as_dict = 1)
		for i in value:
			chart_label.append(i.name)
		
		for each in data:
			for i in value:
				get_total_co2 = f"""
								SELECT 
									total_co2_eq * 1000',
									parent
								FROM 
									`tabGHG Inventory Master Report ChildTable` 
								WHERE 
									parent = '{i.name}' 
								AND
									categories = '{each.Categories}'
								ORDER BY 
									idx
							"""
				
				total_co2 = frappe.db.sql(get_total_co2,as_dict =1)

				each[f'{i.name}'] = total_co2[0].total_co2_eq if total_co2 and total_co2[0].total_co2_eq else 0

				chart_value = f"""
						SELECT 
									co2 * 1000,
									ch4 * 1000,
									n2o * 1000
								FROM 
									`tabGHG Inventory Master Report ChildTable` 
								WHERE 
									parent = '{i.name}' 
								AND
									categories = 'Total National Emissions and Removals'
					"""
				chart_data = frappe.db.sql(chart_value,as_dict =1)
				co2_value.append(chart_data[0].co2 if chart_data and chart_data[0].co2 else 0)
				ch4_value.append(chart_data[0].ch4 if chart_data and chart_data[0].ch4 else 0)
				n2o_value.append(chart_data[0].n2o if chart_data and chart_data[0].n2o else 0)
		
		return data
@frappe.whitelist()
def get_chart():


	chart = {
		"data": {
			"labels": chart_label,
			"datasets": [
				{
					"name": "CO2",
					"values": co2_value,
					"chartType": "bar",
				},
				{
					"name": "CH4",
					"values": ch4_value,
					"chartType": "bar"
				},
				{
					"name": "N2O",
					"values": n2o_value,
					"chartType": "bar"
				}
			]
		},
		"barOptions": {
			"stacked": 1
		},
		"colors":["pink","blue","green"]
	}
	return {
		"labels": chart_label,
			"datasets": [
				{
					"name": "CO2",
					"values": co2_value,
					"chartType": "bar",
				},
				{
					"name": "CH4",
					"values": ch4_value,
					"chartType": "bar"
				},
				{
					"name": "N2O",
					"values": n2o_value,
					"chartType": "bar"
				}
			]
		}