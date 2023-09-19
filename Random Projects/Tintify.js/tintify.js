/*
*  tintify.js 0.1.0
*  Written by Joshua Barnard, at joshuapaulbarnard@gmail.com
*  https://github.com/JoshBarnard/tintify.js
*  Latest Update:  October 2017.
*  Please attribute the author when using this library.
*/

(function ($) {

  $.fn.tintifyText = function( options )
    {
      var settings = $.extend(
        {
          opacity: 0.75,
          //filter: "alpha(opacity=50)",
        },
      );
      return this.css(
        {
          opacity: settings.opacity,
          //filter: settings.filter,
        }
      )
    }
}( jQuery ));

(function ( $ ) {
  $.fn.ChangeTextColor = function( options ) {
      var settings = $.extend(
        {
          color: "white",
        }, options
      );
      return this.css(
        {
          color: settings.color,
        }
      );
  };
}( jQuery ));

/*
(function ($) {

  $.fn.tintify = function( )
    {

    }

}( jQuery ));


(function ($) {

  $.fn.tintifyGradient = function( )
    {

    }
}( jQuery ));


(function ($) {

  $.fn.tintifyScreen = function( options )
    {
      var overlay = $(this).append(
        {
          backgroundColor: "black",
          opacity: 0.5,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          //"z-index": 1000,
        }, options
      );
      return this.css(
        {
          backgroundColor: overlay.backgroundColor,
          opacity: overlay.opacity,
          width: overlay.width,
          height: overlay.height,
          position: overlay.position,
          top: overlay.top,
          left: overlay.left,
          right: overlay.right,
          bottom: overlay.bottom,
          //z-index: overlay.z-index,
        }
      );
    }
} ( jQuery ));
*/
