# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class AdaptationMonitoringInformation(Document):
	
	@frappe.whitelist()
	def get_json(self):
		get_json_field=frappe.db.sql(f"""SELECT json from `tabAdaptation` WHERE project_name ='{self.project_name}'""")
		return get_json_field
	
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver Adaptation Tracking'""")
		return doc
	
	@frappe.whitelist()
	def get_years(self,name):
		start_date = frappe.db.get_value("Project",name,"start_date")
		if start_date:
			start_year = str(start_date).split("-")[0]
			return [str(year) for year in range(int(start_year), 2051)]
		else:
			return [str(year) for year in range(1990, 2051)]
