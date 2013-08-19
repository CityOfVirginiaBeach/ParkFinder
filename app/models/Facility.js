/**
 * @fileOverview Facility Model and Collection w/ methods
 * @name Facility
 * @class Facility
 * @author  Chris Golding
 */
exports.definition = {
	config: {
		columns: {
		    "lat": "real",
		    "lng": "real",
		    "facilityId": "integer PRIMARY KEY",
		    "title": "text",
		    "zip": "text",
		    "address": "text",
		    "notes": "text",
		    "hours": "text",
		    "url": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "Facility",
			idAttribute: "facilityId"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			/**
			 * Allows sorting of facilities by facility title
			 * @memberOf Facility#
			 * @param  {Facility} facility to pull title
			 * @return {String} title of facility
			 */
			comparator : function(facility) {
        	    return facility.get('title');
            },
            /**
             * Get facilities from collection based on an array of facility ids
             * @memberOf Facility#
             * @param  {int[]} idArray array of facilities to get
             * @return {Facility[]} items with matching facilityIds 
             */
            filterByIds: function(idArray) {
            	var results = _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("facilityId")) > -1;
            	}));
            	return results.value();
            }
		});

		return Collection;
	}
};