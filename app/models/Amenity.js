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
			comparator : function(amenity) {
        	    return amenity.get('title');
            },
            filterByIds: function(idArray) {
            	var results =  _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("amenityId")) > -1;
            	}));
            	return results.value();
            },
            getSelectedIds: function() {
            	return _.invoke(this.where({selected: true}), "get", "amenityId");
            }
		});

		return Collection;
	}
};