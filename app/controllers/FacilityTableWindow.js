/**
 * @fileOverview TableView window to view facilities with selected amenities
 * @name FacilityTableWindow
 * @namespace FacilityTableWindow
 * @author  Chris Golding
 */

Alloy.Collections.Facility.trigger('change');

/**
 * Filters facilities to only show facilities that have amenities selected
 * @memberOf FacilityTableWindow
 * @param  {Facility} collection to be filtered
 * @return {Facility} filtered collection
 */
function facilityFilter(collection) {
    return Alloy.Collections.Facility.filterByIds(
        Alloy.Collections.FacilityAmenity.filterByAmenityIdsAsArray(
            Alloy.Collections.Amenity.getSelectedIds()));
}

/**
 * Closes the current window
 * @memberOf FacilityTableWindow
 */
function closeWindow(e) {
	$.navGroupWin.close();
}

/**
 * Opens the facility details window for a specified facility
 * @memberOf FacilityTableWindow
 * @param  {Titanium.Event} e - event containing the facilityId to display
 */
function showFacilityDetailsWindow(e) {
	var arg = {
        facilityId: e.source.facilityId
    };
    if (OS_ANDROID) {
    	Alloy.createController('FacilityDetails', arg).getView().open({modal:false});
    } else {
    	$.navgroup.open(Alloy.createController('FacilityDetails', arg).getView());
    }
}

/**
 * Calls showFacilityDetailsWindow from the window and not an event
 * @memberOf FacilityTableWindow
 * @param  {JSON} e facilityId of the target facility
 */
$.navGroupWin.addEventListener("showFacilityDetailsForTarget",function(e){
	showFacilityDetailsWindow({source:{facilityId:e.facilityId}});
});

$.navGroupWin.addEventListener("close", function(){
    //TODO - Appcelerator recommended, throws an error??
    // $.destroy();
});

Alloy.Globals.parent = $.navGroupWin;