exports.definition = {
    config: {
        columns: {
            lat: "real",
            lng: "real",
            facilityId: "integer",
            title: "text",
            zip: "text",
            address: "text",
            notes: "text",
            hours: "text",
            url: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "Facility",
            idAttribute: "facilityId"
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

model = Alloy.M("Facility", exports.definition, []);

collection = Alloy.C("Facility", exports.definition, model);

exports.Model = model;

exports.Collection = collection;