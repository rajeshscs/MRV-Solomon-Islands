# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Mitigation(Document):
	@frappe.whitelist()
	def get_data(self):
		get_doc=frappe.db.sql(f"""SELECT included_in FROM `tabProject Included In ChildTable` WHERE Parent ='{self.project_name}'""")
		return get_doc