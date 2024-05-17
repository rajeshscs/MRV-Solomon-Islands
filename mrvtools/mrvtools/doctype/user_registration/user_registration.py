# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe , json
from frappe.model.document import Document
from frappe.utils.password import update_password
from frappe.utils.password import get_decrypted_password

class UserRegistration(Document):
	@frappe.whitelist()
	def check_user_exists(self,ghg,reports,project):
		role=[]
		if not frappe.db.exists("User", self.email_id):
			if(self.role == "User"):
				for g in ghg:
					role.append({"role": g['project_tracking']+" "+"Tracking"})
				# role.append(g['project_tracking'])
				for proj in project:
					role.append({"role": "Projects"})
					role.append({"role": proj['project_tracking']})
				for report in reports:
					role.append({"role": report['project_tracking']})
				self.insert_user(role)
			elif(self.role == "Approver"):
				for g in ghg:
					role.append({"role": "Approver"+ " " + g['project_tracking']})
				# role.append(g['project_tracking'])
				for proj in project:
					role.append({"role": "Approver Project"})
					role.append({"role": "Approver"+ " " + proj['project_tracking']})
				for report in reports:
					role.append({"role":"Approver"+ " " + report['project_tracking']})
				self.insert_user(role)
			else:
				for report in reports:
					role.append({"role":"Observer"+ " " + report['project_tracking']})
				self.insert_user(role)
		# 	role_list = [{"role":"Adaptation Tracking"},{"role":"Mitigation Tracking"}]
		

	def insert_user(self, roles):
		# user = frappe.new_doc("User")
		# user.email = self.email_id,
		# user.first_name = self.user_name,
		# user.mobile_no = self.contact_number,
		# user.send_welcome_email = 1,
		# user.roles = roles
		# user.save(ignore_permissions=True)
		user = self.email_id
		doc = frappe.get_doc({
			"doctype": "User",
			"name": self.email_id,
			"email": self.email_id,
			"first_name": self.user_name,
			"enabled" :1,
			"mobile_no": self.contact_number,
			"send_welcome_email": 1,
			"roles":roles
		})
		doc.insert(ignore_permissions=True)
		decrypted_password = get_decrypted_password(doctype = "User Registration", name = self.name, fieldname="password", raise_exception=True)
		update_password(user,pwd = decrypted_password, logout_all_sessions=0)
		doc.save(ignore_permissions=True)
		frappe.db.commit()
	
@frappe.whitelist(allow_guest = True)
def createUser(formData):
	formData = json.loads(formData)
	frappe.log_error("2222222222222",formData['email_id'])
	if not frappe.db.exists("User Registration",{"email_id":formData['email_id']}):

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
		return({"message":"User Registration Successful! Waiting for Approval.","data":[ghgData,projectTrackingData,reportsData]})
	else:
		frappe.throw("Email Id Already Registred")