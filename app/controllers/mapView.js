/**
 * @fileOverview Displays facilities with selected amenities on a map
 * @name mapView
 * @namespace mapView
 * @author  Chris Golding
 */

var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');

/**
 * Plots facilities with any of the selected amenities
 * @memberOf mapView
 */
function plotFacilities() {
	$.mapView.removeAllAnnotations();

	var selectedAmenities = amenities.getSelectedIds();
	var facilitiesWithSelectedAmenitiesIds = facilityAmenities.filterByAmenityIdsAsArray(selectedAmenities);
	var filteredFacilities = facilities.filterByIds(facilitiesWithSelectedAmenitiesIds);

	for (var i = 0; i < filteredFacilities.length; i++) {
		var e = filteredFacilities[i].toJSON();

		var parameters = {
			latitude: e.lat,
			longitude: e.lng,
			title: e.title,
			subtitle: e.address,
			facilityId: e.facilityId,
			rightButton: '/images/infoRightBtn.png'
		};

		var annotation = Alloy.Globals.Map.createAnnotation(parameters);
		$.mapView.addAnnotation(annotation);
	}

}

/**
 * Updates facilities on map when the facility data is finished loading
 * @memberOf mapView
 */
facilities.on('loaded', function(e) {
	plotFacilities();
});

/**
 * Causes the facility detail window to be opened when the annotation's button is pressed
 * @memberOf mapView
 * @param  {Titanium.Event} e - annotation that was clicked
 */
$.mapView.addEventListener('click', function(e) {
	if (e.clicksource === 'rightButton' || e.clicksource === 'rightPane' || e.clicksource === 'infoWindow') {
		$.mapView.fireEvent('openFacilityDetails', {
			facilityId: e.annotation.facilityId
		});
	}
});