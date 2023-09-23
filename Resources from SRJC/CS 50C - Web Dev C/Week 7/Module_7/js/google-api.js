// Marker coordinates
		// Santa Rosa Junior College, Santa Rosa, California, USA
		var srjc = {lat: 38.454975, lng: -122.720892};
    // Humboldt State University, Arcata, California, USA
		var hsu = {lat: 40.875598, lng: -124.078603};
    // Nagoya University, Nagoya, Aichi, Japan.
		var nnu = {lat: 35.154562, lng: 136.967824};

    var map, marker;

    var destCoords = new google.maps.LatLng(38.454975, -122.720892);

    var line;
    // Center Focus
    // New map object loaded in html
    var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 6,
	    center: hsu,
			styles:
	    [
	      {"featureType":"all","elementType":"geometry","stylers":[{"color":"#63b5e5"}]},
	      {"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#7da27e"}]},
	      {"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},
	      {"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},
	      {"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
	      {"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#000000"}]},
	      {"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},
	      {"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
	      {"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#000000"}]},
	      {"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#000000"},{"visibility":"on"}]},
	      {"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
	      {"featureType":"administrative.locality","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"visibility":"on"}]},
	      {"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},
	      {"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
	      {"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},
	      {"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},
	      {"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},
	      {"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#ff0000"}]},
	      {"featureType":"landscape.man_made","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
	      {"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},
	      {"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},
	      {"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},
	      {"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},
	      {"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},
	      {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},
	      {"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"lightness":"-100"},{"saturation":"-100"},{"gamma":"0.47"},{"weight":"0.48"}]},
	      {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},
	      {"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ff0000"}]},
	      {"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},
	      {"featureType":"transit.line","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},
	      {"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},
	      {"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
	      {"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]},
	      {"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]}
	    ]
    	}
		);

    // Marker One
    var marker1 = new google.maps.Marker(
			{
		    position: nnu,
		    map: map
    	}
		);

    // Marker Two
    var marker2 = new google.maps.Marker(
			{
  			position: srjc,
  			map: map
  		}
		);

  	// Marker Three
    var marker3 = new google.maps.Marker(
			{
  			position: hsu,
  			map: map
  		}
		);

    var info1 = new google.maps.InfoWindow(
			{
    		content: "Nagoya University:<br />This is where my wife earned her Masters Degree in Architecture and Urban Planning."
     	}
		);
    marker1.addListener('click', function()
			{
    		info1.open(map, marker1);
    	}
		);

    var info2 = new google.maps.InfoWindow(
			{
    		content: "Santa Rosa Junior College:<br />This is where I currently study Computer Science and Web Development."
     	}
		);
    marker2.addListener('click', function()
			{
    		info2.open(map, marker2);
				map.setZoom(10);
    	}
		);

    var info3 = new google.maps.InfoWindow(
			{
    		content: "Humboldt State University:<br />This is where I went to Univeristy to earn a Bachelors Degree in Psychology."
     	}
		);
    marker3.addListener('click', function()
			{
    		info3.open(map, marker3);
				map.setCenter(marker3.getPosition());
    	}
		);


    function createMap()
		{
	    // set latitude and longitude coordinates using Google Map's LatLng() method
	    var mapCoords = new google.maps.LatLng(0, 0);

	    // define a property list of settings for the Google Map we are about to create
	    var mapOptions = {
	      zoom: 4,
	      center: mapCoords
	    };

	    // use Google's Map() method to create a new map object inside the targeted HTML element
	    map = new google.maps.Map(document.getElementById("map"), mapOptions);

	    // create a marker at the destination point
	    destMarker = new google.maps.Marker(
				{
		      position: destCoords,
		      map: map,
		      title:"Destination"
	    	}
			);
	  };

    // second function creates or updates marker location to specific geoloc
  function drawMarker(yourPosition)
	{
    // set latitude and longitude coordinates using Google Map's LatLng() method
    var markerCoords = new google.maps.LatLng(yourPosition.coords.latitude, yourPosition.coords.longitude);

    if (marker)
		{
      // marker1 already defined, so just update its lat + long
      marker.setPosition(markerCoords);
    }
		else
		{
      // first time called so create marker
      marker = new google.maps.Marker(
				{
	        position: markerCoords,
	        map: map,
	        title:"You Are Here"
      	}
			);
    };

    // create a polyline or update it if it already exists
    if (line)
		{
      line.setPath( [markerCoords, hsu] );
    }
		else
		{
      // first time so create polyline
      line = new google.maps.Polyline(
				{
	        path: [markerCoords, hsu],
	        geodesic: true,
	        strokeColor: '#FF0000',
	        strokeOpacity: 0.9,
	        strokeWeight: 3
	      }
			);
      line.setMap(map);
    };

    // update center of map to match marker location
    map.setCenter(markerCoords);
  };

  // third function gets user geoloc, then calls drawMarker()
  function userLocation()
	{
    if (navigator.geolocation)
			{
      	navigator.geolocation.getCurrentPosition( drawMarker );
    	}
  };

  // Askes for user location after map has loaded
  userLocation();
