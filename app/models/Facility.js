exports.definition = {
	config: {
		columns: {
		    "lat": "real",
		    "lng": "real",
		    "facilityId": "integer",
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
			"idAttribute": "facilityId"
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