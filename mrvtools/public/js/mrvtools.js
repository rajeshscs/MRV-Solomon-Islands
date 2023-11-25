$(document).on("form-refresh", function(frm) {
	$(`[id="page-${cur_frm.doc.doctype}"]`).find('.actions-btn-group').hide();
	frappe.call({
		method:"mrvtools.api.get_approvers",
		async:false,
		callback:function(r){
			console.log("curFrm",cur_frm.doc.doctype);
			if (frappe.session.user != "Administrator"){
				for (let i of r.message){
					if(frm.doc.workflow_state == "Pending" || frm.doc.workflow_state == "Approved"){
						if(frappe.user_roles.includes(i)){
							$('[class="tab-pane fade active show"]').attr("style","pointer-events:none !important;--text-color: var(--disabled-text-color); opacity: 0.9;")
						}
					}
					else{
						$('[class="tab-pane fade active show"]').attr("style","pointer-events:inherit !important;")
					}
				}
			}
		}
	})
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
})


$(document).ready(function(){
	// $('[id="page-Workspaces"] [class="flex col page-actions justify-content-end"]').hide()
	// $('[id="page-Workspaces"] [class="standard-actions flex"]').hide()
	$('[class="nav-item dropdown dropdown-help dropdown-mobile d-none d-lg-block"]').attr("style","display:none !important")
	console.log("HEEEi");	

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