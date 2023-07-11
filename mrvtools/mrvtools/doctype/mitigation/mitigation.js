// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Mitigation', {
	project_name: function(frm) {
		frm.call({
			doc:cur_frm.doc,
			method:"get_data",
			async:false,
			callback:function(r){
				var values=[]
				console.log(r);
				for(var i of r.message){
					values.push(i)
					
				}
				values=values.join(",")
				console.log(values);
				
				frm.set_value("included_in",values)
			}
		})
	}
});
