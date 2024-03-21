$(document).on("form-refresh", function(frm) {
	
	if(cur_frm.doc.doctype != "User Registration"){	
		$(`[id="page-${cur_frm.doc.doctype}"]`).find('.actions-btn-group').hide();
	}
	if(cur_frm.doc.doctype == "User"){	
		$(`[class="col-lg-2 layout-side-section"]`).css({"display":"block","margin-left":"95px"});
		$(`[class="col layout-main-section-wrapper"]`).css("margin-left","0px");
		$(`[class="page-title"]`).css({"margin-left":"95px !important"});
	}

	$.each(cur_frm.fields_dict, function(fieldname, field) {
		field.df.onchange = function() {
			cur_frm.clear_custom_buttons()
		};

	})
	
	$('[data-fieldtype="Table"]').on("change",function(){
		if(($(`[id='page-${cur_frm.doc.doctype}'] .indicator-pill`)).text() == "Not Saved"){
			cur_frm.clear_custom_buttons();
		}
	});
	
	$('[data-fieldtype="Table"').on("focusout",function(){
		if(($(`[id='page-${cur_frm.doc.doctype}'] .indicator-pill`)).text() == "Not Saved"){
			cur_frm.clear_custom_buttons();
		}
	});
	
	$('[data-fieldtype="Button"]').on("click",function(){
		cur_frm.clear_custom_buttons()
	})
	
	if(cur_frm.doc.__unsaved == 1){
		setTimeout(function() {
			cur_frm.clear_custom_buttons()
		})
	}
	if (cur_frm.doc.doctype != "User Registration"){
		if(cur_frm.doc.workflow_state == "Pending" && !cur_frm.doc.__islocal){
			if((frappe.user_roles).some(role => role.startsWith("Approver") || role === "System Manager" || role === "MRV Admin")){
				if(frappe.session.user == cur_frm.doc.select_approver || (frappe.user_roles).some(role => role === "System Manager" || role === "MRV Admin")){
					cur_frm.add_custom_button('Approve',()=>{
						frappe.confirm('Are you sure you want to proceed?',
							() => {
								cur_frm.set_value("workflow_state","Approved")
								cur_frm.refresh_field("workflow_state")
								cur_frm.save()
							}, () => {

						})

					},"Actions")
					
					cur_frm.add_custom_button('Reject',()=>{
						frappe.confirm('Are you sure you want to proceed?',
						() => {
							cur_frm.set_value("workflow_state","Rejected")
							cur_frm.refresh_field("workflow_state")
							cur_frm.save()
						}, () => {
							
						})
						
					},"Actions")
				}
			}
			

			
		}
		else if(cur_frm.doc.workflow_state == "Approved" && !cur_frm.doc.__islocal){
			if((frappe.user_roles).some(role => !role.startsWith("Approver") || role === "System Manager" || role === "MRV Admin")){
				if(frappe.session.user == cur_frm.doc.owner || (frappe.user_roles).some(role => role === "System Manager" || role === "MRV Admin")){
					cur_frm.add_custom_button('Edit',()=>{
						frappe.confirm('Are you sure you want to proceed?',
							() => {
								cur_frm.set_value("workflow_state","Draft")
								cur_frm.refresh_field("workflow_state")
								
								cur_frm.save()
							}, () => {
			
						})
		
					},"Actions")
				}
			}  
		}
		else if(cur_frm.doc.workflow_state == "Draft" && !cur_frm.doc.__islocal){
			if((frappe.user_roles).some(role => !role.startsWith("Approver") || role === "System Manager" || role === "MRV Admin")){
				if(frappe.session.user == cur_frm.doc.owner || (frappe.user_roles).some(role => role === "System Manager" || role === "MRV Admin")){
					cur_frm.add_custom_button('Send for Approval',()=>{
						frappe.confirm('Are you sure you want to proceed?',
							() => {
								cur_frm.set_value("workflow_state","Pending")
								cur_frm.refresh_field("workflow_state")
								
								cur_frm.save()
							}, () => {
							
						})
						
					},"Actions")
				}
			}
		}
		else if(cur_frm.doc.workflow_state == "Rejected" && !cur_frm.doc.__islocal){
			if((frappe.user_roles).some(role => !role.startsWith("Approver") || role === "System Manager" || role === "MRV Admin")){
				if(frappe.session.user == cur_frm.doc.owner || (frappe.user_roles).some(role => role === "System Manager" || role === "MRV Admin")){
					cur_frm.add_custom_button('Edit',()=>{
						frappe.confirm('Are you sure you want to proceed?',
							() => {
								cur_frm.set_value("workflow_state","Draft")
								cur_frm.refresh_field("workflow_state")
								
								cur_frm.save()
							}, () => {
								
						})
						
					},"Actions")
				}
			}
		}
		$('.inner-group-button button').removeClass("btn-default").addClass("btn-primary")
	}
	$.ajax({
		success:function(){
			$('[data-fieldtype="Table"] [class="btn-open-row"] [class="hidden-xs edit-grid-row"]').prop("innerText","View")
			$('[class="btn btn-xs btn-secondary grid-add-row"]').on("click",function(){
				
				$('[data-fieldtype="Table"] [class="btn-open-row"] [class="hidden-xs edit-grid-row"]').prop("innerText","View")
			})
		}
	})

	frappe.call({
		method:"mrvtools.api.get_approvers",
		asyc:true,	
		callback:function(r){
			// console.log("curFrm",cur_frm.doc.doctype);
			if (frappe.session.user != "Administrator"){
				console.log("User roles = ",frappe.user_roles);
				for (var i of r.message){
					if(cur_frm.doc.workflow_state == "Pending" || cur_frm.doc.workflow_state == "Approved"|| cur_frm.doc.workflow_state == "Rejected"){
						if(frappe.user_roles.includes(i)){
							$(`[id="page-${cur_frm.doc.doctype}"] [class="tab-pane fade show active"]`).attr("style","pointer-events:none !important;--text-color: var(--disabled-text-color); opacity: 0.9;")
						}
					}
					else{
						$('[class="tab-pane fade show active"]').attr("style","pointer-events:inherit !important;")
					}
				}
			}
		}
	})
})

// $(document).on("load", function(frm) {
// 	frappe.call({
// 		method:"mrvtools.api.get_approvers",
// 		async:false,
// 		callback:function(r){
// 			// console.log("curFrm",cur_frm.doc.doctype);
// 			if (frappe.session.user != "Administrator"){
// 				console.log("User roles = ",frappe.user_roles);
// 				for (let i of r.message){
// 					if(cur_frm.doc.workflow_state == "Pending" || cur_frm.doc.workflow_state == "Approved"){
						
// 						if(frappe.user_roles.includes(i)){
// 							console.log("i",i);
// 							console.log("H-----I");
// 							$(`[id="page-${cur_frm.doc.doctype}"] [class="tab-pane fade show active"]`).attr("style","pointer-events:none !important;--text-color: var(--disabled-text-color); opacity: 0.9;")
// 						}
// 					}
// 					else{
// 						$('[class="tab-pane fade show active"]').attr("style","pointer-events:inherit !important;")
// 					}
// 				}
// 			}
// 		}
// 	})
// })
$.ajax({
	success:function(){
			$('<h2 class="heading-main" data-v-2dd66c2c="" style="color: rgb(0, 0, 0);font-weight: 700;font-size: 20px;font-family: Inter;display: flex;line-height: 1.5;align-items: start;justify-content: start !important;margin-left: 195px;margin-bottom: 0px !important;"> SOLOMON ISLANDS iMRV TOOL <span data-v-2dd66c2c="" style="color: green; margin: 0px 0px 0px 7px;">FOR CLIMATE ACTIONS</span></h2>').insertBefore($('[class="form-inline fill-width justify-content-end"]'))
	}
})
$(document).ready(function(){
	// $('[id="page-Workspaces"] [class="flex col page-actions justify-content-end"]').hide()
	// $('[id="page-Workspaces"] [class="standard-actions flex"]').hide()
	$('[class="nav-item dropdown dropdown-help dropdown-mobile d-none d-lg-block"]').attr("style","display:none !important")
	// console.log("HEEEi");	
	$('[data-fieldtype="Table"] [class="btn-open-row"] [class="hidden-xs edit-grid-row"]').prop("innerText","View")
	$("head").append('<style>#page-Workspaces [class="flex col page-actions justify-content-end"]{display:none}</style>');
	
})

	// $('[data-fieldtype="Table"]').on("click",function(){
	// 	console.log("Click..");
	// 	$('[data-fieldtype = "Select"]').on("change",function(){
	// 		console.log("Select");
	// 		cur_frm.clear_custom_buttons()
	// 	})
	// });
	
	// $('[data-fieldtype="Table"]').on("keyup",function(){
	// 	console.log("keyup");
	// });
	// console.log(`[data-route='Form/Project/${cur_frm.doc.name}']`);
	// console.log(document.querySelector(`[data-route='Form/${cur_frm.doc.doctype}/${cur_frm.doc.name}']`));
	// var targetNode = document.querySelector('.indicator-pill');
	// var config = { childList: true, subtree: true, characterData: true };

	// var callback = function(mutationsList, observer) {
	// 	for(var mutation of mutationsList) {
	// 		if (mutation.type == 'childList' || mutation.type == 'characterData') {
	// 			console.log("Pill text changed to: " + targetNode.innerText);
	// 		}
	// 	}
	// };

	// var observer = new MutationObserver(callback);
	// observer.observe(targetNode, config);

	
	// $('[data-fieldtype="Table"]').on("change",function(){
	// 	console.log("ss",($(`[data-route='Form/${cur_frm.doc.doctype}/${cur_frm.doc.name}'] .indicator-pill`)).text())
		
	// 	if(($(`[data-route='Form/${cur_frm.doc.doctype}/${cur_frm.doc.name}'] .indicator-pill`)).text() == "Not Saved"){
	// 		console.log("Onchange");	
	// 		cur_frm.clear_custom_buttons();
	// 	}
	// });
	
	// $('[data-fieldtype="Table"').on("focusout",function(){
	// 	if(($(`[data-route='Form/${cur_frm.doc.doctype}/${cur_frm.doc.name}'] .indicator-pill`)).text() == "Not Saved"){
	// 		console.log("Focusout");
	// 		cur_frm.clear_custom_buttons();
	// 	}
		
	// });

	// frappe.listview_settings["User"] = {
	// 	refresh:function(){
	// 		console.log(" User in...");
	// 		// for( var i=0;i<=10;i++){
	// 		// 	if( $('.list-row-col').eq(i).prop("innerText") == "Status"){
	// 		// 		$('.list-row-col').eq(i).prop("innerText","Updation Status")
					
	// 		// 	}
	// 		// 	if( $('.list-row -col').eq(i).prop("innerText") == "Work State"){
	// 		// 		$('.list-row-col').eq(i).prop("innerText","Status")
	// 		// 	}
	
	// 		// }
	// 	}
	// }