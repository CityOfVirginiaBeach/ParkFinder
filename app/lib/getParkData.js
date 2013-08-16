
var url = "http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1";
var json;
 
function getData(e) {
	Ti.API.info("Getting Data!");
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
	        // parse the retrieved data, turning it into a JavaScript object
	        json = JSON.parse(this.responseText);
	        // ...
	        // Ti.API.info(json);
	        
	        var amenities = Alloy.Collections.instance('Amenity');
	        json.amenities.forEach(function(e) {
	        	var amenity = Alloy.createModel('Amenity', {
	        		amenityId: e.ID,
	        		title: e.title
	        	});
	        	amenities.add(amenity);
	        });

	        var facilities = Alloy.Collections.instance('Facility');
	        var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');
	        json.facilities.forEach(function(e) {
	        	var facility = Alloy.createModel('Facility', {
	        		lat: e.latlng[0],
	        		lng: e.latlng[1],
	        		facilityId: e.ID,
	        		title: e.title,
	        		zip: e.zip,
	        		address: e.address,
	        		notes: e.notes,
	        		hours: e.hours,
	        		url: e.url
	        	});
	        	facilities.add(facility);

	        	for (var i = 0; i < e.amenities.length; i++) {
	        		var facilityAmenity = Alloy.createModel('FacilityAmenity', {
	        			facilityId: e.ID,
	        			amenityId: e.amenities[i]
	        		});

	        		facilityAmenities.add(facilityAmenity);
	        	}
	        });

	        facilities.trigger('loaded');
	        // Ti.API.info(facilities.toJSON());
	    }
	});
	xhr.open('GET', url);
	xhr.send();
}