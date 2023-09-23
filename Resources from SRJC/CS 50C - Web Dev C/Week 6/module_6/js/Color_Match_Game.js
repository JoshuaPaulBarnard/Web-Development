          // Location of progress bar
          $(document).ready(function() {
              var $progressbar = $("#progBar").progressbar();
          });

          // Progress Bar Update function
          function updateProgressbar(current, target)
          {
            var $progressbar = $("#progBar").progressbar();
            var value = parseInt(current / target * 100);

            $progressbar
              .progressbar("value", value)
              .removeClass("beginning middle end")
              .addClass(value < 40 ? "beginning" : value < 80 ? "middle" : "end");
          };
          var working = 0;

          function update()
          {
            working++;

            updateProgressbar(working, total);

          }

          // initialize variable for playing sound when user wins
          var cheer = new Audio('audio/applause.wav');

          // this function will randomly sort all of the elements in an array passed to it
          function randomize( my_array ) {
            return my_array.sort(
              function() {
                return 0.5 - Math.random();
              }
            );
          };

          // set up a counter variable once to use in each for loop
          var counter;

          // create an array of named colors that CSS understands
          var colors = [ "red", "blue", "green", "yellow", "purple", "black" ];

          // initialize max count variable for progerss bar
          var total = colors.length;

          // randomize colors array first time
          randomize( colors );

          // loop though each element in the colors array
          for ( counter = 0; counter < colors.length; counter++ ) {
            // create a div inside #colorbox for each color, style and make draggable
            $("<div>")
              .attr( "id", colors[counter] )
              .css( "background", colors[counter] )
              .appendTo( "#colorbox" )
              .draggable(
                {
                  revert: "invalid",
                  zIndex: 2
                }
              );
          }

          // randomize colors array again
          randomize( colors );

          // loop though each element in the colors array again
          for ( counter= 0; counter < colors.length; counter++ ) {
            // create a div inside #drop-zones for each color, set text contents to color
            $("<div>")
              .text( colors[counter] )
              .appendTo( "#drop-zones" );
          }

          // now have jQuery find all divs inside #drop-zones and enable droppable
          $("#drop-zones > div").droppable(
            {
              // set accept drop function
              accept: function( draggable ) {
                return $( this ).text() == draggable.attr( "id" );
              },
              // set drop function to run if accept returns true
              drop: function( event, ui )
              {
                var color = ui.draggable.css( "background-color" );
                $( this ).css( "background", color ).css( "color", color ).addClass( "filled" );
                ui.draggable.hide( "puff" );
                $( "h1, h2" ).ChangeTextColor({color: color});
                $(".filled").tintifyText();

                // counting successes, updating progress bar and determining if player won or not.
                update();
                var correct = $(".filled").length
                if ( correct === colors.length )
                {
                  $('#WinDialog').dialog('open');
                  cheer.play();
                }
              }
            }
          );
