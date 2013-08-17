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
			
		});

		return Collection;
	}
};