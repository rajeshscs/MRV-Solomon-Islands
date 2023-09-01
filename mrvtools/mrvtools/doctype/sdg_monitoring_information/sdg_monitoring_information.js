// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt
var userList = []
frappe.ui.form.on('SDG Monitoring Information', {
	refresh: function(frm){

		$.ajax({
			success:function(){
				$('[id="page-SDG Monitoring Information"] [class="grid-buttons"]').css("display","none")
				$('[id="page-SDG Monitoring Information"] [class="row-check sortable-handle col"]').css("display","none")
			}
		})
		frm.call({
		  doc:frm.doc,
		  method:'get_user',
		  callback: function(r){
			
			
			for (var i of r.message){
			  userList.push(i[0])
			}
			frm.set_query("select_approver",function(){
			  return {
				filters:{
				  email:['in',userList]
				}
			  }
			})
		  }
		})
		frm.set_query("project_name1",function(){
			return{
				filters:{
					workflow_state:"Approved"
				}
			}
		})
	},
	project_name: function(frm) {
		frm.call({
			doc:cur_frm.doc,
			method:"get_json",
			async:false,
			callback:function(r){
				console.log(r.message);
				var json_field=JSON.parse(r.message).quantitative
				console.log(json_field);
				// console.log(JSON.parse(r.message).quantitative);
				frm.set_value("json",JSON.stringify(json_field))
				frm.refresh_field("json")
				frm.set_value("quantitative_impact",[])
				for (var i of JSON.parse(frm.doc.json)){
					if (!i.data == 0){
						var child=frm.add_child("quantitative_impact")
						child.category = i.category
						child.question = i.question
						child.sdg_mapping = i.sdg_mapping
					}
					frm.refresh_field("quantitative_impact")
				}
			}
		})
		$.ajax({
			success:function(){
				$('[id="page-SDG Monitoring Information"] [class="row-check sortable-handle col"]').css("display","none")
			}
		})

		frm.call({
			doc:cur_frm.doc,
			method:"get_years",
			async:false,
			args:{
				name:frm.doc.project_name
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
