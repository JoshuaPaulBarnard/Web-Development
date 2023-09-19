var BowsersWorld = BowsersWorld || {};

//loading the game assets
BowsersWorld.Preload = function(){};

BowsersWorld.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
  	this.load.image('space', 'assets/images/space_background.png');
  	this.load.image('rock', 'assets/images/asteroid.png');
    this.load.spritesheet('playership', 'assets/images/main_player.png', 12, 12);
    this.load.spritesheet('power', 'assets/images/collectable.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/players_particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};
