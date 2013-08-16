exports.definition = {
    config: {
        columns: {
            facilityId: "INTEGER",
            amenityId: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "FacilityAmenity"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("FacilityAmenity", exports.definition, []);

collection = Alloy.C("FacilityAmenity", exports.definition, model);

exports.Model = model;

exports.Collection = collection;