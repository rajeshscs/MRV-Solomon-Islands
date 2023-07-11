# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class MitigationMonitoringInformation(Document):
	@frappe.whitelist()
	def get_data(self):
		get_doc=frappe.db.sql(f"""SELECT included_in FROM `tabProject Included In ChildTable` WHERE parent ='{self.project_name}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_value1(self):
		get_doc=frappe.db.sql(f"""SELECT MTC.non_gng_mitigation_benifits FROM `tabMitigation Non GHG in  ChildTable` MTC INNER JOIN `tabMitigation` MT on MT.name = MTC.parent WHERE MT.project_name ='{self.project_name}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_value2(self):
		get_doc=frappe.db.sql(f"""SELECT target_ghgs FROM `tabMitigation Target GHGs in  ChildTable` MTC INNER JOIN `tabMitigation` MT on MT.name = MTC.parent WHERE MT.project_name ='{self.project_name}'""")
		return get_doc
	
	@frappe.whitelist()
	def get_all_data(self):
		get_doc=frappe.db.sql(f"""SELECT * FROM `tabMitigation` where project_name = '{self.project_name}'""",as_dict=1)
		return get_doc
	
	@frappe.whitelist()
	def get_child(self):
		get_column=frappe.db.sql(f"""SELECT * FROM `tabMitigation Performance Indicator ChildTable` MPIC INNER JOIN `tabMitigation` MT on MT.name = MPIC.parent WHERE MT.project_name ='{self.project_name}'""",as_dict=1)
		return get_column