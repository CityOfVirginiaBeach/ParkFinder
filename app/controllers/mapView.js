
var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');

function plotFacilities() {
	$.mapView.removeAllAnnotations();

	Ti.API.info(facilities.length);
	facilities.fetch({
		query: 'SELECT * FROM Facility WHERE facilityId IN (SELECT DISTINCT FacilityAmenity.facilityId FROM FacilityAmenity LEFT JOIN Amenity ON FacilityAmenity.amenityId = Amenity.amenityId WHERE Amenity.selected = 1)'
	});
	Ti.API.info(facilities.length);

	var data = facilities.toJSON();
	data.forEach(function(e){
		var annotation = Ti.Map.createAnnotation({
				latitude:e.lat,
			    longitude:e.lng,
			    title:e.title,
			    subtitle:e.address,
			    pincolor:Titanium.Map.ANNOTATION_RED,
			    facilityId:e.facilityId,
			    rightButton:'/images/infoRightBtn.png'
			});
		

		$.mapView.addAnnotation(annotation);
	});
}

facilities.on('loaded', function(e) {
	plotFacilities();
});

$.mapView.addEventListener('click', function(e) {
	Ti.API.info(JSON.stringify(e));
	if (e.clicksource === 'rightButton') {
		Ti.API.info('Annotation clicked for: ' + e.annotation.title);
	} else {
		Ti.API.info('Other source: ' + e.clicksource);
	}
});