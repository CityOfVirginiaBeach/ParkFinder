var args = arguments[0] || {};
var targetId = args.facilityId;

var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');
facilities.trigger('change');
amenities.trigger('change');

function filterFunction(collection) {
    return collection.where({facilityId:targetId});
}

function amenitiesFilterFunction(collection) {
	return collection.filterByIds(_.invoke(facilityAmenities.where({facilityId: targetId}), "get", "amenityId"));
}

function closeWindow(e) {
	var parent = Alloy.Globals.parent;
	parent.close();
}

$.facilityDetailsWindow.addEventListener("close", function(){
    $.destroy();
});