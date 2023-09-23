/*
*  Miscellaneous jQuery plugins for CS50C at SRJC
*  Written by Joshua Paul Barnard, at joshuapaulbarnard@gmail.com
*  https://github.com/JoshBarnard
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
