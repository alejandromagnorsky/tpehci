var map = null;

function initializeMap() {

	if (map != null) {

		var latlng = new google.maps.LatLng(-34.397, 150.644);
		var myOptions = {
			zoom : 8,
			center : latlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map_canvas"),
				myOptions);

		google.maps.event.trigger(map, 'resize');

		//addGeocodedMarker("Puerto Madero, Argentina", true);
	}
}

function addGeocodedMarker(address, center) {

	geocoder = new google.maps.Geocoder();

	geocoder.geocode( {
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {

			if (center == true)
				map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker( {
				map : map,
				position : results[0].geometry.location
			});
		} else {
			alert("Geocode was not successful for the following reason: "
					+ status);
		}
	});
}

function addMapMarker(latLng, center) {

	if (center == true)
		map.setCenter(latLng);
	var marker = new google.maps.Marker( {
		position : latLng,
		map : map,
		title : "Hello World!"
	});
}