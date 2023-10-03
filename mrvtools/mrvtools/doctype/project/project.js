// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project', {

	get_location:function(frm){
		var existingGeoJSON = frm.doc.geographical_co_ordinate || '{"type":"FeatureCollection","features":[]}';
		var parsedGeoJSON = JSON.parse(existingGeoJSON);
				
		// New point coordinates
		var coordinatesList = frm.doc.coordinates.split(',');
		var latLetter = coordinatesList[0][coordinatesList[0].length-1]
		var longLetter = coordinatesList[1][coordinatesList[1].length-1]

		if(latLetter == 'S'){
			var latitude = parseFloat(coordinatesList[0]);
			latitude = -latitude
		}
		else{
			var latitude = parseFloat(coordinatesList[0]);
		}

		if(longLetter == 'W'){
			var longitude = parseFloat(coordinatesList[1]);
			longitude = -longitude
		}
		else{
			longitude = parseFloat(coordinatesList[1]);
		}

		// Check if the coordinates are valid numbers
		if (!isNaN(latitude) && !isNaN(longitude)) {
			var newFeature = {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "Point",
					"coordinates": [longitude, latitude]
				}
			};
			
			// Check if the new feature already exists in parsedGeoJSON
			var isFeatureExists = parsedGeoJSON.features.some(function(feature) {
				return (
					feature.geometry.coordinates[1] === longitude &&
					feature.geometry.coordinates[0] === latitude
				);
			});
			
			// Add the new feature only if it doesn't exist already
			if (!isFeatureExists) {
				parsedGeoJSON.features.push(newFeature);
			}
		}

		var updatedGeoJSON = JSON.stringify(parsedGeoJSON);
		// Set the updated GeoJSON string to the geolocation field
		frm.set_value('geographical_co_ordinate', updatedGeoJSON);
		frm.set_value("coordinates","") 
	},



	objective: function(frm){
		if(!frm.doc.objective){
			frm.set_df_property('key_sector','hidden',1)
			frm.refresh_field('key_sector')
		}
		else{
			frm.set_df_property('key_sector','hidden',0)
			frm.refresh_field('key_sector')
		}
	},

	
	key_sector:function(frm){
		if(!frm.doc.key_sector){
			frm.set_df_property('key_sub_sector','hidden',1)
			frm.refresh_field('key_sub_sector')
		}
		else{
			frm.set_df_property('key_sub_sector','hidden',0)
			frm.refresh_field('key_sub_sector')
		}
	},


	before_save:function(frm){
		if (frm.doc.workflow_state != "Approved"  && !frm.doc.__islocal){
			var list=[]
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
						if (field_name_list.includes(i.field_name) ){
							if (i.field_name != "included_in" && i.field_name != "geographical_co_ordinate" && i != "original_coordinates"&& i != "new_coordinates"){
								i.new_values = frm.doc[`${i.field_name}`]
								frm.set_value(i.field_name,i.old_values)
							}
							else if(i.field_name == "included_in"){
								var included_in_result = ""
								console.log(frm.doc.included_in);
								for(var res of frm.doc.included_in){
									if(included_in_result == ""){
										included_in_result += res.included_in
									}else{
										included_in_result += ","
										included_in_result += res.included_in
									}
								}
								console.log(included_in_result);
								i.new_values = included_in_result
								list=i.old_values.split(",")
								frm.clear_table("included_in")
								for (var value of list){
									var row = frm.add_child("included_in")
									row.included_in = value
								}
								frm.refresh_field("included_in")
								console.log(list);
							}
							
							
							console.log("i","=",i.new_values);
							frm.refresh_field("edited_project_details")
							const index = field_name_list.indexOf(i.field_name);
							const x = field_name_list.splice(index, 1)
						}
					}
					if (field_name_list){
						var list2=[]
						console.log("field_name_list"," = ",field_name_list);
						
						for (var i of field_name_list){
							var label = i.replaceAll("_"," ")
							label = toTitleCase(label)
							console.log("label","=",label);
							var child =frm.add_child("edited_project_details")
							
							if (i != "included_in" && i != "geographical_co_ordinate" && i != "original_coordinates"&& i != "new_coordinates"){
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								child.new_values = frm.doc[`${i}`]
								frm.set_value(i,result[`${i}`])
							}
							else if(i == "included_in"){
								child.field_label = label
								child.field_name = i
								child.old_values = result[`${i}`]
								var included_in_result = ""
								console.log(frm.doc.included_in);
								for(var res of frm.doc.included_in){
									if(included_in_result == ""){
										included_in_result += res.included_in
									}else{
										included_in_result += ","
										included_in_result += res.included_in
									}
								}
								console.log(included_in_result);
								child.new_values = included_in_result
								list2 = result[`${i}`].split(",")
								// console.log("list1",result[`${i}`].split(","));
								console.log("list2",list2);
								frm.clear_table("included_in")
								for(var value of list2){
									var row = frm.add_child("included_in")
									console.log(value);
									row.included_in = value
								}
								frm.refresh_field("included_in")
							}
							else if(i == "geographical_co_ordinate"){
								frm.set_value("original_coordinates",result[`${i}`])
								frm.set_value("new_coordinates",frm.doc.geographical_co_ordinate)
								frm.set_value(i,result[`${i}`])
								console.log("old_values"," = ",result[`${i}`]);
								console.log(i," = ",frm.doc.geographical_co_ordinate);
							}
							
							
						}
					}
				}
			})
		}
		
	},


	refresh: function(frm){
		$('[id="project-tab2-tab"]').on('click',function(){
			frm.refresh_field('original_coordinates')
			frm.refresh_field('new_coordinates')
		})
		
		$('[id="project-tab1-tab"]').on('click',function(){
			frm.refresh_field('geographical_co_ordinate')
		})
		
		if (frm.doc.workflow_state == "Rejected"){
			$("head").append(`<style>[id="project-tab2-tab"] {display: none !important}</style>`)
			frm.set_value("edited_project_details",[])
			frm.set_value("original_coordinates",'')
			frm.refresh_field("original_coordinates")
			frm.set_value("new_coordinates",'')
			frm.refresh_field("new_coordinates")
			frm.set_value("workflow_state","Approved")
			frm.set_value('work_state','Approved')
			frm.dirty()
			frm.save()
		}
		if ((frm.doc.workflow_state == "Approved" && frm.doc.edited_project_details.length != 0) || (frm.doc.workflow_state == "Approved" && frm.doc.new_coordinates)){
			for (var i of frm.doc.edited_project_details){
				console.log("Field Name of i","=",i.field_name);
				if(i.field_name != "included_in" && i.field_name != "geographical_co_ordinate"){
					frm.set_value(i.field_name,i.new_values)
				}
				
				else if(i.field_name == "included_in"){
					var new_list = i.new_values.split(",")
					frm.clear_table("included_in")
					for (var value of new_list){
						var row = frm.add_child("included_in")
						row.included_in = value
					}
				}
				
			}
			frm.set_value("edited_project_details",[])
			// frm.fields_dict.edited_project_details.df.hidden = 1
			frm.set_value("geographical_co_ordinate",frm.doc.new_coordinates)
			frm.refresh_field("geographical_co_ordinate")
			console.log("Coordinates"," = ",frm.doc.geographical_co_ordinate);
			frm.set_value("original_coordinates",'')
			// frm.fields_dict.original_coordinates.df.hidden = 1
			frm.refresh_field("original_coordinates")
			frm.set_value("new_coordinates",'')
			// frm.fields_dict.new_coordinates.df.hidden = 1
			frm.refresh_field("new_coordinates")
			
			frm.dirty()
			frm.save()
			
			
		}
		if (frm.doc.workflow_state == "Approved"){
			if(!frm.doc.work_state){
				frm.set_value('work_state','Approved')
				frm.dirty()
				frm.save()
			}
			
		}
		if (frm.doc.workflow_state == "Approved" || frm.doc.__islocal){
			
			$("head").append(`<style>[id="project-tab2-tab"] {display: none !important}</style>`)
			// frm.toggle_display(['project_name', 'original_coordinates','new_coordinates'], frm.doc.workflow_state == 'Approved');
		}
		else{
			$("head").append(`<style>[id="project-tab2-tab"] {display:inline-block !important}</style>`)
			// frm.refresh_field("tab2")
			// frm.fields_dict.original_coordinates.df.hidden = 0
			// frm.refresh_field("original_coordinates")
			// frm.fields_dict.new_coordinates.df.hidden = 0
			// frm.refresh_field("new_coordinates")
			// frm.fields_dict.edited_project_details.df.hidden = 0
			// frm.refresh_field("edited_project_details")
		}

		frm.call({
		doc:frm.doc,
		method:'get_user',
		async:false,
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
		})
		if(!frm.doc.objective){
		frm.set_df_property('key_sector','hidden',1)
		frm.refresh_field('key_sector')
		frm.set_df_property('key_sub_sector','hidden',1)
		frm.refresh_field('key_sub_sector')
		}
		else{
		frm.set_df_property('key_sector','hidden',0)
		frm.refresh_field('key_sector')
		frm.set_df_property('key_sub_sector','hidden',0)
		frm.refresh_field('key_sub_sector')
		}

		frm.set_query("key_sector", function(){
			return {
				filters: {
					objective : frm.doc.objective
				}
			}
		});
		frm.set_query("key_sub_sector", function(){
			return {
				filters: {
					key_sector : frm.doc.key_sector
				}
			}
		});
	}
});
function toTitleCase(str) {
	return str.replace(
	  /\w\S*/g,
	  function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  }
	); 
}