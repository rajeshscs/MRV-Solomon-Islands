frappe.pages["ghg-year-report"].on_page_load = (wrapper) => {
	frappe.ghg_year_report = new GHGInventory(wrapper);
};

class GHGInventory {
	constructor(parent) {
		frappe.ui.make_app_page({
			parent: parent,
			title: __("GHG Year Report"),
			single_column: false,
			card_layout: true,
		});

		this.parent = parent;
		this.page = this.parent.page;
		this.page.sidebar.html(
			`<ul class="standard-sidebar ghg_year_report-sidebar overlay-sidebar"></ul>`
		);
		this.$sidebar_list = this.page.sidebar.find("ul");
		// alert(frappe.defaults.get_user_default("Order"))
		this.datatable=null;
		// this.add_card_button_to_toolbar();
		this.set_default_secondary_action();
		this.ghg_from_year();
		this.ghg_to_year();
		this.ghg_unit_filter();
		this.render_datatable();
		this.make();

		// this.create_date_range_field();
	}
	set_default_secondary_action() {
		this.refresh_button && this.refresh_button.remove();
		this.refresh_button = this.page.add_action_icon("refresh", () => {
			this.$container.empty()
			this.$report.empty()
			$('[class="ghg_year_report page-main-content"]:first').remove()
			this.make()
			this.render_datatable()
		});
	}
	hide_btn() {
		const toggleButtons = (hideBtn, showBtn, targetClass) => {
		  $(hideBtn).click(() => {
			$('[class="'+targetClass+'"]').toggle();
			$(hideBtn).toggle();
			$(showBtn).toggle();
		  });
	  
		  $(showBtn).click(() => {
			$('[class="'+targetClass+'"]').toggle();
			$(hideBtn).toggle();
			$(showBtn).toggle();
		  });
		  
		  $(showBtn).toggle();
		};
	  
		$(document).ready(() => {
		  toggleButtons("#hide_btn", "#show_btn", "totalghg_year_report-graph");
		});
	  }

	make() {
		this.$container = $(`
		<div class="ghg_year_report page-main-content">
		<div class="chart_hide" style="margin: 14px; display: flex; align-items: center; justify-content: space-between;">
			<b id="categories_chart"></b>
			<button id="hide_btn" class="btn btn-sm">Hide chart</button>
			<button id="show_btn" class="btn btn-sm">show chart</button>
		</div>
			<div class="totalghg_year_report-graph"></div>
		</div>`
		).appendTo(this.page.main);
		this.$graph_area = this.$container.find(".totalghg_year_report-graph");
		this.hide_btn();
		
	
	}

	get_chart_report() {
		frappe.call('mrvtools.ghg_inventory.page.ghg_year_report.ghg_year_report.get_chart',{
			from_year:this.from_year[0].value,
			to_year:this.to_year[0].value,
			inventory_unit:this.inventory_unit[0].value
		})
			.then((r) => {
				$("#categories_chart").html("No of Projects based on Categories")
				
				let results = r.message || [];
				console.log(results);
				const custom_options = {
					type: "bar",	
					colors: ["#48bb74"],
					height: 220,
					axisOptions: {
						xIsSeries: 0,
						isNavigable :1 ,
						shortenYAxisNumbers: 0,
						xAxisMode: "tick",
						numberFormatter: frappe.utils.format_chart_axis_number,
					},
					data: {
						datasets: results.datasets,
						labels: results.labels
					},
					barOptions: {
						"stacked": 1
					},
					colors:["pink","blue","green"]
				};
				frappe.utils.make_chart(".totalghg_year_report-graph", custom_options);
			});
			
	}
	ghg_from_year() {
		this.from_year = this.page.add_select(
			__("Year"),[" ","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043","2044","2045","2046","2047","2048","2049","2050"]
			
		)
		this.from_year.on("change",(r) => {
			this.$heading.empty();
		})
	}
	ghg_to_year() {
		this.to_year = this.page.add_select(
			__("Year"),[" ","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043","2044","2045","2046","2047","2048","2049","2050"]
			
		)
		this.to_year.on("change",(r) => {
			this.render_datatable()
			this.get_chart_report();
			this.$heading.empty();

		})
	}
	ghg_unit_filter() {
		this.inventory_unit = this.page.add_select(
			__("Unit"),[" ", "tCO2e","GgCO2e"]
			
		)
		this.inventory_unit.on("change",(r) => {
			this.render_datatable()
			this.get_chart_report();
			this.$heading.empty();

		})
	}


	render_datatable(){
		frappe.call('mrvtools.ghg_inventory.page.ghg_year_report.ghg_year_report.execute',{
			from_year:this.from_year[0].value,
			to_year:this.to_year[0].value,
			inventory_unit:this.inventory_unit[0].value
		})
			.then((r) => {
				console.log(r.message[0]);
				$('.report-wrapper:first').remove();
				this.$report = $('<div class="report-wrapper">').appendTo(this.page.main);
				let columns = r.message[0]
				let data = r.message[1]
				$('.headline:first').remove();
				this.$heading = $('<b style="margin-left: 30px;">GHG Inventory Report - Year wise</b>').insertBefore(this.$report);
				this.datatable = new DataTable(this.$report[0], {columns:columns,data:data,treeView:true});
			})
			
	}


}
