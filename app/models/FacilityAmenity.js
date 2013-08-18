exports.definition = {
	config: {
		columns: {
			"facilityAmenityId": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "facilityId": "INTEGER",
		    "amenityId": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "FacilityAmenity",
			idAttribute: "facilityAmenityId"
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
			filterByFacilityIds: function(idArray) {
            	var results = _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("facilityId")) > -1;
            	}));
            	return results.value();
            },
            filterByAmenityIds: function(idArray) {
            	var results = _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("amenityId")) > -1;
            	}));
            	return results.value();
            },
            filterByAmenityIdsAsArray: function(idArray) {
            	var results = _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("amenityId")) > -1;
            	}));
            	return _.invoke(results.value(), 'get', 'facilityId');
            },
            filterByFacilityIdsAsArray: function(idArray) {
            	var results = _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("facilityId")) > -1;
            	}));
            	return _.invoke(results.value(), 'get', 'amenityId');
            }
		});

		return Collection;
	}
};