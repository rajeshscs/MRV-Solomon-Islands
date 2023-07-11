# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe , json
from frappe.model.document import Document

class UserRegistration(Document):
	pass
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
	ghgString = ",".join(ghgData)
	doc.ghg = ghgString

	projectTrackingData = formData['Project Tracking']
	projectTrackingString = ",".join(projectTrackingData)
	doc.project_tracking = projectTrackingString

	reportsData = formData['Reports']
	reportsString = ",".join(reportsData)
	doc.reports = reportsString

	
	doc.insert(ignore_permissions = True)

	return("User Registration Successful! Waiting for Approval.")
