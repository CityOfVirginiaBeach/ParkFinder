
var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');

function plotFacilities() {
	// var amenities = Alloy.Collections.instance('Amenity');
	// var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');

	// var selectedAmenities = amenities.where({selected: true});
	// var selectedAmenitiesIdArray = [];
	// Ti.API.info(selectedAmenities.length);
	// selectedAmenities.forEach(function(e) {
	// 	selectedAmenitiesIdArray.push(e.get("amenityId"));
	// });

	// Ti.API.info(selectedAmenitiesIdArray);

	// var facilitiesWithSelectedAmenities = facilityAmenities.facilitiesWithAminities(selectedAmenitiesIdArray);
	// Ti.API.info(facilitiesWithSelectedAmenities.length);
	$.mapView.removeAllAnnotations();

	Ti.API.info(facilities.length);
	facilities.fetch({
		// reset: false,
		query: 'SELECT * FROM Facility WHERE facilityId IN (SELECT DISTINCT FacilityAmenity.facilityId FROM FacilityAmenity LEFT JOIN Amenity ON FacilityAmenity.amenityId = Amenity.amenityId WHERE Amenity.selected = 1)'
	});
	Ti.API.info(facilities.length);
	// Ti.API.info(facilitiesWithSelectedAmenities.toJSON());

	var data = facilities.toJSON();
	data.forEach(function(e){
		var annotation = Ti.Map.createAnnotation({
				latitude:e.lat,
			    longitude:e.lng,
			    title:e.title,
			    subtitle:e.address,
			    pincolor:Titanium.Map.ANNOTATION_RED
			});
		$.mapView.addAnnotation(annotation);
	});
}

facilities.on('loaded', function(e) {
	plotFacilities();
});

