# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ClimateFinance(Document):
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