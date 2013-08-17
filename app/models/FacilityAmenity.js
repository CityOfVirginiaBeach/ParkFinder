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
		});

		return Collection;
	}
};