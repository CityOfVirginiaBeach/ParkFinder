/**
 * @file Amenity Filter window for selecting amenities to search for
 * @name AmenityFilter
 * @namespace AmenityFilter
 * @author  Chris Golding
 */

var facilities = Alloy.Collections.instance('Facility');
var amenities = Alloy.Collections.instance('Amenity');
amenities.trigger('change');

/**
 * Modifies the filtered models from the collection to be displayed
 * @name transformFunction
 * @memberOf AmenityFilter
 * @param  {Facility} model - item to be modified
 * @return {JSON} a modified version of the model as a JSON object
 */
function transformFunction(model) {
 
    var transform = model.toJSON();
    if (transform.selected) {
    	transform.hasCheck = true;
    } else {
    	transform.hasCheck = false;
    }

    return transform;
}

/**
 * Switches the selection property of a given model
 * @memberOf AmenityFilter
 * @param  {Titanium.Event} e - row representing the model to toggle
 */
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

/**
 * Closes the current window
 * @memberOf AmenityFilter
 */
function closeWindow(e) {
	$.amenityFilterWindow.close();
}

/**
 * Sets the selected property of all amenities to false
 * @memberOf AmenityFilter
 */
function clearSelections(e) {
	amenities.forEach(function(a) {
		a.save({
			amenityId: a.get("amenityId"),
			selected: false
		});
	});
}

/**
 * When the window is closed, destroy the current object and reload facilities based on the selected amenities
 * @memberOf AmenityFilter
 */
$.amenityFilterWindow.addEventListener("close", function(){
    facilities.trigger('loaded');
    $.destroy();
});