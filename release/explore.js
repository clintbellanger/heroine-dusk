/**
 Exploration game state
 
 */
 
/**
 * Exploration
 * The hero's basic movement happens here
 * Also most other game states trigger from here
 * and completed states usually return here.
 */
function explore_logic() {
  avatar_explore();
  
  // check opening info screen (keyboard)
  if (pressing.action && !input_lock.action) {
    gamestate = STATE_INFO;
	input_lock.action = true;
	redraw = true;
  }
  
  // check opening info screen (mouse)
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_info)) {
    gamestate = STATE_INFO;
	input_lock.mouse = true;
	redraw = true;  
  }

}


function explore_render() {

    tileset_background();
    mazemap_render(avatar.x, avatar.y, avatar.facing);

    // HUD elements
    // direction
    bitfont_render(avatar.facing, 80, 2, JUSTIFY_CENTER);
	
	info_show_button();

}
