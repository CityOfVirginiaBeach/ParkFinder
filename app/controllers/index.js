Ti.include('getParkData.js');

Alloy.Globals.selectedFilter = [];

function showFilterWindow(e) {
	var filterWindow = Alloy.createController('AmenityFilter').getView();
	filterWindow.open({modal:true});
}

getData();

// Alloy.Collections.instance('Facility').fetch();
// Alloy.Collections.instance('Amenity').fetch();
// Alloy.Collections.instance('FacilityAmenity').fetch();

$.index.open();