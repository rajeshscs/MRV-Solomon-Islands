// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Parameter master List', {
	query: function(frm) {
		frm.call({
			doc:frm.doc,
			method:"save_value",
			async:false,
			callback: function (r){
				console.log(r.message);
			}
		})
	}
});
