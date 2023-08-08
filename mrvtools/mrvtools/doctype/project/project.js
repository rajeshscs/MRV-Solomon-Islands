// Copyright (c) 2023, tridotstech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project', {
    // objective :function(frm){
    //   if(!frm.doc.objective){
    //     valObjective = " "
    //   }
    //   else{
    //     valObjective = frm.doc.objective;
    //     frm.refresh_field("key_sector")
    //   }      
    // },
    // key_sector :function(frm){
    //     if(!frm.doc.key_sector){
    //       valKeySector = " "
    //     }
    //     else{
    //       valKeySector = frm.doc.key_sector;
    //       frm.refresh_field("key_sub_sector")
    //     }     
    //   },
  get_location:function(frm){

    ///////////////////////////////////////////////////////////
    // if(!frm.doc.geographical_co_ordinate)
    // {
    //   var existingGeoJSON = '{"type":"FeatureCollection","features":[]}'
    // }
    // else
    // {
    // var existingGeoJSON = frm.doc.geographical_co_ordinate;
    // }
    // var parsedGeoJSON = JSON.parse(existingGeoJSON);

    // // New point coordinates

    // var coordinatesList = frm.doc.coordinates.split(',')
    // console.log(coordinatesList);
    // // var newPointCoordinates = ['80.2707','13.0827'];
    // // console.log(newPointCoordinates);

    // // Create a new feature with the new point
    // var newFeature = {
    //     "type": "Feature",
    //     "properties": {},
    //     "geometry": {
    //         "type": "Point",
    //         "coordinates": coordinatesList
    //     }
    // };

    // // Add the new feature to the features array
    // parsedGeoJSON.features.push(newFeature);

    // // Stringify the updated GeoJSON
    // var updatedGeoJSON = JSON.stringify(parsedGeoJSON);
    // coordinatesList = []

    // // Set the updated GeoJSON string to the geolocation field
    // frm.set_value('geographical_co_ordinate', updatedGeoJSON);
    ///////////////////////////////////////////////////////

          var existingGeoJSON = frm.doc.geographical_co_ordinate || '{"type":"FeatureCollection","features":[]}';
          var parsedGeoJSON = JSON.parse(existingGeoJSON);
          
          // New point coordinates
          var coordinatesList = frm.doc.coordinates.split(',');
          var latLetter = coordinatesList[0][coordinatesList[0].length-1]
          var longLetter = coordinatesList[1][coordinatesList[1].length-1]

          if(latLetter == 'S'){
            var latitude = parseFloat(coordinatesList[0]);
            latitude = -latitude
          }
          else{
            var latitude = parseFloat(coordinatesList[0]);
          }

          if(longLetter == 'W'){
            var longitude = parseFloat(coordinatesList[1]);
            longitude = -longitude
          }
          else{
            var longitude = parseFloat(coordinatesList[1]);
          }

          // console.log("Latitude = ",coordinatesList[0][coordinatesList[0].length-1]);
          // console.log("Longtitude = ",coordinatesList[1][coordinatesList[1].length-1]);

          // var latitude = parseFloat(coordinatesList[0]);
          // var longitude = parseFloat(coordinatesList[1]);
          
          // Check if the coordinates are valid numbers
          if (!isNaN(latitude) && !isNaN(longitude)) {
              var newFeature = {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "Point",
                      "coordinates": [longitude, latitude]
                  }
              };
              
              // Check if the new feature already exists in parsedGeoJSON
              var isFeatureExists = parsedGeoJSON.features.some(function(feature) {
                  return (
                      feature.geometry.coordinates[1] === longitude &&
                      feature.geometry.coordinates[0] === latitude
                  );
              });
              
              // Add the new feature only if it doesn't exist already
              if (!isFeatureExists) {
                  parsedGeoJSON.features.push(newFeature);
              }
          }
          
          var updatedGeoJSON = JSON.stringify(parsedGeoJSON);
          console.log(updatedGeoJSON);
          // Set the updated GeoJSON string to the geolocation field
          frm.set_value('geographical_co_ordinate', updatedGeoJSON); 
  },

  

  objective: function(frm){
    if(!frm.doc.objective){
      frm.set_df_property('key_sector','hidden',1)
      frm.refresh_field('key_sector')
    }
    else{
      frm.set_df_property('key_sector','hidden',0)
      frm.refresh_field('key_sector')
    }
  },
  key_sector:function(frm){
    if(!frm.doc.key_sector){
      frm.set_df_property('key_sub_sector','hidden',1)
      frm.refresh_field('key_sub_sector')
    }
    else{
      frm.set_df_property('key_sub_sector','hidden',0)
      frm.refresh_field('key_sub_sector')
    }
  },
	refresh: function(frm){
    frm.call({
      doc:frm.doc,
      method:'get_user',
      callback: function(r){
        var userList = []
        
        for (var i of r.message){
          userList.push(i[0])
        }
        console.log(userList);
        frm.set_query("select_approver",function(){
          return {
            filters:{
              email:['in',userList]
            }
          }
        })
      }
    })
    
        // var valObjective = " "
        // var valKeySector = " "
    if(!frm.doc.objective){
      frm.set_df_property('key_sector','hidden',1)
      frm.refresh_field('key_sector')
      frm.set_df_property('key_sub_sector','hidden',1)
      frm.refresh_field('key_sub_sector')
    }
    else{
      frm.set_df_property('key_sector','hidden',0)
      frm.refresh_field('key_sector')
      frm.set_df_property('key_sub_sector','hidden',0)
      frm.refresh_field('key_sub_sector')
    }

		frm.set_query("key_sector", function(){
            return {
                filters: {
                    objective : frm.doc.objective
                }
            }
        });
		frm.set_query("key_sub_sector", function(){
            return {
                filters: {
                    key_sector : frm.doc.key_sector
                }
            }
        });
	}
});
