# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SDGAssessment(Document):
	@frappe.whitelist()
	def getValues(self):
		docs = frappe.db.get_all("Master Data ChildTable",
			  fields = ["module","table","impact_area","indicator"],
			  filters = {"module" : "SDG"})
		
		return docs
	

	@frappe.whitelist()
	def categorylist(self):
		category_list = frappe.db.get_list('SDG Category', pluck='name')

		result_fields = []
		temp = []
		frappe.log_error('category',category_list)
		for category in category_list:
			
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
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver SDG Tracking'""")
		return doc

	# @frappe.whitelist()
	# def getFullCategoryList(self):
	# 	categoryList = frappe.db.get_list('SDG Category', pluck='category')

	# 	return categoryList