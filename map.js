var coords = {
	'Stanford' : [37.424938, -122.1703835],
	'Arrillaga Gym' : [37.428852, -122.160182],
	'huang' : [37.4279352, -122.1742892],
	'GgreenLib' : [37.4262595, -122.1805215],
	'frosoco' : [37.4279352, 122.1742892]
};

var mapOptions = null;
var map = null;

offset = function() {
	return Math.random() / 1000;
}

function ItemMap() {

	mapOptions = {
	  center: new google.maps.LatLng(37.424938, -122.1703835),
	  zoom: 15
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
}

display_map = function(query) {
	get('map-container').style.display = "inline";
	google.maps.event.trigger(map, 'resize');
	map.setCenter(mapOptions.center);
	// var myLatlng = new google.maps.LatLng(coords['Stanford'][0] + offset(), coords['Stanford'][1] + offset());
	// var marker1 = new google.maps.Marker({
 //    	position: myLatlng,
 //    	title:"Stanford",
 //    	map: map
	// });
	// myLatlng = new google.maps.LatLng(coords['Arrillaga Gym'][0] + offset(), coords['Arrillaga Gym'][1] + offset());
	// var marker2 = new google.maps.Marker({
	// 	position: myLatlng,
	// 	title:"Arrillaga Gym",
	// 	map: map
	// });
	// var markers = [marker1, marker2];

    query.read().then(function(matchedItems) {
    	var markers = [];
    	//var matchedItems = [{location: 'Huang', date: 'Friday Jan 10'}];
    	for (var i = 0; i < matchedItems.length; i++) {
    		var row = matchedItems[i];
    		if (row.location === null || row.location === '') continue;
    		var lat_lng = new google.maps.LatLng(coords[row.location][0] + offset(), coords[row.location][1] + offset());
    		
    		var marker_options = {
    			position: lat_lng,
    			title: row.location,
    			map: map,
    			category: row.category,
    			location: row.location,
    			date: row.date,
    			email: row.email,
    			description: row.description
    		};

    		// var circle_options = {
		    // 	strokeColor: 'red',
		    // 	strokeOpacity: 1,
		    // 	strokeWeight: 2,
		    // 	fillColor: 'red',
		    // 	fillOpacity: 0.4,
		    // 	map: map,
		    // 	center: lat_lng,
		    // 	radius: 100
    		// };
    		var marker = new google.maps.Marker(marker_options);
    		markers.push(marker);
    	}
    	for (var i = 0; i < markers.length; i++) {
    		marker = markers[i];
    		//marker.setMap(map);
    		google.maps.event.addListener(marker, 'mouseover', function(event) {
    			console.log(marker);
    			// get('item_info').style.display = "inline";
    			// get('category').innerHTML = marker.date;
    		});
    	}
    	//map.checkResize();	
    	//google.maps.event.trigger(map, 'resize');
    	//map.setCenter(mapOptions.center);
    	
    }, handleError);
}


