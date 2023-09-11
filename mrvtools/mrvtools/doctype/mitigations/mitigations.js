// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Mitigations', {
	project_name: function(frm) {
		frm.call({
			doc:cur_frm.doc,
			method:"get_data",
			async:false,
			callback:function(r){
				var values=[]
				for(var i of r.message){
					values.push(i)
					console.log(i);					
				}
				console.log(values);
				values=values.join(",")
				console.log(values);
				
				frm.set_value("included_in",values)
			}
		})
	
	// project_name: function(frm) {
		// frm.call({
		// 	doc:cur_frm.doc,
		// 	method:"get_data",
		// 	async:false,
		// 	callback:function(r){
		// 		console.log(r.message);
		// 		for( var i of r.message){
		// 			var child = frm.add_child("included_in")
		// 		}
		// 	}
		// })
		
	},
	refresh: function(frm){
		// Sample
		// frm.call({
		// 	doc:frm.doc,
		// 	method:'sample',
		// 	async: false,
		// 	callback: function(r){
		// 		console.log(r.message)
		// 	}
		// })
		// Sample
		
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
		frappe.db.get_list('Mitigations', {
			fields: ['project_name'],
			pluck:'project_name'
		}).then(r => {
			frm.set_query("project_name",function(){
				console.log(r);
				return{
					filters:{
						objective: ['in',['Cross-Cutting','Mitigation']],
						workflow_state:"Approved",
						name:['not in',r]
					}
				}
			})
		});
	},
	before_save:function(frm){
		if(!frm.doc.included_in){
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
					console.log(values);
					
					
					frm.set_value("included_in",values)
					frm.refresh_field('included_in')
				}
			})
		}
	}
});
