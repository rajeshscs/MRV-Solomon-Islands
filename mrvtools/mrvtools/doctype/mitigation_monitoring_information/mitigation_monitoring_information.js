// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Mitigation Monitoring Information', {
	refresh: function(frm){
		$('[data-fieldname="performance_indicator"] [class="grid-buttons"]').css("display","none")
		$('head').append('<style>[id="page-Mitigation Monitoring Information"] div[data-fieldname="performance_indicator"] .grid-row .col:last-child {display:none !important;}</style>')
		$('head').append('<style>[id="page-Mitigation Monitoring Information"] div[data-fieldname="performance_indicator"] .grid-row .col:first-child {display:none !important;}</style>')

		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_performance_indicator.length != 0){
			frm.fields_dict.performance_indicator.df.read_only = 1
			frm.refresh_field("performance_indicator")
		}

		frm.call({
		  doc:frm.doc,
		  method:'get_user',
		  async:false,
		  callback: function(r){
			var userList = []
			for (var i of r.message){
			  userList.push(i[0])
			}
			console.log(userList);
			frm.set_query("select_approver",function(){
			  return {
				filters:{
				  email:['in',userList]
				}
			  }
			})
		  }
		})
		frm.set_query("project_name",function(){
			return{
				filters:{
					workflow_state:"Approved"
				}
			}
		})


		if (frm.doc.workflow_state == "Rejected"){
			$("head").append(`<style>[id="project-tab2-tab"] {display: none !important}</style>`)
			frm.set_value("edited_project_details",[])
			frm.set_value("edited_performance_indicator",[])
			frm.set_value("workflow_state","Approved")
			frm.set_value('work_state','Approved')
			frm.save()
		}
		if (frm.doc.workflow_state == "Approved" && (frm.doc.edited_performance_indicator.length != 0 || frm.doc.edited_project_details.length != 0)){
			for (var i of frm.doc.edited_project_details){
				console.log("Field Name of i","=",i.field_name);
					frm.set_value(i.field_name,i.new_values)
			}
			frm.set_value("edited_project_details",[])
			console.log("edited_project_details = ",frm.doc.edited_project_details);
			frm.set_value('work_state','Approved')
			if(frm.doc.edited_performance_indicator.length != 0){
				frm.set_value("performance_indicator",[])
				for(var i of frm.doc.edited_performance_indicator){
					var child = frm.add_child("performance_indicator")
					child.performance_indicator = i.performance_indicator
					child.unit = i.unit
					child.expected_value = i.expected_value
					child.actual_monitored_value = i.actual_monitored_value
					child.reference = i.reference
				}
				
				frm.refresh_field("performance_indicator")
			}
			frm.set_value("edited_project_details",[])
			frm.set_value("edited_performance_indicator",[])
			frm.refresh_field("edited_performance_indicator")
			frm.save()
		}

		if (frm.doc.workflow_state == "Approved" || frm.doc.__islocal){
			$('[id="mitigation-monitoring-information-tab1"]').addClass("active")
		}
	},
	
	edit_button:function(frm){
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_performance_indicator.length != 0){
			frm.set_value("performance_indicator",[])
			for(var i of frm.doc.edited_performance_indicator){
				var child = frm.add_child("performance_indicator")
				child.performance_indicator = i.performance_indicator
				child.unit = i.unit
				child.expected_value = i.expected_value
				child.actual_monitored_value = i.actual_monitored_value
				child.reference = i.reference
			}
			frm.fields_dict.performance_indicator.df.read_only = 0
			frm.refresh_field("performance_indicator")
		}
	},

	before_save:function(frm){
		if (frm.doc.workflow_state != "Approved"  && !frm.doc.__islocal){
			if(frm.fields_dict.performance_indicator.df.read_only == 0){
				frm.call({
					doc:frm.doc,
					method:"before_saving_table",
					async:false,
					callback:function(r){
						console.log("Mudinchhh!",r.message);
					}
				})
			}
			console.log("edited_project_details = ",frm.doc.edited_project_details);
			frm.call({
				doc:frm.doc,
				method:"get_all_data",
				async:false,
				callback:function(r){
					var result= r.message
					console.log("Res = ",result)
					var field_name_list = []
					for(let [key,value] of Object.entries(result)){
						field_name_list.push(key)
					}
					console.log(field_name_list);
					for (var i of frm.doc.edited_project_details){
						console.log("Field Name ", i.field_name);
						if (field_name_list.includes(i.field_name) ){
							i.new_values = frm.doc[`${i.field_name}`].toString()
							frm.set_value(i.field_name,i.old_values)
							frm.refresh_field("edited_project_details")

							const index = field_name_list.indexOf(i.field_name);
							const x = field_name_list.splice(index, 1)
						}
					}
					if (field_name_list){
						console.log("field_name_list"," = ",field_name_list);
						for (var i of field_name_list){
							var label = i.replaceAll("_"," ")
							label = toTitleCase(label)
							console.log("label","=",label);
							var child =frm.add_child("edited_project_details")
							console.log("i ",result[`${i}`] );
							console.log("j ",frm.doc[`${i}`]);
							child.field_label = label
							child.field_name = i
							child.old_values = result[`${i}`]
							child.new_values = frm.doc[`${i}`].toString()
							frm.set_value(i,result[`${i}`])
							console.log("Edited Table1 =  ",frm.doc.edited_project_details);
						}
					}
				}
			})
		}
	},

	project_name: function(frm) {
		frm.set_value("project_name1","")
		frm.set_value("contact_details","")
		frm.set_value("other_contact_details","")
		frm.set_value("lifetime","")
		frm.set_value("status","")
		frm.set_value("gender_inclusiveness_assessment","")
		frm.set_value("market_based_mechanism","")
		frm.set_value("project_impacts","")
		frm.set_value("expected_project_output","")
		frm.set_value("market_based_mechanism","")
		frm.set_value("weblink","")
		frm.set_value("beneficiaries","")


		frm.call({
			doc:cur_frm.doc,
			method:"get_data",
			async:false,
			callback:function(r){
				frm.set_value("project_name1",r.message[0].project_name)
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
			method:"get_data",
			async:false,
			callback:function(r){
				
				var values=[]
				for(var i of r.message){
					values.push(i)
					console.log("included_in","-",r.message);
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
			method:"get_child",
			async:false,
			callback:function(r){
				var col=r.message
				console.log(col);
				frm.set_value("performance_indicator",[])
				for (var i of col){
					var child=frm.add_child("performance_indicator")
					child.performance_indicator = i.performance_indicator
					child.unit = i.unit
					child.expected_value = i.expected_value
					frm.refresh_field("performance_indicator")
				}
			}
		})
		$.ajax({
			success:function(){
				$('[id="page-Mitigation Monitoring Information"] [class="row-check sortable-handle col"]').css("display","none")
			}
		})
		frm.call({
			doc:cur_frm.doc,
			method:"get_years",
			async:false,
			args:{
				name:frm.doc.project_name1
			},
			callback: function(r){
				var year_options=""
				for (var i of r.message){
					year_options += ('\n'+ i)
				}
				cur_frm.fields_dict.monitoring_year.df.options = year_options
				frm.refresh_field('monitoring_year')
			}
		})
	}
});

function toTitleCase(str) {
	return str.replace(
	  /\w\S*/g,
	  function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  }
	); 
}