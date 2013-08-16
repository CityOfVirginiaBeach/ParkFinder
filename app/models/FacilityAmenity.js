exports.definition = {
	config: {
		columns: {
		    "facilityId": "INTEGER",
		    "amenityId": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "FacilityAmenity"
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
		});

		return Collection;
	}
};