/*global $*/

class Quiz
{
  constructor( passedData )
  {
    this.data = passedData;

    // Keep track of which question is correct.
    this.turn = 0;

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
        var $button = $('<button>');
        $button.text( this.data[this.turn].answers[index] );

        // handle event when user clicks an answer: right or wrong?
        // Decide which answer is correct and attach a click event to that answer
        if( index == this.data[this.turn].correct_choice )
        {
          var that = this;       // Save the ref to our Quiz object instance
          $button.click( function() {
            $('#wrong').empty();
            $('#right').empty();
            that.nextQuestion();
          } );
        }
        else
        {
          // Set another click - a different one for clicking a wrong button
          $button.click( function()
          {
            $('#wrong').text('Wrong Choice');
            $('#right').empty();
          } );
        }

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
        alert('Correct!');
        this.showQuestion();
      }
      else
      {
        alert('Great Job!\nYou Completed this math quiz!');
      }
    }


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
