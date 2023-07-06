// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project', {
	refresh: function(frm){
		frm.set_query("key_sector", function(){
            return {
                filters: {
                    objective : frm.doc.objective
                }
            }
        });
		frm.set_query("key_sub_sector", function(){
            return {
                filters: {
                    key_sector : frm.doc.key_sector
                }
            }
        });
	}
});
