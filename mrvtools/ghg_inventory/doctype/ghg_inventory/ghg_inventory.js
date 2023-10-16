// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt
var dynamicTitleList = ['','','','']
frappe.ui.form.on('GHG Inventory', {
	
	refresh: function(frm) {
		if(frm.is_new()){
		frm.set_value('dynamic_title',dynamicTitleList.join(''))
		frm.refresh_field('dynamic_title')
		frappe.db.get_list('GHG Sector',{
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			var sector_options = ""
			for (var i of r){
				sector_options += ('\n'+ i)
			}
			cur_frm.fields_dict.sector.df.options = sector_options
			frm.refresh_field('sector')
		})}
		else{
			cur_frm.fields_dict.sector.df.options = frm.doc.sector
			frm.refresh_field('sector')

			cur_frm.fields_dict.category.df.options = frm.doc.category
			frm.refresh_field('category')
			
			cur_frm.fields_dict.sub_sector.df.options = frm.doc.sub_sector
			frm.refresh_field('sub_sector')

			cur_frm.fields_dict.sub_category.df.options = frm.doc.sub_category
			frm.refresh_field('sub_category')
		}
		

		if(frm.doc.workflow_state == "Approved"){
			if (frm.doc.workflow_state == "Approved"){
			}
			frm.set_value('work_state','Approved')
			frm.save()
		}

		if (frm.doc.__islocal || frm.doc.work_state != "Approved"){
			frm.fields_dict.edit_button.df.hidden = 1
			frm.refresh_field("edit_button")
		}

		if (frm.doc.work_state == '' && !frm.doc.__islocal){
			if (frm.doc.workflow_state == "Pending") {
				frm.set_value("work_state","Pending")
				frm.save()
			}
		}
		else if(frm.doc.work_state == "Pending"){
			console.log(frm.doc.work_state);
			if (frm.doc.workflow_state == "Rejected"){
				frm.set_value("work_state","Rejected")
				frm.save()
			}
			else if(frm.doc.workflow_state == "Approved"){
				frm.save()
				frm.set_value("work_state","Approved")
			}
		}

		frm.call({
			doc:frm.doc,
			method:'table_list',
			async:false,
			callback: function(r){
				for (var i of r.message){
					var table_name = ""
					var parts = i.split("_");
					parts.shift();
					table_name = parts.join("_");
					if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc[i].length != 0){
						frm.fields_dict[table_name].df.read_only = 1
						frm.refresh_field(table_name)
						frm.fields_dict.edit_button.df.hidden = 0
						frm.refresh_field("edit_button")
					}
					else{
						frm.fields_dict[table_name].df.read_only = 0
						frm.refresh_field(table_name)
						frm.fields_dict.edit_button.df.hidden = 1
						frm.refresh_field("edit_button")
					}
					
					if (frm.doc.workflow_state == "Rejected"){
						frm.set_value(i,[])
						frm.save()
					}

					if(frm.doc.workflow_state == "Approved"){
						if (frm.doc.workflow_state == "Approved" && i.length != 0){
							frm.call({
								doc:frm.doc,
								method:"after_saving_table",
								async:false,
								callback:function(res){
									console.log("Working.......");
								}
							})
							frm.set_value(i,[])
							frm.refresh_field(i)
						}
						// frm.set_value("edited_project_details",[])
						frm.set_value('work_state','Approved')
						frm.save()
					}


					if (frm.doc.workflow_state == "Approved" || frm.doc.__islocal){
						$('[id="ghg-inventory-tab1"]').addClass("active")
					}
				}
			}
		})

		if(frm.doc.sub_category != ""){
			

			frm.call({
				doc:frm.doc,
				method:"get_table",
				callback:function(r){
					for (var i of r.message){
						$(`[data-fieldname=${i}] [class="control-label"]`).prop("textContent",`${frm.doc.sub_category}`)
						frm.refresh_field(i)
					}
				
				}
			})

		
			frm.call({
				doc:frm.doc,
				method:"table_list",
				callback:function(r){
					for (var i of r.message){
						$(`[data-fieldname=${i}] [class="control-label"]`).prop("textContent",'Edited '+`${frm.doc.sub_category}`  + ' table')
						frm.refresh_field(i)
					}
				
				}
			})
		}
		


		if(frm.doc.electricity_generation.length !=0 || frm.doc.manufacturing_industries.length !=0 || frm.doc.transport.length !=0 || frm.doc.other_sectors.length !=0 || frm.doc.other_energy.length !=0 || frm.doc.international_bunkers.length !=0){
			
			frappe.db.get_list('Energy Fuel Master List',{
				fields : ['fuel_type'],
				order_by : 'fuel_type asc',
				group_by:'fuel_type',
				pluck: 'fuel_type'
			}).then(r =>{
				var fuel_type_options = ""
				for (var i of r){
					fuel_type_options += ('\n'+ i)
				}
				console.log("Hi.....");
				for (var row =0; row < frm.doc.electricity_generation.length;row++){
					console.log(frm.doc.electricity_generation);
					if(cur_frm.doc.electricity_generation.length != 0 && frm.doc.sub_sector=="1.A.1. Energy industries"){

						cur_frm.grids[1].grid.grid_rows[row].columns.fuel_type.df.options = fuel_type_options
					}
					if(row.fuel_type != ''){
						frappe.db.get_list('Energy Fuel Master List',{
							fields : ['fuel'],
							filters:{fuel_type:row.fuel_type},
							order_by : 'fuel asc',
							pluck: 'fuel'
						}).then(r =>{
							var fuel_options = ""
							for (var i of r){
								fuel_options += ('\n'+ i)
							}
							if(cur_frm.doc.electricity_generation.length != 0 && frm.doc.sub_sector=="1.A.1. Energy industries"){
								cur_frm.grids[1].grid.grid_rows[row].columns.fuel.df.options = fuel_options
								frm.refresh_field('electricity_generation')
								}
							})
						}
				}
				frm.refresh_field('electricity_generation')
			});
			// if(.fuel_type){
			// 	frappe.db.get_list('Energy Fuel Master List',{
			// 		fields : ['fuel'],
			// 		filters:{fuel_type:d.fuel_type},
			// 		order_by : 'fuel asc',
			// 		pluck: 'fuel'
			// 	}).then(r =>{
			// 		var fuel_options = ""
			// 		for (var i of r){
			// 			fuel_options += ('\n'+ i)
			// 		}
			// 		console.log(fuel_options);
			// 		if(cur_frm.doc.electricity_generation.length != 0 && frm.doc.sub_sector=="1.A.1. Energy industries"){
			// 			cur_frm.grids[1].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			// 			frm.refresh_field('electricity_generation')
			// 			}
			// 		if(cur_frm.doc.manufacturing_industries.length != 0 && frm.doc.sub_sector=="1.A.2 Manufacturing industries and construction"){
			// 			console.log(fuel_options);
			// 			cur_frm.grids[2].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			// 			frm.refresh_field('manufacturing_industries')
			// 			}
			// 		if(cur_frm.doc.transport.length != 0 && frm.doc.sub_sector=="1.A.3. Transport"){
			// 			cur_frm.grids[3].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			// 			frm.refresh_field('transport')
			// 			}
			// 		if(cur_frm.doc.other_sectors.length != 0 && frm.doc.sub_sector=="1.A.4. Other sectors"){
			// 			cur_frm.grids[4].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			// 			frm.refresh_field('other_sectors')
			// 			}
			// 		if(cur_frm.doc.other_energy.length != 0 && frm.doc.sub_sector=="1.A.5. Other"){
			// 			cur_frm.grids[5].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			// 			frm.refresh_field('other_energy')
			// 			}
			// 		if(cur_frm.doc.international_bunkers.length != 0 && frm.doc.sub_sector=="1.D.1. International bunkers"){
			// 			cur_frm.grids[6].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			// 			frm.refresh_field('international_bunkers')
			// 			}
			// 		console.log("fuel_options",fuel_options);
			// 	});
			// }
		}
		// if(frm.doc.sub_sector == '3.C.6. Indirect N2O Emissions from manure management'){
		// 	// frm.fields_dict.indirect_manure_management.df.hidden = 0
		// 	frm.refresh_field('indirect_manure_management')
		// }
		// else{
		// 	frm.doc.indirect_manure_management = []
		// 	// frm.fields_dict.indirect_manure_management.df.hidden = 1
		// 	frm.refresh_field('indirect_manure_management')
		// }

		// cur_frm.fields_dict.category.df.options = ''
		// frm.refresh_field('category')
		
		// cur_frm.fields_dict.sub_sector.df.options = ''
		// frm.refresh_field('sub_sector')

		// cur_frm.fields_dict.sub_category.df.options = ''
		// frm.refresh_field('sub_category')
	},

	before_save:function(frm){
		if(frm.doc.work_state == "Approved"){
			if (frm.doc.workflow_state != "Approved"  && !frm.doc.__islocal){
				frm.call({
					doc:frm.doc,
					method:"before_saving_table",
					async:false,
					callback:function(r){
						console.log("Mudinchhh!");
					}
				})
				window.location.href = `${frm.doc.name}`
			}
		}
		
	},

	edit_button:function(frm,cdt,cdn){
		
		frm.call({
			doc:frm.doc,
			method:'edited_table_list',
			async:false,
			callback: function(r){
				for(var [key,value] of Object.entries(r.message)){
					var table_name = ""
					var parts = key.split("_");
					parts.shift();
					table_name = parts.join("_");
					if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected") && frm.doc[key].length != 0){
						var counter1=0
						frm.set_value(table_name,[])
						for (var i of value){
							console.log(i);
							if (counter1 == 0){
								counter1 = 1
								for(var row of frm.doc[key]){
									var child = frm.add_child(table_name)
									console.log(i,row[i]);
									child[i] = row[i]
								}
							}
							else{
								for(var j=0;j<frm.doc[key].length;j++){
									frm.doc[table_name][j][i] = frm.doc[key][j][i]
									frm.refresh_field(table_name);
								}
								
							}
							
						}
						
						frm.fields_dict[table_name].df.read_only = 0
						frm.fields_dict.edit_button.df.hidden = 1
						frm.refresh_field("edit_button")
						frm.refresh_field(table_name)
					}

					

				}
			}
		})
		// frm.call({
		// 	doc:frm.doc,
		// 	method:'edit_table',
		// 	async:false,
		// 	callback: function(r){
		// 		console.log(r.message);
		// 		for (var i of r.message){
		// 			if(frm.doc.work_state =="Approved" && (frm.doc.workflow_state == "Draft" || frm.doc.workflow_state == "Pending" || frm.doc.workflow_state =="Rejected")){
		// 				frm.call({
		// 					doc:frm.doc,
		// 					method:"after_saving_table",
		// 					async:false,
		// 					callback:function(res){
		// 						console.log("Working.......");
		// 					}
		// 				})
		// 				frm.set_value(i,[])
		// 				frm.refresh_field(i)
		// 			}
		// 			// frm.set_value("edited_project_details",[])
		// 			frm.set_value('work_state','Approved')
		// 			frm.save()
		// 		}
				
		// 	}
		// })
	},

	sector: function(frm){

		dynamicTitleList[0] = frm.doc.sector
		dynamicTitleList[1] = ''
		dynamicTitleList[2] = ''
		dynamicTitleList[3] = ''
		frm.set_value('dynamic_title',dynamicTitleList.join(''))
		frm.refresh_field('dynamic_title')
		frm.set_value('approach','')
		frm.refresh_field('approach')

		
		frappe.db.get_list('GHG Category',{
			filters : {sector:frm.doc.sector},
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			cur_frm.fields_dict.category.df.options = ''
			frm.refresh_field('category')
			
			cur_frm.fields_dict.sub_sector.df.options = ''
			frm.refresh_field('sub_sector')

			cur_frm.fields_dict.sub_category.df.options = ''
			frm.refresh_field('sub_category')
			var category_options = ""
			for (var i of r){
				category_options += ('\n'+ i)
			}
			frm.set_value('category','')
			cur_frm.fields_dict.category.df.options = category_options
			frm.refresh_field('category')
		});

		// frm.set_query("category", function(){
        //     return {
        //         filters: {
        //             sector : frm.doc.sector
        //         }
        //     }
        // });
		// frm.set_value('category',"")
		// frm.refresh_field('category')
		if (frm.doc.sector == "1. Energy"){
			frm.fields_dict.approach.df.hidden = 0
			frm.refresh_field('approach')

			frm.fields_dict.category.df.hidden = 1
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 1
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 1
			frm.refresh_field('sub_sector')
		}
		else if(frm.doc.sector == ""){
			frm.fields_dict.approach.df.hidden = 1
			frm.refresh_field('approach')

			frm.fields_dict.category.df.hidden = 1
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 1
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 1
			frm.refresh_field('sub_sector')
		}
		else{
			frm.set_value('approach',"")
			frm.refresh_field('approach')

			frm.fields_dict.approach.df.hidden = 1
			frm.refresh_field('approach')

			frm.fields_dict.category.df.hidden = 0
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 0
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 0
			frm.refresh_field('sub_sector')

			
		};


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
		  });
		// frm.set_query("category", function(){
        //     return {
        //         filters: {
        //             sector : frm.doc.sector
        //         }
        //     }
        // });
		// frm.set_value('category',"")
		// frm.refresh_field('category')
	},
	approach:function(frm){

		dynamicTitleList[1] = "/"+frm.doc.approach
		dynamicTitleList[2] = ''
		dynamicTitleList[3] = ''
		frm.set_value('dynamic_title',dynamicTitleList.join(''))
		frm.refresh_field('dynamic_title')

		if (frm.doc.approach == 'Sectoral Approach'){

			frm.set_value('category','')
			frm.fields_dict.category.df.hidden = 0
			frm.refresh_field('category')

			frm.set_value('sub_category','')
			frm.fields_dict.sub_category.df.hidden = 0
			frm.refresh_field('sub_category')

			frm.set_value('sub_sector','')
			frm.fields_dict.sub_sector.df.hidden = 0
			frm.refresh_field('sub_sector')
		}
		else if (frm.doc.approach == 'Reference Approach'){
		// 	// frm.fields_dict.reference_approach.df.hidden = 0
		// 	frm.refresh_field('reference_approach')

			frm.set_value('category','')
			frm.fields_dict.category.df.hidden = 1
			frm.refresh_field('category')

			frm.set_value('sub_category','')
			frm.fields_dict.sub_category.df.hidden = 1
			frm.refresh_field('sub_category')

			frm.set_value('sub_sector','')
			frm.fields_dict.sub_sector.df.hidden = 1
			frm.refresh_field('sub_sector')
		}
		else if(frm.doc.sector =='1. Energy' && !frm.doc.approach){
			frm.fields_dict.category.df.hidden = 1
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 1
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 1
			frm.refresh_field('sub_sector')
		}
		// else{
		// 	// frm.fields_dict.reference_approach.df.hidden = 1
		// 	frm.refresh_field('reference_approach')
		// }
	},
	category: function(frm){
		if(frm.doc.category){
		dynamicTitleList[1] = "/"+frm.doc.category}
		dynamicTitleList[2] = ''
		dynamicTitleList[3] = ''
		frm.set_value('dynamic_title',dynamicTitleList.join(''))
		frm.refresh_field('dynamic_title')

		frappe.db.get_list('GHG Sub Sector',{
			filters : {category:frm.doc.category},
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			var sub_sector_options = ""
			for (var i of r){
				sub_sector_options += ('\n'+ i)
			}
			frm.set_value('sub_sector','')
			frm.set_value('sub_category','')
			cur_frm.fields_dict.sub_sector.df.options = sub_sector_options
			frm.refresh_field('sub_sector')
		});

		if(frm.doc.category == '4.A. Forest land'){
			frappe.db.get_list('Forest Category Master List', {
				fields: ['category'],
				filters:{'link_category':frm.doc.category},
				pluck:'category',
				order_by:'category'
			}).then(records => {
				for(var i of records){
					var child = frm.add_child(`forest_land`)
					child.forest_category = i
				}
				frm.refresh_field(`forest_land`)
			})
		}
		else{
			frm.doc.forest_land = []
			// frm.fields_dict.forest_land.df.hidden = 1
			frm.refresh_field(`forest_land`)
		}
			if(frm.doc.category == '4.B. Cropland'){
				frappe.db.get_list('Forest Category Master List', {
					fields: ['category'],
					filters:{'link_category':frm.doc.category},
					pluck:'category',
					order_by:'category'
				}).then(records => {
					for(var i of records){
						var child = frm.add_child(`cropland`)
						child.forest_category = i
					}
					frm.refresh_field(`cropland`)
				})
			}
			else{
				frm.doc.cropland = []
				// frm.fields_dict.forest_land.df.hidden = 1
				frm.refresh_field('cropland')
			}
			if(frm.doc.category == '4.C. Grassland'){
				frappe.db.get_list('Forest Category Master List', {
					fields: ['category'],
					filters:{'link_category':frm.doc.category},
					pluck:'category',
					order_by:'category'
				}).then(records => {
					for(var i of records){
						var child = frm.add_child(`grassland`)
						child.forest_category = i
					}
					frm.refresh_field(`grassland`)
				})
			}
			else{
				frm.doc.grassland = []
				frm.refresh_field('grassland')
			}
			if(frm.doc.category == '4.D. Wetlands'){
				frappe.db.get_list('Forest Category Master List', {
					fields: ['category'],
					filters:{'link_category':frm.doc.category},
					pluck:'category',
					order_by:'category'
				}).then(records => {
					for(var i of records){
						var child = frm.add_child(`wetlands`)
						child.forest_category = i
					}
					frm.refresh_field(`wetlands`)
				})
			}
			else{
				frm.doc.wetlands = []
				// frm.fields_dict.wetlands.df.hidden = 1
				frm.refresh_field('wetlands')
			}
			if(frm.doc.category == '4.E. Settlements'){
				frappe.db.get_list('Forest Category Master List', {
					fields: ['category'],
					filters:{'link_category':frm.doc.category},
					pluck:'category',
					order_by:'category'
				}).then(records => {
					for(var i of records){
						var child = frm.add_child(`settlements`)
						child.forest_category = i
					}
					frm.refresh_field(`settlements`)
				})
			}
			else{
				frm.doc.settlements = []
				// frm.fields_dict.settlements.df.hidden = 1
				frm.refresh_field('settlements')
			}
			if(frm.doc.category == '4.F. Other land'){
				frappe.db.get_list('Forest Category Master List', {
					fields: ['category'],
					filters:{'link_category':frm.doc.category},
					pluck:'category',
					order_by:'category'
				}).then(records => {
					for(var i of records){
						var child = frm.add_child(`other_land`)
						child.forest_category = i
					}
					frm.refresh_field(`other_land`)
				})
			}
			else{
				frm.doc.other_land = []
				// frm.fields_dict.other_land.df.hidden = 1
				frm.refresh_field('other_land')
			}

		

		/////////////////////////////////////////////////////////////////////
		/////////// Conditions to Show/Hide Respective Table Fields /////////
		/////////////////////////////CATEGORY////////////////////////////////
		/////////////////////////////////////////////////////////////////////

		//Solid Waste Disposal//
		// if(frm.doc.category == '4.A. Solid Waste Disposal'){
			
		// 	// frm.fields_dict.solid_waste.df.hidden = 0
		// 	frm.refresh_field('solid_waste')

		// }
		// else{

		// 	frm.doc.solid_waste = []
		// 	// frm.fields_dict.solid_waste.df.hidden = 1
		// 	frm.refresh_field('solid_waste')
			
		// }
		
		// //Wastewater Treatment and Discharge//
		// if(frm.doc.category == '4.D. Wastewater Treatment and Discharge'){

		// 	// frm.fields_dict.ch4_wastewater_treatment.df.hidden = 0
		// 	frm.refresh_field('ch4_wastewater_treatment')

		// 	// frm.fields_dict.n2o_wastewater_treatment.df.hidden = 0
		// 	frm.refresh_field('n2o_wastewater_treatment')

		// 	// frm.fields_dict.industrial_wastewater_treatment.df.hidden = 0
		// 	frm.refresh_field('industrial_wastewater_treatment')
		// }
		// else{
		// 	frm.doc.ch4_wastewater_treatment = []
		// 	// frm.fields_dict.ch4_wastewater_treatment.df.hidden = 1
		// 	frm.refresh_field('ch4_wastewater_treatment')

		// 	frm.doc.n2o_wastewater_treatment = []
		// 	// frm.fields_dict.n2o_wastewater_treatment.df.hidden = 1
		// 	frm.refresh_field('n2o_wastewater_treatment')

		// 	frm.doc.industrial_wastewater_treatment = []
		// 	// frm.fields_dict.industrial_wastewater_treatment.df.hidden = 1
		// 	frm.refresh_field('industrial_wastewater_treatment')
		// }
		
	},
	sub_sector: function(frm){
		if (frm.doc.sub_sector){
		dynamicTitleList[2] = "/"+frm.doc.sub_sector}
		dynamicTitleList[3] = ''
		frm.set_value('dynamic_title',dynamicTitleList.join(''))
		frm.refresh_field('dynamic_title')

		frappe.db.get_list('GHG Sub Category',{
			filters : {sub_sector:frm.doc.sub_sector},
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			var sub_category_options = ""
			for (var i of r){
				sub_category_options += ('\n'+ i)
			}
			frm.set_value('sub_category','')
			cur_frm.fields_dict.sub_category.df.options = sub_category_options
			frm.refresh_field('sub_category')
		});

		if(frm.doc.sub_sector=='2.A.1. Cement production' && !frm.doc.clinker_data){
			var row = frm.add_child('clinker_data')
			
		}
		$.ajax({
			success:function(){
				$('[data-fieldname="clinker_data"] [class="row-index sortable-handle col"]').css("display","none")
				$('[data-fieldname="clinker_data"] [class="row-check sortable-handle col"]').css("display","none")
				$('[data-fieldname="clinker_data"] [class="btn-open-row"]').parent().remove()
				$('[data-fieldname="clinker_data"] [class="col grid-static-col d-flex justify-content-center"]').remove()
			}
		})
		// frm.fields_dict['clinker_data'].$wrapper.find('.row-check sortable-handle col').hide()
		$('[data-fieldname="clinker_data"] [class="small form-clickable-section grid-footer"]').remove()
		frm.refresh_field('clinker_data')

		/////////////////////////////////////////////////////////////////////
		/////////// Conditions to Show/Hide Respective Table Fields /////////
		////////////////////////////SUB-SECTOR///////////////////////////////
		/////////////////////////////////////////////////////////////////////

		//Other Sector//
		// if(frm.doc.sub_sector != '1.A.1. Energy industries'){
		// 	// frm.fields_dict.electricity_generation.df.hidden = 1
		// 	frm.refresh_field('electricity_generation')
		// }
		// else{
		// 	frm.set_value("sub_category","")
		// 	frm.refresh_field('sub_category')
		// }

		// if(frm.doc.sub_sector == '1.A.4. Other sectors'){
		// 	// frm.fields_dict.other_sectors.df.hidden = 0
		// 	frm.refresh_field('others')
		// }
		// else{
		// 	frm.doc.others = []
		// 	// frm.fields_dict.others.df.hidden = 1
		// 	frm.refresh_field('others')
		// }

		// //Transport//
		// if(frm.doc.sub_sector == '1.A.3. Transport'){
		// 	// frm.fields_dict.transport.df.hidden = 0
		// 	frm.refresh_field('transport')
		// }
		// else{
		// 	frm.doc.transport = []
		// 	// frm.fields_dict.transport.df.hidden = 1
		// 	frm.refresh_field('transport')
		// }

		// //Lubricant Use//
		// if(frm.doc.sub_sector == '2.D.1. Lubricant use'){
		// 	// frm.fields_dict.lubricant_use.df.hidden = 0
		// 	frm.refresh_field('lubricant_use')
		// }
		// else{
		// 	frm.doc.lubricant_use = []
		// 	// frm.fields_dict.lubricant_use.df.hidden = 1
		// 	frm.refresh_field('lubricant_use')
		// }

		// //Enteric Fermentation//
		// if(frm.doc.sub_sector == '3.A.1. Enteric Fermentation'){
		// 	// frm.fields_dict.enteric_fermentation.df.hidden = 0
		// 	frm.refresh_field('enteric_fermentation')
		// }
		// else{
		// 	frm.doc.enteric_fermentation = []
		// 	// frm.fields_dict.enteric_fermentation.df.hidden = 1
		// 	frm.refresh_field('enteric_fermentation')
		// }

		// //Manure Management//
		// if(frm.doc.sub_sector == '3.A.2. Manure Management'){
		// 	// frm.fields_dict.manure_management.df.hidden = 0
		// 	frm.refresh_field('manure_management')
		// }
		// else{
		// 	frm.doc.manure_management = []
		// 	// frm.fields_dict.manure_management.df.hidden = 1
		// 	frm.refresh_field('manure_management')
		// }

		//Forest Land//
		
		// //Urea Application//
		// if(frm.doc.sub_sector == '3.C.3. Urea Application'){
		// 	// frm.fields_dict.urea_application.df.hidden = 0
		// 	frm.refresh_field('urea_application')
		// }
		// else{
		// 	frm.doc.urea_application = []
		// 	// frm.fields_dict.urea_application.df.hidden = 1
		// 	frm.refresh_field('urea_application')
		// }

		//Direct N2O Emissions from managed soils//
		if(frm.doc.sub_sector == '3.D.1.  Direct N2O emissions from managed soils'){
			var table_name_list = {
				'direct_managed_soils': 'Managed Soils',
			}
				// 'direct_managed_soils':,'direct_flooded_rice','direct_managed_organic_soils','direct_grazed_soils']
			for (let table in table_name_list){
				console.log(table_name_list[table]);
				frm.call({
					doc:cur_frm.doc,
					method:"get_data",
					async:false,
					args:{
						table_name: table_name_list[table]
					},
					callback:function(r){
						console.log(r.message); 
							frm.doc[`${table}`] = []
							for(var i of r.message){
								var child = frm.add_child(`${table}`)
								child.anthropogenic_n_input= i.anthropogenic_n_input 
								child.reference = i.reference
							}
							frm.refresh_field(`${table}`)
					}
				})
			}
			// frm.fields_dict.direct_managed_soils.df.hidden = 0
			frm.refresh_field('direct_managed_soils')

			// frm.fields_dict.direct_flooded_rice.df.hidden = 0
			frm.refresh_field('direct_flooded_rice')

			// frm.fields_dict.direct_managed_organic_soils.df.hidden = 0
			frm.refresh_field('direct_managed_organic_soils')

			// frm.fields_dict.direct_grazed_soils.df.hidden = 0
			frm.refresh_field('direct_grazed_soils')
		}
		else{
			frm.doc.direct_managed_soils = []
			// frm.fields_dict.direct_managed_soils.df.hidden = 1
			frm.refresh_field('direct_managed_soils')

			frm.doc.direct_flooded_rice = []
			// frm.fields_dict.direct_flooded_rice.df.hidden = 1
			frm.refresh_field('direct_flooded_rice')

			frm.doc.direct_managed_organic_soils = []
			// frm.fields_dict.direct_managed_organic_soils.df.hidden = 1
			frm.refresh_field('direct_managed_organic_soils')

			frm.doc.direct_grazed_soils = []
			// frm.fields_dict.direct_grazed_soils.df.hidden = 1
			frm.refresh_field('direct_grazed_soils')
		}

		//Indirect N2O Emissions from managed soils//
		if(frm.doc.sub_sector == '3.D.2. Indirect N2O Emissions from managed soils'){
			var table_name_list = {
				'atmospheric_deposit': 'N2O Atmospheric Deposition',
				'n2o_from_n_leaching': 'N2O from N Leaching/ Runoff',
				
			}
			for (let table in table_name_list){
				console.log(table_name_list[table]);
				frm.call({
					doc:cur_frm.doc,
					method:"get_data",
					async:false,
					args:{
						table_name: table_name_list[table]
					},
					callback:function(r){
						console.log(r.message); 
							frm.doc[`${table}`] = []
							for(var i of r.message){
								var child = frm.add_child(`${table}`)
								child.description= i.description
								child.value = i.value
								child.unit= i.unit
								child.reference = i.reference
							}
							frm.refresh_field(`${table}`)
					}
				})
			}
			// frm.fields_dict.atmospheric_deposit.df.hidden = 0
			frm.refresh_field('atmospheric_deposit')

			// frm.fields_dict.n2o_from_n_leaching.df.hidden = 0
			frm.refresh_field('n2o_from_n_leaching')

		}
		else{
			
			frm.doc.atmospheric_deposit = []
			// frm.fields_dict.atmospheric_deposit.df.hidden = 1
			frm.refresh_field('atmospheric_deposit')

			frm.doc.n2o_from_n_leaching = []
			// frm.fields_dict.n2o_from_n_leaching.df.hidden = 1
			frm.refresh_field('n2o_from_n_leaching')
		}

		// //Urea Application//
		// if(frm.doc.sub_sector == '3.C.6. Indirect N2O Emissions from manure management'){
		// 	// frm.fields_dict.indirect_manure_management.df.hidden = 0
		// 	frm.refresh_field('indirect_manure_management')
		// }
		// else{
		// 	frm.doc.indirect_manure_management = []
		// 	// frm.fields_dict.indirect_manure_management.df.hidden = 1
		// 	frm.refresh_field('indirect_manure_management')
		// }
	},
	

	/////////////////////////////////////////////////////////////////////
	/////////// Conditions to Show/Hide Respective Table Fields /////////
	///////////////////////////SUB-CATEGORY//////////////////////////////
	/////////////////////////////////////////////////////////////////////
	sub_category:function(frm){
		if(frm.doc.sub_category){
		dynamicTitleList[3] = "/"+frm.doc.sub_category}
		frm.set_value('dynamic_title',dynamicTitleList.join(''))
		frm.refresh_field('dynamic_title')
		// cur_frm.fields_dict.table_label.df.options = frm.doc.sub_category
		// frm.set_value("table_label",frm.doc.sub_category)
		if(frm.doc.sub_category != ""){
			frm.call({
				doc:frm.doc,
				method:"get_table",
				callback:function(r){
					for (var i of r.message){
						$(`[data-fieldname=${i}] [class="control-label"]`).prop("textContent",`${frm.doc.sub_category}`)
						frm.refresh_field(i)
					}
				
				}
			})
			
		}
		// cur_frm.fields_dict.table_label.df.label = frm.doc.sub_category
		// frm.update_docfield_property('manufacturing_industries','label','Hello')
		// frm.refresh_field('manufacturing_industries')
		// if(frm.doc.sub_category == '1.A.1.a.i. Electricity generation'){
		// 	// frm.fields_dict.electricity_generation.df.hidden = 0
		// 	frm.refresh_field('electricity_generation')
		// }
		// else{
			
		// 	frm.doc.electricity_generation = []
		// 	// frm.fields_dict.electricity_generation.df.hidden = 1
		// 	frm.refresh_field('electricity_generation')
		// }
	},


	year:function(frm){
		var tableList = {
			'3.A. Enteric fermentation':'enteric_fermentation',
			'3.B.5. Indirect N2O emissions':'indirect_manure_management' 
		}
		for (var j of Object.keys(tableList)){
			if(frm.doc.category == j || frm.doc.sub_sector == j){
				frm.call({
					doc:frm.doc,
					method:"get_livestock_details",
					async:false,
					callback:function(r){
						frm.doc[`${tableList[j]}`] = []
						for (var i of r.message){
							console.log(tableList[j])
							var child = frm.add_child(`${tableList[j]}`)
							child.category = i.category,
							child.heads = i.heads
						}
						frm.refresh_field(`${tableList[j]}`)
					}
				})
			}
		}
		

		if (frm.doc.category == '5.A. Solid waste disposal'){
			frappe.db.exists('Waste Population Master List',frm.doc.year).then(exists =>{
				if (exists){
				frappe.db.get_doc('Waste Population Master List',frm.doc.year).then(
					doc => {
						frm.doc.solid_waste = []
						console.log(frm.doc.year);
						console.log(doc.rural_population);
						let row = frm.add_child('solid_waste')
						row.urban_population = doc.urban_population
						frm.refresh_field('solid_waste')
						console.log(doc);
					}
				)
				}
				else{
					frappe.show_alert({
						message:__('No Data'),
						// indicator:'orange'
					}, 2);
					frm.doc.solid_waste = []
					frm.refresh_field('solid_waste')
				}
			})
		}

		if (frm.doc.category == '5.D. Wastewater treatment and discharge'){
			frappe.db.exists('Waste Population Master List',frm.doc.year).then(exists =>{
				if (exists){
				frappe.db.get_doc('Waste Population Master List',frm.doc.year).then(
					doc => {
						frm.doc.ch4_wastewater_treatment = []
						frm.doc.n2o_wastewater_treatment = []
						console.log(frm.doc.year);
						console.log(doc.rural_population);
						frm.add_child('ch4_wastewater_treatment',{
							population : doc.total_population
						})
						frm.refresh_field('ch4_wastewater_treatment')
						frm.add_child('n2o_wastewater_treatment',{
							population : doc.total_population
						})
						frm.refresh_field('n2o_wastewater_treatment')
					}
				)
				}
				else{
					frappe.show_alert({
						message:__('No Data'),
						// indicator:'orange'
					}, 2);
					frm.doc.ch4_wastewater_treatment = []
					frm.doc.n2o_wastewater_treatment = []
					frm.refresh_field('ch4_wastewater_treatment')
					frm.refresh_field('n2o_wastewater_treatment')
				}
			})
		}
		if (frm.doc.category == '5.C. Incineration and open burning of waste'){
			frappe.db.exists('Waste Population Master List',frm.doc.year).then(exists =>{
				if (exists){
				frappe.db.get_doc('Waste Population Master List',frm.doc.year).then(
					doc => {
						frm.doc.open_burning_of_waste = []
						console.log(frm.doc.year);
						console.log(doc.rural_population);
						frm.add_child('open_burning_of_waste',{
							urban_population : doc.total_population
						})
						frm.refresh_field('open_burning_of_waste')
					}
				)
				}
				else{
					frappe.show_alert({
						message:__('No Data'),
						// indicator:'orange'
					}, 2);
					frm.doc.ch4_wastewater_treatment = []
					frm.doc.n2o_wastewater_treatment = []
					frm.refresh_field('ch4_wastewater_treatment')
					frm.refresh_field('n2o_wastewater_treatment')
				}
			})
		}

		// let mappedData = {
		// 	'Sub Category':{
		// 		'1.A.1.a.i. Electricity generation':'electricity_generation',
		// 	},
		// 	'Sub Sector':{
		// 		'1.A.3. Transport':'transport',
		// 		'1.A.4. Other sectors':'others',
		// 		'2.D.1. Lubricant use':'lubricant_use',
		// 		'3.A.1. Enteric Fermentation':'enteric_fermentation',
		// 		'3.A.2. Manure Management':'manure_management',
		// 		'3.B.1. Forest Land':'forest_land',
		// 		'3.C.3. Urea Application':'urea_application',
		// 		'3.C.4. Direct N2O Emissions from managed soils':['direct_managed_soils','direct_flooded_rice',
		// 													  'direct_managed_organic_soils','direct_grazed_soils'],
		// 		'3.C.5. Indirect N2O Emissions from managed soils':['atmospheric_deposit','n2o_from_n_leaching'],
		// 		'3.C.6. Indirect N2O Emissions from manure management':'indirect_manure_management',
		// 	},
		// 	'Category':{
		// 		'4.A. Solid Waste Disposal':'solid_waste',
		// 		'4.D. Wastewater Treatment and Discharge':['ch4_wastewater_treatment',
		// 											   'n2o_wastewater_treatment','industrial_wastewater_treatment']
		// 	},
		// 	'Reference Approach':'reference_approach',
		// }
		// if(frm.doc.sub_category){

		// }
		// else if(frm.doc.sub_sector){
		// 	if(frm.doc.sub_sector in mappedData['Sub Sector']){

		// 	}
		// }
		// else if(frm.doc.category){

		// }
	}

	// table_type: function(frm){
	// 	// var table =''
	// 	// var table_name_values = frm.doc.table_type
	// 	// table_name_values = table_name_values.split(" ")
	// 	// table_name_values.unshift('direct')
	// 	// table = table_name_values.join("_")
	// 	// table = table.toLowerCase()
	// 	// console.log(table);

	// 	let table_name_list = ['direct_managed_soils','direct_flooded_rice','direct_managed_organic_soils','direct_grazed_soils']
	// 	frm.call({
	// 		doc:cur_frm.doc,
	// 		method:"get_data",
	// 		async:false,
	// 		args:{
	// 			table_name:frm.doc.table_type
	// 		},
	// 		callback:function(r){
	// 			console.log(r.message);
	// 			for (var table of table_name_list){ 
	// 				frm.doc[`${table}`] = []
	// 				for(var i of r.message){
	// 					var child = frm.add_child(`${table}`)
	// 					child.anthropogenic_n_input= i.anthropogenic_n_input
	// 					child.amount = i.amount
	// 					child.emission_factor= i.emission_factor
	// 					child.reference = i.reference
	// 				}
	// 				frm.refresh_field(`${table}`)
	// 			}
	// 		}
	// 	})
	// }

});

frappe.ui.form.on('Energy Reference ChildTable',{
	reference_approach_add(frm, cdt, cdn) {
		var d = locals[cdt][cdn]
		frappe.db.get_list('Energy Fuel Master List',{
			fields : ['fuel_type'],
			order_by : 'fuel_type asc',
			group_by:'fuel_type',
			pluck: 'fuel_type'
		}).then(r =>{
			var fuel_type_options = ""
			for (var i of r){
				fuel_type_options += ('\n'+ i)
			}
			cur_frm.grids[0].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
			frm.refresh_field('reference_approach')
			console.log(fuel_type_options);
		});
	},
	fuel_type:function(frm,cdt,cdn){
		var d = locals[cdt][cdn]
		frappe.db.get_list('Energy Fuel Master List',{
			fields : ['fuel'],
			filters:{fuel_type:d.fuel_type},
			order_by : 'fuel asc',
			pluck: 'fuel'
		}).then(r =>{
			var fuel_options = ""
			for (var i of r){
				fuel_options += ('\n'+ i)
			}
			if(cur_frm.doc.reference_approach.length != 0 && frm.doc.approach=="Reference Approach"){
				cur_frm.grids[0].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('reference_approach')
			}
		})
	}
})

frappe.ui.form.on('Energy Sector ChildTable', {
	refresh:function(frm,cdt,cdn){
		if(frm.doc.electricity_generation.length !=0 || frm.doc.manufacturing_industries.length !=0 || frm.doc.transport.length !=0 || frm.doc.other_sectors.length !=0 || frm.doc.other_energy.length !=0 || frm.doc.international_bunkers.length !=0){
			
			frappe.db.get_list('Energy Fuel Master List',{
				fields : ['fuel_type'],
				order_by : 'fuel_type asc',
				group_by:'fuel_type',
				pluck: 'fuel_type'
			}).then(r =>{
				var fuel_type_options = ""
				for (var i of r){
					fuel_type_options += ('\n'+ i)
				}
				for ( var row in frm.doc.electricity_generation){
					cur_frm.grids[1].grid.grid_rows[row].columns.fuel_type.df.options = fuel_type_options
					if(row.fuel_type){
						frappe.db.get_list('Energy Fuel Master List',{
							fields : ['fuel'],
							filters:{fuel_type:row.fuel_type},
							order_by : 'fuel asc',
							pluck: 'fuel'
						}).then(r =>{
							var fuel_options = ""
							for (var i of r){
								fuel_options += ('\n'+ i)
							}
							if(cur_frm.doc.electricity_generation.length != 0 && frm.doc.sub_sector=="1.A.1. Energy industries"){
								cur_frm.grids[1].grid.grid_rows[row].columns.fuel.df.options = fuel_options
								frm.refresh_field('electricity_generation')
								}
							})
						}
				}
				frm.refresh_field('electricity_generation')
				console.log(fuel_type_options);
			});
			if(d.fuel_type){
				frappe.db.get_list('Energy Fuel Master List',{
					fields : ['fuel'],
					filters:{fuel_type:d.fuel_type},
					order_by : 'fuel asc',
					pluck: 'fuel'
				}).then(r =>{
					var fuel_options = ""
					for (var i of r){
						fuel_options += ('\n'+ i)
					}
					console.log(fuel_options);
					if(cur_frm.doc.electricity_generation.length != 0 && frm.doc.sub_sector=="1.A.1. Energy industries"){
						cur_frm.grids[1].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
						frm.refresh_field('electricity_generation')
						}
					if(cur_frm.doc.manufacturing_industries.length != 0 && frm.doc.sub_sector=="1.A.2 Manufacturing industries and construction"){
						console.log(fuel_options);
						cur_frm.grids[2].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
						frm.refresh_field('manufacturing_industries')
						}
					if(cur_frm.doc.transport.length != 0 && frm.doc.sub_sector=="1.A.3. Transport"){
						cur_frm.grids[3].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
						frm.refresh_field('transport')
						}
					if(cur_frm.doc.other_sectors.length != 0 && frm.doc.sub_sector=="1.A.4. Other sectors"){
						cur_frm.grids[4].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
						frm.refresh_field('other_sectors')
						}
					if(cur_frm.doc.other_energy.length != 0 && frm.doc.sub_sector=="1.A.5. Other"){
						cur_frm.grids[5].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
						frm.refresh_field('other_energy')
						}
					if(cur_frm.doc.international_bunkers.length != 0 && frm.doc.sub_sector=="1.D.1. International bunkers"){
						cur_frm.grids[6].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
						frm.refresh_field('international_bunkers')
						}
					console.log("fuel_options",fuel_options);
				});
			}
		}
	},
	electricity_generation_add(frm, cdt, cdn) {
		var d = locals[cdt][cdn]
		frappe.db.get_list('Energy Fuel Master List',{
			fields : ['fuel_type'],
			order_by : 'fuel_type asc',
			group_by:'fuel_type',
			pluck: 'fuel_type'
		}).then(r =>{
			var fuel_type_options = ""
			for (var i of r){
				fuel_type_options += ('\n'+ i)
			}
			cur_frm.grids[1].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
			frm.refresh_field('electricity_generation')
			console.log(fuel_type_options);
		});
	},
	manufacturing_industries_add(frm, cdt, cdn) {
		var d = locals[cdt][cdn]
		frappe.db.get_list('Energy Fuel Master List',{
			fields : ['fuel_type'],
			order_by : 'fuel_type asc',
			group_by:'fuel_type',	
			pluck: 'fuel_type'
		}).then(r =>{
			var fuel_type_options = ""
			for (var i of r){
				fuel_type_options += ('\n'+ i)
			}
			cur_frm.grids[2].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
			frm.refresh_field('manufacturing_industries')
			console.log(fuel_type_options);
		});
	},
    transport_add(frm, cdt, cdn) {
			var d = locals[cdt][cdn]
			frappe.db.get_list('Energy Fuel Master List',{
				fields : ['fuel_type'],
				order_by : 'fuel_type asc',
				group_by:'fuel_type',
				pluck: 'fuel_type'
			}).then(r =>{
				var fuel_type_options = ""
				for (var i of r){
					fuel_type_options += ('\n'+ i)
				}
				cur_frm.grids[3].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
				frm.refresh_field('transport')
				console.log(fuel_type_options);
			});
    },
	other_sectors_add(frm, cdt, cdn) {
			var d = locals[cdt][cdn]
			frappe.db.get_list('Energy Fuel Master List',{
				fields : ['fuel_type'],
				order_by : 'fuel_type asc',
				group_by:'fuel_type',
				pluck: 'fuel_type'
			}).then(r =>{
				var fuel_type_options = ""
				for (var i of r){
					fuel_type_options += ('\n'+ i)
				}
				cur_frm.grids[4].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
				frm.refresh_field('other_sectors')
				console.log(fuel_type_options);
		});
	},
	other_energy_add(frm, cdt, cdn) {
			var d = locals[cdt][cdn]
			frappe.db.get_list('Energy Fuel Master List',{
				fields : ['fuel_type'],
				order_by : 'fuel_type asc',
				group_by:'fuel_type',
				pluck: 'fuel_type'
			}).then(r =>{
				var fuel_type_options = ""
				for (var i of r){
					fuel_type_options += ('\n'+ i)
				}
				cur_frm.grids[5].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
				frm.refresh_field('other_energy')
				console.log(fuel_type_options);
		});
	},
	international_bunkers_add(frm, cdt, cdn) {
			var d = locals[cdt][cdn]
			frappe.db.get_list('Energy Fuel Master List',{
				fields : ['fuel_type'],
				order_by : 'fuel_type asc',
				group_by:'fuel_type',
				pluck: 'fuel_type'
			}).then(r =>{
				var fuel_type_options = ""
				for (var i of r){
					fuel_type_options += ('\n'+ i)
				}
				cur_frm.grids[6].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
				frm.refresh_field('international_bunkers')
				console.log(fuel_type_options);
		});
	},
	fuel_type:function(frm,cdt,cdn){
		var d = locals[cdt][cdn]
		frappe.db.get_list('Energy Fuel Master List',{
			fields : ['fuel'],
			filters:{fuel_type:d.fuel_type},
			order_by : 'fuel asc',
			pluck: 'fuel'
		}).then(r =>{
			var fuel_options = ""
			for (var i of r){
				fuel_options += ('\n'+ i)
			}
			console.log(fuel_options);
			if(cur_frm.doc.electricity_generation.length != 0 && frm.doc.sub_sector=="1.A.1. Energy industries"){
				cur_frm.grids[1].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('electricity_generation')
				}
			if(cur_frm.doc.manufacturing_industries.length != 0 && frm.doc.sub_sector=="1.A.2 Manufacturing industries and construction"){
				console.log(fuel_options);
				cur_frm.grids[2].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('manufacturing_industries')
				}
			if(cur_frm.doc.transport.length != 0 && frm.doc.sub_sector=="1.A.3. Transport"){
				cur_frm.grids[3].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('transport')
				}
			if(cur_frm.doc.other_sectors.length != 0 && frm.doc.sub_sector=="1.A.4. Other sectors"){
				cur_frm.grids[4].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('other_sectors')
				}
			if(cur_frm.doc.other_energy.length != 0 && frm.doc.sub_sector=="1.A.5. Other"){
				cur_frm.grids[5].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('other_energy')
				}
			if(cur_frm.doc.international_bunkers.length != 0 && frm.doc.sub_sector=="1.D.1. International bunkers"){
				cur_frm.grids[6].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
				frm.refresh_field('international_bunkers')
				}
			console.log("fuel_options",fuel_options);
		});
	}
});

frappe.ui.form.on('IPPU Chemical ChildTable',{
	chemical_industry_add:function(frm,cdt,cdn){
		var d = locals[cdt][cdn]
		var chemicalOptionsList = ["2.B.1. Ammonia production","2.B.2. Nitric acid production","2.B.3. Adipic acid production","2.B.4. Caprolactam, glyoxal and glyoxylic acid production","2.B.5. Carbide production","2.B.6. Titanium dioxide production","2.B.7. Soda ash production","2.B.8. Petrochemical and carbon black production","2.B.9. Fluorochemical production","2.B.10. Other"]
		for(var i of frm.doc.chemical_industry){
			if(chemicalOptionsList.includes(i.chemical)){
				const index = chemicalOptionsList.indexOf(i.chemical);
				if (index > -1) { // only splice array when item is found
					chemicalOptionsList.splice(index, 1); // 2nd parameter means remove one item only
					}
			}
		}
		var chemicalOptions = ""
		for(var i of chemicalOptionsList){
			chemicalOptions += i + "\n"
		}
		cur_frm.grids[11].grid.grid_rows[d.idx-1].columns.chemical.df.options = chemicalOptions
		frm.refresh_field('chemical_industry')
	}
})





// Functions //

// function populateFourTables(frm){
// 	let table_name_list = ['direct_managed_soils','direct_flooded_rice','direct_managed_organic_soils','direct_grazed_soils']
// 		frm.call({
// 			doc:cur_frm.doc,
// 			method:"get_data",
// 			async:false,
// 			args:{
// 				table_name:frm.doc.table_type
// 			},
// 			callback:function(r){
// 				console.log(r.message);
// 				for (var table of table_name_list){ 
// 					frm.doc[`${table}`] = []
// 					for(var i of r.message){
// 						var child = frm.add_child(`${table}`)
// 						child.anthropogenic_n_input= i.anthropogenic_n_input
// 						child.amount = i.amount
// 						child.emission_factor= i.emission_factor
// 						child.reference = i.reference
// 					}
// 					frm.refresh_field(`${table}`)
// 				}
// 			}
// 		})
// }