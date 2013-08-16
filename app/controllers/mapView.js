
var facilities = Alloy.Collections.instance('Facility');

function plotFacilities() {
	// Ti.API.info("Num of facilities: " + facilities.length);
	var data = facilities.toJSON();
	data.forEach(function(e){
		// Ti.API.info('Attempting to add ' + e.title);
		var annotation = Ti.Map.createAnnotation({
				latitude:e.lat,
			    longitude:e.lng,
			    title:e.title,
			    subtitle:e.address,
			    pincolor:Titanium.Map.ANNOTATION_RED
			});
		$.mapView.addAnnotation(annotation);
	})
}

facilities.on('loaded', function(e) {
	Ti.API.info('Loaded recieved.');
	// Ti.API.info(facilities.toJSON());
	plotFacilities();
});
