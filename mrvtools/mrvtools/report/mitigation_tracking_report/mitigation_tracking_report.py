# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime


def execute(filters=None):
	columns, data = getColumns(),getData(filters)
	return columns, data


def getColumns():
	columns = [
		{
			"fieldname": "project_name",
			"label": "Project Name",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "objective",
			"label": "Objective",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "key_sector",
			"label": "Key Sector",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "key_sub_sector",
			"label": "Key Sub-Sector",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "costusd",
			"label": "Cost (USD)",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "location",
			"label": "Location",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "start_date",
			"label": "Start Date",
			"fieldtype": 'Date',
		},
		{
			"fieldname": "lifetime",
			"label": "Lifetime",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "included_in",
			"label": "Included In",
			"fieldtype": 'Data'
		},
		{
			"fieldname": "implementing_entity",
			"label": "Implementing Entity",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "other_agency",
			"label": "Other Agency",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "status",
			"label": "Status",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "expected_annual_ghg",
			"label": "Expected Annual GHG",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "actual_annual_ghg",
			"label": "Actual Annual GHG",
			"fieldtype": 'Data',
		},
		{
			"fieldname": "till_date_expected_ghg",
			"label": "Till Date Expected GHG",
			"fieldtype": 'int',
		},
		{
			"fieldname": "till_date_actual_ghg",
			"label": "Till Date Actual GHG",
			"fieldtype": 'Data',
		}
	]
	return columns

def getData(filters):
	conditions = ""
	if filters.get("monitoring_year"):
		conditions += f"AND YEAR(start_date) <= '{filters.get('monitoring_year')}'"
	if filters.get("key_sector"):
		conditions += f" AND key_sector like '{filters.get('key_sector')}'"
	if filters.get("key_sub_sector"):
		conditions += f" AND key_sub_sector like '{filters.get('key_sub_sector')}'"
	if filters.get("location"):
		conditions += f" AND location = '{filters.get('location')}'"
	if filters.get("ndc") == 'Yes':
		conditions += f" AND MT.included_in like '%NDC%' "
	if filters.get("ndc") == 'No':
		conditions += f" AND MT.included_in not like '%NDC%' "
	if filters.get("market_mechanism"):
		conditions += f" AND MT.market_based_mechanism = '{filters.get('market_mechanism')}'"
	

	query = f"""
			SELECT
				MT.project_name, MT.objective, MT.key_sector, MT.key_sub_sector,
				MT.costusd, MT.location, MT.start_date, MT.lifetime,
				CASE WHEN  MT.included_in like "%NDC%" THEN "Yes" ELSE "No" END AS included_in,
				MT.implementing_entity, MT.other_agency, MT.status, MT.expected_annual_ghg
			FROM
				`tabMitigations` MT
			WHERE 
				MT.docstatus != 2 
				{conditions}
			ORDER BY
				MT.project_name
				"""
	data = frappe.db.sql(query,as_dict =1)
	
	for i in data:
		actualAnnualValue = frappe.db.get_value('Mitigation Monitoring Information',
				   {'monitoring_year':f"{filters.get('monitoring_year')}","project_name1":i.project_name},
				   ["actual_annual_ghg"], as_dict=1)
		startDate = frappe.db.get_value('Mitigation Monitoring Information',
				   {"project_name1":i.project_name},"YEAR('start_date') as start_date")
		tillDateActual = frappe.db.get_all('Mitigation Monitoring Information',
				      filters={"project_name1":f"{i.project_name}"},
					  fields = "sum(actual_annual_ghg) as till_date_actual_ghg")
		frappe.log_error("Data",tillDateActual)
		i['actual_annual_ghg'] = actualAnnualValue.actual_annual_ghg if actualAnnualValue else 0
		if i.expected_annual_ghg == None or startDate == None:
			i.expected_annual_ghg = 0
			startDate = 0
			i['till_date_expected_ghg'] = int((i.expected_annual_ghg) * (datetime.now().year - (startDate)))
		else:
			i['till_date_expected_ghg'] = int((i.expected_annual_ghg) * (datetime.now().year - (startDate)))
		i['till_date_actual_ghg'] = tillDateActual[0].till_date_actual_ghg
		
	return data
