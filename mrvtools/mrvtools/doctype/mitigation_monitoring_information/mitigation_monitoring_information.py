# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class MitigationMonitoringInformation(Document):
	@frappe.whitelist()
	def get_data(self):
		get_doc=frappe.db.sql(f"""SELECT included_in FROM `tabProject Included In ChildTable` WHERE parent ='{self.project_name1}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_value1(self):
		get_doc=frappe.db.sql(f"""SELECT MTC.non_gng_mitigation_benifits FROM `tabMitigation Non GHG in  ChildTable` MTC INNER JOIN `tabMitigations` MT on MT.name = MTC.parent WHERE MT.project_name ='{self.project_name1}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_value2(self):
		get_doc=frappe.db.sql(f"""SELECT target_ghgs FROM `tabMitigation Target GHGs in  ChildTable` MTC INNER JOIN `tabMitigations` MT on MT.name = MTC.parent WHERE MT.project_name ='{self.project_name1}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_all_data(self):
		get_doc=frappe.db.sql(f"""SELECT * FROM `tabMitigations` where name = '{self.project_name}'""",as_dict=1)
		return get_doc
	
	@frappe.whitelist()
	def get_child(self):
		get_column=frappe.db.sql(f"""SELECT * FROM `tabMitigation Performance Indicator ChildTable` MPIC INNER JOIN `tabMitigations` MT on MT.name = MPIC.parent WHERE MT.project_name ='{self.project_name1}'""",as_dict=1)
		return get_column
	
	@frappe.whitelist()
	def get_user(self):
		doc = frappe.db.sql(f""" SELECT parent FROM `tabHas Role` WHERE role = 'Approver Mitigation Tracking'""")
		return doc
	
	@frappe.whitelist()
	def get_years(self,name):
		start_date = frappe.db.get_value("Project",name,"start_date")
		if start_date:
			start_year = str(start_date).split("-")[0]
			return [str(year) for year in range(int(start_year), 2051)]
		else:
			return [str(year) for year in range(1990, 2051)]