function getData() {
    Ti.API.info("Getting Data!");
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            json = JSON.parse(this.responseText);
            var amenities = Alloy.Collections.instance("Amenity");
            json.amenities.forEach(function(e) {
                var amenity = Alloy.createModel("Amenity", {
                    amenityId: e.ID,
                    title: e.title
                });
                amenities.add(amenity);
            });
            var facilities = Alloy.Collections.instance("Facility");
            var facilityAmenities = Alloy.Collections.instance("FacilityAmenity");
            json.facilities.forEach(function(e) {
                var facility = Alloy.createModel("Facility", {
                    lat: e.latlng[0],
                    lng: e.latlng[1],
                    facilityId: e.ID,
                    title: e.title,
                    zip: e.zip,
                    address: e.address,
                    notes: e.notes,
                    hours: e.hours,
                    url: e.url
                });
                facilities.add(facility);
                for (var i = 0; e.amenities.length > i; i++) {
                    var facilityAmenity = Alloy.createModel("FacilityAmenity", {
                        facilityId: e.ID,
                        amenityId: e.amenities[i]
                    });
                    facilityAmenities.add(facilityAmenity);
                }
            });
            facilities.trigger("loaded");
        }
    });
    xhr.open("GET", url);
    xhr.send();
}

var url = "http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1";

var json;