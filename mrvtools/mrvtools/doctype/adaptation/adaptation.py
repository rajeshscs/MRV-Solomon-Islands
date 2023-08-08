# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Adaptation(Document):
	@frappe.whitelist()
	def getValues(self):
		docs = frappe.db.get_all("Master Data ChildTable",
			  fields = ["module","table","impact_area","indicator"], 
			  filters = {"module" : "Adaptation"})
		frappe.log_error("adaptation",docs)
		return docs
	
	@frappe.whitelist()
	def get_data(self):
		get_doc=frappe.db.sql(f"""SELECT included_in FROM `tabProject Included In ChildTable` WHERE parent ='{self.project_name}'""")
		return get_doc


	
	@frappe.whitelist()
	def categorylist(self):
		category_list = frappe.db.get_list('Adaptation Category', pluck='name')

		result_fields = []
		temp = []
		frappe.log_error('category',category_list)
		for category in reversed(category_list):
			
			# column = {
			# 	'fieldtype' : 'Column Break',
			# }
			
			result_fields.append(category)
			# temp.append(category)
			# if len(temp) % 5  == 0 and not len(category_list)==len(temp):
			# 	result_fields.append(column)
		
		frappe.log_error("Doc",result_fields)
		return result_fields
	

	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver Adaptation Tracking'""")
		return doc