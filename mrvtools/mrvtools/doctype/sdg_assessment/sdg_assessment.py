# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SDGAssessment(Document):
	@frappe.whitelist()
	def getValues(self):
		docs = frappe.db.get_all("Master Data ChildTable",
			  fields = ["module","table","impact_area","indicator"])
		
		return docs