var categories=[]
var form_data = {}
var else_category=[]
var json_code=[]
var html_output = ""
var html_head =""
html_head += "<head><style>table, th, tr, td {border: 1px solid;}</style></head>"
html_head += "<table style='table-layout: fixed;width: 100%;' id=html_table class='table table-bordered'>"
html_head += "<tr><th scope=col>Table Name</th><th scope=col>Category</th><th scope=col style='width:30%;justify-content: center;'>Questions</th><th scope=col>Field Name</th><th scope=col style='width:15%;'>Old Values</th><th scope=col style='width:15%;'>New Values</th></tr>"
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

		if(frm.doc.html_json){
			var existing_html_json = JSON.parse(frm.doc.html_json)
			var html_output =""
			console.log("For HTML Render:", existing_html_json);
			for(var i=0;i<existing_html_json.old.length;i++){
					if (existing_html_json.old[i].type == "qualitative"){ 
							if(existing_html_json.new[i].likelihood && (existing_html_json.new[i].likelihood != existing_html_json.old[i].likelihood)){
								html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Likelihood</td><td>${existing_html_json.old[i].likelihood}</td><td>${existing_html_json.new[i].likelihood}</td></tr>`
							}
							if(existing_html_json.new[i].impact && (existing_html_json.new[i].impact != existing_html_json.old[i].impact)){ 
								html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Impact</td><td>${existing_html_json.old[i].impact}</td><td>${existing_html_json.new[i].impact}</td></tr>`
							}
						
					}
					if (existing_html_json.old[i].type == "quantitative"){
							if(existing_html_json.new[i].data && (existing_html_json.new[i].data != existing_html_json.old[i].data)){
									html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Expected Value</td><td>${existing_html_json.old[i].data}</td><td>${existing_html_json.new[i].data}</td></tr>`
							}
							if(existing_html_json.new[i].data_source && (existing_html_json.new[i].data_source != existing_html_json.old[i].data_source)){ 
								html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Data Source</td><td>${existing_html_json.old[i].data_source}</td><td>${existing_html_json.new[i].data_source}</td></tr>`
							}
						
					}
				
			}
			frm.fields_dict.html_table.$wrapper.html(html_head + html_output + "</table>")
			frm.refresh_field("html_table")
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
						work_state:"Approved",
						name:['not in',r]
					}
				}
			})
		})

		if (frm.doc.workflow_state == "Rejected"){
			frm.set_value("edited_project_details",[])
			frm.fields_dict.html_table.$wrapper.html("")
			frm.refresh_field("html_table")
			frm.set_value('work_state','Approved')
			frm.set_value("workflow_state","Approved")
		}

		if (frm.doc.workflow_state == "Approved"){
			for (var i of frm.doc.edited_project_details){
				console.log("Field Name of i","=",i.field_name);
				if(i.field_name != "ndp_cov"){
					frm.set_value(i.field_name,i.new_values)
				}
				
				
				
			}
			frm.set_value("edited_project_details",[])
			frm.set_value('work_state','Approved')


			var checkedList = []
			if(frm.doc.html_json){
				var existing_json = JSON.parse(frm.doc.json)
				var existing_json1 = JSON.parse(frm.doc.html_json)
				for (var row of existing_json1.new){
					if(row.type == "qualitative"){
						for (var i of existing_json.qualitative){
							if (i.question == row.question){
								i.likelihood = row.likelihood
								i.impact = row.impact
								i.sdg_mapping = row.sdg_mapping
							}
						}
					}
				}
				for (var row of existing_json1.new){
					if(row.type == "quantitative"){
						for (var i of existing_json.quantitative){
							if (i.question == row.question){
								i.data = row.data
								i.data_source = row.data_source
								i.sdg_mapping = row.sdg_mapping
							}
						}
					}
				}
				frm.set_value("json", JSON.stringify(existing_json))
				frm.refresh_field("json")

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
													row.category= i.category,
													row.question= i.question,
													row.likelihood = i.likelihood,
													row.impact = i.impact
												
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
														row.data_source = i.data_source
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
												row.impact = i.impact
												
											
											frm.refresh_field('qualitative_impact');
										}
										if (i.table == "Quantitative"){
											let row = frm.add_child('quantitative_impact')
													row.category= i.category,
													row.question= i.question,
													row.data = i.data,
													row.data_source = i.data_source
											frm.refresh_field('quantitative_impact');
										}
									}
							}
							categories = categories.concat(else_category)
							categories=[...new Set(categories)]
						}	
						frm.refresh_field('qualitative_impact');
						frm.refresh_field('quantitative_impact');
						
					}
				});
				frm.set_value("html_json",undefined)
				frm.refresh_field("html_json")
				frm.fields_dict.html_table.$wrapper.html("")
				frm.refresh_field("html_table")
			}
			frm.save()
			
		}

		if (frm.doc.workflow_state == "Approved" || frm.doc.__islocal){
			$('[id="sdg-assessment-tab1"]').addClass("active")
			$('[id="sdg-assessment-tab1-tab"]').hide()
			$('[id="sdg-assessment-tab2-tab"]').hide()
			console.log("HIII/...");
		}
		else{
			$('[id="sdg-assessment-tab1-tab"]').addClass("active")
			// $('[id="sdg-assessment-tab1-tab"]').attr('aria-selected', 'true');
			// $('[id="sdg-assessment-tab2-tab"]').removeClass("active")
			// $('[id="sdg-assessment-tab1-tab"]').show()
			// $('[id="sdg-assessment-tab2-tab"]').show()
			// $('[id="sdg-assessment-tab1"]').addClass("active")
			console.log("HELLLOOO...");
			
		}
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
			callback: function(r){	
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
		if (frm.doc.workflow_state != "Approved" && !frm.doc.__islocal){
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
						console.log("Field Name ", i.field_name);
						if (field_name_list.includes(i.field_name) ){
							if (i.field_name != "ndp_cov"){
								i.new_values = frm.doc[`${i.field_name}`]
								frm.set_value(i.field_name,i.old_values)
							}
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
							if (i != "ndp_cov"){
								console.log("i ",result[`${i}`] );
								console.log("j ",frm.doc[`${i}`]);
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								child.new_values = frm.doc[`${i}`]
								frm.set_value(i,result[`${i}`])
								console.log("Edited Table1 =  ",frm.doc.edited_project_details);
							}
						}
					}
				}
			})

			frm.call({
				doc:frm.doc,
				method:"get_jsons",
				async: false,
				callback:function(r){
					console.log(r.message);
					console.log(r.message[0]);
					console.log(r.message[1]);
					if (r.message[0].length != 0){
						if(frm.doc.html_json){
							var existing_html_json = JSON.parse(frm.doc.html_json)
							var new_questions_list=[]
							var old_questions_list=[]
							for (var i of existing_html_json.old){
								old_questions_list.push(i.question)
							}
							for (var i of existing_html_json.new){
								new_questions_list.push(i.question)
							}
							for (var row in r.message[0]){
								if (!old_questions_list.includes(r.message[0][row].question)){
									existing_html_json.old.push({"category":r.message[0][row].category,"question":r.message[0][row].question,"likelihood":r.message[0][row].likelihood,"impact":r.message[0][row].impact,"data":r.message[0][row].data,"data_source":r.message[0][row].data_source,"type":r.message[0][row].type});
									console.log("Existing Old 3 = ",existing_html_json.old);
								}
							}
							for (var row of r.message[1]){
								for (var i of existing_html_json.new){
									if (i.question == row.question && row.type == "qualitative"){
										i.likelihood = row.likelihood
										i.impact = row.impact
									}
									if (i.question == row.question && row.type == "quantitative"){
										i.data = row.data
										i.data_source = row.data_source
									}
									
								}
							}
							for (var row in r.message[1]){
								console.log("row.questions = ",r.message[0][row].question);
								if (!new_questions_list.includes(r.message[0][row].question)){
									existing_html_json.new.push({"category":r.message[1][row].category,"question":r.message[1][row].question,"likelihood":r.message[1][row].likelihood,"impact":r.message[1][row].impact,"data":r.message[1][row].data,"data_source":r.message[1][row].data_source,"type":r.message[1][row].type});
									console.log("Existing new 3 = ",existing_html_json.new);
								}
							}
							frm.set_value("html_json", JSON.stringify(existing_html_json))
							frm.refresh_field("html_json")
							console.log("Current JSON 1 = ",frm.doc.html_json);
							var html_output =""
							for(var i=0;i<existing_html_json.old.length;i++){
								if (existing_html_json.old[i].type == "qualitative"){ 
										if(existing_html_json.new[i].likelihood && (existing_html_json.new[i].likelihood != existing_html_json.old[i].likelihood)){
											html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Likelihood</td><td>${existing_html_json.old[i].likelihood}</td><td>${existing_html_json.new[i].likelihood}</td></tr>`
										}
										if(existing_html_json.new[i].impact && (existing_html_json.new[i].impact != existing_html_json.old[i].impact)){
											console.log("Hi"); 
											html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Impact</td><td>${existing_html_json.old[i].impact}</td><td>${existing_html_json.new[i].impact}</td></tr>`
										}
									
								}
								if (existing_html_json.old[i].type == "quantitative"){
									if(existing_html_json.new[i].data && (existing_html_json.new[i].data != existing_html_json.old[i].data)){
											html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Expected Value</td><td>${existing_html_json.old[i].data}</td><td>${existing_html_json.new[i].data}</td></tr>`
									}
									if(existing_html_json.new[i].data_source && (existing_html_json.new[i].data_source != existing_html_json.old[i].data_source)){
										console.log("Hello"); 
										html_output +=`<tr><td>${toTitleCase(existing_html_json.old[i].type)} Impact</td><td>${existing_html_json.old[i].category}</td><td style='justify-content: center;'>${existing_html_json.old[i].question}</td><td>Data Source</td><td>${existing_html_json.old[i].data_source}</td><td>${existing_html_json.new[i].data_source}</td></tr>`
									}
								}
								
							}
							frm.fields_dict.html_table.$wrapper.html(html_head + html_output + "</table>")
							frm.refresh_field("html_table")


							var existing_json2 = JSON.parse(frm.doc.json)
							for (var row of r.message[0]){
								for (var i of existing_json2.qualitative){
									if (i.question == row.question){
										i.likelihood = row.likelihood
										i.impact = row.impact
										i.sdg_mapping = row.sdg_mapping
									}
								}
							}
							for (var row of r.message[0]){
								for (var i of existing_json2.quantitative){
									if (i.question == row.question){
										console.log("i.data = ",i.data)
										console.log("i.data_source = ",i.data_source)
										i.data = row.data
										i.data_source = row.data_source
										i.sdg_mapping = row.sdg_mapping
										
										console.log("row.data = ",row.data)
										
										console.log("row.data_source = ",row.data_source)
									}
								}
							}
							frm.set_value("json", JSON.stringify(existing_json2))
							frm.refresh_field("json")

							var checkedList = []
							var result=frm.call({
								doc:frm.doc,
								method:'categorylist',
								async:false,
								callback: function(r){	
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
								}
							});
						}
						else{
							console.log("Current JSON 2 = ",frm.doc.html_json);
							frm.doc.html_json = `${JSON.stringify({"old":r.message[0],"new":r.message[1]})}`
							frm.refresh_field("html_json")
							var one_time_json = `${JSON.stringify({"old":r.message[0],"new":r.message[1]})}`
							var one_time_html_json = JSON.parse(one_time_json)
							var html_output =""
							console.log("For HTML Render:", existing_html_json);
							for(var i=0;i<one_time_html_json.old.length;i++){
								if (one_time_html_json.old[i].type == "qualitative"){ 
										if(one_time_html_json.new[i].likelihood && (one_time_html_json.new[i].likelihood != one_time_html_json.old[i].likelihood)){
											html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Likelihood</td><td>${one_time_html_json.old[i].likelihood}</td><td>${one_time_html_json.new[i].likelihood}</td></tr>`
										}
										if(one_time_html_json.new[i].impact && (one_time_html_json.new[i].impact != one_time_html_json.old[i].impact)){
											console.log("Hi"); 
											html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Impact</td><td>${one_time_html_json.old[i].impact}</td><td>${one_time_html_json.new[i].impact}</td></tr>`
										}
									
								}
								if (one_time_html_json.old[i].type == "quantitative"){
									if(one_time_html_json.new[i].data && (one_time_html_json.new[i].data != one_time_html_json.old[i].data)){
											html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Expected Value</td><td>${one_time_html_json.old[i].data}</td><td>${one_time_html_json.new[i].data}</td></tr>`
									}
									if(one_time_html_json.new[i].data_source && (one_time_html_json.new[i].data_source != one_time_html_json.old[i].data_source)){
										console.log("Hello"); 
										html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Data Source</td><td>${one_time_html_json.old[i].data_source}</td><td>${one_time_html_json.new[i].data_source}</td></tr>`
									}
								}
								
							}
							frm.fields_dict.html_table.$wrapper.html(html_head + html_output + "</table>")
							frm.refresh_field("html_table")
							var existing_json2 = JSON.parse(frm.doc.json)
							for (var row of r.message[0]){
								for (var i of existing_json2.qualitative){
									if (i.question == row.question){
										i.likelihood = row.likelihood
										i.impact = row.impact
										i.sdg_mapping = row.sdg_mapping
									}
								}
							}
							for (var row of r.message[0]){
								for (var i of existing_json2.quantitative){
									if (i.question == row.question){
										console.log("i.data = ",i.data)
										console.log("i.data_source = ",i.data_source)
										i.data = row.data
										i.data_source = row.data_source
										i.sdg_mapping = row.sdg_mapping
										
										console.log("row.data = ",row.data)
										
										console.log("row.data_source = ",row.data_source)
									}
								}
							}
							frm.set_value("json", JSON.stringify(existing_json2))
							frm.refresh_field("json")


							var checkedList = []
							var result=frm.call({
								doc:frm.doc,
								method:'categorylist',
								async:false,
								callback: function(r){	
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
								}
							});
						}
					}
				}
			})
		}
	}

})

function toTitleCase(str) {
	return str.replace(
	  /\w\S*/g,
	  function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  }
	); 
}