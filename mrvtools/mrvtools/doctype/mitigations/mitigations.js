// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

var counter = 0
frappe.ui.form.on('Mitigations', {
	project_name: function(frm) {
		if(!frm.doc.included_in){
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
					console.log(values);
					
					
					frm.set_value("included_in",values)
					frm.refresh_field('included_in')
				}
			})
		}
		
	
	// project_name: function(frm) {
		// frm.call({
		// 	doc:cur_frm.doc,
		// 	method:"get_data",
		// 	async:false,
		// 	callback:function(r){
		// 		console.log(r.message);
		// 		for( var i of r.message){
		// 			var child = frm.add_child("included_in")
		// 		}
		// 	}
		// })
		
	},
	
	edit_button:function(frm){
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_performance_indicator.length != 0){
			frm.set_value("performance_indicator")
			for(var i of frm.doc.edited_performance_indicator){
				var child = frm.add_child("performance_indicator")
				child.performance_indicator = i.performance_indicator
				child.unit = i.unit
				child.expected_value = i.expected_value
				child.reference = i.reference
			}
			frm.fields_dict.performance_indicator.df.read_only = 0
			frm.refresh_field("performance_indicator")
		}
	},


	refresh: function(frm){
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
		
		frappe.db.get_list('Mitigations', {
			fields: ['project_name'],
			pluck:'project_name'
		}).then(r => {
			frm.set_query("project_name",function(){
				console.log(r);
				return{
					filters:{
						objective: ['in',['Cross-Cutting','Mitigation']],
						work_state:"Approved",
						name:['not in',r]
					}
				}
			})
		});













		if (frm.doc.workflow_state == "Rejected"){
			$("head").append(`<style>[id="project-tab2-tab"] {display: none !important}</style>`)
			frm.set_value("edited_project_details",[])
			frm.set_value("edited_performance_indicator",[])
			frm.set_value("workflow_state","Approved")
			frm.set_value('work_state','Approved')
			frm.dirty()
			frm.save()
		}
		if (frm.doc.workflow_state == "Approved"  && (frm.doc.edited_performance_indicator.length != 0 || frm.doc.edited_project_details.length != 0)){
			for (var i of frm.doc.edited_project_details){
				console.log("Field Name of i","=",i.field_name);
				if(i.field_name != "non_ghg_mitigation_benefits" && i.field_name != "target_ghgs"){
					frm.set_value(i.field_name,i.new_values)
				}
				
				else if(i.field_name == "non_ghg_mitigation_benefits"){
					console.log(i.field_name," = ",i.new_values);
					var new_list = i.new_values.split(",")
					console.log(i.field_name," = ",new_list);
					frm.clear_table("non_ghg_mitigation_benefits")
					for (var value of new_list){
						var row = frm.add_child("non_ghg_mitigation_benefits")
						row.non_ghg_mitigation_benefits = value
						console.log("Row value = ",row.non_ghg_mitigation_benefits);

						console.log("Value 1 = ",value);
					}
				}

				else if(i.field_name == "target_ghgs"){
					console.log(i.field_name," = ",i.new_values);
					var new_list = i.new_values.split(",")
					console.log(i.field_name," = ",new_list);
					frm.clear_table("target_ghgs")
					for (var value of new_list){
						var row = frm.add_child("target_ghgs")
						row.target_ghgs = value
						console.log("Row Value = ",row.target_ghgs);
						console.log("Value 2 = ",value);

					}
				}
				
			}
			console.log("edited_project_details = ",frm.doc.edited_project_details);
			frm.set_value('work_state','Approved')
			if(frm.doc.edited_performance_indicator.length != 0){
				frm.set_value("performance_indicator",[])
				for(var i of frm.doc.edited_performance_indicator){
					var child = frm.add_child("performance_indicator")
					child.performance_indicator = i.performance_indicator
					child.unit = i.unit
					child.expected_value = i.expected_value
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
			$("head").append(`<style>[id="project-tab1"] {display:block !important}</style>`)
			// $("head").append(`<style>[id="project-tab2-tab"] {display: none !important}</style>`)
			// frm.toggle_display(['project_name', 'original_coordinates','new_coordinates'], frm.doc.workflow_state == 'Approved');
		}
		else{
			$("head").append(`<style>[id="project-tab2-tab"] {display:inline-block !important}</style>`)
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
			var list=[]
			var new_list =[]
			frm.call({
				doc:frm.doc,
				method:"get_all_data",
				async:false,
				callback:function(r){
					var result= r.message
					console.log("Result",result)
					var field_name_list = []
					for(let [key,value] of Object.entries(result)){
						field_name_list.push(key)
					}
					for (var i of frm.doc.edited_project_details){
						console.log("Field Name ", i.field_name);
						if (field_name_list.includes(i.field_name) ){
							if (i.field_name != "non_ghg_mitigation_benefits" && i.field_name != "target_ghgs"){
								i.new_values = frm.doc[`${i.field_name}`].toString()
								frm.set_value(i.field_name,i.old_values)
							}
							else if(i.field_name == "non_ghg_mitigation_benefits"){
								var non_ghg_mitigation_benefits_result = ""
								console.log("Checking 1 = ",non_ghg_mitigation_benefits_result);
								console.log(frm.doc.non_ghg_mitigation_benefits);
								for(var res of frm.doc.non_ghg_mitigation_benefits){
									console.log(res);
									if(non_ghg_mitigation_benefits_result == ""){
										console.log(res.non_ghg_mitigation_benefits);
										non_ghg_mitigation_benefits_result += res.non_ghg_mitigation_benefits
									}else{
										console.log(res.non_ghg_mitigation_benefits_result);
										non_ghg_mitigation_benefits_result += ","
										non_ghg_mitigation_benefits_result += res.non_ghg_mitigation_benefits
									}
								}
								console.log("Checking 1 = ",non_ghg_mitigation_benefits_result);
								i.new_values = non_ghg_mitigation_benefits_result
								list=i.old_values.split(",")
								frm.clear_table("non_ghg_mitigation_benefits")
								for (var value of list){
									var row = frm.add_child("non_ghg_mitigation_benefits")
									row.non_ghg_mitigation_benefits = value
								}
								frm.refresh_field("non_ghg_mitigation_benefits")
								console.log("List1","=",list);
							}
							else if(i.field_name == "target_ghgs"){
								var target_ghgs_result = ""
								console.log(frm.doc.target_ghgs);
								for(var res of frm.doc.target_ghgs){
									if(target_ghgs_result == ""){
										target_ghgs_result += res.target_ghgs
									}else{
										target_ghgs_result += ","
										target_ghgs_result += res.target_ghgs
									}
								}
								console.log(target_ghgs_result);
								i.new_values = target_ghgs_result
								new_list=i.old_values.split(",")
								frm.clear_table("target_ghgs")
								for (var value of new_list){
									var row = frm.add_child("target_ghgs")
									row.target_ghgs = value
								}
								frm.refresh_field("target_ghgs")
								console.log("new_list1","=",new_list);
							}
							frm.refresh_field("edited_project_details")
							const index = field_name_list.indexOf(i.field_name);
							const x = field_name_list.splice(index, 1)
							
						}
					}
					if (field_name_list){
						var list2=[]
						var new_list2 =[]
						console.log("field_name_list"," = ",field_name_list);
						for (var i of field_name_list){
							var label = i.replaceAll("_"," ")
							label = toTitleCase(label)
							console.log("label","=",label);
							var child =frm.add_child("edited_project_details")
							if (i != "non_ghg_mitigation_benefits"  && i != "target_ghgs"){
								console.log("i ",result[`${i}`] );
								console.log("j ",frm.doc[`${i}`]);
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								child.new_values = frm.doc[`${i}`].toString()
								frm.set_value(i,result[`${i}`])
								console.log("Edited Table1 =  ",frm.doc.edited_project_details);
							}
							else if(i == "non_ghg_mitigation_benefits"){
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								console.log("Field Label = ",child.field_label);
								console.log("Field Name = ",child.field_name);
								console.log("Old  Values = ",child.old_values);
								var non_ghg_mitigation_benefits_result = ""
								console.log("Checking = ",non_ghg_mitigation_benefits_result);
								console.log(frm.doc.non_ghg_mitigation_benefits);
								for(var res of frm.doc.non_ghg_mitigation_benefits){
									if(non_ghg_mitigation_benefits_result == ""){
										console.log("RES",res.non_ghg_mitigation_benefits);
										non_ghg_mitigation_benefits_result += res.non_ghg_mitigation_benefits
									}else{
										console.log("RES",res.non_ghg_mitigation_benefits);
										non_ghg_mitigation_benefits_result += ","
										non_ghg_mitigation_benefits_result += res.non_ghg_mitigation_benefits
									}
								}
								console.log("Non GHG Result",non_ghg_mitigation_benefits_result);
								child.new_values = non_ghg_mitigation_benefits_result
								console.log("New Values =  ",child.new_values);
								frm.refresh_fields("edited_project_details")
								console.log("Edited Table2 =  ",frm.doc.edited_project_details);
								list2 = result[`${i}`].split(",")
								console.log("list2",list2);
								frm.clear_table("non_ghg_mitigation_benefits")
								for(var value of list2){
									var row = frm.add_child("non_ghg_mitigation_benefits")
									console.log(value);
									row.non_ghg_mitigation_benefits = value      
								}
								frm.refresh_fields("non_ghg_mitigation_benefits")
							}
							else if(i == "target_ghgs"){
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								console.log("Field Label = ",child.field_label);
								console.log("Field Name = ",child.field_name);
								console.log("Old  Values = ",child.old_values);
								var target_ghgs_result = ""
								console.log(frm.doc.target_ghgs);
								for(var res of frm.doc.target_ghgs){
									if(target_ghgs_result == ""){
										target_ghgs_result += res.target_ghgs
									}else{
										target_ghgs_result += ","
										target_ghgs_result += res.target_ghgs
									}
								}
								console.log("NDP Result",target_ghgs_result);
								child.new_values = target_ghgs_result
								console.log("New Values =  ",child.new_values);
								frm.refresh_fields("edited_project_details")
								console.log("Edited Table2 =  ",frm.doc.edited_project_details);
								new_list2 = result[`${i}`].split(",")
								// console.log("list1",result[`${i}`].split(","));
								console.log("new_list2",new_list2);
								frm.clear_table("target_ghgs")
								for(var value of new_list2){
									var row = frm.add_child("target_ghgs")
									console.log(value);
									row.target_ghgs = value
								}
								frm.refresh_fields("target_ghgs")
							}
							console.log("Edited Table3 =  ",frm.doc.edited_project_details);
							
						}
					}
				}
			})
		}
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