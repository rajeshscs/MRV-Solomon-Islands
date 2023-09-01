# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ClimateFinanceMonitoringInformation(Document):
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver Climate Tracking'""")
		return doc
	
	@frappe.whitelist()
	def get_years(self):
		empty = ""
		if self.financial_closure_date:
			start_year = str(self.financial_closure_date).split("-")[0]
			frappe.log_error("Result",[str(year) for year in range(int(start_year), 2051)])
			return [str(year) for year in range(int(start_year), 2051)]
		else:
			return empty
		
	@frappe.whitelist()
	def get_rows(self):
		doc = frappe.db.sql(f""" SELECT CFCT.parent, CFCT.creation as creation, CFMI.name,CFMI.project_name, CFCT.financial_year, CFCT.q1,  CFCT.q2,  CFCT.q3,  CFCT.q4,  CFCT.total_disbursement_usd FROM `tabClimate Finance Total Budget Disbursement ChildTable` CFCT inner join `tabClimate Finance Monitoring Information` CFMI on CFCT.parent= CFMI.name where CFMI.project_name='{self.project_name}' and CFCT.parent = (select CFCT.parent from `tabClimate Finance Total Budget Disbursement ChildTable` CFCT  inner join `tabClimate Finance Monitoring Information` CFMI on CFCT.parent = CFMI.name where CFMI.project_name = '{self.project_name}' order by CFMI.creation DESC limit 1)""",as_dict=1)
		return doc