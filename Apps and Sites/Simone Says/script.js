/* script.js
  for simon says game
*/

// setup some variables
var level = 1;
var score = 0;
var turn = 0;
var active = false; // is turn going on right now?
var handler = false; // did game load yet?
var genSequence = []; // empty array to hold sequence
var playSequence = []; //empty array to player sequence

// functions to control game play

// 1 start a new game
function newGame() {
  console.log('newGame');
  level = 1;
  score = 0;
  newLevel();
  displayLevel();
  displayScore();
}

// 2 start a new level
function newLevel() {
  console.log('newLevel')
  genSequence.length = 0;
  playSequence.length = 0;
  turn = 0;
  active = true;
  randomizePad(level);
  displaySequence();
}

// 3 flash the light (for each of 3 buttons)
function flash(element, times, speed, pad) {
  if (times > 0) {
    element.stop().animate(
      {opacity:"1"},
      {
        duration: 50,
        complete: function() {
          element.stop().animate({opacity:"0.6"}, 200);
        }
      }
    );
  }
}

// 4 create a random sequence of lights to blink
// really an array of random numbers between 1-3
function randomizePad(passes) {
    console.log('randomizePad')
  for( i=0; i < passes; i++ ) {
    // Put a random # into array
    genSequence.push( Math.floor( Math.random() * 3 ) + 1 );
  }
  console.log( genSequence );
}

// 5 display the sequence of lights blinking
function displaySequence() {
  // we want to use jQuery to loop thru each item in genSequence
    console.log('displaySequence')
  $.each(genSequence, function(index, val) {
    flash( $('.shape' + val), 1, 300, val );

    // alert( val );
  });
}

// 6 display the level
function displayLevel() {
  console.log('displayLevel')
  $('.level').html('<h2>Level: ' + level + '</h2>')
}

// 7 display the score
function displayScore() {
  console.log('displayScore')
  $('.score').html('<h2>Score: ' + score + '</h2>')
}

// wait for the page to load (for the document to be ready)
$(document).ready(
  function() {
    newGame();
  }
);
