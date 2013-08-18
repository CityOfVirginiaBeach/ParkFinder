var facilities = Alloy.Collections.instance('Facility');
facilities.trigger('change');

// facilities.fetch({
// 	query: 'SELECT * FROM Facility WHERE facilityId IN (SELECT DISTINCT FacilityAmenity.facilityId FROM FacilityAmenity LEFT JOIN Amenity ON FacilityAmenity.amenityId = Amenity.amenityId WHERE Amenity.selected = 1)'
// });

// facilities.fetch();

function facilityFilter(collection) {
	collection.fetch({
		query: 'SELECT * FROM Facility WHERE facilityId IN (SELECT DISTINCT FacilityAmenity.facilityId FROM FacilityAmenity LEFT JOIN Amenity ON FacilityAmenity.amenityId = Amenity.amenityId WHERE Amenity.selected = 1)'
	});

	return collection;
}

function closeWindow(e) {
	$.navGroupWin.close();
}

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

$.navGroupWin.addEventListener("showFacilityDetailsForTarget",function(e){
	showFacilityDetailsWindow({source:{facilityId:e.facilityId}});
});

$.navGroupWin.addEventListener("close", function(){
    $.destroy();
});

Alloy.Globals.parent = $.navGroupWin;