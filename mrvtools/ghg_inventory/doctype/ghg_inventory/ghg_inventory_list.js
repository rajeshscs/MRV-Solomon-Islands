frappe.listview_settings["GHG Inventory"] = {
	refresh:function(){
		for( var i=0;i<=10;i++){
			if( $('.list-row-col').eq(i).prop("innerText") == "Status"){
				$('.list-row-col').eq(i).prop("innerText","Updation Status")
				
			}
			if( $('.list-row -col').eq(i).prop("innerText") == "Work State"){
				$('.list-row-col').eq(i).prop("innerText","Status")
			}

		}
	}
}