/**
 * @fileOverview FacilityAmenity Model and Collection w/ methods
 * @name FacilityAmenity
 * @class FacilityAmenity
 * @author  Chris Golding
 */

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
                  /**
                   * Get facility amenity ids from collection based on an array of amenity ids
                   * @memberOf FacilityAmenity#
                   * @param  {int[]} idArray array of amenities to get
                   * @return {FacilityAmenity[]} items with matching facilityAmenityIds
                   */
                  filterByAmenityIdsAsArray: function(idArray) {
                        var results = _(this.filter(function(e) {
                              return _.indexOf(idArray, e.get("amenityId")) > -1;
                        }));
                        return _.invoke(results.value(), 'get', 'facilityId');
                  },
                  /**
                   * Get facility amenity ids from collection based on an array of facility ids
                   * @memberOf FacilityAmenity#
                   * @param  {int[]} idArray array of facilities to get
                   * @return {FacilityAmenity[]} items with matching facilityAmenityIds
                   */
                  filterByFacilityIdsAsArray: function(idArray) {
                        var results = _(this.filter(function(e) {
                              return _.indexOf(idArray, e.get("facilityId")) > -1;
                        }));
                        return _.invoke(results.value(), 'get', 'amenityId');
                  }
            });

            return Collection;
      }
};