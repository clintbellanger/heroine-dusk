/**
 Exploration game state
 
 */

var explore = new Object();
explore.encounter_chance = 0;
explore.encounter_increment = .05;
explore.encounter_max = .30;
 
/**
 * Exploration
 * The hero's basic movement happens here
 * Also most other game states trigger from here
 * and completed states usually return here.
 */
function explore_logic() {

  avatar_explore();

  // check random encounter
  if (avatar.moved) {

    if (Math.random() < explore.encounter_chance) {
      explore.encounter_chance = 0.0;
      gamestate = STATE_COMBAT;
      action.select_pos = BUTTON_POS_ATTACK;
      combat.timer = COMBAT_INTRO_DELAY;
	  combat.phase = COMBAT_PHASE_INTRO;
	  combat_set_enemy(ENEMY_SKELETON);
      return;
    }
    else {
      explore.encounter_chance += explore.encounter_increment;
      explore.encounter_chance = Math.min(explore.encounter_chance, explore.encounter_max);
    }
  }
  
  // check opening info screen (keyboard)
  if (pressing.action && !input_lock.action) {
    gamestate = STATE_INFO;
	input_lock.action = true;
	redraw = true;
    action.select_pos = BUTTON_POS_INFO;
	info_clear_messages();
    return;
  }
  
  // check opening info screen (mouse)
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, BUTTON_POS_INFO)) {
    gamestate = STATE_INFO;
	input_lock.mouse = true;
	redraw = true;
    action.select_pos = BUTTON_POS_INFO;
	info_clear_messages();
    return;
  }

}


function explore_render() {

    tileset_background();
    mazemap_render(avatar.x, avatar.y, avatar.facing);

    // HUD elements
    // direction
    bitfont_render(avatar.facing, 80, 2, JUSTIFY_CENTER);
	
	info_render_button();

}
