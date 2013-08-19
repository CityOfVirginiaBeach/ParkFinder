/**
 * @fileOverview Amenity Model and Collection w/ methods
 * @name Amenity
 * @class Amenity
 * @author  Chris Golding
 */
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
			/**
			 * Sets the selected function to true by default
			 * @memberOf  Amenity#
			 * @return {Amenity} modified model
			 */
			initialize: function(){
	            this.set({selected: true});
	        },
	        /**
	         * Switches the value of selected for a model
	         * @memberOf Amenity#
	         * @return {Amenity} modified model
	         */
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
			/**
			 * Allows sorting of amenities by amenity title
			 * @memberOf Amenity#
			 * @param  {Amenity} amenity to pull title
			 * @return {String} title of amenity
			 */
			comparator : function(amenity) {
        	    return amenity.get('title');
            },
            /**
             * Get amenities from collection based on an array of amenity ids
             * @memberOf Amenity#
             * @param  {int[]} idArray array of amenities to get
             * @return {Amenity[]} items with matching amenityIds 
             */
            filterByIds: function(idArray) {
            	var results =  _(this.filter(function(e) {
            		return _.indexOf(idArray,e.get("amenityId")) > -1;
            	}));
            	return results.value();
            },
            /**
             * Get an array of amenity ids that are currently selected
             * @memberOf Amenity#
             * @return {int[]} amenity ids that are currently selected
             */
            getSelectedIds: function() {
            	return _.invoke(this.where({selected: true}), "get", "amenityId");
            }
		});

		return Collection;
	}
};