var BowsersWorld = BowsersWorld || {};

//title screen
BowsersWorld.Game = function(){};

BowsersWorld.Game.prototype = {

/*
  this.map;
  this.tileset;
  this.layer;
  this.cursors;
  this.coins;
  this.player1Score = 0;
  this.player1Coins = 0;
  this.timer;
  this.timerTotal = 150;
*/

  create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

  		// Create the game timer
      this.timerTotal = 150;
  		this.timer = this.game.time.create(false);
  		this.timer.loop(1000, this.timerUpdate, this);
  		this.timer.start();

  		// Generate the map
  		this.game.stage.backgroundColor = '#6888ff';
      this.map = this.game.add.tilemap('SMB_Map');
      this.map.addTilesetImage('1 - 1', 'tiles');
  		this.layer = this.map.createLayer('World1-1');
  		this.layer.resizeWorld();
  		this.map.setLayer(this.layer);

  		// Set Tile Collisions
      //  14 = ? block, 15 = brick, 11 = coins, {5,10,13,17}=Flag Pole, 33,39 = door
  		//map.setCollision(5);
  		//map.setCollisionBetween(10, 11);
      //map.setCollisionBetween(13, 17);
  		this.map.setCollisionBetween(14,16);
  		//map.setCollision(16);
      //map.setCollisionBetween(20, 25);
  		this.map.setCollisionBetween(21,22);
      //map.setCollisionBetween(27, 29);
  		this.map.setCollisionBetween(27,28);
  		//map.setCollision(40);
  		this.map.setCollisionBetween(39,40);


  		//map.setTileIndexCallback(15, breakBrick, this);
  		//map.setCollisionByExclusion([14, 15], true, layer);

  		//  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
  		//map.setTileIndexCallback(14, breakQBlock, this);
  		//  This will set the map location 2, 0 to call the function
  		//map.setTileLocationCallback(2, 0, 1, 1, breakQBlock, this);

  		this.map.setTileIndexCallback(39, this.exitDoor, this);

      //  This will set the map location 2, 0 to call the function
      //map.setTileLocationCallback(2, 0, 1, 1, fallDownHole, this);


  		// Debug for seeing collisions
  		// layer.debug = true;

  		// Create the players sprite and its parameters
      this.player = this.game.add.sprite(160, 175, 'bowser');
      this.game.physics.arcade.enable(this.player);
  		this.game.camera.follow(this.player);
      this.player.body.collideWorldBounds = true;
  		this.player.body.gravity.y = 6000;
      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true);

  		// World physics
  		this.game.physics.arcade.gravity.y = 000;
  		this.game.physics.arcade.TILE_BIAS = 32;
  		this.game.physics.arcade.checkCollision.down = false;
  		this.game.physics.arcade.checkCollision.up = false;

      //  Coins to collect with physics
      this.coins = this.game.add.group();
      this.coins.enableBody = true;

  		// Create Coins across the map with slight variance each time.
  		for (var i = 1; i < 21; i++)
      {
          //  Create a coin inside of the 'coins' group
          var coin = this.coins.create( i * (600+15*Math.random()), 0, 'coin');
          //  Sets coins gravity
          coin.body.gravity.y = 4000;
      }
  /*
  		setTileCollision(layer, [14], {
          top: true,
          bottom: false,
          left: true,
          right: true
      });
  */

  		//map.createFromObjects('World1-1', 14, 'coins', null, true, false, coins);

  		// Breakable Bricks
  		this.QBlock = this.game.add.group();
  		this.QBlock.enableBody = true;

  		// Breakable ?-Blocks
  		//brick = game.add.group();
  		//brick.enableBody = true;

  		// Exit Door
  		//door = game.add.group();
  		//door.enableBody = true;

  		// Falling down a hole
  		//fall = game.add.group();
  		//fall.enableBody = true;

  		// Input
      this.cursors = this.game.input.keyboard.createCursorKeys();
  		this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  		this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  		this.game.input.keyboard.addKey(Phaser.Keyboard.S);
  		this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  		this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  		// Mouse Click = Full Screen
  		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  		this.game.input.onDown.add(this.goFull, this);

  		// Sounds
  		this.music = this.game.add.audio('music');
  		this.music.play();
  		this.hurryMusic = this.game.add.audio('hurryMusic');
  		this.jumpSFX = this.game.add.audio('jumpSFX');
  		this.coinSFX = this.game.add.audio('coinSFX');
  		this.fallSFX = this.game.add.audio('fallSFX');
  		this.brickSFX = this.game.add.audio('brickSFX');
  		this.exitSFX = this.game.add.audio('exitSFX');
  		this.deathSFX = this.game.add.audio('deathSFX');
  },

  update: function() {
  	  this.player.body.velocity.x = 0;

  		this.game.physics.arcade.collide(this.player, this.layer);
      this.game.physics.arcade.collide(this.coins, this.layer);
  		//game.physics.arcade.collide(brick, layer);

  		//  Checks to see if the player overlaps with any of the coins and calls the collectCoin function
  		this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

  		//
  		//game.physics.arcade.overlap(player, brick, breakBrick, null, this);

  		//
  		//game.physics.arcade.overlap(player, QBlock, breakQBlock, null, this);

  		//
  		//game.physics.arcade.overlap(player, door, exitDoor, null, this);

  		// Out of Bounds
  		this.player.events.onOutOfBounds.add(this.fallDownHole, this);

  		// Controls
  		if (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A))
  	    {
  	        //  Move to the left
  					this.player.checkWorldBounds = true;
  					this.player.body.velocity.x = -250;
  	        this.player.animations.play('left');
  	    }
      else if (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D))
  	    {
  	        //  Move to the right
  					this.player.checkWorldBounds = true;
  					this.player.body.velocity.x = 250;
  	        this.player.animations.play('right');
  	    }
  		else if (this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S))
  			{
  				this.player.checkWorldBounds = true;
          this.gameOver();
  			}
  		else
  		   {
  	     		//  Stand still
  	       this.player.animations.stop();
  	       this.player.frame = 4;
  		   }
  		if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  	 		{
  					this.player.checkWorldBounds = true;
  	 				if (this.player.body.onFloor())
  	 				{
  	 					this.player.body.velocity.y = -1350;
  	 					this.jumpSFX.play();
  	 				}
  	 		}

  },

/*
  render: function()
  {
  		this.game.debug.text('Score: ' + player1Score, 16, 21);
  		this.game.debug.text('Time:  ' + timerTotal, 16, 45);
  }
*/

  collectCoin: function(player, coin)
  {
  		// Plays coin sound
  		this.coinSFX.play();
      // Removes the coin from the screen
      coin.kill();
      //  Add and update the score
      this.player1Score += 200;
  		this.player1Coins += 1;
  },

  breakBrick: function(player, brick)
  {
  	// Plays breakbrick Sound
  	this.brickSFX.play();
  	// Removes brick
  	//brick.kill();
  	//map.swap(1,15)
  },

  breakQBlock: function()
  {
  	// Plays breakbrick Sound
  	this.brickSFX.play();
  	// Removes ?-Blocks
  	this.map.removeTileWorldXY(x, y, this.tile.width, tile.height, this.blockedLayer);
  	this.map.putTileWorldXY(42, x, y, this.tile.width, tile.height, this.blockedLayer);
  },

  exitDoor: function()
  {
  	// Pause Music and play ending music
  	this.music.stop();
  	this.hurryMusic.stop();
  	this.exitSFX.play();
  	// stop timer
  	this.timer.stop();
  	// add remaining time to score
  	this.player1Score = this.player1Score + (this.timerTotal * 100);
  	this.timerTotal = 0;

  	this.player.kill();

    this.game.state.start('MainMenu', true, false, this.playerScore);

  	// make the bowser flames
  	/*
  	var e = game.add.emitter(0, 0, 5);
  	e.makeParticles('dino-plate', 0, 5, true);
  	e.gravity = 30;
  	e.maxParticleSpeed.x = -700;
  	e.minParticleSpeed.x = -400;
  	e.maxParticleSpeed.y = -500;
  	e.minParticleSpeed.y = -300;
  	*/
  },

  fallDownHole: function()
  {
  	this.timer.stop();
  	this.music.stop();
  	this.hurryMusic.stop();
  	this.fallSFX.play();
  	this.player.kill();
  	this.timerTotal = 0;
    this.game.state.start('MainMenu', true, false, this.playerScore);
  },

  gameOver: function()
  {
  	//pass it the score as a parameter
  	//this.game.state.start('MainMenu', true, false, this.player1Score);

  	this.timer.stop();
  	this.music.stop();
  	this.hurryMusic.stop();
  	this.deathSFX.play();
  	this.timerTotal = 0;
    this.game.state.start('MainMenu', true, false, this.playerScore);

  	//make the player explode
  	var emitter = this.game.add.emitter(this.player.x, this.player.y, 7);
  	emitter.makeParticles('deathFlames');
  	emitter.minParticleSpeed.setTo(-500, -500);
  	emitter.maxParticleSpeed.setTo(500, 500);
  	emitter.gravity = 0;
  	emitter.start(true, 2000, null, 7);
  	this.player.kill();
  },

  timerUpdate: function()
  {
  		this.timerTotal -= 1;
  		// Plays Hurry Up Music when timer reaches 45seconds
  		if (this.timerTotal == 43)
  		{
  			this.music.stop();
  			this.hurryMusic.play();
  		}
  		// Kills player if time runs out
  		if (this.timerTotal == 0)
  		{
  			this.gameOver();
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
