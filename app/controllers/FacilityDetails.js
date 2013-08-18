var args = arguments[0] || {};
var targetId = args.facilityId;

var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
facilities.trigger('change');
// amenities.trigger('change');

amenities.fetch({
		query: 'SELECT * FROM Amenity WHERE amenityId IN (SELECT DISTINCT FacilityAmenity.amenityId FROM FacilityAmenity LEFT JOIN Facility ON FacilityAmenity.facilityId = Facility.facilityId WHERE Facility.facilityId = ' + targetId + ');'
});

Ti.API.info(amenities.length);

function filterFunction(collection) {
    return collection.where({facilityId:targetId});
}

function amenitiesFilterFunction(collection) {
	Ti.API.info('SELECT * FROM Amenity WHERE amenityId IN (SELECT DISTINCT FacilityAmenity.amenityId FROM FacilityAmenity LEFT JOIN Facility ON FacilityAmenity.facilityId = Facility.facilityId WHERE Facility.facilityId = ' + targetId + ');');
	collection.fetch({
			query: 'SELECT * FROM Amenity WHERE amenityId IN (SELECT DISTINCT FacilityAmenity.amenityId FROM FacilityAmenity LEFT JOIN Facility ON FacilityAmenity.facilityId = Facility.facilityId WHERE Facility.facilityId = ' + targetId + ');'
	});

	return collection;
}

function closeWindow(e) {
	var parent = Alloy.Globals.parent;
	parent.close();
}

$.facilityDetailsWindow.addEventListener("close", function(){
    amenities.fetch();
    $.destroy();
});