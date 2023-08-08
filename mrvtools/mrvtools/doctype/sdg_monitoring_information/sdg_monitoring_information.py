# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SDGMonitoringInformation(Document):
	@frappe.whitelist()
	def get_child(self):
		get_column=frappe.db.sql(f"""SELECT * FROM `tabSDG Quantitative ChildTable` SQCT INNER JOIN `tabSDG Assessment` SDG on SDG.name = SQCT.parent WHERE SDG.project_name ='{self.project_name}'""",as_dict=1)
		return get_column
	
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver SDG Tracking'""")
		return doc
	
	@frappe.whitelist()
	def get_years(self,name):
		start_date = frappe.db.get_value("SDG Assessment",name,"start_date")
		if start_date:
			start_year = str(start_date).split("-")[0]
			return [str(year) for year in range(int(start_year), 2051)]
		else:
			return [str(year) for year in range(1990, 2051)]

