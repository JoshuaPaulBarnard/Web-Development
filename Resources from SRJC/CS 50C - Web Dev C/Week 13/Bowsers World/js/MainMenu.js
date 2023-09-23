var BowsersWorld = BowsersWorld || {};

//title screen
BowsersWorld.MainMenu = function(){};

BowsersWorld.MainMenu.prototype = {
  init: function(player1Score) {
    var player1Score = player1Score || 0;
    this.highestScore = this.highestScore || 0;

    this.highestScore = Math.max(player1Score, this.highestScore);
   },
  create: function() {
  	//show the title screen
    this.background = this.game.add.sprite(this.game.centerX, this.game.centerX, 'titleScreen');


    //start game text
    var text = "Tap to begin";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);


    //highest score
    text = this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };

    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);

    // Mouse Click = Full Screen
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.input.onDown.add(this.goFull, this);
  },
  update: function() {
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) ) {
      this.game.state.start('Game');
    }

  },
  goFull: function()
  {
      if (this.game.scale.isFullScreen)
      {
          this.game.scale.stopFullScreen();
      }
      else
      {
          this.game.scale.startFullScreen(false);
      }
  }
};
