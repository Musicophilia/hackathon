var coords = {
	'Stanford' : [37.424938, -122.1703835],
	'Arrillaga Gym' : [37.428852, -122.160182],
	'Huang' : [37.4279352, -122.1742892]
};

var mapOptions = null;
var map = null;

offset = function() {
	return Math.random() / 1000;
}

window.onload = function() {

	mapOptions = {
	  center: new google.maps.LatLng(37.424938, -122.1703835),
	  zoom: 15
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


	// Silviana's long lost sis
	//var image = 'http://fc00.deviantart.net/fs70/f/2012/147/1/f/taeyeon_mr_taxi_repackage_purple__by_silviana_taegang-d51cvm4.png';
	console.log(offset(), offset());
	var myLatlng = new google.maps.LatLng(coords['Stanford'][0] + offset(), coords['Stanford'][1] + offset());
	var marker1 = new google.maps.Marker({
    	position: myLatlng,
    	title:"Stanford",
    	//icon: image
	});
	myLatlng = new google.maps.LatLng(coords['Arrillaga Gym'][0] + offset(), coords['Arrillaga Gym'][1] + offset());
	var marker2 = new google.maps.Marker({
		position: myLatlng,
		title:"Arrillaga Gym"
	});
	var markers = [marker1, marker2];
	display_markers(markers);
	display_map(null);
}

display_markers = function(markers) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

display_map = function(query) {

    //query.read().then(function(matchedItems) {
    	var circles = [];
    	var matchedItems = [{location: 'Huang'}];
    	for (var i = 0; i < matchedItems.length; i++) {
    		var row = matchedItems[i];
    		if (row.location === null || row.location === '') continue;
    		var lat_lng = new google.maps.LatLng(coords[row.location][0] + offset(), coords[row.location][1] + offset());
    		var circle_options = {
		    	strokeColor: 'red',
		    	strokeOpacity: 1,
		    	strokeWeight: 1,
		    	fillColor: 'red',
		    	fillOpacity: 0.4,
		    	map: map,
		    	center: lat_lng,
		    	radius: 30
    		};
    		var circle = new google.maps.Circle(circle_options);
    	}
    //}, handleError);
}



