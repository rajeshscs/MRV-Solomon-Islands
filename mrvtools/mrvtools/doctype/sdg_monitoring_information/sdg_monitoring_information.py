# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SDGMonitoringInformation(Document):
	@frappe.whitelist()
	def before_saving_table(self):
		old_doc =self.get_doc_before_save()
		if old_doc.quantitative_impact != self.quantitative_impact:
			self.edited_quantitative_impact = []
			for i in self.quantitative_impact:
				row = self.append('edited_quantitative_impact',{})
				row.category = i.category
				row.question = i.question
				row.sdg_mapping = i.sdg_mapping
				row.data = i.data
				row.data_source = i.data_source
				frappe.log_error(" Before Edited",self.edited_quantitative_impact)

			self.quantitative_impact = []
			for i in old_doc.quantitative_impact:
				row = self.append('quantitative_impact',{})
				row.category = i.category
				row.question = i.question
				row.sdg_mapping = i.sdg_mapping
				row.data = i.data
				row.data_source = i.data_source
				# frappe.log_error("Before Self",self.performance_indicator)
		return "Yess"

	@frappe.whitelist()
	def get_json(self):
		get_json_field=frappe.db.sql(f"""SELECT json from `tabSDG Assessment` WHERE project_name ='{self.project_name}'""")
		return get_json_field
		
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver SDG Tracking'""")
		return doc
	
	@frappe.whitelist()
	def get_years(self,name):
		start_date = frappe.db.get_value("Project",name,"start_date")
		if start_date:
			start_year = str(start_date).split("-")[0]
			return [str(year) for year in range(int(start_year), 2051)]
		else:
			return [str(year) for year in range(1990, 2051)]

	@frappe.whitelist()
	def get_all_datas(self):
		old_doc =self.get_doc_before_save()
		field_list = {}
		new_list=[]
		meta = frappe.get_meta(self.doctype)
		meta_dict = meta.as_dict()
		fields = meta_dict["fields"]
		for field in fields:
			if frappe.db.exists(self.doctype,self.name):
				if field["fieldtype"] != "Date" and field["fieldtype"] != "Table MultiSelect" and field["fieldtype"] != "Table" and field["fieldtype"] != "Geolocation" and field["fieldtype"] != "JSON" and field["fieldtype"] != "HTML" and field["fieldtype"] != "Button" and field["fieldtype"] != "Check":

					if old_doc.get(field["fieldname"]) != self.get(field["fieldname"]):
						field_list[field["fieldname"]] = old_doc.get(field["fieldname"])

				elif field["fieldtype"] == "Date" and old_doc.get(field["fieldname"]) != None  and field["fieldtype"] != "Table" and field["fieldtype"] != "Table MultiSelect" and field["fieldtype"] != "JSON" and field["fieldtype"] != "HTML" and field["fieldtype"] != "Button" and field["fieldtype"] != "Check":
					Date = frappe.utils.formatdate(old_doc.get(field["fieldname"]),"yyyy-mm-dd")

					if Date != self.get(field["fieldname"] ):
						field_list[field["fieldname"]] = old_doc.get(field["fieldname"])

		return field_list
