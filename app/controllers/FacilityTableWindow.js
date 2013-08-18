var facilities = Alloy.Collections.instance('Facility');


facilities.fetch({
	query: 'SELECT * FROM Facility WHERE facilityId IN (SELECT DISTINCT FacilityAmenity.facilityId FROM FacilityAmenity LEFT JOIN Amenity ON FacilityAmenity.amenityId = Amenity.amenityId WHERE Amenity.selected = 1)'
});

function closeWindow(e) {
	$.navGroupWin.close();
}

function showFacilityDetailsWindow(e) {
	var arg = {
        facilityId: e.source.facilityId
    };
	$.navgroup.open(Alloy.createController('FacilityDetails', arg).getView());
}

$.navGroupWin.addEventListener("showFacilityDetailsForTarget",function(e){
	showFacilityDetailsWindow({source:{facilityId:e.facilityId}});
});