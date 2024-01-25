import frappe,json

@frappe.whitelist(allow_guest=True)
def get_cards_data():
	data_counts = {}
	total_ghg_emmission = 0
	ghg_master_report_list = frappe.db.get_all("GHG Inventory Master Report",pluck="name")
	for i in ghg_master_report_list:
		chart_value = f"""
						SELECT 
							total_co2_eq
						FROM 
							`tabGHG Inventory Master Report ChildTable` 
						WHERE 
							parent = {i}
						AND
							categories = 'Total National Emissions and Removals'
					"""
	value = frappe.db.sql(chart_value,as_dict = 1)
	total_ghg_emmission += value[0]["total_co2_eq"]
	
	total_projects = frappe.db.sql("""
		SELECT COUNT(name) as count from tabProject
	""",as_dict=1)
	total_mitigation_projects = frappe.db.sql("""
		SELECT COUNT(name) as count from tabProject WHERE objective = 'Mitigation'
	""",as_dict=1)
	total_adaptation_projects = frappe.db.sql("""
		SELECT COUNT(name) as count from tabProject WHERE objective = 'Adaptation'
	""",as_dict=1)
	total_cross_cutting_projects = frappe.db.sql("""
		SELECT COUNT(name) as count from tabProject WHERE objective = 'Cross-Cutting'
	""",as_dict=1)
	total_enabler_projects = frappe.db.sql("""
		SELECT COUNT(name) as count from tabProject WHERE objective = 'Enablers'
	""",as_dict=1)

	data_counts["total_ghg_emmission"]=total_ghg_emmission
	data_counts["total_projects"]=total_projects[0]['count']
	data_counts["total_mitigation_projects"]=total_mitigation_projects[0]['count']
	data_counts["total_adaptation_projects"]=total_adaptation_projects[0]['count']
	data_counts["total_cross_cutting_projects"]=total_cross_cutting_projects[0]['count']
	data_counts["total_enabler_projects"]=total_enabler_projects[0]['count']


	till_date_finance_disbursed = 0 
	finance_doc_list = frappe.db.get_all("Climate Finance Monitoring Information",pluck="name")
	for i in finance_doc_list:
		if frappe.db.exists("Climate Finance Monitoring Information",{"name":i,"monitoring_year":["<=",frappe.utils.today()[0:4]]}):
			finance_doc =  frappe.get_doc("Climate Finance Monitoring Information",{"name":i,"monitoring_year":["<=",frappe.utils.today()[0:4]]})
			till_date_finance_disbursed += finance_doc.total_budget_disbursement[len(finance_doc.total_budget_disbursement)-1].total_disbursement_usd

	data_counts["till_date_finance_disbursed"] = till_date_finance_disbursed

	till_date_ghg_reduction = 0 
	mitigation_doc_list = frappe.db.get_all("Mitigation Monitoring Information",pluck="name")
	for i in mitigation_doc_list:
		if frappe.db.exists("Mitigation Monitoring Information",{"name":i,"monitoring_year":["<=",frappe.utils.today()[0:4]]}):
				finance_doc =  frappe.get_doc("Mitigation Monitoring Information",{"name":i,"monitoring_year":["<=",frappe.utils.today()[0:4]]})
				if finance_doc.actual_annual_ghg is not None:
					till_date_ghg_reduction += finance_doc.actual_annual_ghg
				else:
					till_date_ghg_reduction += 0

	data_counts["till_date_ghg_reduction"] = till_date_ghg_reduction
	return data_counts

@frappe.whitelist(allow_guest=True)
def get_finance_data():
	year_list = []
	for i in range(9, -1, -1):
		year_list.append(int(frappe.utils.nowdate()[:4]) - i)
	year_data =[]
	for i in year_list:
		till_date_finance_disbursed = 0
		finance_doc_list = frappe.db.get_all("Climate Finance Monitoring Information",pluck="name",filters={"monitoring_year":i})
		
		for id in finance_doc_list:
			if frappe.db.exists("Climate Finance Monitoring Information",{"name":id}):
				finance_doc =  frappe.get_doc("Climate Finance Monitoring Information",{"name":id})
				till_date_finance_disbursed += finance_doc.total_budget_disbursement[len(finance_doc.total_budget_disbursement)-1].total_disbursement_usd
		year_data.append(till_date_finance_disbursed)

	return {"data":year_data,"labels":year_list}


@frappe.whitelist(allow_guest=True)
def ghg_emission_reduction_data():
	year_list = []
	for i in range(9, -1, -1):
		year_list.append(int(frappe.utils.nowdate()[:4]) - i)
	year_data =[]
	for i in year_list:
		till_date_ghg_reduction = 0 
		mitigation_doc_list = frappe.db.get_all("Mitigation Monitoring Information",pluck="name",filters={"monitoring_year":i})
		for id in mitigation_doc_list:
			if frappe.db.exists("Mitigation Monitoring Information",{"name":id}):
					finance_doc =  frappe.get_doc("Mitigation Monitoring Information",{"name":id})
					if finance_doc.actual_annual_ghg is not None:
						till_date_ghg_reduction += finance_doc.actual_annual_ghg
					else:
						till_date_ghg_reduction += 0
		year_data.append(till_date_ghg_reduction)

	return {"data":year_data,"labels":year_list}

@frappe.whitelist(allow_guest=True)
def ghg_emissions_data():
	year_list = []
	for i in range(10, -1, -1):
		year_list.append(int(frappe.utils.nowdate()[:4]) - i)
	year_data =[]
	for i in year_list:
		if frappe.db.exists("GHG Inventory",{"year":i}):
			chart_value = f"""
							SELECT 
								total_co2_eq
							FROM 
								`tabGHG Inventory Master Report ChildTable` 
							WHERE 
								parent = {i}
							AND
								categories = 'Total National Emissions and Removals'
						"""
			value = frappe.db.sql(chart_value,as_dict = 1)

			year_data.append(value[0]["total_co2_eq"])
		else:
			value = 0
			year_data.append(value)
	return {"data":year_data,"labels":year_list}
	# chart = {
	# 	"data": {
	# 		"labels": chart_label,
	# 		"datasets": [
	# 			{
	# 				"name": "CO2",
	# 				"values": co2_value,
	# 				"chartType": "bar",
	# 			},
	# 			{
	# 				"name": "CH4",
	# 				"values": ch4_value,
	# 				"chartType": "bar"
	# 			},
	# 			{
	# 				"name": "N2O",
	# 				"values": n2o_value,
	# 				"chartType": "bar"
	# 			}
	# 		]
	# 	},
	# 	"barOptions": {
	# 		"stacked": 1
	# 	},
	# 	"colors":["pink","blue","green"]
	# }
	# return chart