// Ti.include('getParkData.js');
 
function getData(e) {
	// alert('Starting getData');
	var url = "http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1";
	var json;
	Ti.API.info("Getting Data!");
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
	        // parse the retrieved data, turning it into a JavaScript object
	        json = JSON.parse(this.responseText);
	        // ...
	        // Ti.API.info(json);
	        
	        var amenities = Alloy.Collections.instance('Amenity');
	        json.amenities.forEach(function(e) {
	        	var amenity = Alloy.createModel('Amenity', {
	        		amenityId: e.ID,
	        		title: e.title,
	        		selected: true   //Initialize as true for amenity selection
	        	});
	        	amenity.save();
	        	// amenities.add(amenity);
	        });

	        // amenities.sync();

	        Ti.API.info("Before Sync: " + amenities.length);
	        amenities.fetch({
	        	success: function(){
	        		Ti.API.info("Data fetched! " + amenities.length);
	        	},
	        	error: function(){
	        		Ti.API.info("ERROR!");
	        	}
	        });
	        Ti.API.info("After Sync: " + amenities.length);
	        // alert('After Amenities Sync');

	        var facilities = Alloy.Collections.instance('Facility');
	        var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');
	        json.facilities.forEach(function(e) {
	        	var facility = Alloy.createModel('Facility', {
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
	        	facility.save();
	        	// facilities.add(facility);

	        	for (var i = 0; i < e.amenities.length; i++) {
	        		var facilityAmenity = Alloy.createModel('FacilityAmenity', {
	        			facilityId: e.ID,
	        			amenityId: e.amenities[i]
	        		});
	        		facilityAmenity.save();
	        		// facilityAmenities.add(facilityAmenity);
	        	}
	        });
	        Ti.API.info("Before Sync: " + facilities.length);
	        facilities.fetch({
	        	success: function(){
	        		Ti.API.info("Data fetched! " + facilities.length);
	        	},
	        	error: function(){
	        		Ti.API.info("ERROR!");
	        	}
	        });
	        Ti.API.info("After Sync: " + facilities.length);

	        Ti.API.info("Before Sync: " + facilityAmenities.length);
	        facilityAmenities.fetch({
	        	success: function(){
	        		Ti.API.info("Data fetched! " + facilityAmenities.length);
	        	},
	        	error: function(){
	        		Ti.API.info("ERROR!");
	        	}
	        });
	        Ti.API.info("After Sync: " + facilityAmenities.length);
	        alert('Done!');

	        facilities.trigger('loaded');
	    }
	});
	xhr.open('GET', url);
	xhr.send();
}

// function getData(e) {
// 	// alert('Starting getData');
// 	var url = "http://www.vbgov.com/_assets/apps/parkfinder/_.ashx?data=1";
// 	var json;
// 	Ti.API.info("Getting Data!");
// 	var xhr = Ti.Network.createHTTPClient({
// 	    onload: function() {
// 	        // parse the retrieved data, turning it into a JavaScript object
// 	        json = JSON.parse(this.responseText);
	        
// 	        var amenities = Alloy.Collections.instance('Amenity');
	        
// 	        var db = Ti.Database.open('_alloy_');
// 	        db.execute('BEGIN');
// 	        json.amenities.forEach(function(e) {
// 				var sql = 'INSERT INTO Amenity (amenityID, title, selected) ';
// 				sql +=  "SELECT " + e.ID + ",'" + e.title + "',1 ";
// 				sql +=  "WHERE NOT EXISTS (SELECT amenityID FROM Amenity WHERE AmenityID = " + e.ID + ")";
// 				db.execute(sql);
// 	        });

// 	        Ti.API.info("Before Sync: " + amenities.length);
// 	        amenities.fetch({
// 	        	success: function(){
// 	        		Ti.API.info("Data fetched! " + amenities.length);
// 	        	},
// 	        	error: function(){
// 	        		Ti.API.info("ERROR!");
// 	        	}
// 	        });
// 	        Ti.API.info("After Sync: " + amenities.length);
// 	        // alert('After Amenities Sync');

// 	        var facilities = Alloy.Collections.instance('Facility');
// 	        var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');
// 	        json.facilities.forEach(function(e) {
// 	        	var sql = 'INSERT INTO Facility (facilityId, title, lat, lng, address, zip, notes, hours, url) ';
// 	        	sql += "SELECT " + e.ID + ", \"" + e.title + "\", " + e.latlng[0] + "," + e.latlng[1] + ",\"";
// 	        	sql += e.address + "\",\"" + e.zip + "\",\"" + e.notes + "\",\"" + e.hours + "\",\"" + e.url + "\" ";
// 				sql += "WHERE NOT EXISTS (SELECT facilityId FROM Facility WHERE FacilityID = " + e.ID + ")";
// 				db.execute(sql);

// 	        	for (var i = 0; i < e.amenities.length; i++) {
// 	        		sql = 'INSERT INTO FacilityAmenity (facilityId, amenityId) ';
// 	        		sql += "SELECT " + e.ID + ',' + e.amenities[i] + ' ';
// 	        		sql += "WHERE NOT EXISTS (SELECT facilityId, amenityId FROM ";
//         			sql += "FacilityAmenity WHERE FacilityID = " + e.ID + " AND amenityId =" + e.amenities[i] + ")";
// 	        		db.execute(sql);
// 	        	}
// 			});

// 			db.execute('COMMIT');
// 	        db.close();
	        
// 	        Ti.API.info("Before Sync: " + facilities.length);
// 	        facilities.fetch({
// 	        	success: function(){
// 	        		Ti.API.info("Data fetched! " + facilities.length);
// 	        	},
// 	        	error: function(){
// 	        		Ti.API.info("ERROR!");
// 	        	}
// 	        });
// 	        Ti.API.info("After Sync: " + facilities.length);

// 	        Ti.API.info("Before Sync: " + facilityAmenities.length);
// 	        facilityAmenities.fetch({
// 	        	success: function(){
// 	        		Ti.API.info("Data fetched! " + facilityAmenities.length);
// 	        		alert("Data fetched! " + facilityAmenities.length);
// 	        	},
// 	        	error: function(){
// 	        		Ti.API.info("ERROR!");
// 	        	}
// 	        });
// 	        Ti.API.info("After Sync: " + facilityAmenities.length);
// 	        alert('Done!');
// 	    }
// 	});
// 	xhr.open('GET', url);
// 	xhr.send();
// }

function showFilterWindow(e) {
	var filterWindow = Alloy.createController('AmenityFilter').getView();
	filterWindow.open({modal:true});
}

function showFacilityWindow(e) {
	var facilityWindow = Alloy.createController('FacilityTableWindow').getView();
	facilityWindow.open({modal:false});
}

// var amenities = Alloy.Collections.instance('Amenity');
// var facilities = Alloy.Collections.instance('Facility');
// var facilityAmenities = Alloy.Collections.instance('FacilityAmenity');

getData();

$.index.open();

$.map.getView('mapView').addEventListener('openFacilityDetails', function(e) {
	var facilityWindowController = Alloy.createController('FacilityTableWindow');
	var facilityWindowView = facilityWindowController.getView();
	
	facilityWindowView.fireEvent('showFacilityDetailsForTarget',{facilityId:e.facilityId});
	facilityWindowView.open({modal:false});
});