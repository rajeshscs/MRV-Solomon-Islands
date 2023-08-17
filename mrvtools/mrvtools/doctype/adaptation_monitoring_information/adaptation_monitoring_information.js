// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Adaptation Monitoring Information', {
	
	refresh: function(frm){
		
		$.ajax({
			success:function(){
				$('[id="page-Adaptation Monitoring Information"] [class="grid-buttons"]').css("display","none")
				$('[id="page-Adaptation Monitoring Information"]').find($('[class="row-check sortable-handle col"]')).css("display","none")
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
				var json_field=JSON.parse(r.message).quantitative
				console.log(JSON.parse(r.message).quantitative);
				frm.set_value("json",JSON.stringify(json_field))
				frm.refresh_field("json")
				frm.set_value("quantitative_impact",[])
				for (var i of JSON.parse(frm.doc.json)){
					if (!i.expected_value == 0){
						var child=frm.add_child("quantitative_impact")
						child.category = i.category
						child.question = i.question
						child.expected_value = i.expected_value
					}
					frm.refresh_field("quantitative_impact")
				}
			}
		})
		$.ajax({
			success:function(){
				$('[id="page-Adaptation Monitoring Information"] [class="row-check sortable-handle col"]').css("display","none")
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
