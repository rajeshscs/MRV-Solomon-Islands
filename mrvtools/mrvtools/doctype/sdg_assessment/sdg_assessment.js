// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt
var categories=[]
var html_output= ""
var form_data = {}
var else_category=[]
var json_code=[]
frappe.ui.form.on('SDG Assessment', {
	refresh:function(frm){
		if(!frm.doc.json){
			frm.call({
				doc:frm.doc,
				method:"getValues",
				async:false,
				
				callback: function(r){
					var valueList = r.message
					for(let i in valueList){
						
						if (valueList[i].table == "Qualitative"){
							let row = frm.add_child('qualitative_impact', {
								category: valueList[i].impact_area,
								question: valueList[i].indicator
							});
							frm.refresh_field('qualitative_impact');
						}
						if (valueList[i].table == "Quantitative"){
							let row = frm.add_child('quantitative_impact', {
								category: valueList[i].impact_area,
								question: valueList[i].indicator
							});
							frm.refresh_field('quantitative_impact');
						}
					}
					var json_code={"qualitative":[],"quantitative":[]}
					for(var i of frm.doc.qualitative_impact){
						
						json_code["qualitative"].push({"category":i.category,"question":i.question,"likelihood":i.likelihood,"impact":i.impact,"table":i.parentfield});
						
					}
					for(var i of frm.doc.quantitative_impact){
						
						json_code["quantitative"].push({"category":i.category,"question":i.question,"expected_value":i.expected_value,"data_source":i.data_source,"table":i.parentfield});
						
					}
					frm.set_value("json", JSON.stringify(json_code))
					frm.refresh_field("json")
					frm.set_value("qualitative_impact",[])
					frm.set_value("quantitative_impact",[])
	
	
					
				// 	// if (frm.doc.json != null) {
				// 	// 	var json_code = JSON.parse(frm.doc.json);
				// 	// };
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
			  frm.set_query("select_approver",function(){
				return {
				  filters:{
					email:['in',userList]
				  }
				}
			  })
			}
		});
		frm.set_query("project_name",function(){
			return{
				filters:{
					workflow_state:"Approved"
				}
			}
		});
		
	},
	load_categories: function(frm){
		
			
		var checkedList = []
		var result=frm.call({
			doc:frm.doc,
			method:'categorylist',
			async:false,
			callback: function(r)
			{	
				
				let d = new frappe.ui.Dialog({
					title: "Select Category",
					fields:	[
						{
							fieldtype:"HTML",
							fieldname:'html_code',
						}
					],
					primary_action_label: "Add",
					primary_action(values){
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
								for(var i of JSON.parse(frm.doc.json).qualitative){
									
									for(let [key,value] of Object.entries(form_data)){
										
										if(value ==true){
											
											if (key == i.category){
												
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
												if (key == i.category){
													if (i.table == "qualitative_impact"){
														let row = frm.add_child('qualitative_impact')
														// if(!j.category == i.category){
															row.category= i.category,
															row.question= i.question,
															row.likelihood = i.likelihood,
															row.impact = i.impact
														// }
														
														categories.push(i.category)
														frm.refresh_field('qualitative_impact');
													}
												}	
											}
											// frm.fields_dict['qualitative_impact'].df.hidden = 1
											for(var i of JSON.parse(frm.doc.json).quantitative){
												if (key == i.category){
													if (i.table == "quantitative_impact"){
														let row = frm.add_child('quantitative_impact')
															// if(!j.category == i.category){
																row.category= i.category,
																row.question= i.question,
																row.expected_value = i.expected_value,
																row.data_source = i.data_source
															// }
														frm.refresh_field('quantitative_impact');
														// frm.fields_dict['quantitative_impact'].df.hidden = 1
													}
												}
											}
										
										categories=[...new Set(categories)]
										
											
										}
										
										
										
					
									}
								}
								else{
									for (var i of  JSON.parse(frm.doc.json)){
										// if($(`[data-fieldname="${j.category}"]`).prop("checked")){
										
											
											if (!categories.includes(i.category) && form_data[`${i.category}`]){
												else_category.push(i.category)
												
												if (i.table == "qualitative_impact"){
													let row = frm.add_child('qualitative_impact')
													// if(!j.category == i.category){
														row.category= i.category,
														row.question= i.question,
														row.likelihood = i.likelihood,
														row.impact = i.impact
													// }
														
													
													frm.refresh_field('qualitative_impact');
													// frm.fields_dict['qualitative_impact'].df.hidden = 1
												}
												if (i.table == "Quantitative"){
													let row = frm.add_child('quantitative_impact')
														// if(!j.category == i.category){
															row.category= i.category,
															row.question= i.question,
															row.expected_value = i.expected_value,
															row.data_source = i.data_source
														// }
													frm.refresh_field('quantitative_impact');
													// frm.fields_dict['quantitative_impact'].df.hidden = 1
												}
											}
											
											// for( var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
											// 	var name=row.doc.name
											// 	if (!form_data[`${i.category}`]){
											// 		$(`[data-name="${name}"]`).hide()
											// 	}
											// }

											
											
											
										
										// }
									}
									categories = categories.concat(else_category)
									categories=[...new Set(categories)]
								}	
								// cur_frm.fields_dict['qualitative_impact'].grid.grid_rows.forEach(function(row){
								// 	var categ = row.doc.category;

								// 	if(checkedList.includes(categ)){
								// 		row.$row.show();
								// 	}
								// 	else{
								// 		row.$row.hide();
								// 	}
								// })
								// if ($(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`).prop("checked")){							
								// 	cur_frm.fields_dict["qualitative_impact"].grid.get_field('category').get_query = function(frm,cdt,cdn){
								// 		var a = locals[cdt][cdn]
								// 		if(checkedList.includes(a.category)){
								// 			a.__hidden = 0
								// 		}
								// 		else{
								// 			a.__hidden = 1
								// 		}
								// 	}
								// 	frm.refresh_field("qualitative_impact")
								// }
							
						
						frm.refresh_field('qualitative_impact');
						
						d.hide()
						
					},
					
					
				})
				var count = 1
				html_output = '<table>'
				for(var i of r.message){
					// if (i % 5 ==0){
					// 	html_output += 
					// }
					if(count % 2 != 0){
						html_output += '<tr>'
					}
					html_output+='<td style="padding:7px">'
					html_output+='<div class="form-group frappe-control input-max-width" data-fieldtype="Check" data-fieldname="Food Security">'
					html_output+='<div class="checkbox" style="border: 1px solid #f2f2f2; border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px; background: #f2f2f2; color: black; text-align: center; width: 100%; display: flex; justify-content: center; cursor: pointer; height: 35px; align-items: center;">'
					html_output+='<label style="cursor: pointer;">'
					html_output+=`<span class="input-area" style="margin: 0px 0px 0px 10px;"><input type="checkbox" autocomplete="off" class="input-with-feedback" data-fieldtype="Check" data-fieldname="${i}" placeholder=""></span>`
					html_output+='<span class="disp-area" style="display: none;"><input type="checkbox"></span>'
					html_output+=`<span class="label-area" style="width: 220px; padding: 8px; margin-left: -14px; font-size: 13px;">${i}</span>`
					html_output+='<span class="ml-1 help"></span></label>'
					html_output+='<p class="help-box small text-muted" style="cursor: pointer; margin: 0px;"></p></div></div>'
					html_output += '</td>'
					if(count % 2 == 0){
						html_output += '</tr>'
					}
					count += 1
				}
				html_output += '</table>'
				d.$wrapper.find('div[data-fieldname="html_code"]').append(html_output);
				if($('[class="modal-dialog"]')){
					
					var checklist = function checklist(){
						
							// d.set_value(`${frm.doc.qualitative_impact[i].category}`,"1")
							
						$.ajax({
							success:function(){
								for (let i in frm.doc.qualitative_impact){
									if($(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`)){
										$(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`).prop("checked",true)
									}
									else{
										$(`[data-fieldname="${frm.doc.qualitative_impact[i].category}"]`).prop("checked",false)
									}
								}
							}
							
						})
					}
				}
				checklist()
				d.show()
				// $.ajax({
				// 	success:function(){
						
				// 		// $('[class="checkbox"]').click(
				// 		// 	function(){
	
				// 		// 	$('[class="checkbox"]').css({"border":"2px solid black"})
								
				// 		// 	},
				// 		// 	function(){
				// 		// 		$('[class="checkbox"]').css("border","none")
				// 		// 	}
				// 		// );
				// 		$('[data-fieldtype="Check"]').children().css({"border":"1px solid #f2f2f2","border-radius":"5px","box-shadow":"0 4px 4px 0 rgba(0,0,0,0.1)","background": "#f2f2f2","color": "black","text-align": "center","width": "100%","display": "flex","justify-content": "center","cursor": "pointer","height": "35px","border-color": "#cabfb6","align-items": "center"});
				// 		for(var values of categories){
				// 			$(`[data-fieldname="${values}"]`).hover(function(){$(`[data-fieldname="${values}"]`).children().css("box-shadow","0 4px 4px 0 rgba(0,0,0,0.2)")},function(){$(`[data-fieldname="${values}"]`).children().css("box-shadow","0 4px 4px 0 rgba(0,0,0,0.1)")})
				// 		}
						
				// 		// $('[data-fieldtype="Check"]').children().hover(function(){$('[data-fieldtype="Check"]').children().css("box-shadow","0 4px 4px 0 rgba(0,0,0,0.1)")})
				// 		$('[class="input-area"]').css({"margin":"0px 0px 0px 10px"});
				// 		$('[class="checkbox"]').children().css("cursor","pointer")
				// 		$('[class="label-area"]').css({"width":"220px","padding":"8px","margin-left":"-14px","font-size": "13px"});
				// 		$('[class="help-box small text-muted"]').css("margin","0px");
				// 		// $('[data-fieldtype="Check"]').children().on("click",function(){
				// 		// 	$('[data-fieldtype="Check"]').children().toggle(function(){
				// 		// 		$(this).css("border","1px solid black")
				// 		// 		$('[data-fieldtype="Check"]').children().css("border","none")
				// 		// 		// for (let row in d.fields_dict){
				// 		// 		// 	if(d.fields_dict[row].value==1){
				// 		// 		// 		$(this).css("border","1px solid black")
				// 		// 		// 	}
				// 		// 		// 	// else if(d.fields_dict[row].value==0){
				// 		// 		// 	// 	$(this).css("border","none")
				// 		// 		// 	// }
				// 		// 		// }
				// 		// 	},
				// 		// 	// function(){
				// 		// 	// 	$('[data-fieldtype="Check"]').children().css("border","none")
									
				// 		// 	// }
				// 		// 	)
				// 		// });
				// 	}
				// })
				// $(document).ready(function(){
				// 	$('[data-fieldtype="Check"]').children().on("click",function(){
				// 		for (let row in d.fields_dict){
				// 			if(d.fields_dict[row].value==1){
				// 				$(this).css("border","1px solid black")
				// 			}
				// 			// else{
				// 			// 	$(this).css("border","none")
				// 			// }
				// 		}
				// 	});
					
				// })
			}
		});
		var existing_json = JSON.parse(frm.doc.json)
		for (var row of cur_frm.doc.qualitative_impact){
			for (var i of existing_json.qualitative){
				if (i.question == row.question){
					i.likelihood = row.likelihood
					i.impact = row.impact
				}
			}
		}
		for (var row of cur_frm.doc.quantitative_impact){
			for (var i of existing_json.quantitative){
				if (i.question == row.question){
					i.expected_value = row.expected_value
					i.data_source = row.data_source
				}
			}
		}
		frm.set_value("json", JSON.stringify(existing_json))
		
	},
	before_save:function(frm){
		var existing_json = JSON.parse(frm.doc.json)
		for (var row of cur_frm.doc.qualitative_impact){
			for (var i of existing_json.qualitative){
				if (i.question == row.question){
					i.likelihood = row.likelihood
					i.impact = row.impact
				}
			}
		}
		for (var row of cur_frm.doc.quantitative_impact){
			for (var i of existing_json.quantitative){
				if (i.question == row.question){
					i.expected_value = row.expected_value
					i.data_source = row.data_source
				}
			}
		}
		frm.set_value("json", JSON.stringify(existing_json))
		frm.refresh_field("json")
	}
})
// 	frm.fields_dict['qualitative_impact'].df.hidden = 1;
// 	frm.refresh_field('qualitative_impact');
// 	frm.fields_dict['quantitative_impact'].df.hidden = 1
// 	frm.refresh_field('quantitative_impact');
// 	},
	
// 	category : function(frm){
// 		for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
// 			var name = row.doc.name
// 			$(`[data-name="${name}"]`).css("display","block")
// 		}
// 		for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
// 			var name = row.doc.name
// 			$(`[data-name="${name}"]`).css("display","block")
// 		}

// 		var categoryList = []
// 		var fullCategoryList = []


// 		for(var i in frm.doc.category){
// 			categoryList.push(frm.doc.category[i].category)
// 		}

// 		frappe.call({
// 			doc:frm.doc,
// 			method: "getFullCategoryList",
// 			async:false,
// 			callback:function(r){
// 			for (i of r.message){
// 				fullCategoryList.push(i)
// 			}
// 		}
// 		});

// 		// frm.call('getFullCategoryList').then(r =>{
// 		// 	fullCategoryList = r.message
// 		// }
// 		// );


// 		var finalCategoryList = fullCategoryList.filter(function(category) {
// 			return !categoryList.includes(category);
// 		  });


// 		// let check_list = ["poverty_reduction_check","reducing_inequality_check","gender_pairity_check"]
// 		// let unchecked_category_list = []
// 		// for (let i of check_list){
// 		// 	if(frm.doc[i] != 1){
// 		// 		let cur_category = i.split("_");
// 		// 		cur_category.pop()
// 		// 		cur_category = cur_category.join(" ")
// 		// 		cur_category = toTitleCase(cur_category)
// 		// 		unchecked_category_list.push(cur_category)
// 		// 	}
// 		// }
// 		for (let category of finalCategoryList){
// 			filter_child_tables(category)
// 		}
// 		function filter_child_tables(category){
// 			for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
// 						if (row.doc.category == category){
// 							var name = row.doc.name
// 							$(`[data-name="${name}"]`).css("display","none")
// 						}
// 						// else{
// 						// 	$(`[data-name="${name}"]`).css("display","block")
// 						// }
// 					}
// 					// frm.refresh_field("qualitative_impact")

// 			for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
// 						if (row.doc.category == category){
// 							var name = row.doc.name
// 							$(`[data-name="${name}"]`).css("display","none")
// 						}
// 						// else{
// 						// 	$(`[data-name="${name}"]`).css("display","block")
// 						// }
// 					}
// 					// frm.refresh_field("quantitative_impact")
// 				}
		
// 		// //POVERTY REDUCTION
// 		// if (frm.doc.poverty_reduction_check == 1){
// 		// 	var table = frm.doc.qualitative_impact
// 		// 	for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
// 		// 		if (row.doc.category != "Poverty Reduction"){
// 		// 			var name = row.doc.name
// 		// 			$(`[data-name="${name}"]`).css("display","none")
// 		// 		}else{
// 		// 			$(`[data-name="${name}"]`).css("display","block")
// 		// 		}
// 		// 	}
// 		// 	frm.refresh_field("quantitative_impact")

// 		// 	for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
// 		// 		if (row.doc.category != "Poverty Reduction"){
// 		// 			var name = row.doc.name
// 		// 			$(`[data-name="${name}"]`).css("display","none")
// 		// 		}else{
// 		// 			$(`[data-name="${name}"]`).css("display","block")
// 		// 		}
// 		// 	}
// 		// 	frm.refresh_field("quantitative_impact")
// 		// }

// 		// //GENDER PAIRITY
// 		// if (frm.doc.gender_pairity_check == 1){
// 		// 	var table = frm.doc.qualitative_impact
// 		// 	for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
// 		// 		if (row.doc.category != "Gender Pairity"){
// 		// 			var name = row.doc.name
// 		// 			$(`[data-name="${name}"]`).css("display","none")
// 		// 		}else{
// 		// 			$(`[data-name="${name}"]`).css("display","block")
// 		// 		}
// 		// 	}
// 		// 	frm.refresh_field("quantitative_impact")
			
// 		// 	for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
// 		// 		if (row.doc.category != "Gender Pairity"){
// 		// 			var name = row.doc.name
// 		// 			$(`[data-name="${name}"]`).css("display","none")
// 		// 		}else{
// 		// 			$(`[data-name="${name}"]`).css("display","block")
// 		// 		}
// 		// 	}
// 		// 	frm.refresh_field("quantitative_impact")
// 		// }

// 		// //REDUCING INEQUALITY
// 		// if (frm.doc.reducing_inequality_check == 1){
// 		// 	var table = frm.doc.qualitative_impact
// 		// 	for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
// 		// 		if (row.doc.category != "Reducing Inequality"){
// 		// 			var name = row.doc.name
// 		// 			$(`[data-name="${name}"]`).css("display","none")
// 		// 		}else{
// 		// 			$(`[data-name="${name}"]`).css("display","block")
// 		// 		}
// 		// 	}
// 		// 	frm.refresh_field("quantitative_impact")
			
// 		// 	for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
// 		// 		if (row.doc.category != "Reducing Inequality"){
// 		// 			var name = row.doc.name
// 		// 			$(`[data-name="${name}"]`).css("display","none")
// 		// 		}else{
// 		// 			$(`[data-name="${name}"]`).css("display","block")
// 		// 		}
// 		// 	}
// 		// 	frm.refresh_field("quantitative_impact")
// 		// }
		
// 		// frm.refresh_field('qualitative_impact');
// 		// frm.refresh_field('quantitative_impact');
// 		if (frm.fields_dict['qualitative_impact'].df.hidden == 1 && finalCategoryList.length < fullCategoryList.length){
// 			frm.fields_dict['qualitative_impact'].df.hidden = 0
// 			frm.refresh_field('qualitative_impact');
// 			frm.fields_dict['quantitative_impact'].df.hidden = 0
// 			frm.refresh_field('quantitative_impact');
// 		}
// 		else{
// 		}
// 		if(frm.doc.category == ''){
// 			frm.fields_dict['qualitative_impact'].df.hidden = 1
// 			frm.refresh_field('qualitative_impact');
// 			frm.fields_dict['quantitative_impact'].df.hidden = 1
// 			frm.refresh_field('quantitative_impact');
// 		}
// 	}
// });
// function toTitleCase(str) {
// 	return str.replace(
// 	  /\w\S*/g,
// 	  function(txt) {
// 		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 	  }
// 	); 
//   }