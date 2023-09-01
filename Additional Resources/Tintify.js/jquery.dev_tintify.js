/*
*  tintify.js 0.1.0
*  Written by Joshua Barnard, at joshuapaulbarnard@gmail.com
*  https://github.com/JoshBarnard/tintify.js
*  Latest Update:  October 2017.
*  Please attribute the author when using this library.
*/

(function ($) {

  $.fn.tintify = function( )
    {
      if($(this).find(".overlay").length > 0) return $(this);

      var overlay = $.extend({
          backgroundColor: "black",
          opacity: 0.5,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }, options);

      $("<div class='overlay'>").css(
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
        }
      ).appendTo(this);
      return $(this);
    }
}( jQuery ));
