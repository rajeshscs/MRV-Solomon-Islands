// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Master Data', {
	// refresh: function(frm) {

	// }
	refresh : function(frm){
		frm.call("getMasterValues").then(r =>{
			console.log(r.message)
			var docList = r.message
			if (frm.doc.master_data.length == 0){
				for (var i in docList){
					console.log("Module = ",docList[i].module)
					console.log("Table Type = ",docList[i].table)
					console.log("Impact Area = ", docList[i].impact_area)
					console.log("Indicator = ", docList[i].indicator)
					let row = frm.add_child('master_data', {
						module: docList[i].module,
						table: docList[i].table,
						impact_area: docList[i].impact_area,
						indicator: docList[i].indicator,
						sdg_mapping:docList[i].sdg_mapping
					});
					frm.refresh_field('master_data');
				}
			}
		})

	}
});
