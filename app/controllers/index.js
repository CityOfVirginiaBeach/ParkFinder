// Ti.include('getParkData.js');
 
function getData(e) {
	var url = "http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1";
	var json;
	Ti.API.info("Getting Data!");
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
	        json = JSON.parse(this.responseText);
	        
	        var amenities = Alloy.Collections.instance('Amenity');
	        json.amenities.forEach(function(e) {
	        	var amenity = Alloy.createModel('Amenity', {
	        		amenityId: e.ID,
	        		title: e.title,
	        		selected: true   //Initialize as true for amenity selection
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
	    }
	});
	xhr.open('GET', url);
	xhr.send();
}

function showFilterWindow(e) {
	var filterWindow = Alloy.createController('AmenityFilter').getView();
	filterWindow.open({modal:true});
}

function showFacilityWindow(e) {
	var facilityWindow = Alloy.createController('FacilityTableWindow').getView();
	facilityWindow.open({modal:false});
}

getData();

$.index.open();

$.map.getView('mapView').addEventListener('openFacilityDetails', function(e) {
	if (OS_ANDROID) {
		var arg = {
	        facilityId: e.facilityId
	    };
		Alloy.createController('FacilityDetails', arg).getView().open({modal:false});
	} else {
		var facilityWindowController = Alloy.createController('FacilityTableWindow');
		var facilityWindowView = facilityWindowController.getView();
		
		facilityWindowView.fireEvent('showFacilityDetailsForTarget',{facilityId:e.facilityId});
		facilityWindowView.open({modal:false});
	}
});