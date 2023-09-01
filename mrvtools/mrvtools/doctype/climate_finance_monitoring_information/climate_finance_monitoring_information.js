// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt
var counter = 0
frappe.ui.form.on('Climate Finance Monitoring Information', {
	
	refresh: function(frm){
		
		$.ajax({
			success:function(){
				$('[id="page-Climate Finance Monitoring Information"] [data-fieldname="total_budget_disbursement"] [class="grid-buttons"]').css("display","none")
				$('[id="page-Climate Finance Monitoring Information"] [data-fieldname="total_budget_disbursement"] [class="row-check sortable-handle col"]').css("display","none")
			}
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
		console.log(counter);
	},
	project_name:function(frm){
		
		frm.set_value("monitoring_year","")
		
		counter = 0 
		
		frm.call({
			doc:frm.doc,
			method:'get_rows',
			callback: function(r){
				
				frm.set_value("total_budget_disbursement",[])
				for(var i of r.message){
					var child = frm.add_child("total_budget_disbursement")
					child.financial_year = i.financial_year
					child.q1 = i.q1
					child.q2 = i.q2
					child.q3 = i.q3
					child.q4 = i.q4
					child.total_disbursement_usd=i.total_disbursement_usd
				}
				frm.refresh_field("total_budget_disbursement")
			}
		})
		$.ajax({
			success:function(){
				$('[id="page-Climate Finance Monitoring Information"] [data-fieldname="total_budget_disbursement"] [class="row-check sortable-handle col"]').css("display","none")
			}
		})
		console.log(counter);

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


		frm.add_child
	},
	monitoring_year: function(frm){
		if(cur_frm.doc.monitoring_year == ""){
			counter = 0
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].remove();
			frm.refresh_fields("total_budget_disbursement")
		}
		if(frm.doc.project_name && frm.doc.monitoring_year){
			counter += 1
			if (counter == 1){
				if(frm.doc.monitorning_year == ""){
					cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.financial_year = " "
					frm.refresh_field("total_budget_disbursement")
				}
				console.log(counter);
				for (var row of frm.doc.total_budget_disbursement){
					if(row.financial_year == frm.doc.monitoring_year){
						counter = 0
						frappe.throw("Financial year already exists")
						
					}
				}
				var child = frm.add_child("total_budget_disbursement")
				$.ajax({
					success:function(){
						$('[id="page-Climate Finance Monitoring Information"] [data-fieldname="total_budget_disbursement"] [class="row-check sortable-handle col"]').css("display","none")
					}
				})
				child.financial_year = frm.doc.monitoring_year
				frm.refresh_field("total_budget_disbursement")
				
			}
			else{
				counter = 0
				counter += 1
				
				for (var row of frm.doc.total_budget_disbursement){
					if(row.financial_year == frm.doc.monitoring_year){
						frappe.throw("Financial year already exists")
					}
				}
				
				cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.financial_year = frm.doc.monitoring_year;
				// var child = frm.add_child("total_budget_disbursement")
				$.ajax({
					success:function(){
						$('[id="page-Climate Finance Monitoring Information"] [data-fieldname="total_budget_disbursement"] [class="row-check sortable-handle col"]').css("display","none")
					}
				})
				// child.financial_year = frm.doc.monitoring_year
				frm.refresh_field("total_budget_disbursement")
			}
		}
		 
	}
});


frappe.ui.form.on('Climate Monitoring Information Budget Expenditure ChildTable', {
	q1:function(frm,cdt,cdn){
		var child = locals[cdt][cdn]
		if(child.q1 != 0){		
			frappe.model.set_value(cdt, cdn, "total", total_function(child));
			frm.refresh_fields("total")
			var q1_total=0;
			var flag = false
			for(var i in frm.doc.budget_expenditure){
				if (frm.doc.budget_expenditure[i].q1 == 0){
					flag = true
				}
				q1_total += parseFloat(frm.doc.budget_expenditure[i].q1);	
			}
			if(cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q1 != 0){
				cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q1 =q1_total
				frm.refresh_field("total_budget_disbursement")
			}
			
			var total=0;
			for(var i in frm.doc.budget_expenditure){
				total += parseFloat(frm.doc.budget_expenditure[i].total);	
			}
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.total_disbursement_usd =total
			frm.refresh_field("total_budget_disbursement")
		}
	},

	q2:function(frm,cdt,cdn){
		var child = locals[cdt][cdn]
		if(child.q2 != 0){
			frappe.model.set_value(cdt, cdn, "total", total_function(child));
			frm.refresh_fields("total")
			var q2_total=0;
			for(var i in frm.doc.budget_expenditure){
				q2_total += parseFloat(frm.doc.budget_expenditure[i].q2);	
			}
			if(cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q2 != 0){
				cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q2 =q2_total
				frm.refresh_field("total_budget_disbursement")
			}
			var total=0;
			for(var i in frm.doc.budget_expenditure){
				total += parseFloat(frm.doc.budget_expenditure[i].total);	
			}
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.total_disbursement_usd =total
			frm.refresh_field("total_budget_disbursement")
		}
	},

	q3:function(frm,cdt,cdn){
		var child = locals[cdt][cdn]
		if(child.q3 != 0){
			frappe.model.set_value(cdt, cdn, "total", total_function(child));
			frm.refresh_fields("total")
			var q3_total=0;
			for(var i in frm.doc.budget_expenditure){
				q3_total += parseFloat(frm.doc.budget_expenditure[i].q3);	
			}
			if(cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q3 != 0){
				cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q3 =q3_total
				frm.refresh_field("total_budget_disbursement")
			}
				var total=0;
			for(var i in frm.doc.budget_expenditure){
				total += parseFloat(frm.doc.budget_expenditure[i].total);	
			}
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.total_disbursement_usd =total
			frm.refresh_field("total_budget_disbursement")
		}
	},
	q4:function(frm,cdt,cdn){
		var child = locals[cdt][cdn]
		if(child.q4 != 0){
			frappe.model.set_value(cdt, cdn, "total", total_function(child));
			frm.refresh_fields("total")
			var q4_total=0;
			for(var i in frm.doc.budget_expenditure){
				q4_total += parseFloat(frm.doc.budget_expenditure[i].q4);	
			}
			if(cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q4 != 0){
				cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q4 =q4_total
				frm.refresh_field("total_budget_disbursement")
			
			}	var total=0;
			for(var i in frm.doc.budget_expenditure){
				total += parseFloat(frm.doc.budget_expenditure[i].total);	
			}
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.total_disbursement_usd =total
			frm.refresh_field("total_budget_disbursement")
		}
	},
	total:function(frm,cdt,cdn){
		var child = locals[cdt][cdn]
		if((total_function(child)) != child.total){
			frappe.model.set_value(cdt, cdn, "q1", "");
			frm.refresh_fields("q1")
			frappe.model.set_value(cdt, cdn, "q2", "");
			frm.refresh_fields("q2")
			frappe.model.set_value(cdt, cdn, "q3", "");
			frm.refresh_fields("q3")
			frappe.model.set_value(cdt, cdn, "q4", "");
			frm.refresh_fields("q4")
			
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q1 =child.q1
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q2 =child.q2
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q3 =child.q3
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.q4 =child.q4
			var total=0;
			for(var i in frm.doc.budget_expenditure){
				total += parseFloat(frm.doc.budget_expenditure[i].total);	
			}
			cur_frm.get_field("total_budget_disbursement").grid.grid_rows[`${cur_frm.get_field("total_budget_disbursement").grid.grid_rows.length}` - 1].doc.total_disbursement_usd =total
			frm.refresh_field("total_budget_disbursement")
		}
		
	},
	budget_expenditure_add:function(frm){
		var category_list=[]
		for(var i of frm.doc.budget_expenditure){
			category_list.push(i.disbursement_category)
		}
		frm.set_query("disbursement_category","budget_expenditure",function(){
			return {
				filters:{
				"disbursement_category":["not in",category_list]
				}
			}
		})
		frm.refresh_fields("disbursement_category")
	}
	
	
});
function total_function(child){
	var total = 0
	if (child.q1){
		total = total + child.q1
	}
	if (child.q2){
		total = total + child.q2
	}
	if (child.q3){
		total = total + child.q3
	}
	if (child.q4){
		total = total + child.q4
	}
	return total.toFixed(2)
}