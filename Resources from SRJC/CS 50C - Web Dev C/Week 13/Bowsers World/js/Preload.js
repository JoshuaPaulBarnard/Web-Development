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
    this.load.tilemap('SMB_Map', 'assets/tilemaps/maps/super_mario_bros.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.bitmapFont('NES2Font', 'assets/font/NES2Font.png', 'assets/font/NES2Font.fnt');
    this.load.image('titleScreen', 'assets/images/Title_Screen.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/super_mario_bros.png');
		this.load.image('coin', 'assets/sprites/coin_sprite.png');
    this.game.load.image('deathFlames', 'assets/sprites/deathFlames.png');
    this.game.load.image('bowserFlames', 'assets/sprites/bowserFlames.png');
    this.load.spritesheet('bowser', 'assets/sprites/bowser_sprite.png', 34.2222222222222222222222, 68);
    this.game.load.spritesheet('bowserSmall', 'assets/sprites/bowser_sprite_small.png', 32, 34);
    this.game.load.spritesheet('bowserLarge', 'assets/sprites/bowser_sprite_large.png', 31.9999999, 68);
		this.load.audio('music', 'assets/audio/Super_Mario_Bros_music_01.mp3');
		this.load.audio('jumpSFX', 'assets/audio/smb_jump-super.wav');
		this.load.audio('coinSFX', 'assets/audio/smb_coin.wav');
		this.load.audio('fallSFX', 'assets/audio/smb_bowserfalls.wav');
		this.load.audio('brickSFX', 'assets/audio/smb_breakblock.wav');
		this.load.audio('exitSFX', 'assets/audio/smb_stage_clear.wav');
		this.load.audio('hurryMusic', 'assets/audio/Super_Mario_Bros_hurryMusic.mp3');
		this.load.audio('deathSFX', 'assets/audio/smb_mariodie.wav');
  },

  create: function() {
  	this.state.start('MainMenu');
  }
};
