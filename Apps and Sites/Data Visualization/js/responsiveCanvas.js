var width = window.innerWidth;
var height = window.innerHeight;

var prevWidth = width;
var prevHeight = height;

var canvas;
var ctx;
var x = width * 0.4;
var y = height * 0.3;
var rectWidth = width * 0.2;
var rectHeight = height * 0.2;


window.onresize = function(event) {
  width = window.innerWidth
  height = window.innerHeight

  x = (width * (x/prevWidth));
  y = (height * (y/prevHeight));
  rectWidth = width * 0.2;
  rectHeight = height * 0.2;

  prevWidth = width;
  prevHeight = height;

  canvas.setAttribute('width',width);
  canvas.setAttribute('height',height);

  draw( );
}
