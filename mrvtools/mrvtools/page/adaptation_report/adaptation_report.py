# Copyright (c) 2017, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE
import frappe,json
import pandas as pd

from frappe.utils import get_site_base_path,now

@frappe.whitelist()
def get_total_adaptation_report_data1(year,impact_area,key_sector = None,key_sub_sector = None):
	try:
		data = get_datas(year,key_sector,key_sub_sector,impact_area)
		# frappe.log_error("data",data)
		field_list = []
		get_counts = []
		meta = frappe.get_meta("Adaptation")
		meta_dict = meta.as_dict()
		fields = meta_dict["fields"]
		for field in fields:
			if field["fieldtype"] == "Check":
				field_list.append(field["fieldname"])
		first_elements = [sublist[0] for sublist in data]
		for field in field_list:
			count =0
			values=frappe.db.get_all("Adaptation",[field],{'project_id':["in",first_elements]})
		
			for i in values:
				
				# frappe.log_error("i",i)
				for key,value in i.items():
					if value ==1:
						count= count+1
			get_counts.append(count)
			
		categories = ['Forest Health', 'Watershed Health', 'Coastal Health', 'Water Security', 'Security of Place', 'Energy Security', 'Income Security', 'Community Health', 'Food Security']
		
		return {"data":get_counts,"categories":categories}
	except Exception:
		frappe.log_error(title = "get_total_adaptation_report_data failed", message = frappe.get_traceback())

@frappe.whitelist()
def get_total_adaptation_report_data2(year,impact_area,key_sector = None,key_sub_sector = None):
	try:
		data = get_datas(year,key_sector,key_sub_sector,impact_area)
		doc = frappe.db.get_all("Adaptation",pluck="key_sector")
		counts = {}
		first_elements = [sublist[3] for sublist in data]
		for item in first_elements:
			if item in counts:
				counts[item] += 1
			else:
				counts[item] = 1
		return counts
	except Exception:
		frappe.log_error(title = "get_total_adaptation_report_data failed", message = frappe.get_traceback())


@frappe.whitelist()
def execute(year = None,impact_area = None,key_sector = None,key_sub_sector = None):
	columns, data = get_columns(), get_datas(year,key_sector,key_sub_sector,impact_area)
	return columns, data

def get_columns():
	col = []
	col.append("Project ID" + ":Link/Project")
	col.append("Project Name" + ":Data")
	col.append("Objective" + ":Data")
	col.append("Key Sector" + ":Data")
	col.append("Key Sub-sector" + ":Data")
	col.append("Cost in USD" + ":Float")
	col.append("Location" + ":Data")
	col.append("Implementing entity or entities" + ":Data")
	col.append("Other Agency" + ":Data")
	col.append("Start Date" + ":Data")
	col.append("Financial Closure Date" + ":Data")
	col.append("Lifetime in Years" + ":Int")
	col.append("Included In" + ":Data")
	col.append("Impact Summaries" + ":Data")
	keys_only = [item.split(':')[0] for item in col]
	return keys_only

def get_datas(year = None,key_sector = None,key_sub_sector = None,impact_area = None):
	conditions = ""
	if year:
		conditions += f" AND  YEAR(P.financial_closure_date) <= '{year}'"
	if year == None:
		conditions += f"AND YEAR(P.financial_closure_date) <= '{frappe.utils.today()[0:4]}'"
	if key_sector:
		conditions += f" AND P.key_sector like '{key_sector}'"
	if key_sub_sector:
		conditions += f" AND P.key_sub_sector like '{key_sub_sector}'"
	if impact_area:
		cur_ele = impact_area.lower()
		cur_word = cur_ele.split(" ")
		resWord = "_".join(cur_word)
		conditions += f" AND A.{resWord} = 1"


	query= f"""
			SELECT
				P.name as project_id, 
				P.project_name,
				P.objective,
				P.key_sector,
				P.key_sub_sector,
				P.costusd as cost_in_usd,
				P.location,
				P.implementing_entity as implementing_entity_or_entities,
				P.other_agency,
				P.start_date,
				P.financial_closure_date,
				P.lifetime as lifetime_in_years,
				A.included_in,
				A.name
				
			FROM
				`tabProject` as P
			INNER JOIN
				`tabAdaptation` as A 
			ON
				P.name = A.project_id
			WHERE 
				P.docstatus != 2
				{conditions}
			ORDER BY
				A.project_id
	"""
	result = frappe.db.sql(query, as_dict=1)
	field_list = []
	meta = frappe.get_meta("Adaptation")
	meta_dict = meta.as_dict()
	fields = meta_dict["fields"]
	for field in fields:
		if field["fieldtype"] == "Check":
			field_list.append(field["fieldname"])
	for each in result:
		get_list=[]
		values= frappe.db.get_value("Adaptation",each["name"],field_list,as_dict=1)
		for key,value in values.items():
			if value == 1:
				cur_ele = key.split("_")
				cur_word = " ".join(cur_ele)
				resu = cur_word.title()
				get_list.append(resu)
		resString = ",".join(get_list)
		each["impact_summaries"] = resString
	values_only = [list({k: v for k, v in item.items() if k != 'name'}.values()) for item in result]
	return values_only

	
@frappe.whitelist()
def download_excel(columns,data):

	data_list = json.loads(data)
	column_list = json.loads(columns)
	data_dict = {column_list[i]: [row[i] for row in data_list] for i in range(len(column_list))}
	
	export_data = pd.DataFrame(data_dict)

	site_name = get_site_base_path()
	nowTime = now()[:-7]
	nowTime = nowTime.replace(" ","")
	nowTime = nowTime.replace("-","")
	nowTime = nowTime.replace(":","")
	export_data.to_excel(f"{site_name}/public/files/Adaptation-Report-{nowTime}.xlsx",index=False)
	return f"../files/Adaptation-Report-{nowTime}.xlsx"