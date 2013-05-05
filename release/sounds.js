/**
 Sound effects
 */
 
var SFX_ATTACK = 0;
var SFX_MISS = 1;
var SFX_CRITICAL = 2;
var SFX_HEAL = 3;
var SFX_FIRE = 4;
var SFX_COIN = 5;
var SFX_HPDRAIN = 6;
var SFX_MPDRAIN = 7;
var SFX_RUN = 8;
var SFX_BLOCKED = 9;
var SFX_DEFEAT = 10;
var SFX_BONESHIELD = 11;
var SFX_CLICK = 12;
var SFX_UNLOCK = 13;

var sounds = new Object();
sounds.fx = new Array();

function sounds_init() {
  sounds.fx[SFX_ATTACK] = new Audio("sounds/attack.wav");
  sounds.fx[SFX_MISS] = new Audio("sounds/miss.wav");
  sounds.fx[SFX_CRITICAL] = new Audio("sounds/critical.wav");
  sounds.fx[SFX_HEAL] = new Audio("sounds/heal.wav");
  sounds.fx[SFX_FIRE] = new Audio("sounds/fire.wav");
  sounds.fx[SFX_COIN] = new Audio("sounds/coin.wav");
  sounds.fx[SFX_HPDRAIN] = new Audio("sounds/hpdrain.wav");
  sounds.fx[SFX_MPDRAIN] = new Audio("sounds/mpdrain.wav");
  sounds.fx[SFX_RUN] = new Audio("sounds/run.wav");
  sounds.fx[SFX_BLOCKED] = new Audio("sounds/blocked.wav");
  sounds.fx[SFX_DEFEAT] = new Audio("sounds/defeat.wav");
  sounds.fx[SFX_BONESHIELD] = new Audio("sounds/boneshield.wav");
  sounds.fx[SFX_CLICK] = new Audio("sounds/click.wav");
  sounds.fx[SFX_UNLOCK] = new Audio("sounds/unlock.wav");
  
}

function sounds_play(sfx_id) {
 
  try {
    sounds.fx[sfx_id].currentTime = 0;
	sounds.fx[sfx_id].play();
  }
  catch(err) {
    // it's okay if sounds can't play.
	// TODO: change to "don't play if sound is not loaded yet" like images
  };
 
}
