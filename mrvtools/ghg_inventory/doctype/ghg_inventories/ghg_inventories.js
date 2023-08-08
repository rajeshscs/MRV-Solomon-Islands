// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('GHG Inventories', {
	refresh: function(frm) {
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
			// console.log(sector_options);
		})

	},

	sector: function(frm){
		frappe.db.get_list('GHG Category',{
			filters : {sector:frm.doc.sector},
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			var category_options = ""
			for (var i of r){
				category_options += ('\n'+ i)
			}
			cur_frm.fields_dict.category.df.options = category_options
			frm.refresh_field('category')
			// console.log(category_options);
		});


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
		else{
			frm.fields_dict.category.df.hidden = 0
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 0
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 0
			frm.refresh_field('sub_sector')

			frm.set_value('approach',"")
			frm.refresh_field('approach')

			frm.fields_dict.approach.df.hidden = 1
			frm.refresh_field('approach')
		};
		frm.set_query("category", function(){
            return {
                filters: {
                    sector : frm.doc.sector
                }
            }
        });
		frm.set_value('category',"")
		frm.refresh_field('category')

	},
	approach:function(frm){
		if (frm.doc.approach == 'Sectoral Approach'){

			frm.fields_dict.category.df.hidden = 0
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 0
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 0
			frm.refresh_field('sub_sector')
		}
		if (frm.doc.approach == 'Reference Approach'){
			frm.fields_dict.reference_approach.df.hidden = 0
			frm.refresh_field('reference_approach')

			frm.fields_dict.category.df.hidden = 1
			frm.refresh_field('category')

			frm.fields_dict.sub_category.df.hidden = 1
			frm.refresh_field('sub_category')

			frm.fields_dict.sub_sector.df.hidden = 1
			frm.refresh_field('sub_sector')
		}
		else{
			frm.fields_dict.reference_approach.df.hidden = 1
			frm.refresh_field('reference_approach')
		}
		// else{
		// 	frm.fields_dict.category.df.hidden = 1
		// 	frm.refresh_field('category')

		// 	frm.fields_dict.sub_category.df.hidden = 1
		// 	frm.refresh_field('sub_category')

		// 	frm.fields_dict.sub_sector.df.hidden = 1
		// 	frm.refresh_field('sub_sector')
		// }
	},
	category: function(frm){
		frappe.db.get_list('GHG Sub Sector',{
			filters : {category:frm.doc.category},
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			var sub_sector_options = ""
			for (var i of r){
				sub_sector_options += ('\n'+ i)
			}
			cur_frm.fields_dict.sub_sector.df.options = sub_sector_options
			frm.refresh_field('sub_sector')
			// console.log(sub_sector_options);
		});
	},
	sub_sector: function(frm){
		frappe.db.get_list('GHG Sub Category',{
			filters : {sub_sector:frm.doc.sub_sector},
			order_by : 'name asc',
			pluck: 'name'
		}).then(r =>{
			var sub_category_options = ""
			for (var i of r){
				sub_category_options += ('\n'+ i)
			}
			cur_frm.fields_dict.sub_category.df.options = sub_category_options
			frm.refresh_field('sub_category')
			// console.log(sub_category_options);
		});

		if(frm.doc.sub_sector == '1.A.4. Other sectors'){
			frm.fields_dict.others.df.hidden = 0
			frm.refresh_field('others')
		}
		else{
			frm.fields_dict.others.df.hidden = 1
			frm.refresh_field('others')
		}
		if(frm.doc.sub_sector == '1.A.3. Transport'){
			frm.fields_dict.transport.df.hidden = 0
			frm.refresh_field('transport')
		}
		else{
			frm.fields_dict.transport.df.hidden = 1
			frm.refresh_field('transport')
		}
	},

	sub_category:function(frm){
		if(frm.doc.sub_category == '1.A.1.a.i. Electricity generation'){
			frm.fields_dict.electricity_generation.df.hidden = 0
			frm.refresh_field('electricity_generation')
		}
		else{
			frm.fields_dict.electricity_generation.df.hidden = 1
			frm.refresh_field('electricity_generation')
		}
	}

});

frappe.ui.form.on('Energy Sector ChildTable', {
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
				cur_frm.grids[2].grid.grid_rows[d.idx-1].columns.fuel_type.df.options = fuel_type_options
				frm.refresh_field('transport')
				console.log(fuel_type_options);
			});
    },
	others_add(frm, cdt, cdn) {
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
			frm.refresh_field('others')
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
			cur_frm.grids[1].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			frm.refresh_field('electricity_generation')
			cur_frm.grids[2].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			frm.refresh_field('transport')
			cur_frm.grids[3].grid.grid_rows[d.idx-1].columns.fuel.df.options = fuel_options
			frm.refresh_field('others')
			console.log(fuel_options);
		});
	}
});