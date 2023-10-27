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


		$(document).ready(function() {
			// Select the node that will be observed for mutations
			var targetNode = document.querySelector('.indicator-pill');
		
			// Options for the observer (which mutations to observe)
			var config = { attributes: true, attributeFilter: ['class'] };
		
			// Callback function to execute when mutations are observed
			var callback = function(mutationsList, observer) {
				for(var mutation of mutationsList) {
					if (mutation.type === 'attributes') {
						if (targetNode.classList.contains('orange')) {
							frm.clear_custom_buttons();
						}
					}
				}
			};
		
			// Create an observer instance linked to the callback function
			var observer = new MutationObserver(callback);
		
			// Start observing the target node for configured mutations
			observer.observe(targetNode, config);
		});


		frm.call({
			doc:frm.doc,
			method:"get_approvers",
			async:false,
			callback:function(r){
				if(frm.doc.workflow_state == "Pending"){
					console.log(r.message);
					console.log(frappe.user_roles);
					for (let i of r.message){
						if (frappe.session.user != "Administrator"){

							if(frappe.user_roles.includes(i)){
								$('[id="sdg-assessment-tab1"]').attr("style","pointer-events:none;--text-color: var(--disabled-text-color); opacity: 0.8;")
							}
						}

					}
				}
			}
		})

		// $(document).ready(function(){
		// 	$('[data-fieldname]').on({
		// 		keyup:function(){
		// 			$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
		// 			$('.primary-action').removeClass('hide');
		// 			$('.primary-action').html("S<span class='alt-underline'>a</span>ve");
		// 			frm.dirty()
		// 		},
		// 		click:function(){
		// 			$('[data-fieldname]').on("focus",function(){
						
		// 				$('[data-fieldname]').on("click",function(){
		// 					$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
		// 					$('.primary-action').removeClass('hide')
		// 					$('.primary-action').html("S<span class='alt-underline'>a</span>ve")
		// 					frm.dirty()
		// 				})
		// 			})
		// 		},
				
		// 		change:function(){
		// 			$('[data-fieldtype = "Select"]').on("change",function(){
		// 				$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
		// 				$('.primary-action').removeClass('hide')
		// 				$('.primary-action').html("S<span class='alt-underline'>a</span>ve")
		// 				frm.dirty()
		// 			})
		// 		}
		// 	});
		// 	$('[data-fieldtype="Link"]').on("click", function() {
		// 		var hide = true;
		// 		if(hide){
		// 			$('head').append('<style>.btn.ellipsis.btn-primary { display: none !important; }</style>');
		// 			$('.primary-action').removeClass('hide')
		// 			$('.primary-action').html("S<span class='alt-underline'>a</span>ve")
		// 			frm.dirty()
		// 		}
		// 		else{
		// 			$('head').append('<style>.btn.ellipsis.btn-primary { display:inline-block !important; }</style>');
		// 		}
		// 	});		
		// 	$('[class="btn btn-xs btn-secondary grid-add-row"], [data-fieldname="edit_button"]').on("click",function(){
		// 		$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
		// 		$('.primary-action').removeClass('hide')
		// 		$('.primary-action').html("S<span class='alt-underline'>a</span>ve")
		// 		frm.dirty()
		// 	})

		// 	$('[data-fieldtype="Table MultiSelect"]').on("mouseenter", function() {

		// 		$('[data-fieldtype="Table MultiSelect"]').on("focusout", function() {
		// 			var hide = true;
		// 			if(hide){
		// 			$('head').append('<style>.btn.ellipsis.btn-primary { display: none !important; }</style>');
		// 			$('.primary-action').removeClass('hide')
		// 			$('.primary-action').html("S<span class='alt-underline'>a</span>ve")
		// 			frm.dirty()
		// 			}
		// 			else{
		// 				$('head').append('<style>.btn.ellipsis.btn-primary { display:inline-block !important; }</style>');
		// 			}
		// 		});
				
		// 	});

 		// });
	// 	$('head').append('<style>[class="btn ellipsis btn-primary"] {display:inline-block !important;}</style>')

	// 	$('.control-input').on("keyup",function(){
	// 		console.log("Successs...");
	// 		$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
			
	// 	})
	// 	$('[class="btn btn-xs btn-secondary grid-add-row"]').on("click",function(){
	// 		console.log("Successs child...");
	// 		$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
	// 	})
	// 	$('[data-fieldname="load_categories"]').on("click",function(){
	// 		console.log("Successs child...");
	// 		$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
	// 	})
	// 	$('[data-fieldtype="Check"]').on("click",function(){
	// 		console.log("Successs child...");
	// 		$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
	// 	})
		
		
	// 	$('[data-fieldname="qualitative_impact"]').on("click",function(){
	// 		$('[data-fieldname="qualitative_impact"]').on("change",function(){
	// 			$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
	// 		})
	// 	})
	// 	$('[data-fieldname="quantitative_impact"]').on("keyup",function(){
	// 		$('[data-fieldname="data"],[data-fieldname="data_source"]').on("focusout",function(){
	// 			$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>')
	// 	})
	// 	})
	// $('head').append('<style>[class="btn ellipsis btn-primary"] {display:inline-block !important;}</style>')
		
		// if (frm.doc.__islocal == 1) {
		// 			$('head').append('<style>[class="btn ellipsis btn-primary"] {display:none !important;}</style>');
		// 		}

				if(frm.doc.workflow_state == "Approved" || frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending"){
				
						$('[id="page-SDG Assessment"]').find('.actions-btn-group').hide();
	
					}else{
						$('[id="page-SDG Assessment"]').find('.actions-btn-group').show();
				
					}
			
					if (frm.doc.work_state == "Approved"){
						cur_frm.fields_dict.project_id.df.read_only = 1
						cur_frm.fields_dict.select_approver.df.read_only = 1
					}
					
					if (frm.doc.work_state == '' && !frm.doc.__islocal){
						if (frm.doc.workflow_state == "Pending") {
							frm.set_value("work_state","Pending")
							frm.save()
						}
					}
					else if(frm.doc.work_state == "Pending"){
						if (frm.doc.workflow_state == "Rejected"){
							frm.set_value("work_state","Rejected")
							frm.save()
						}
						else if(frm.doc.workflow_state == "Approved"){
							frm.set_value("work_state","Approved")
							frm.save()
						}
					}
					else if(frm.doc.work_state == "Rejected"){
						if (frm.doc.workflow_state == "Draft"){
							frm.set_value("work_state","Rejected")
							frm.save()
						}
						else if(frm.doc.workflow_state == "Approved"){
							// $('[id="sdg-assessment-tab1"]').attr("style","pointer-events:auto;")
							frm.set_value("work_state","Approved")
							frm.save()
						}
						else if(frm.doc.workflow_state == "Rejected"){
							// $('[id="sdg-assessment-tab1"]').attr("style","pointer-events:none;color: #999; opacity: 0.7;")
							frm.set_value("work_state","Rejected")
							frm.save()
						}
						else if(frm.doc.workflow_state == "Pending"){
							frm.set_value("work_state","Rejected")
							frm.save()
						}
					}
			
					if(frm.doc.workflow_state == "Pending"){
						frm.add_custom_button('Approve',()=>{
							frappe.confirm('Are you sure you want to proceed?',
								() => {
									frm.set_value("workflow_state","Approved")
									frm.refresh_field("workflow_state")
									frm.save()
								}, () => {
			
							})
			
						},"Actions")
			
						frm.add_custom_button('Reject',()=>{
							frappe.confirm('Are you sure you want to proceed?',
								() => {
									frm.set_value("workflow_state","Rejected")
									frm.refresh_field("workflow_state")
									frm.save()
								}, () => {
			
							})
			
						},"Actions")
			
						
					}
					else if(frm.doc.workflow_state == "Approved"){
						frm.add_custom_button('Edit',()=>{
							frappe.confirm('Are you sure you want to proceed?',
								() => {
									frm.set_value("workflow_state","Draft")
									frm.refresh_field("workflow_state")
									console.log(frm.doc.workflow_state);
									frm.save()
								}, () => {
				
								})
				
							},"Actions")
					}
					else if(frm.doc.workflow_state == "Draft"){
						frm.add_custom_button('Send for Approval',()=>{
							frappe.confirm('Are you sure you want to proceed?',
								() => {
									frm.set_value("workflow_state","Pending")
									frm.refresh_field("workflow_state")
									console.log(frm.doc.workflow_state);
									frm.save()
								}, () => {
								
							})
							
						},"Actions")
					}$('.inner-group-button button').removeClass("btn-default").addClass("btn-primary")


		if (frm.doc.work_state == "Approved"){
			cur_frm.fields_dict.project_id.df.read_only = 1
			cur_frm.fields_dict.select_approver.df.read_only = 1
		}


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
			fields: ['project_id'],
			pluck:'project_id'
		}).then(r => {
			frm.set_query("project_id",function(){

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
			// frm.set_value('work_state','Approved')
			// frm.set_value("workflow_state","Approved")
		}

		if (frm.doc.workflow_state == "Approved"){
			for (var i of frm.doc.edited_project_details){

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
		}
		else if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && (cur_frm.fields_dict.html_table.$wrapper[0].innerHTML != '' || frm.doc.edited_project_details.length != 0)){
			$('[id="sdg-assessment-tab1-tab"]').addClass("active")
			$('[id="sdg-assessment-tab1-tab"]').attr('aria-selected', 'true');
			$('[id="sdg-assessment-tab2-tab"]').removeClass("active")
			$('[id="sdg-assessment-tab1-tab"]').show()
			$('[id="sdg-assessment-tab2-tab"]').show()
			$('[id="sdg-assessment-tab1"]').addClass("active")
		}
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
		
		if(frm.doc.work_state == "Approved"){
			if (frm.doc.workflow_state != "Approved" && !frm.doc.__islocal){
				// window.location.href = `${frm.doc.name}`
				var checkedList1 = []
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
										if (!checkedList1.includes(i.category)){
											checkedList1.push(i.category)
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
				

				frm.call({
					doc:frm.doc,
					method:"get_all_datas",
					async:false,
					callback:function(r){
						var result= r.message

						var field_name_list = []
						for(let [key,value] of Object.entries(result)){
							field_name_list.push(key)
						}
						for (var i of frm.doc.edited_project_details){

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

							for (var i of field_name_list){
								var label = i.replaceAll("_"," ")
								label = toTitleCase(label)

								var child =frm.add_child("edited_project_details")
								if (i != "ndp_cov"){


									child.field_label = label
									child.field_name = i
									child.old_values = result[`${i}`]
									child.new_values = frm.doc[`${i}`]
									frm.set_value(i,result[`${i}`])

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

									if (!new_questions_list.includes(r.message[0][row].question)){
										existing_html_json.new.push({"category":r.message[1][row].category,"question":r.message[1][row].question,"likelihood":r.message[1][row].likelihood,"impact":r.message[1][row].impact,"data":r.message[1][row].data,"data_source":r.message[1][row].data_source,"type":r.message[1][row].type});

									}
								}
								frm.set_value("html_json", JSON.stringify(existing_html_json))
								frm.refresh_field("html_json")

								var html_output =""
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


											i.data = row.data
											i.data_source = row.data_source
											i.sdg_mapping = row.sdg_mapping
											

											

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

								frm.doc.html_json = `${JSON.stringify({"old":r.message[0],"new":r.message[1]})}`
								frm.refresh_field("html_json")
								var one_time_json = `${JSON.stringify({"old":r.message[0],"new":r.message[1]})}`
								var one_time_html_json = JSON.parse(one_time_json)
								var html_output =""

								for(var i=0;i<one_time_html_json.old.length;i++){
									if (one_time_html_json.old[i].type == "qualitative"){ 
											if(one_time_html_json.new[i].likelihood && (one_time_html_json.new[i].likelihood != one_time_html_json.old[i].likelihood)){
												html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Likelihood</td><td>${one_time_html_json.old[i].likelihood}</td><td>${one_time_html_json.new[i].likelihood}</td></tr>`
											}
											if(one_time_html_json.new[i].impact && (one_time_html_json.new[i].impact != one_time_html_json.old[i].impact)){

												html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Impact</td><td>${one_time_html_json.old[i].impact}</td><td>${one_time_html_json.new[i].impact}</td></tr>`
											}
										
									}
									if (one_time_html_json.old[i].type == "quantitative"){
										if(one_time_html_json.new[i].data && (one_time_html_json.new[i].data != one_time_html_json.old[i].data)){
												html_output +=`<tr><td>${toTitleCase(one_time_html_json.old[i].type)} Impact</td><td>${one_time_html_json.old[i].category}</td><td style='justify-content: center;'>${one_time_html_json.old[i].question}</td><td>Expected Value</td><td>${one_time_html_json.old[i].data}</td><td>${one_time_html_json.new[i].data}</td></tr>`
										}
										if(one_time_html_json.new[i].data_source && (one_time_html_json.new[i].data_source != one_time_html_json.old[i].data_source)){

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


											i.data = row.data
											i.data_source = row.data_source
											i.sdg_mapping = row.sdg_mapping
											

											

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
				window.location.href = `${frm.doc.name}`
			}
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