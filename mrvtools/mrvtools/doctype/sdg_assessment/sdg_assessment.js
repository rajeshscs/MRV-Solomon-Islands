// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('SDG Assessment', {
	refresh: function(frm) {
		frm.call("getValues").then(r =>{
			// console.log(r.message)
			var valueList = r.message
			if (frm.doc.quantitative_impact.length == 0){
				for (var i in valueList){
					if (valueList[i].table == "Qualitative"){
						let row = frm.add_child('qualitative_impact', {
							category: valueList[i].impact_area,
							question: valueList[i].indicator
						});
						frm.refresh_field('qualitative_impact');
						frm.fields_dict['qualitative_impact'].df.hidden = 1
					}
						if (valueList[i].table == "Quantitative"){
							let row = frm.add_child('quantitative_impact', {
								category: valueList[i].impact_area,
								question: valueList[i].indicator
							});
							frm.refresh_field('quantitative_impact');
							frm.fields_dict['quantitative_impact'].df.hidden = 1
					}
				}
			}
		})
	},
	select_all : function(frm){
		frm.doc.poverty_reduction_check = 1
		frm.doc.reducing_inequality_check = 1
		frm.doc.gender_pairity_check = 1
		frm.refresh_field('poverty_reduction_check')
		frm.refresh_field('reducing_inequality_check')
		frm.refresh_field('gender_pairity_check')
	},
	unselect_all : function(frm){
		frm.doc.poverty_reduction_check = 0
		frm.doc.reducing_inequality_check = 0
		frm.doc.gender_pairity_check = 0
		frm.refresh_field('poverty_reduction_check')
		frm.refresh_field('reducing_inequality_check')
		frm.refresh_field('gender_pairity_check')
	},
	fetch : function(frm){
		for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
			var name = row.doc.name
			$(`[data-name="${name}"]`).css("display","block")
		}
		for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
			var name = row.doc.name
			$(`[data-name="${name}"]`).css("display","block")
		}

		let check_list = ["poverty_reduction_check","reducing_inequality_check","gender_pairity_check"]
		let unchecked_category_list = []
		for (let i of check_list){
			if(frm.doc[i] != 1){
				let cur_category = i.split("_");
				cur_category.pop()
				cur_category = cur_category.join(" ")
				cur_category = toTitleCase(cur_category)
				unchecked_category_list.push(cur_category)
			}
		}
		console.log(unchecked_category_list);
		for (let category of unchecked_category_list){
			filter_child_tables(category)
		}
		function filter_child_tables(category){
			for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
						if (row.doc.category == category){
							var name = row.doc.name
							console.log(name)
							$(`[data-name="${name}"]`).css("display","none")
						}
						// else{
						// 	$(`[data-name="${name}"]`).css("display","block")
						// }
					}
					// frm.refresh_field("qualitative_impact")

			for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
						if (row.doc.category == category){
							var name = row.doc.name
							$(`[data-name="${name}"]`).css("display","none")
						}
						// else{
						// 	$(`[data-name="${name}"]`).css("display","block")
						// }
					}
					// frm.refresh_field("quantitative_impact")
				}
		
		// //POVERTY REDUCTION
		// if (frm.doc.poverty_reduction_check == 1){
		// 	// console.log('Hi')
		// 	var table = frm.doc.qualitative_impact
		// 	// console.log(table);
		// 	for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
		// 		if (row.doc.category != "Poverty Reduction"){
		// 			var name = row.doc.name
		// 			console.log(name)
		// 			$(`[data-name="${name}"]`).css("display","none")
		// 		}else{
		// 			$(`[data-name="${name}"]`).css("display","block")
		// 		}
		// 	}
		// 	frm.refresh_field("quantitative_impact")

		// 	for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
		// 		if (row.doc.category != "Poverty Reduction"){
		// 			var name = row.doc.name
		// 			$(`[data-name="${name}"]`).css("display","none")
		// 		}else{
		// 			$(`[data-name="${name}"]`).css("display","block")
		// 		}
		// 	}
		// 	frm.refresh_field("quantitative_impact")
		// }

		// //GENDER PAIRITY
		// if (frm.doc.gender_pairity_check == 1){
		// 	// console.log('Hi')
		// 	var table = frm.doc.qualitative_impact
		// 	// console.log(table);
		// 	for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
		// 		if (row.doc.category != "Gender Pairity"){
		// 			var name = row.doc.name
		// 			console.log(name)
		// 			$(`[data-name="${name}"]`).css("display","none")
		// 		}else{
		// 			$(`[data-name="${name}"]`).css("display","block")
		// 		}
		// 	}
		// 	frm.refresh_field("quantitative_impact")
			
		// 	for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
		// 		if (row.doc.category != "Gender Pairity"){
		// 			var name = row.doc.name
		// 			$(`[data-name="${name}"]`).css("display","none")
		// 		}else{
		// 			$(`[data-name="${name}"]`).css("display","block")
		// 		}
		// 	}
		// 	frm.refresh_field("quantitative_impact")
		// }

		// //REDUCING INEQUALITY
		// if (frm.doc.reducing_inequality_check == 1){
		// 	// console.log('Hi')
		// 	var table = frm.doc.qualitative_impact
		// 	// console.log(table);
		// 	for (var row of cur_frm.fields_dict.qualitative_impact.grid.grid_rows){
		// 		if (row.doc.category != "Reducing Inequality"){
		// 			var name = row.doc.name
		// 			console.log(name)
		// 			$(`[data-name="${name}"]`).css("display","none")
		// 		}else{
		// 			$(`[data-name="${name}"]`).css("display","block")
		// 		}
		// 	}
		// 	frm.refresh_field("quantitative_impact")
			
		// 	for (var row of cur_frm.fields_dict.quantitative_impact.grid.grid_rows){
		// 		if (row.doc.category != "Reducing Inequality"){
		// 			var name = row.doc.name
		// 			$(`[data-name="${name}"]`).css("display","none")
		// 		}else{
		// 			$(`[data-name="${name}"]`).css("display","block")
		// 		}
		// 	}
		// 	frm.refresh_field("quantitative_impact")
		// }
		
		// frm.refresh_field('qualitative_impact');
		// frm.refresh_field('quantitative_impact');
		if (frm.fields_dict['qualitative_impact'].df.hidden == 1 && unchecked_category_list.length < 3){
			console.log("Unhide!");
			frm.fields_dict['qualitative_impact'].df.hidden = 0
			frm.refresh_field('qualitative_impact');
			frm.fields_dict['quantitative_impact'].df.hidden = 0
			frm.refresh_field('quantitative_impact');
		}
		else{
			console.log("Select a Category");
		}
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