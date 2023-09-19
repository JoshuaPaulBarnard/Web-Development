/*global $*/

class Quiz
{
  constructor( passedData )
  {
    this.data = passedData;

    this.score = 0;
    this.progress = 0;

    // Keep track of which question is correct.
    this.turn = 0;

    // Make the potential answers droppable, to evaluate if it is the correct answer
    var that = this;
    $("#question").droppable({
      drop: function(event, ui) {
        // Is the answer being dropped with data-status = 1?
        if (ui.draggable.data('status') == '1' )
        {
          // Display jQuery UI dialog showing correct!
          $( '<div id="d1">Correct!</div>').dialog();
          that.nextQuestion();
          this.progress++
        }
        else
        {
          $('<div id="d1">Wrong!</div>').dialog();
          ui.draggable.remove();
        }
      }
    });

    // This function can show the current question and its possible answers.
    this.showQuestion = function()
    {
      // set the counter
      $('#counter').text('Question #: ' + (this.turn+1));

      // Show Question text
      $('#question').text( this.data[this.turn].question);

      // Render buttons with answers
      $('#answers').empty();

      for( var index in this.data[this.turn].answers )
      {
        var $button = $('<span class="answer">');
        $button.text( this.data[this.turn].answers[index] );

        // handle event when user clicks an answer: right or wrong?
        // Decide which answer is correct and attach a click event to that answer
        if( index == this.data[this.turn].correct_choice )
        {
          $button.data('status', '1');
          this.score++;
          this.progress++;
        }
        else
        {
          // Set another click - a different one for clicking a wrong button
          $button.data('status', '0');
          this.score--;
        }

        // Use jQuery UI's draggable() method
        $button.draggable();

        // Rendered button element in page yet
        $('#answers').append( $button );

      }
    }

    // This function will show another question if available
    this.nextQuestion = function()
    {
      this.turn++;
      if( this.turn < this.data.length )
      {
        this.showQuestion();
      }
      else
      {
        $( '<div id="d1">Great Job!  You completed this mini-math quiz!</div>').dialog();
      }
    }
/*
    $(function() {
       var progressbar = $( "#progressbar" );
       $( "#progressbar" ).progressbar({
          value: 0,
          max:10
       });
       function progress() {
          var val = progressbar.progressbar( "value" ) || 0;
          progressbar.progressbar( "value", val + 1 );
          if ( val < 99 ) {
             setTimeout( progress, 100 );
          }
       }
       setTimeout( progress, 3000 );
    });


    // Getter
    var max = $( "#progressbar" ).progressbar( "option", "max" );
    var value = $( "#progressbar" ).progressbar( "option", "value" );

    // Setter
    $( "#progressbar" ).progressbar( "option", "max",  this.data.length);
    $( "#progressbar" ).progressbar( "option", "value", this.progress );


    $( function() {
      $( "#progressbar" ).progressbar({
        value: this.progress,
        max: 10
      });
    } );

*/

  }
}

// Define quetions and answers in an array of object values
const data = [
  {
    question:  "What is the square root of -1",
    answers: [ "-1", "i", "1", "0", "Undefined"],
    correct_choice: 1
  },
  {
    question:  "What is the inverse of 5?",
    answers: ["5", "1/5", "-5", "0", "Undefined"],
    correct_choice: 2
  },
  {
    question:  "What is the Recipricol of 7?",
    answers: ["7", "1/7", "-7", "0", "Undefined"],
    correct_choice: 1
  },
  {
    question:  "What is the Derivative of x^2 (x squared)?",
    answers: ["2x", "x", "2x^3", "0", "Undefined"],
    correct_choice: 0
  },
  {
    question:  "What is f(3) if f(x) = 2x-6",
    answers: ["6", "2", "-4", "0", "Undefined"],
    correct_choice: 3
  },
  {
    question:  "If x=4, then what is y=x^2-2",
    answers: ["16", "14", "2", "0", "Undefined"],
    correct_choice: 1
  },
  {
    question:  "When x=9 and y=6, what is z=2x+y/2",
    answers: ["15", "18", "21", "0", "Undefined"],
    correct_choice: 2
  },
  {
    question:  "Let x=2 and y=3, what is z=(x+1)/(2y-6)",
    answers: ["3", "1/4", "12", "0", "Undefined"],
    correct_choice: 4
  },
  {
    question:  "If x exists from 0 to infinity and y exists between -5 and 10, what is there domain?  (x and y exist on the same number line)",
    answers: ["[0,10]", "(0,10)", "(-infinity,+infinity)", "[0,infinity)", "Undefined"],
    correct_choice: 0
  },
  {
    question:  "what does e^(pi*i) equal?",
    answers: ["1", "-1", "pi", "0", "Undefined"],
    correct_choice: 1
  },
];

// show first question after the page has fully loaded
$(document).ready( function() {
  // Create a new instance of a Quiz object
  var myQuiz = new Quiz( data );

  // Call the object instance's showQuestion() method to start the quiz
  myQuiz.showQuestion();

} );

$( function() {
  $( "#accordion" ).accordion();
} );

$( function() {
  $( "input" ).checkboxradio();
} );
