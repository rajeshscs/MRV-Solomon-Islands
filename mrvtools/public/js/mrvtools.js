$(document).on("form-refresh", function(frm) {

	$.each(cur_frm.fields_dict, function(fieldname, field) {
		field.df.onchange = function() {
			cur_frm.clear_custom_buttons()
		};

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
	console.log(`[data-route='Form/Project/${cur_frm.doc.name}']`);
	console.log(document.querySelector(`[data-route='Form/${cur_frm.doc.doctype}/${cur_frm.doc.name}']`));
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

	$('[data-fieldtype="Table"]').on("change",function(){
		console.log("ss",($(`[id='page-${cur_frm.doc.doctype}'] .indicator-pill`)).text())
		
		if(($(`[id='page-${cur_frm.doc.doctype}'] .indicator-pill`)).text() == "Not Saved"){
			console.log("Onchange");	
			cur_frm.clear_custom_buttons();
		}
	});
	
	$('[data-fieldtype="Table"').on("focusout",function(){
		if(($(`[id='page-${cur_frm.doc.doctype}'] .indicator-pill`)).text() == "Not Saved"){
			console.log("Focusout");
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

$(window).ready(function(){
	$('[class="flex col page-actions justify-content-end"]').hide()
	$('[class="nav-item dropdown dropdown-help dropdown-mobile d-none d-lg-block"]').attr("style","display:none !important")
	$('[class="standard-actions flex"]').hide()
})
// console.log("from AzamTV.js");