# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ParametermasterList(Document):
    
    @frappe.whitelist()
    def save_value(self):
        result = frappe.db.sql (self.query)
        return result