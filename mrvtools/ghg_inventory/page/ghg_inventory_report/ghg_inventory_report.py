# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe

@frappe.whitelist()
def execute(inventory_year, inventory_unit, filters=None):
	columns, data = getColumns(),getData(inventory_year, inventory_unit)
	return columns, data


def getColumns():
	columns = [
		{
			"name": "categories",
			"id": "Categories",
			"width": 485
		},
		{
			"name": "co2",
			"id": "CO2 Emission",
			"width": 170 
		},
		{
			"name": "ch4",
			"id": "CH4 Emission",
			"width": 170 
		},
		{
			"name": "n2o",
			"id": "N2O Emission",
			"width": 170 
		},
		{
			"name": "total_co2_eq",
			"id": "Total CO2 Emission",
			"width": 170 
		}
		
	]
	return columns

def getData(inventory_year, inventory_unit):
	conditions = ""
	if inventory_year:
		conditions += f"AND parent = '{inventory_year}'"

		if not inventory_unit or (inventory_unit) == 'tCO2e':
			conditions += f"AND parent = '{inventory_year}'"

			query = f"""
					SELECT
						categories as Categories, 
						co2 as 'CO2 Emission',
						ch4 as 'CH4 Emission',
						n2o as 'N2O Emission', 
						total_co2_eq as 'Total CO2 Emission',
						indent
					FROM
						`tabGHG Inventory Master Report ChildTable`
					WHERE 
						docstatus != 2 
						{conditions}
					ORDER BY
						idx
					"""
			data = frappe.db.sql(query,as_dict =1)
			return data
			
		if (inventory_unit) == 'GgCO2e':
			query = f"""
					SELECT
						categories as Categories, 
						co2 * 1000 as 'CO2 Emission',
						ch4 * 1000 as 'CH4 Emission',
						n2o * 1000 as 'N2O Emission', 
						total_co2_eq * 1000 as 'Total CO2 Emission'
					FROM
						`tabGHG Inventory Master Report ChildTable`
					WHERE 
						docstatus != 2 
						{conditions}
					ORDER BY
						idx
					"""
			data = frappe.db.sql(query,as_dict =1)
			return data

@frappe.whitelist()
def get_chart(inventory_year=None, inventory_unit=None):
	conditions = ""
	if inventory_year:
		conditions += f"AND parent = '{inventory_year}'"
		if not (inventory_unit) or (inventory_unit) == 'tCO2e':
			query = f"""
					SELECT
						co2,
						ch4,
						n2o
						
					FROM
						`tabGHG Inventory Master Report ChildTable`
					WHERE 
						docstatus != 2
					AND
						categories = 'Total National Emissions and Removals'
						{conditions}
					"""
			labels=  ["CO2","CH4","N2O"]
			data = frappe.db.sql(query)	
			if data != ():
				return {"data":data,"labels":labels}
		if inventory_unit == 'GgCO2e':
			labels=  ["CO2","CH4","N2O"]
			query = f"""
					SELECT
						co2 * 1000 as co2,
						ch4 * 1000 as ch4,
						n2o * 1000 as n2o	
					FROM
						`tabGHG Inventory Master Report ChildTable`
					WHERE 
						docstatus != 2
					AND
						categories = 'Total National Emissions and Removals'
						{conditions}
					"""
			data = frappe.db.sql(query)
		
			return {"data":data,"labels":labels}



@frappe.whitelist()
def get_pie_chart(inventory_year=None, inventory_unit=None):
	conditions = ""
	if inventory_year:
		conditions += f"AND parent = '{inventory_year}'"
		if not (inventory_unit) or (inventory_unit) == 'tCO2e':
			categories = ['1. Energy', '2. Industrial processes and product use', '3. Agriculture', '4. LAND USE, LAND-USE CHANGE AND FORESTRY', '5. Waste', '6. Other']

			query = f"""
					SELECT
						total_co2_eq as 'Total CO2 Emission'
					FROM
						`tabGHG Inventory Master Report ChildTable`
					WHERE 
						docstatus != 2
					AND
						categories IN ('1. Energy', '2. Industrial processes and product use', '3. Agriculture', '4. LAND USE, LAND-USE CHANGE AND FORESTRY', '5. Waste', '6. Other')	
						{conditions}
					ORDER BY
						categories
					"""
			labels= categories
			data = frappe.db.sql(query)
			# frappe.log_error("query",data)
			if data != ():
				return {"data":data,"labels":labels}
		if inventory_unit == 'GgCO2e':
			labels=  ["CO2","CH4","N2O"]
			query = f"""
					SELECT
						co2 * 1000 as co2,
						ch4 * 1000 as ch4,
						n2o * 1000 as n2o
					FROM
						`tabGHG Inventory Master Report ChildTable`
					WHERE 
						docstatus != 2
					AND
						categories = 'Total National Emissions and Removals'
						{conditions}
					"""
			data = frappe.db.sql(query)

			return {"data":data,"labels":labels}
