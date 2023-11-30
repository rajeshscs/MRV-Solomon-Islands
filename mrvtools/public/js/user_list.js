frappe.listview_settings["User"] = {
	refresh:function(){
        $(`[class="col-lg-2 layout-side-section"]`).css({"display":"none","margin-left":"0px"});
		$(`[class="col layout-main-section-wrapper"]`).css("margin-left","95px");
		// $(`[class="page-title"]`).css({"margin-left":"95px !important"});
	}
}