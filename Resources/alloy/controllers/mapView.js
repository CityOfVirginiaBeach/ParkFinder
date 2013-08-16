function Controller() {
    function plotFacilities() {
        var data = facilities.toJSON();
        data.forEach(function(e) {
            var annotation = Ti.Map.createAnnotation({
                latitude: e.lat,
                longitude: e.lng,
                title: e.title,
                subtitle: e.address,
                pincolor: Titanium.Map.ANNOTATION_RED
            });
            $.mapView.addAnnotation(annotation);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mapView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId1 = [];
    $.__views.mapView = Ti.Map.createView({
        region: {
            latitude: 36.77354,
            latitudeDelta: .3,
            longitude: -76.095,
            longitudeDelta: .3
        },
        mapType: Ti.Map.STANDARD_TYPE,
        annotations: __alloyId1,
        id: "mapView",
        ns: Ti.Map
    });
    $.__views.mapView && $.addTopLevelView($.__views.mapView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var facilities = Alloy.Collections.instance("Facility");
    facilities.on("loaded", function() {
        Ti.API.info("Loaded recieved.");
        plotFacilities();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;