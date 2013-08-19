/**
 * @fileOverview Displays the details of a specified facility
 * @name FacilityDetails
 * @namespace FacilityDetails
 * @author  Chris Golding
 * @param {JSON} args - a json object with facilityId defined as a parameter
 */

var args = arguments[0] || {};
var targetId = args.facilityId;

var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');
facilities.trigger('change');
amenities.trigger('change');

/**
 * Filters models from the collection to be displayed
 * @memberOf FacilityDetails
 * @param  {Facility} collection to be filtered
 * @return {Facility} filtered collection
 */
function filterFunction(collection) {
    return collection.where({facilityId:targetId});
}

/**
 * Filters models from the collection to be displayed
 * @memberOf FacilityDetails
 * @param  {Amenity} collection to be filtered
 * @return {Amenity} filtered collection
 */
function amenitiesFilterFunction(collection) {
	return collection.filterByIds(_.invoke(facilityAmenities.where({facilityId: targetId}), "get", "amenityId"));
}

/**
 * Closes both the current and parent window
 * @memberOf FacilityDetails
 */
function closeWindow(e) {
	var parent = Alloy.Globals.parent;
	parent.close();
}

/**
 * Listens for the closure of the window to destroy the current object
 * @memberOf FacilityDetails
 */
$.facilityDetailsWindow.addEventListener("close", function(){
    $.destroy();
});