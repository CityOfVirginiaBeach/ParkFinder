
var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');

if (OS_ANDROID) {
	var MapModule = require('ti.map');
}

function plotFacilities() {
	$.mapView.removeAllAnnotations();

	var selectedAmenities = amenities.getSelectedIds();
	var facilitiesWithSelectedAmenitiesIds = facilityAmenities.filterByAmenityIdsAsArray(selectedAmenities);
	var filteredFacilities = facilities.filterByIds(facilitiesWithSelectedAmenitiesIds);
	
	for (var i = 0; i < filteredFacilities.length; i++) {
		var e = filteredFacilities[i].toJSON();

		var parameters = {
				latitude: e.lat,
			    longitude:e.lng,
			    title:e.title,
			    subtitle:e.address,
			    pincolor:Titanium.Map.ANNOTATION_RED,
			    facilityId:e.facilityId,
			    rightButton:'/images/infoRightBtn.png'
		};

		Ti.API.info(JSON.stringify(parameters));

		if (OS_ANDROID) {
			var annotation = Alloy.Globals.Map.createAnnotation(parameters);
			$.mapView.addAnnotation(annotation);
		} else  {
			var annotation = Ti.Map.createAnnotation(parameters);
			$.mapView.addAnnotation(annotation);
		}
	}

}

facilities.on('loaded', function(e) {
	plotFacilities();
});

$.mapView.addEventListener('click', function(e) {
	if (e.clicksource === 'rightButton' || e.clicksource === 'rightPane' || e.clicksource === 'infoWindow') {
		$.mapView.fireEvent('openFacilityDetails', {facilityId: e.annotation.facilityId});
	}
});