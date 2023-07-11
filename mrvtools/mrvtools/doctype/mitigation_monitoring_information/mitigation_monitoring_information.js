// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Mitigation Monitoring Information', {
	project_name: function(frm) {
		frm.call({
			doc:cur_frm.doc,
			method:"get_data",
			async:false,
			callback:function(r){
				var values=[]
				for(var i of r.message){
					values.push(i)
					
				}
				values=values.join(",")
				frm.set_value("included_in",values)
			}
		})
		frm.call({
			doc:cur_frm.doc,
			method:"get_value1",
			async:false,
			callback:function(r){
				var values=[]
				for(var i of r.message){
					values.push(i)
					
				}
				values=values.join(",")
				frm.set_value("non_ghg_mitigation_benefits",values)
			}
		})
		frm.call({
			doc:cur_frm.doc,
			method:"get_value2",
			async:false,
			callback:function(r){
				var values=[]
				for(var i of r.message){
					values.push(i)
					
				}
				values=values.join(",")
				frm.set_value("target_ghgs",values)
			}
		})
		frm.call({
			doc:cur_frm.doc,
			method:"get_all_data",
			async:false,
			callback:function(r){
				frm.set_value("contact_details",r.message[0].contact_details)
				frm.set_value("other_contact_details",r.message[0].other_contact_details)
				frm.set_value("lifetime",r.message[0].lifetime)
				frm.set_value("status",r.message[0].status)
				frm.set_value("gender_inclusiveness_assessment",r.message[0].gender_inclusiveness_assessment)
				frm.set_value("market_based_mechanism",r.message[0].market_based_mechanism)
				frm.set_value("project_impacts",r.message[0].project_impacts)
				frm.set_value("expected_project_output",r.message[0].expected_project_output)
				frm.set_value("market_based_mechanism",r.message[0].market_based_mechanism)
				frm.set_value("weblink",r.message[0].weblink)
				frm.set_value("beneficiaries",r.message[0].beneficiaries)

			}
		})
		frm.call({
			doc:cur_frm.doc,
			method:"get_child",
			async:false,
			callback:function(r){
				var col=r.message
				console.log(col);
				for (var i of col){
					frm.set_value("performance_indicator",[])
					
					var child=frm.add_child("performance_indicator")
					child.performance_indicator = i.performance_indicator
					child.unit = i.unit
					child.expected_value = i.expected_value
					frm.refresh_field("performance_indicator")
				}
			}
		})
	}
});
