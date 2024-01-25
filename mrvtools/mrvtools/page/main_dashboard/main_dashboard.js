frappe.pages['main-dashboard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Main Dashboard',
		single_column: true
	});
}

frappe.pages["main-dashboard"].on_page_load = (wrapper) => {
	frappe.main_dashboard = new Analytics(wrapper);
};

class Analytics {
	constructor(parent) {
		frappe.ui.make_app_page({
			parent: parent,
			title: __("Dashboard"),
			single_column: false,
			card_layout: true,
		});

		this.parent = parent;
		this.page = this.parent.page;
		this.page.sidebar.html(
			`<ul class="standard-sidebar main_dashboard-sidebar overlay-sidebar"></ul>`
		);
		this.$sidebar_list = this.page.sidebar.find("ul");
		// alert(frappe.defaults.get_user_default("Order"))
		this.datatable=null;
		// this.add_card_button_to_toolbar();
		this.make()
		// this.create_date_range_field();
	}

	make(){
		this.$container = $(`
		<div class = "all_html"  style="margin:0;">
			<span id="cur_page_data"></span>
			<b class="title_names2"></b>
			<div id="ghg_emission_reduction"></div>
			<b class="title_names1"></b>
			<div id="ghg_emissions"></div>
			<b class="title_names3"></b>
			<div id="finance_disbursement"></div>
		</div>
			`).appendTo(this.page.main);
		this.get_cards_data()
	}

	get_cards_data(){
		frappe.call("mrvtools.mrvtools.page.main_dashboard.main_dashboard.get_cards_data").then((r) =>{
			let total_ghg_emmission = r.message.total_ghg_emmission
			let total_projects = r.message.total_projects
			let total_mitigation_projects = r.message.total_mitigation_projects
			let total_adaptation_projects = r.message.total_adaptation_projects
			let total_cross_cutting_projects = r.message.total_cross_cutting_projects
			let total_enabler_projects = r.message.total_enabler_projects
			let till_date_finance_disbursed = r.message.till_date_finance_disbursed
			let till_date_ghg_reduction = r.message.till_date_ghg_reduction

			$('#cur_page_data').html(`
			<div class="total_card_div" >
				<div class="total_card_1">
							<div class="widget number-widget-box" data-widget-name="Total GHG Emissions">
								<div class="widget-head">
									<div class="widget-label">
									<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<img src="/files/GHG Inventory-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
									</a>
									<span class="ellipse"  title="Total GHG Emissions">Total GHG Emissions</span>
									<div class="number_e" id="value-cards">`+total_ghg_emmission+` tCO2e</div>
								</div>
							</div>
							<div class="widget-footer"></div>
							</div>
				</div>
				<div class="total_card_2" >
							<div class="widget number-widget-box" data-widget-name="Total Projects">
								<div class="widget-head">
								<div class="widget-label">
								<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="/files/Projects-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
								</a>
								<span class="ellipse" title="Total Projects">Total Projects</span>
								<div class="number_e" id="value-cards">`+total_projects+`</div>
			
								</div>
								</div>
								
								<div class="widget-footer"></div>
							</div>
				</div>
				<div class="total_card_3" >
						<div class="widget number-widget-box" data-widget-name="Mitigation Projects">
							<div class="widget-head">
			
							<div class="widget-label">
							<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<img src="/files/Mitigation Actions-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
							</a>
							<span class="ellipse" title="Mitigation Projects">Mitigation Projects</span>
							<div class="number_e" id="value-cards">`+total_mitigation_projects+`</div>
			
							</div></div>
							
								<div class="widget-footer"></div>
							</div>
				</div>
				
			</div>
			<div class="total_card_div" >
				<div class="total_card_4">
								
					<div class="widget number-widget-box" data-widget-name="Adaptation Projects">
						<div class="widget-head">
							<div class="widget-label">
							<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="/files/Adaptation Actions-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
							</a>
							<span class="ellipse"  title="Adaptation Projects">Adaptation Projects</span>
							<div class="number_e" id="value-cards">`+total_adaptation_projects+`</div>
						</div>
					</div>
					<div class="widget-footer"></div>
					</div>
				</div>
				<div class="total_card_5" >
							<div class="widget number-widget-box" data-widget-name="Cross Cutting Projects">
								<div class="widget-head">
								<div class="widget-label">
								<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="/files/Climate Finance-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
								</a>
								<span class="ellipse" title="Cross Cutting Projects">Cross Cutting Projects</span>
								<div class="number_e" id="value-cards">`+total_cross_cutting_projects+`</div>

								</div>
								</div>
								
								<div class="widget-footer"></div>
							</div>
				</div>
				<div class="total_card_6" >
						<div class="widget number-widget-box" data-widget-name="Enabler Projects">
							<div class="widget-head">

								<div class="widget-label">
									<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<img src="/files/SDGs ASSESSMENTS-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
									</a>
									<span class="ellipse" title="Enabler Projects">Enabler Projects</span>
									<div class="number_e" id="value-cards">`+total_enabler_projects+`</div>

								</div>
							</div>
							
							<div class="widget-footer"></div>
						</div>
				</div>
				
			</div>
			<div class="total_card_div" >
				<div class="total_card_7">
								
					<div class="widget number-widget-box" data-widget-name="Climate finance disbursed till date">
						<div class="widget-head">
							<div class="widget-label">
								<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<img src="/files/Mitigation Actions-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
								</a>
								<span class="ellipse"  title="Climate finance disbursed till date">Climate finance disbursed till date</span>
								<div class="number_e" id="value-cards">USD `+till_date_finance_disbursed+`</div>
							</div>
						</div>
						<div class="widget-footer"></div>
					</div>
				</div>
				<div class="total_card_8" >
							<div class="widget number-widget-box" data-widget-name="GHG Reductions Actual till date">
								<div class="widget-head">
								<div class="widget-label">
								<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src="/files/Projects-01.svg" alt="Assemble_logo" width="60" height="60" class="logo_style1">
								</a>
								<span class="ellipse" title="GHG Reductions Actual till date">GHG Reductions Actual till date</span>
								<div class="number_e" id="value-cards">`+till_date_ghg_reduction+` tCO2e</div>

								</div>
								</div>
								
								<div class="widget-footer"></div>
							</div>
				</div>
				<div class="total_card_9">
					<div class="widget number-widget-box" data-widget-name="GHG Reductions Actual till date">
						<div class="widget-head"></div>
					</div>
				</div>
				
				
			</div>
			
			`)
		})
		this.ghg_emission_reduction_chart()
		this.finace_dibursment_chart()
		this.ghg_emissions_chart()
	}
	
	ghg_emissions_chart(){
		frappe.call('mrvtools.mrvtools.page.main_dashboard.main_dashboard.ghg_emissions_data')
			.then((r) => {
				console.log(r.message);
				$('.title_names1').html("GHG Emissions")
				let results = r.message || [];
				const custom_options = {
					type: "line",
					colors: ["#369fff"],
					height: 240,
					axisOptions: {
						xIsSeries: 0,
						isNavigable :1,
						shortenYAxisNumbers: 0,
						xAxisMode: "tick",
						numberFormatter: frappe.utils.format_chart_axis_number,
					},
					data: {
						datasets: [{values: results.data}],
						labels: results.labels
					},
				};
				frappe.utils.make_chart("#ghg_emissions", custom_options);
			});
	}

	ghg_emission_reduction_chart(){
		frappe.call('mrvtools.mrvtools.page.main_dashboard.main_dashboard.ghg_emission_reduction_data')
			.then((r) => {
				console.log(r.message);
				$('.title_names2').html("GHG Emission Reduction")
				let results = r.message || [];
				const custom_options = {
					type: "line",
					colors: ["#369fff"],
					height: 240,
					axisOptions: {
						xIsSeries: 0,
						isNavigable :1,
						shortenYAxisNumbers: 0,
						xAxisMode: "tick",
						numberFormatter: frappe.utils.format_chart_axis_number,
					},
					data: {
						datasets: [{values: results.data}],
						labels: results.labels
					},
				};
				frappe.utils.make_chart("#ghg_emission_reduction", custom_options);
			});
	}

	finace_dibursment_chart(){
		frappe.call('mrvtools.mrvtools.page.main_dashboard.main_dashboard.get_finance_data')
			.then((r) => {
				console.log(r.message);
				$('.title_names3').html("Finance Disbursement")
				let results = r.message || [];
				const custom_options = {
					type: "line",
					colors: ["#369fff"],
					height: 240,
					axisOptions: {
						xIsSeries: 0,
						isNavigable :1,
						shortenYAxisNumbers: 0,
						xAxisMode: "tick",
						numberFormatter: frappe.utils.format_chart_axis_number,
					},
					data: {
						datasets: [{values: results.data}],
						labels: results.labels
					},
				};
				frappe.utils.make_chart("#finance_disbursement", custom_options);
			});
	}
}