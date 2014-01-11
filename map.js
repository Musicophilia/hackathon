window.onload = function() {
	// Silviana's long lost sis
	//var image = 'http://fc00.deviantart.net/fs70/f/2012/147/1/f/taeyeon_mr_taxi_repackage_purple__by_silviana_taegang-d51cvm4.png';

	var myLatlng = new google.maps.LatLng(37.424938,-122.1703835);
	var marker1 = new google.maps.Marker({
    	position: myLatlng,
    	title:"Stanford",
    	//icon: image
	});
	myLatlng = new google.maps.LatLng(37.428852, -122.160182);
	var marker2 = new google.maps.Marker({
		position: myLatlng,
		title:"Arrillaga Gym"
	});
	var markers = [marker1, marker2];
	display_markers(markers);
}

display_markers = function(markers) {
	var mapOptions = {
      center: new google.maps.LatLng(37.424938, -122.1703835),
      zoom: 15
    };
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}