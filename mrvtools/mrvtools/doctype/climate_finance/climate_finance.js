// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Climate Finance', {
	refresh: function(frm){

		frappe.db.get_list('Climate Finance', {
			fields: ['project_name'],
			pluck:'project_name'
		}).then(r => {
			frm.set_query("project_name",function(){
				console.log(r);
				return{
					filters:{
						workflow_state:"Approved",
						name:['not in',r]
					}
				}
			})
		})

		frm.call({
		  doc:frm.doc,
		  method:'get_user',
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
	},
	project_name:function(frm){
		frappe.db.get_value('Project',`${frm.doc.project_name}`,'financial_closure_date').then(r =>
			{
			frm.set_value('financial_closure_date',r.message.financial_closure_date)
		})
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

	financial_closure_date:function(frm){
		// frm.call({
		// 	doc:cur_frm.doc,
		// 	method:"get_years",
		// 	async:false,
		// 	callback: function(r){
		// 		console.log(r.message);
		// 		var year_options=""
		// 		for (var i of r.message){
		// 			year_options += ('\n'+ i)
		// 		}
		// 		frm.fields_dict.budget_disbursement_schedule.grid.update_docfield_property("financial_year","options",year_options);
		// 		frm.refresh_field('budget_disbursement_schedule')
		// 		// console.log(year_options);
		// 	}
		// })
	}
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
	},
});


