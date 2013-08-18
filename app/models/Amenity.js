exports.definition = {
	config: {
		columns: {
		    "amenityId": "INTEGER PRIMARY KEY",
		    "title": "TEXT",
		    "selected": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "Amenity",
			idAttribute: "amenityId"
		}
		// URL: 'http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1',
		// parentNode: 'amenities',

		// adapter: {
		// 	type: "sqlrest",
		// 	collection_name: "Amenity",
		// 	idAttribute: "amenityId"
		// }
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			initialize: function(){
	            this.set({selected: true});
	        },
			toggleSelected: function(e) {
				var selected = true;
				if (this.get("selected") ) {
					var selected = false;
				} 
				this.save({
					amenityId: this.get("amenityId"),
					selected: selected
				});
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			comparator : function(amenity) {
        	    return amenity.get('title');
            }
		});

		return Collection;
	}
};