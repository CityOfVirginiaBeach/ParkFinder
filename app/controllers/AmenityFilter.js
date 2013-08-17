var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
amenities.trigger('change');

function transformFunction(model) {
 
    var transform = model.toJSON();
    if (transform.selected) {
    	transform.hasCheck = true;
    } else {
    	transform.hasCheck = false;
    }

    return transform;
}

function toggleInFilter(e) {
	var result = amenities.where({amenityId: e.row.amenityId});

	
	if (result) {
		var a = result[0];
		if (a.get('selected')) {
			e.source.setHasCheck(false);
			// a.set({'selected':true});
			a.toggleSelected();
		} else {
			e.source.setHasCheck(true);
			// a.set({'selected':false});
			a.toggleSelected();
		}
	}
}

function closeWindow(e) {
	$.amenityFilterWindow.close();
}

function clearSelections(e) {
	amenities.forEach(function(a) {
		a.save({
			amenityId: a.get("amenityId"),
			selected: false
		});
	})
}

$.amenityFilterWindow.addEventListener("close", function(){
    facilities.trigger('loaded');
    $.destroy();
});