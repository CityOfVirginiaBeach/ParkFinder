Ti.include('getParkData.js');

Alloy.Globals.selectedFilter = [];

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
	var facilityWindowController = Alloy.createController('FacilityTableWindow');
	var facilityWindowView = facilityWindowController.getView();
	
	facilityWindowView.fireEvent('showFacilityDetailsForTarget',{facilityId:e.facilityId});
	facilityWindowView.open({modal:false});
});