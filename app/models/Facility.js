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
			// extended functions and properties go here
			comparator : function(facility) {
        	    return facility.get('title');
            },
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