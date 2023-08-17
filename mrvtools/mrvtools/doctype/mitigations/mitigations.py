# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Mitigations(Document):
	@frappe.whitelist()
	def get_data(self):
		get_doc=frappe.db.sql(f"""SELECT included_in FROM `tabProject Included In ChildTable` WHERE parent ='{self.project_name}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver Mitigation Tracking'""")
		return doc
	
	@frappe.whitelist()
	def sample(self):
		return self.non_ghg_mitigation_benefits