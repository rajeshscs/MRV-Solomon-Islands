var categories=[]
var html_output= ""
var form_data = {}
var else_category=[]
var json_code=[]
frappe.ui.form.on('Adaptation', {
	refresh: function(frm){
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
							json_code["qualitative"].push({"category":i.impact_area,"question":i.indicator,"likelihood":"","impact":"","table":i.table});
						}
						if (i.table == "Quantitative"){
							json_code["quantitative"].push({"category":i.impact_area,"question":i.indicator,"data":0,"data_source":"","table":i.table});

						}
					}
					frm.set_value("json", JSON.stringify(json_code))
					frm.refresh_field("json")
				}
			
			})
		}


		frappe.db.get_list('Adaptation', {
			fields: ['project_name'],
			pluck:'project_name'
		}).then(r => {
			frm.set_query("project_name",function(){
				console.log(r);
				return{
					filters:{
						objective: ['in',['Cross-Cutting','Adaptation']],
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
			frm.set_query("select_approver",function(){
			  return {
				filters:{
				  email:['in',userList]
				}
			  }
			})
		  }
		});
		
	},

	// refresh: function(frm) {
	// 	frappe.call({
	// 		doc:frm.doc,
	// 		method:"getValues",
	// 		async:false,
	// 		callback: function(r){
	// 		var valueList = r.message
	// 		if (frm.doc.quantitative_impact.length == 0){
	// 			for (var i in valueList){
	// 				if (valueList[i].table == "Qualitative"){
	// 					let row = frm.add_child('qualitative_impact', {
	// 						category: valueList[i].impact_area,
	// 						question: valueList[i].indicator
	// 					});
	// 					frm.refresh_field('qualitative_impact');
	// 					// frm.fields_dict['qualitative_impact'].df.hidden = 1
	// 				}
	// 					if (valueList[i].table == "Quantitative"){
	// 						let row = frm.add_child('quantitative_impact', {
	// 							category: valueList[i].impact_area,
	// 							question: valueList[i].indicator
	// 						});
	// 						frm.refresh_field('quantitative_impact');
	// 						// frm.fields_dict['quantitative_impact'].df.hidden = 1
	// 					}
	// 				}
	// 			}
	// 		}
	// 	});
	// },

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
		var checkedList = []
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
		var result=frm.call({
			doc:frm.doc,
			method:'categorylist',
			async:false,
			callback: function(r)
			{
				console.log(r.message);
				frm.set_value("qualitative_impact",[]);
				frm.set_value("quantitative_impact",[]);	
				$("[type='checkbox']").each(function(){
					var field_name = $(this).attr('data-fieldname');
					var value = $(this).prop("checked");
						if (Array.isArray(form_data[field_name])) {
							form_data[field_name].push(value);
						} else {
							form_data[field_name] = value;
						}
				});
				console.log("form_data","=",form_data);
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
						console.log(key,":",value);
						if(value ==true){
							for(var i of JSON.parse(frm.doc.json).qualitative){
								if (key == (i.category.replaceAll(" ","_")).toLowerCase()){
									if (i.table == "Qualitative"){
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
								if (key == (i.category.replaceAll(" ","_")).toLowerCase()){
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
});
