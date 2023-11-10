// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt
/* eslint-disable */
frappe.query_reports["Adaptation Tracking Report"] = {
	"filters": [
		{
			"fieldname": "year",
			"fieldtype": "Select",
			"label": __("Year"),
			"options": [" ","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043","2044","2045","2046","2047","2048","2049","2050"]
		},
		{
			"fieldname": "key_sector",
			"fieldtype": "Link",
			"label": __("Key Sector"),
			"options":"Project Key Sector",
			get_query: function (doc) {
				return {
					"filters": {
						"objective": ["in", ['Cross-Cutting','Adaptation']]
					}
				}
			}
		},
		{
			"fieldname": "key_sub_sector",
			"fieldtype": "Link",
			"label": __("Key Sub-Sector"),
			"options":"Project Key Sub Sector",
			"depends_on":"eval:doc.key_sector",
			get_query: function () {
				return {
					"filters": {
						// "key_sector":["like",["%Cross-Cutting%","%Adaptation%"]]
						"key_sector": ["in", [`${frappe.query_report.filters[1].last_value}`]]
					}
					
				}
			}
		},
		{
			"fieldname": "impact_summaries",
			"fieldtype": "Select",
			"label": __("Impact Area"),
			"options":['','Forest Health', 'Watershed Health', 'Coastal Health', 'Water Security', 'Security of Place', 'Energy Security', 'Income Security', 'Community Health', 'Food Security']
		}
	]
};
