$(document).on("form-refresh", function(e, frm) {
	var targetNode = document.querySelector('.indicator-pill');
		
	// Options for the observer (which mutations to observe)
	var config = { attributes: true, attributeFilter: ['class'] };

	// Callback function to execute when mutations are observed
	var callback = function(mutationsList, observer) {
		for(var mutation of mutationsList) {
			if (mutation.type === 'attributes') {
				if (targetNode.innerText == "Not Saved") {
					console.log(targetNode.innerText);
					frm.clear_custom_buttons();
				}
			}
		}
	};

	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);


	$.each(cur_frm.fields_dict, function(fieldname, field) {
		field.df.onchange = function() {
			frm.clear_custom_buttons()
		};

	})

	
	$('[data-fieldtype="Table"]').on("click",function(){

		$('[data-fieldtype="Table"]').on("keyup",function(){

				console.log("keyup");
				$('[data-fieldname]').on("focusout",function(){

					console.log("Focusout");
					frm.clear_custom_buttons()
			})
		})

		$('[data-fieldtype = "Select"]').on("change",function(){
			frm.clear_custom_buttons()
		})

	})

	$('button[class="btn btn-xs btn-secondary grid-add-row"]').on("click",function(){
		frm.clear_custom_buttons()
	})

	$('[data-fieldtype="Button"]').on("click",function(){
		frm.clear_custom_buttons()
	})

	


})
