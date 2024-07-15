import frappe,json
import pandas as pd

from frappe.utils import get_site_base_path,now


@frappe.whitelist()
def get_total_sdg_report_data(year,impact_area,key_sector = None,key_sub_sector = None):
	try:
		data = getData(year,key_sector,key_sub_sector,impact_area)
		first_elements = [sublist[2] for sublist in data]
		values=frappe.db.get_all("SDG Assessment",fields=["categories_json"],filters={'project_id':["in",first_elements]})
		counts = {}
		for d in values:
			categories = json.loads(d['categories_json'])
			for category, value in categories.items():
				if category not in counts:
					counts[category] = 0
				if value:
					counts[category] += 1
		categories = list(counts.keys())
		get_counts = list(counts.values())
		return {"data":get_counts,"categories":categories}
	except Exception:
		frappe.log_error(title = "get_total_adaptation_report_data failed", message = frappe.get_traceback())
		



@frappe.whitelist()
def execute(year,impact_area,key_sector = None,key_sub_sector = None):
	columns, data = getColumn(), getData(year,key_sector,key_sub_sector,impact_area)
	return columns, data


def getColumn():
	columns = []
	columns.append("Action" + ":Data")
	columns.append("Programme" + ":Data")
	columns.append("Project ID" + ":Link/Project")
	columns.append("Project Title" + ":Data")
	columns.append("Objective" + ":Data")
	columns.append("Key Sector" + ":Data")
	columns.append("Key Sub-sector" + ":Data")
	columns.append("Cost in USD" + ":Float")
	columns.append("Location" + ":Data")
	columns.append("Implementing entity or entities" + ":Data")
	columns.append("Other Agency" + ":Data")
	columns.append("Start Date" + ":Date")
	columns.append("Lifetime in Years" + ":Int")
	columns.append("Included In" + ":Data")
	columns.append("Impact Summaries" + ":Data")
	keys_only = [item.split(':')[0] for item in columns]
	return keys_only

def getData(year = None,key_sector = None,key_sub_sector = None,impact_area = None):
	
	conditions = ""
	if year:
		conditions += f" AND  YEAR(P.financial_closure_date) <= '{year}'"
	elif year == None:
		conditions += f"AND YEAR(P.financial_closure_date) <= '{frappe.utils.today()[0:4]}'"
	elif year == '':
		conditions += f"AND YEAR(P.financial_closure_date) <= '{frappe.utils.today()[0:4]}'"
	if key_sector:
		conditions += f" AND P.key_sector like '{key_sector}'"
	if key_sub_sector:
		conditions += f" AND P.key_sub_sector like '{key_sub_sector}'"
	if impact_area:
		cur_ele = impact_area.lower()
		cur_word = cur_ele.split(" ")
		resWord = "_".join(cur_word)
		conditions += f" AND SDG.{resWord} = 1"

	query= f"""
			SELECT
				CONCAT(P.action,' | ',P.action_name) as action,
				CONCAT(P.programme,' | ',P.programme_name) as programme,
				P.name as project_id,
				P.project_name as project_title,
				P.objective,
				P.key_sector,
				P.key_sub_sector,
				P.costusd as cost_in_usd,
				P.location,
				P.implementing_entity as implementing_entity_or_entities,
				P.other_agency,
				P.start_date,
				P.lifetime as lifetime_in_years,
				SDG.included_in,
				SDG.name
			FROM
				`tabProject` as P
			INNER JOIN
				`tabSDG Assessment` as SDG 
			ON
				P.name = SDG.project_id
			WHERE 
				P.docstatus != 2
				{conditions}
			ORDER BY
				SDG.project_id
	"""
	result = frappe.db.sql(query, as_dict=1)
	field_list = []
	meta = frappe.get_meta("SDG Assessment")
	meta_dict = meta.as_dict()
	fields = meta_dict["fields"]
	for field in fields:
		if field["fieldtype"] == "Check":
			field_list.append(field["fieldname"])
	for each in result:
		
		get_list=[]
		values=frappe.db.get_all("SDG Assessment",fields=["categories_json"],filters={'name':each["name"]})
		
		for d in values:
			categories = json.loads(d['categories_json'])
			for key,value in categories.items():
				if value == True:
					get_list.append(key)
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
	export_data.to_excel(f"{site_name}/public/files/SDG-Report-{nowTime}.xlsx")
	return f"../files/SDG-Report-{nowTime}.xlsx"