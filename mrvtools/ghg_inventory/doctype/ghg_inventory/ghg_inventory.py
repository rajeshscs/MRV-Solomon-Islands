# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GHGInventory(Document):
	@frappe.whitelist()
	def get_data(self,table_name):
		frappe.log_error('doc',table_name)
		get_doc = frappe.db.sql(f"""SELECT * FROM `tabDirect and Indirect Managed Soils Master List` WHERE table_name = '{table_name}' """,as_dict=1,)
		return get_doc
	
	@frappe.whitelist()
	def get_livestock_details(self):
		get_doc = frappe.db.get_list("Livestock Population ChildTable",
				  filters={
					  'parent':self.year
				  },
				  fields=['category','heads'])
		# get_doc = frappe.db.sql(f"""SELECT category,heads FROM `tabLivestock Population ChildTable` WHERE parent = '{self.year}'""")
		return get_doc
	

	@frappe.whitelist()
	def get_table(self):
		field_list = []
		meta = frappe.get_meta(self.doctype)
		meta_dict = meta.as_dict()
		fields = meta_dict["fields"]
		for field in fields:
			if field["fieldtype"] == "Table":
				field_list.append(field["fieldname"])
		return field_list