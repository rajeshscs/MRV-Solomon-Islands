import frappe

@frappe.whitelist()
def get_approvers():
    doc= frappe.db.get_list("Role",
        fields=['name'],
        filters={
            "name":["Like","%Approver%"]
        },
        pluck="name",
        ignore_permissions=True)
    return doc