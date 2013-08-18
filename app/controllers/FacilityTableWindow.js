Alloy.Collections.Facility.trigger('change');


function facilityFilter(collection) {
    return Alloy.Collections.Facility.filterByIds(
        Alloy.Collections.FacilityAmenity.filterByAmenityIdsAsArray(
            Alloy.Collections.Amenity.getSelectedIds()));
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
    //TODO - Appcelerator recommended, throws an error??
    // $.destroy();
});

Alloy.Globals.parent = $.navGroupWin;