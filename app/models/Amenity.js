exports.definition = {
	config: {
		columns: {
		    "amenityId": "INTEGER",
		    "title": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "Amenity",
			"idAttribute": "amenityId"
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