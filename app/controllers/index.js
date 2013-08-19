/**
 * @fileOverview Initializer for ParkFinder
 * @name index
 * @namespace index
 * @author  Chris Golding
 */


/**
 * Pulls data from JSON feed on vbgov.com and creates/populates amenity, facility, and facility amenity collections
 * @memberOf index
 */
function getData() {
	var url = "http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1";
	var json;
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

/**
 * Displays the filter window
 * @memberOf index
 */
function showFilterWindow() {
	var filterWindow = Alloy.createController('AmenityFilter').getView();
	filterWindow.open({modal:true});
}

/**
 * Displays the facility window
 * @memberOf index
 */
function showFacilityWindow() {
	var facilityWindow = Alloy.createController('FacilityTableWindow').getView();
	facilityWindow.open({modal:false});
}

getData();

$.index.open();

/**
 * Launches the facility detail window.
 * Note: This is only used on Android
 *
 * @memberOf index
 * @param  {Titanium.Event} e - the facilityId of the facility
 */
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