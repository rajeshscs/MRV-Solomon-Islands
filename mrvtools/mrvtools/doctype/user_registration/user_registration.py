# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe , json
from frappe.model.document import Document

class UserRegistration(Document):
	@frappe.whitelist()
	def check_user_exists(self):
		if not frappe.db.exists("User", self.email_id):
			role_list = [{"role":"Adaptation Tracking"}]
			self.insert_user(role_list)

	def insert_user(self, roles):
		# user = frappe.new_doc("User")
		# user.email = self.email_id,
		# user.first_name = self.user_name,
		# user.mobile_no = self.contact_number,
		# user.send_welcome_email = 1,
		# user.roles = roles
		# user.save(ignore_permissions=True)
		
		frappe.get_doc({
			"doctype": "User",
			"name": self.email_id,
			"email": self.email_id,
			"first_name": self.user_name,
			"mobile_no": self.contact_number,
			"send_welcome_email": 1,
			"roles":roles
		}).insert(ignore_permissions=True)
	
@frappe.whitelist()
def createUser(formData):
	formData = json.loads(formData)

	doc = frappe.new_doc("User Registration")

	doc.user_name = formData['user_name']
	doc.contact_number = formData['contact_number']
	doc.email_id = formData['email_id']
	doc.password = formData['password']
	doc.confirm_password = formData['confirm_password']
	doc.role = formData['role']

	ghgData = formData['GHG']
	for i in ghgData:
		row = doc.append('ghg',{})
		row.project_tracking = i

	projectTrackingData = formData['Project Tracking']
	for i in projectTrackingData:
		row = doc.append('project_tracking',{})
		row.project_tracking = i

	# projectTrackingString = ",".join(projectTrackingData)
	# doc.project_tracking = projectTrackingString

	reportsData = formData['Reports']
	for i in reportsData:
		row = doc.append('reports',{})
		row.project_tracking = i
	# reportsString = ",".join(reportsData)
	# doc.reports = reportsString

	
	doc.insert(ignore_permissions = True)
	frappe.log_error("Title", formData)
	return({"message":"User Registration Successful! Waiting for Approval.","data":[ghgData,projectTrackingData,reportsData]})
