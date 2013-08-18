
var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');

if (OS_ANDROID) {
	var MapModule = require('ti.map');
}

function plotFacilities() {
	$.mapView.removeAllAnnotations();

	// alert("Num of facilities before: " + facilities.length);

	facilities.fetch({
		reset: false,
		query: 'SELECT * FROM Facility WHERE facilityId IN (SELECT DISTINCT FacilityAmenity.facilityId FROM FacilityAmenity LEFT JOIN Amenity ON FacilityAmenity.amenityId = Amenity.amenityId WHERE Amenity.selected = 1)'
	});

	// facilities.fetch();

	// alert("Num of facilities after: " + facilities.length);
	var data = facilities.toJSON();
	data.forEach(function(e){
		var parameters = {
				latitude:e.lat,
			    longitude:e.lng,
			    title:e.title,
			    subtitle:e.address,
			    pincolor:Titanium.Map.ANNOTATION_RED,
			    facilityId:e.facilityId,
			    rightButton:'/images/infoRightBtn.png'
			};

		if (OS_ANDROID) {
			var annotation = Alloy.Globals.Map.createAnnotation(parameters);
			$.mapView.addAnnotation(annotation);
		} else  {
			var annotation = Ti.Map.createAnnotation(parameters);
			$.mapView.addAnnotation(annotation);
		}
	});
	// alert('Done!!');
}

facilities.on('loaded', function(e) {
	plotFacilities();
});

$.mapView.addEventListener('click', function(e) {
	if (e.clicksource === 'rightButton') {
		$.mapView.fireEvent('openFacilityDetails', {facilityId: e.annotation.facilityId});
	}
});