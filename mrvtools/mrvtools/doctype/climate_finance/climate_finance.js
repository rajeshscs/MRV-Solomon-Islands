// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Climate Finance', {
	refresh: function(frm){
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_sources_of_finance.length != 0){
			frm.fields_dict.sources_of_finance.df.read_only = 1
			frm.refresh_field("sources_of_finance")
		}
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_cost_breakdown.length != 0){
			frm.fields_dict.cost_breakdown.df.read_only = 1
			frm.refresh_field("cost_breakdown")
		}
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_budget_disbursement_schedule.length != 0){
			frm.fields_dict.budget_disbursement_schedule.df.read_only = 1
			frm.refresh_field("budget_disbursement_schedule")
		}

		frappe.db.get_list('Climate Finance', {
			fields: ['project_name'],
			pluck:'project_name'
		}).then(r => {
			frm.set_query("project_name",function(){
				console.log(r);
				return{
					filters:{
						work_state:"Approved",
						name:['not in',r]
					}
				}
			})
		})

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

		if (frm.doc.workflow_state == "Rejected"){
			frm.set_value("edited_project_details",[])
			frm.set_value("edited_sources_of_finance",[])
			frm.set_value("edited_cost_breakdown",[])
			frm.set_value("edited_budget_disbursement_schedule",[])
			frm.set_value("workflow_state","Approved")
			frm.set_value('work_state','Approved')
			frm.dirty()
			frm.save()
		}

		if ((frm.doc.workflow_state == "Approved")){
			for (var i of frm.doc.edited_project_details){
					frm.set_value(i.field_name,i.new_values)
			}
			frm.set_value("edited_project_details",[])
			console.log("edited_project_details = ",frm.doc.edited_project_details);
			frm.set_value('work_state','Approved')
			if(frm.doc.edited_sources_of_finance.length != 0){
				frm.set_value("sources_of_finance",[])
				for(var i of frm.doc.edited_sources_of_finance){
					var row = frm.add_child("sources_of_finance")
					row.type = i.type
					row.national_international = i.national_international
					row.amount = i.amount
					row.channels = i.channels
					row.agency_name = i.agency_name
					row.country = i.country
				}
				frm.refresh_field("sources_of_finance")
			}
			if(frm.doc.edited_cost_breakdown.length != 0){
				frm.set_value("cost_breakdown",[])
				for(var i of frm.doc.edited_cost_breakdown){
					var row = frm.add_child("cost_breakdown")
					row.disbursement_category = i.disbursement_category
					row.amount = i.amount
					row.percentage = i.percentage
				}
				frm.refresh_field("cost_breakdown")
			}

			if(frm.doc.edited_budget_disbursement_schedule.length != 0){
				frm.set_value("budget_disbursement_schedule",[])
				for(var i of frm.doc.edited_budget_disbursement_schedule){
					var row = frm.add_child("budget_disbursement_schedule")
					row.financial_year = i.financial_year
					row.amount = i.amount
					row.percentage = i.percentage
				}
				frm.refresh_field("budget_disbursement_schedule")
			}
			frm.set_value("edited_sources_of_finance",[])
			frm.set_value("edited_cost_breakdown",[])
			frm.set_value("edited_budget_disbursement_schedule",[])
			frm.save()
		}
		

		// if (frm.doc.workflow_state == "Approved" || frm.doc.__islocal){
		// 	$("head").append(`<style>[id="project-tab1"] {display:block !important}</style>`)
		// 	// $("head").append(`<style>[id="project-tab2-tab"] {display: none !important}</style>`)
		// 	// frm.toggle_display(['project_name', 'original_coordinates','new_coordinates'], frm.doc.workflow_state == 'Approved');
		// }
		// else{
		// 	$("head").append(`<style>[id="project-tab2-tab"] {display:inline-block !important}</style>`)
		// }

	},


	edit_button1:function(frm){
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_sources_of_finance.length != 0){
			frm.set_value("sources_of_finance")
			for(var i of frm.doc.edited_sources_of_finance){
				var row = frm.add_child("sources_of_finance")
				row.type = i.type
				row.national_international = i.national_international
				row.amount = i.amount
				row.channels = i.channels
				row.agency_name = i.agency_name
				row.country = i.country
			}
			frm.fields_dict.sources_of_finance.df.read_only = 0
			frm.refresh_field("sources_of_finance")
		}
	},
	edit_button2:function(frm){
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_cost_breakdown.length != 0){
			frm.set_value("cost_breakdown")
			for(var i of frm.doc.edited_cost_breakdown){
				var row = frm.add_child("cost_breakdown")
				row.disbursement_category = i.disbursement_category
				row.amount = i.amount
				row.percentage = i.percentage
			}
			frm.fields_dict.cost_breakdown.df.read_only = 0
			frm.refresh_field("cost_breakdown")
		}
	},
	edit_button3:function(frm){
		if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc.edited_budget_disbursement_schedule.length != 0){
			frm.set_value("budget_disbursement_schedule")
			for(var i of frm.doc.edited_budget_disbursement_schedule){
				var row = frm.add_child("budget_disbursement_schedule")
				row.financial_year = i.financial_year
				row.amount = i.amount
				row.percentage = i.percentage
			}
			frm.fields_dict.budget_disbursement_schedule.df.read_only = 0
			frm.refresh_field("budget_disbursement_schedule")
		}
	},

	before_save:function(frm){
		if (frm.doc.workflow_state != "Approved"  && !frm.doc.__islocal){
			if(frm.fields_dict.sources_of_finance.df.read_only == 0){
				frm.call({
					doc:frm.doc,
					method:"before_saving_table1",
					async:false,
					callback:function(r){
						console.log("Mudinchhh!",r.message);
					}
				})
			}
			if(frm.fields_dict.cost_breakdown.df.read_only == 0){
				frm.call({
					doc:frm.doc,
					method:"before_saving_table2",
					async:false,
					callback:function(r){
						console.log("Mudinchhh!",r.message);
					}
				})
			}
			if(frm.fields_dict.budget_disbursement_schedule.df.read_only == 0){
				frm.call({
					doc:frm.doc,
					method:"before_saving_table3",
					async:false,
					callback:function(r){
						console.log("Mudinchhh!",r.message);
					}
				})
			}

			frm.call({
				doc:frm.doc,
				method:"get_all_datas",
				async:false,
				callback:function(r){
					var result= r.message
					console.log("Result",result)
					var field_name_list = []
					for(let [key,value] of Object.entries(result)){
						field_name_list.push(key)
					}
					for (var i of frm.doc.edited_project_details){
						if (field_name_list.includes(i.field_name) ){
							if(["approval_date","expected_end_date","financial_closure_date","effectiveness_date"].includes(i.field_name)){
								i.new_values = frm.doc[`${i.field_name}`]
							}
							else{
								i.new_values = frm.doc[`${i.field_name}`].toString()
							}
							frm.set_value(i.field_name,i.old_values)
							console.log("i","=",i.new_values);
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
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								if(["approval_date","expected_end_date","financial_closure_date","effectiveness_date"].includes(i)){
									child.new_values = frm.doc[`${i}`]
								}
								else{
									child.new_values = frm.doc[`${i}`].toString()
								}
							frm.set_value(i,result[`${i}`])
						}
					}
				}
			})
		}
	},
	project_name:function(frm){
		frappe.db.get_value('Project',`${frm.doc.project_name}`,'financial_closure_date').then(r =>
			{
			frm.set_value('financial_closure_date',r.message.financial_closure_date)
		})
		frm.refresh_field("budget_disbursement_schedule")
		},
	total_project_cost:function(frm){
		var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds - frm.doc.total_sources_of_finance
		if(others >= 0){
			frm.set_value("others",others)
		}
		else{
			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
			frm.set_value("others",others)
		}
		
	},

	national_budget:function(frm){
		var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds - frm.doc.total_sources_of_finance
		if(others >= 0){
			frm.set_value("others",others)
		}
		else{
			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
			frm.set_value("others",others)
		}
	},

	sub_national_budget:function(frm){
		var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds - frm.doc.total_sources_of_finance
		if(others >= 0){
			frm.set_value("others",others)
		}
		else{
			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
			frm.set_value("others",others)
		}
	},

	green_bonds:function(frm){
		var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds - frm.doc.total_sources_of_finance
		if(others >= 0){
			frm.set_value("others",others)
		}
		else{
			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
			frm.set_value("others",others)
		}
	},
	
	total_sources_of_finance:function(frm){
		var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds - frm.doc.total_sources_of_finance
		if(others >= 0){
			frm.set_value("others",others)
		}
		else{
			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
			frm.set_value("others",others)
		}
	},

	// financial_closure_date:function(frm){
	// 	// frm.call({
	// 	// 	doc:cur_frm.doc,
	// 	// 	method:"get_years",
	// 	// 	async:false,
	// 	// 	callback: function(r){
	// 	// 		console.log(r.message);
	// 	// 		var year_options=""
	// 	// 		for (var i of r.message){
	// 	// 			year_options += ('\n'+ i)
	// 	// 		}
	// 	// 		frm.fields_dict.budget_disbursement_schedule.grid.update_docfield_property("financial_year","options",year_options);
	// 	// 		frm.refresh_field('budget_disbursement_schedule')
	// 	// 		// console.log(year_options);
	// 	// 	}
	// 	// })
	// }
});


frappe.ui.form.on('Sources of Climate Finance ChildTable',{
	amount:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		var total=0;
		for(var i in frm.doc.sources_of_finance){
			total += parseFloat(frm.doc.sources_of_finance[i].amount);	
		}
		
		frm.set_value('total_sources_of_finance',total);
		refresh_field('total_sources_of_finance')
	},
	sources_of_finance_remove:function(frm){
		var total=0;
		for(var i in frm.doc.sources_of_finance){
			total += parseFloat(frm.doc.sources_of_finance[i].amount);	
		}
		
		frm.set_value('total_sources_of_finance',total);
		refresh_field('total_sources_of_finance')
	},
	// sources_of_finance_add:function(frm){
	// 	var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds
	// 	if(!frm.doc.total_project_cost == 0){
	// 		if(others >= 0){
	// 			frm.set_value("others",others)
	// 		}
	// 		else{
	// 			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
	// 			frm.set_value("others",0)
	// 		}
			
			
	// 	}
	// 	frm.set_value("total_rows_sources_of_finance",frm.doc.sources_of_finance.length)
		
	// },
	// sources_of_finance_remove:function(frm){
	// 	var others = frm.doc.total_project_cost - frm.doc.national_budget - frm.doc.sub_national_budget - frm.doc.green_bonds
	// 	if(!frm.doc.total_project_cost == 0){
	// 		if(others >= 0){
	// 			frm.set_value("others",others)
	// 		}
	// 		else{
	// 			frappe.msgprint({ title:"Alert",message:`Others(USD) can't be Negative. Others = ${others}`})
	// 			frm.set_value("others",0)
	// 		}
			
			
	// 	}
		// frm.set_value("total_rows_sources_of_finance",frm.doc.sources_of_finance.length)
	// },
});


frappe.ui.form.on('Climate Finance detailed Budget ChildTable',{
	amount:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		frappe.model.set_value(cdt, cdn, "percentage",  ((child.amount / frm.doc.total_project_cost)*100).toFixed(2));
		refresh_field('percentage')
		var total=0;
		for(var i in frm.doc.cost_breakdown){
			total += parseFloat(frm.doc.cost_breakdown[i].amount);	
		}
		
		frm.set_value('total_amount_of_cost_breakdown',total);
		refresh_field('total_amount_of_cost_breakdown')
		frm.set_value('total_percentage_of_cost_breakdown', ((frm.doc.total_amount_of_cost_breakdown / frm.doc.total_project_cost)*100))
		refresh_field('total_percentage_of_cost_breakdown')
	},
	cost_breakdown_remove:function(frm){
		var total=0;
		for(var i in frm.doc.cost_breakdown){
			total += parseFloat(frm.doc.cost_breakdown[i].amount);	
		}
		
		frm.set_value('total_amount_of_cost_breakdown',total);
		refresh_field('total_amount_of_cost_breakdown')
		frm.set_value('total_percentage_of_cost_breakdown', ((frm.doc.total_amount_of_cost_breakdown / frm.doc.total_project_cost)*100))
		refresh_field('total_percentage_of_cost_breakdown')
	},
});


frappe.ui.form.on('Climate Finance Disbursement Schedule ChildTable',{
	budget_disbursement_schedule_add:function(frm,cdt,cdn){
		// var child = locals[cdt][cdn]
		var yearList = []
		for (var i of frm.doc.budget_disbursement_schedule){
			if(i.financial_year != undefined){
				yearList.push(i.financial_year)
			}
		}
		console.log(yearList);
		frm.call({
			doc:cur_frm.doc,
			method:"get_years",
			async:false,
			callback: function(r){
				// console.log(r.message);
				var year_options=""
				for (var i of r.message){
					if(!yearList.includes(i)){
						year_options += ('\n'+ i)
					}
				}
				frm.fields_dict.budget_disbursement_schedule.grid.update_docfield_property("financial_year","options",year_options);
				frm.refresh_field('budget_disbursement_schedule')
				// console.log(year_options);
			}
		})
	},
	amount:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		frappe.model.set_value(cdt, cdn, "percentage",  ((child.amount / frm.doc.total_project_cost)*100).toFixed(2));
		refresh_field('percentage')
		var total=0;
		for(var i in frm.doc.budget_disbursement_schedule){
			total += parseFloat(frm.doc.budget_disbursement_schedule[i].amount);	
		}
		
		frm.set_value('total_amount_of_budget_disbursement_schedule',total);
		refresh_field('total_amount_of_budget_disbursement_schedule')
		frm.set_value('total_percentage_of_budget_disbursement_schedule', ((frm.doc.total_amount_of_budget_disbursement_schedule / frm.doc.total_project_cost)*100))
		refresh_field('total_percentage_of_budget_disbursement_schedule')
	},
	budget_disbursement_schedule_remove:function(frm){
		var total=0;
		for(var i in frm.doc.budget_disbursement_schedule){
			total += parseFloat(frm.doc.budget_disbursement_schedule[i].amount);	
		}
		
		frm.set_value('total_amount_of_budget_disbursement_schedule',total);
		refresh_field('total_amount_of_budget_disbursement_schedule')
		frm.set_value('total_percentage_of_budget_disbursement_schedule', ((frm.doc.total_amount_of_budget_disbursement_schedule / frm.doc.total_project_cost)*100))
		refresh_field('total_percentage_of_budget_disbursement_schedule')
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