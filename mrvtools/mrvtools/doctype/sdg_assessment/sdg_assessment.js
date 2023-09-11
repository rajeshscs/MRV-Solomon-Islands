// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt
var categories=[]
var html_output= ""
var form_data = {}
var else_category=[]
var json_code=[]
frappe.ui.form.on('SDG Assessment', {
	refresh:function(frm){
		$('[data-fieldtype="Check"]').children().css({"box-shadow":"rgba(0, 0, 0, 0.1) 0px 4px 4px 0px","border-radius":"5px","background": "#f2f2f2","color": "black","text-align": "center","width": "100%","display": "flex","justify-content": "center","cursor": "pointer","height": "35px","border-color": "#cabfb6","align-items": "center"});
		$('[class="input-area"]').css({"margin":"0px 0px 0px 10px"});
		$('[class="checkbox"]').children().css("cursor","pointer")
		$('[class="label-area"]').css({"width":"220px","padding":"8px","margin-left":"-14px","font-size": "14px"});
		$('[class="help-box small text-muted"]').css("margin","0px");
		if(!frm.doc.json){
			frm.call({
				doc:frm.doc,
				method:"getValues",
				async:false,
				
				callback: function(r){
					var valueList = r.message
					var json_code={"qualitative":[],"quantitative":[]}
					for(let i of valueList){
						
						if (i.table == "Qualitative"){
							json_code["qualitative"].push({"category":i.impact_area,"question":i.indicator,"likelihood":"","impact":"","sdg_mapping":i.sdg_mapping,"table":i.table});
						}
						if (i.table == "Quantitative"){
							json_code["quantitative"].push({"category":i.impact_area,"question":i.indicator,"data":0,"data_source":"","sdg_mapping":i.sdg_mapping,"table":i.table});
						}
					}
					frm.set_value("json", JSON.stringify(json_code))
					frm.refresh_field("json")
				}
			})
		}

		frm.call({
			doc:frm.doc,
			async:false,
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
		});

		frappe.db.get_list('SDG Assessment', {
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
		
	},

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
	},
	
	load_categories: function(frm){	
		var existing_json = JSON.parse(frm.doc.json)
		for (var row of cur_frm.doc.qualitative_impact){
			for (var i of existing_json.qualitative){
				if (i.question == row.question){
					i.likelihood = row.likelihood
					i.impact = row.impact
					i.sdg_mapping = row.sdg_mapping
				}
			}
		}
		for (var row of cur_frm.doc.quantitative_impact){
			for (var i of existing_json.quantitative){
				if (i.question == row.question){
					i.data = row.data
					i.data_source = row.data_source,
					i.sdg_mapping = row.sdg_mapping
				}
			}
		}
		frm.set_value("json", JSON.stringify(existing_json))
		var checkedList = []
		var result=frm.call({
			doc:frm.doc,
			method:'categorylist',
			async:false,
			callback: function(r)
			{	
				frm.set_value("qualitative_impact",[]);
				frm.set_value("quantitative_impact",[]);	
				$("[type='checkbox']").each(function(){
					var field_name = $(this).attr('data-fieldname');
					var value = $(this).prop("checked");
					// if($(this).prop("checked")){
						if (Array.isArray(form_data[field_name])) {
							form_data[field_name].push(value);
						} else {
							form_data[field_name] = value;
						}
					// }
				});
				console.log(form_data);
				for(var i of JSON.parse(frm.doc.json).qualitative){
					
					for(let [key,value] of Object.entries(form_data)){
						
						if(value ==true){
							
							if (key == (i.category.replaceAll(" ","_")).toLowerCase()){
								
								if (!checkedList.includes(i.category)){
									
									checkedList.push(i.category)
								}
							}
						}
					}
				}
				
				if(cur_frm.doc.qualitative_impact.length == 0){
					for(let [key,value] of  Object.entries(form_data)){	
						if(value ==true){
							for(var i of JSON.parse(frm.doc.json).qualitative){
								if (key == (i.category.replaceAll(" ","_")).toLowerCase()){
									if (i.table == "Qualitative"){
										let row = frm.add_child('qualitative_impact')
										row.category= i.category,
										row.question= i.question,
										row.likelihood = i.likelihood,
										row.impact = i.impact,
										row.sdg_mapping = i.sdg_mapping
										categories.push(i.category)
										frm.refresh_field('qualitative_impact');
									}
								}	
							}
							for(var i of JSON.parse(frm.doc.json).quantitative){
								if (key == (i.category.replaceAll(" ","_")).toLowerCase()){
									if (i.table == "Quantitative"){
										let row = frm.add_child('quantitative_impact')
												row.category= i.category,
												row.question= i.question,
												row.data = i.data,
												row.data_source = i.data_source,
												row.sdg_mapping = i.sdg_mapping
										frm.refresh_field('quantitative_impact');
									}
								}
							}
							categories=[...new Set(categories)]
						}
					}
				}
				else{
					for (var i of  JSON.parse(frm.doc.json)){
					
						if (!categories.includes(i.category) && form_data[`${i.category}`]){
							else_category.push(i.category)
							
							if (i.table == "Qualitative"){
								let row = frm.add_child('qualitative_impact')
									row.category= i.category,
									row.question= i.question,
									row.likelihood = i.likelihood,
									row.impact = i.impact,
									row.sdg_mapping = i.sdg_mapping
								frm.refresh_field('qualitative_impact');
							}
							if (i.table == "Quantitative"){
								let row = frm.add_child('quantitative_impact')
										row.category= i.category,
										row.question= i.question,
										row.data = i.data,
										row.data_source = i.data_source,
										row.sdg_mapping = i.sdg_mapping
								frm.refresh_field('quantitative_impact');
							}
						}
					}
					categories = categories.concat(else_category)
					categories=[...new Set(categories)]
				}
				frm.refresh_field('qualitative_impact');				
				
				// if($('[class="modal-dialog"]')){
					
				// 	var checklist = function checklist(){
						
				// 			// d.set_value(`${frm.doc.qualitative_impact[i].category}`,"1")
							
				// 		$.ajax({
				// 			success:function(){
				// 				for (let i in frm.doc.qualitative_impact){
				// 					if($(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`)){
				// 						$(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`).prop("checked",true)
				// 					}
				// 					else{
				// 						$(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`).prop("checked",false)
				// 					}
				// 				}
				// 			}
							
				// 		})
				// 	}
				// }
				// checklist()
			}
		});
		
		
	},
	before_save:function(frm){
		var existing_json = JSON.parse(frm.doc.json)
		for (var row of cur_frm.doc.qualitative_impact){
			for (var i of existing_json.qualitative){
				if (i.question == row.question){
					i.likelihood = row.likelihood
					i.impact = row.impact
					i.sdg_mapping = row.sdg_mapping
				}
			}
		}
		for (var row of cur_frm.doc.quantitative_impact){
			for (var i of existing_json.quantitative){
				if (i.question == row.question){
					i.data = row.data
					i.data_source = row.data_source
					i.sdg_mapping = row.sdg_mapping
				}
			}
		}
		frm.set_value("json", JSON.stringify(existing_json))
		frm.refresh_field("json")
	}
})