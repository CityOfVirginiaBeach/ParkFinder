exports.definition = {
    config: {
        columns: {
            amenityId: "INTEGER",
            title: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "Amenity",
            idAttribute: "amenityId"
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

model = Alloy.M("Amenity", exports.definition, []);

collection = Alloy.C("Amenity", exports.definition, model);

exports.Model = model;

exports.Collection = collection;