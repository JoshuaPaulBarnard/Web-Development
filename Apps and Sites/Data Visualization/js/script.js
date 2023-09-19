//  Loops through JSON array and finds biggest value property
function getMax(data)
{
  var max = 0;
  for (var i=0; i < data.length; i++)
  {
    if( data[i].value > max )
    {
      max = data[i].value;
    }
  }
  return max;
}

  //  Render bar chart into canvas
  function doBar(data)
  {
    // console.log(data);

    // get reference to HTML canvas element
    var canvas1 = document.getElementById('canvas');
    // get ref to 2d drawing context inside the canvas
    var context1 = canvas1.getContext('2d');

    // Now we can establish some useful values
    var startX = canvas1.width;
    var bottomY = canvas1.height;
    var maxVal = getMax(data);
    var scaleY = bottomY / maxVal;
    var scaleX = startX / (data.length);
    var i = 0;
    var height;
    var lastX = 0;

    // loop thru and draw some axis scale lines
    for(i=0; i <= maxVal; i = i + maxVal / 10)
    {
      context1.beginPath();
      context1.moveTo(0, i * scaleY);
      context1.lineTo(startX, i * scaleY);
      context1.strokeStyle="black";
      context1.stroke();

      // draw text for each axis scale line
      context1.fillStyle = "black";
      context1.font = "bold 24px Arial";
      var num1 = maxVal - i;
      var num2 = num1.toFixed(0)
      context1.fillText( "$" + num2, 0, (i * scaleY) + 25);
    }

    // Loop thru each data array element, then draw scaled rectangles
    for(i=0; i < data.length; i++)
    {
      // set fill color
      context1.fillStyle = data[i].color;
      context1.globalAlpha = 0.9;
      // calculate height of rectangle using scale
      height = data[i].value * scaleY;
      // draw rectangle
      context1.fillRect( lastX, bottomY - height, scaleX, height );

      // Label each bar in the chart
      context1.save();
      context1.fillStyle = "black";
      context1.font = "bold 24px Arial";
      context1.translate(lastX, bottomY);
      context1.rotate(-Math.PI/2);
      context1.fillText(data[i].name, 5, scaleX/2);
      context1.restore();

      lastX += scaleX;
    }
  }
