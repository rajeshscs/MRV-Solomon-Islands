# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe,json
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc

class Project(Document):
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver Project'""")
		return doc
	
	@frappe.whitelist()
	def get_datas(self):
		new_doc = frappe.new_doc('Project Approval')
		new_doc = get_mapped_doc("Project", self.name,	{
							"Project": {
								"doctype": "Project Approval"
							},
						}, None, ignore_permissions=True)
		new_doc.naming_series = 'PRO-APPRO-.###'
		new_doc.workflow = self.workflow_state
		new_doc.save(ignore_permissions=True)
		return new_doc