# Copyright (c) 2023, tridotstech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GHGInventory(Document):
	@frappe.whitelist()
	def get_data(self,table_name):
		frappe.log_error('doc',table_name)
		get_doc = frappe.db.sql(f"""SELECT * FROM `tabDirect and Indirect Managed Soils Master List` WHERE table_name = '{table_name}' """,as_dict=1,)
		return get_doc
	
	@frappe.whitelist()
	def get_livestock_details(self):
		get_doc = frappe.db.get_list("Livestock Population ChildTable",
				  filters={
					  'parent':self.year
				  },
				  fields=['category','heads'])
		# get_doc = frappe.db.sql(f"""SELECT category,heads FROM `tabLivestock Population ChildTable` WHERE parent = '{self.year}'""")
		return get_doc
	

	@frappe.whitelist()
	def get_table(self):
		field_list = []
		meta = frappe.get_meta(self.doctype)
		meta_dict = meta.as_dict()
		fields = meta_dict["fields"]
		for field in fields:
			if field["fieldtype"] == "Table":
				if field["fieldname"] in  ["electricity_generation","transport","manufacturing_industries","other_sectors","international_bunkers"]:
					field_list.append(field["fieldname"])
		return field_list


	@frappe.whitelist()
	def before_saving_table(self):
		old_doc =self.get_doc_before_save()
		meta = frappe.get_meta(self.doctype)
		meta_dict = meta.as_dict()
		fields = meta_dict["fields"]
		for field in fields:
			if field["fieldtype"] == "Table":
				if field["fieldname"] not in  ["edited_reference_approach","edited_electricity_generation","edited_manufacturing_industries","edited_transport","edited_other_sectors","edited_other_energy","edited_international_bunkers","edited_co2_emissions_from_biomass","edited_cement_production","edited_clinker_data","edited_lime_production","edited_chemical_industry","edited_lubricant_section","edited_lubricant_use","edited_section_break_shpf2","edited_other_ippu","edited_section_break_xabuv","edited_refrigeration","edited_foam_blowing_agents_section","edited_foam_blowing_agents","edited_fire_protection_section","edited_fire_protection","edited_aerosols_section","edited_aerosols","edited_solvents_section","edited_solvents","edited_other_applications_section","edited_other_applications","edited_section_break_jvzrb","edited_electrical_equipment","edited_sf6_and_pfcs_from_other_product_use_section","edited_sf6_and_pfcs_from_other_product_use","edited_n2o_from_product_uses_section","edited_n2o_from_product_uses","edited_other_section","edited_other_use","edited_section_break_7vpnb","edited_activity_data","edited_enteric_fermentation","edited_indirect_manure_management","edited_direct_emissions_mms","edited_direct_managed_soils","edited_atmospheric_deposit","edited_n2o_from_n_leaching","edited_activity_data_burning","edited_activity_data_agriculture","edited_urea_application","edited_forest_land","edited_cropland","edited_grassland","edited_wetlands","edited_settlements","edited_other_land","edited_harvested_wood_products","edited_biomass_burning","edited_solid_waste","edited_biological_treatment","edited_waste_incineration","edited_open_burning_of_waste","edited_ch4_wastewater_treatment","edited_n2o_wastewater_treatment","edited_industrial_wastewater_treatment","edited_other_wastewater_treatement","edited_other_waste","edited_other_sector"]:
					if len(field["fieldname"]) != 0:
						meta1 = frappe.get_meta(field["options"])
						meta_dict2 = meta1.as_dict()
						fields1 = meta_dict2["fields"]
						counter = 0
						self.set("edited_"+ field["fieldname"],[])
						for i in fields1:
							if counter == 0:
								counter = 1
								for j in self.get(field["fieldname"]):
									row = self.append('edited_' + field["fieldname"],{})
									row.set(i["fieldname"], j.get(i["fieldname"]))
							else:
								for idx, j in enumerate(self.get(field["fieldname"])):
									row = self.get('edited_' + field["fieldname"])[idx]
									row.set(i["fieldname"], j.get(i["fieldname"]))

						# self.set(field["fieldname"],[])
						# for i in fields1:
						# 	if counter == 0:
						# 		counter = 1
						# 		for j in old_doc.get(field["fieldname"]):
						# 			row = self.append(field["fieldname"],{})
						# 			row.set(i["fieldname"], j.get(i["fieldname"]))
						# 	else:
						# 		for idx, j in enumerate(old_doc.get(field["fieldname"])):
						# 			row = self.get(field["fieldname"])[idx]
						# 			row.set(i["fieldname"], j.get(i["fieldname"]))
					
		return "YES"