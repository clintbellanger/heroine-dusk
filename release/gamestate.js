/**
 Primary game state switcher
 
 */
 
var STATE_EXPLORE = 0;
var STATE_COMBAT = 1;
var STATE_INFO = 2;
var STATE_SHOP = 3;
var STATE_SPECIAL = 4; 
 
var gamestate = STATE_EXPLORE;

function gamestate_logic() {

  if (gamestate == STATE_EXPLORE) {
    explore_logic();
  }
  else if (gamestate == STATE_INFO) {
    info_logic();
  }  
  
}

function gamestate_render() {

  if (gamestate == STATE_EXPLORE) {
    explore_render();  
  }
  else if (gamestate == STATE_INFO) {
    info_render();
  }

}

