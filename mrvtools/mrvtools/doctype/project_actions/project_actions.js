// Copyright (c) 2024, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project Actions', {
	before_save: function(frm) {
		if(frm.doc.objective == "Mitigation"){
			frm.set_value("naming_series","SI-01-.####")
		}
		if(frm.doc.objective == "Adaptation"){
			frm.set_value("naming_series","SI-02-.####")
		}
		if(frm.doc.objective == "Cross-Cutting"){
			frm.set_value("naming_series","SI-03-.####")
		}
		if(frm.doc.objective == "Enablers"){
			frm.set_value("naming_series","SI-04-.####")
		}
		if(frm.doc.objective == "Transparency"){
			frm.set_value("naming_series","SI-05-.####")
		}
		frm.refresh_field("naming_series")
	}
});
