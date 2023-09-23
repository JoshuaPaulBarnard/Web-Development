// declare json variable outside of function to make sure
// all of javascript in this entire page can access variable's contents
var jsondata;

var marker;

// loadjson() function gets external json data from file
function loadjson()
{
  // jQuery getJSON function takes two parameters
  // 1: url to external json file
  // 2: a function to run after json file has been successfully loaded
  $.getJSON( "data/UC-map.json",
    function( returnedData ) {
      // next line copies json data loaded in local var
      // into a global variable that createMap() function can access
      jsondata = returnedData;
      createMap();
    }
   );
};

// createMap() function creates google map, markers and infowindow
function createMap()
{
  // mapOptions hold gmap center and zoom
  var mapOptions = {
    center: new google.maps.LatLng(38.455252, -122.721526),
    zoom: 10,
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
  };
  // map1 is reference to rendered gmap
  var map1 = new google.maps.Map(
    document.getElementById("map-canvas"),
    mapOptions
  );

  // before we draw any markers on map, let's create rectangle
  // this rectangle will eventually contain all markers positions
  // and with rectangle, we will able to zoom out map to fit
  var marker_bounds = new google.maps.LatLngBounds();

  // create a google map infowindow object using google map api
  var infowindow = new google.maps.InfoWindow();

  // loop through each record in JSON data structure
  // a js for loop requires 3 parameters to configure it:
  // parameter 1: declare a variable to hold a counter for loop
  // parameter 2: define a condition that lets loop continue
  // parameter 3: how to modify counter after each loop is run
  for (var i = 0; i < jsondata.length; i++ )
  {
    // inside curlies, we use google map api to create marker
    // 1: get current data record from our JSON data structure
    var data = jsondata[i];

    $("p").append(data.title).append("<br />");

    // 2: now I need to create a google map point
    // (latitude and longitude) for placing marker
    var marker_position = new google.maps.LatLng(
      data.lat,
      data.lng
    );

    // Custom icon for UC's
    var uniIcon = new google.maps.MarkerImage("images/university.png", null, null, null, new google.maps.Size(30,30));

    // 3: draw marker on our map
    var marker = new google.maps.Marker(
      {
      position: marker_position,
      icon: uniIcon,
      map: map1,
      title: data.title
      }
    );

    // 4: extend bounds rectangle to include marker point
    marker_bounds.extend( marker_position );

    // 5: attach a click event to marker, and connect to infowindow
    // using JavaScript closure syntax, a closure makes a snapshot
    // of current values in variables passed to closure
    // so when click event handler function runs with correct values
    (function( marker, data )
    {
      // addListener function takes 3 parameters
      // 1: a reference to map object we want to attach to
      // 2: event we want to intercept
      // 3: a function to run when marker is clicked
      google.maps.event.addListener( marker, "click",
        function()
        {
          infowindow.setContent( data.description );
          infowindow.open( map1, marker );
          map1.setZoom(10);
          map1.setCenter(marker.getPosition());
        }
      );
    })( marker, data );
  };
  // rezoom map to marker bounds we created in loop
  map1.fitBounds( marker_bounds );

  // Add scrolling by way of mouse scroll wheel.
  google.maps.event.addListener(map1, 'click', function(event){
          this.setOptions({scrollwheel:true});
        });

  // Add geolocation tracking
  function LocationTracking()
  {
    navigator.geolocation.getCurrentPosition(
      function( position ) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // Custom user Icon
            var userIcon = new google.maps.MarkerImage("images/scholar.png", null, null, null, new google.maps.Size(30,30));

            // Marker for user's location
            var marker = new google.maps.Marker(
              {
                position: pos,
                icon: userIcon,
                map: map1,
                title:"Your Current Location",
                description:"This is your Current Location"
              }
            );
            google.maps.event.addListener( marker, "click",
              function()
              {
                infowindow.setContent( "This is your Current Location" );
                infowindow.open( map1, marker );
                map1.setZoom(10);
                map1.setCenter(marker.getPosition());
              });
          });
        };

LocationTracking();

};
