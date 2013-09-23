/**
 Exploration game state
 
 */

var explore = new Object();
explore.encounter_chance = 0;
explore.encounter_increment = .05;
explore.encounter_max = .30;
explore.message = "";
 
/**
 * Exploration
 * The hero's basic movement happens here
 * Also most other game states trigger from here
 * and completed states usually return here.
 */
function explore_logic() {
  explore.message = "";

  avatar_explore();
	
  // check map exit
  if (avatar.moved) {
    if (mazemap_check_exit()) {
	
	  // display the name of the new map
	  explore.message = atlas.maps[mazemap.current_id].name;
	  
	  // don't allow a random encounter when switching maps
      avatar_save();
	  return;
	}
  }  
  
  // check shop
  if (avatar.moved) {
    if (mazemap_check_shop()) {
      gamestate = STATE_DIALOG;
      redraw = true;
      avatar_save();
      return;
    }
  }

  // check special script;
  if (avatar.moved) {
    if (mapscript_exec(mazemap.current_id)) {
      avatar_save();
      return;
    }
  }

  // check random encounter
  var enemy_options = atlas.maps[mazemap.current_id].enemies.length;
  if (avatar.moved && enemy_options > 0) {

    if (Math.random() < explore.encounter_chance) {
      explore.encounter_chance = 0.0;
      gamestate = STATE_COMBAT;
      action.select_pos = BUTTON_POS_ATTACK;
      combat.timer = COMBAT_INTRO_DELAY;
	  combat.phase = COMBAT_PHASE_INTRO;

      // choose an enemy randomly from the list for this map
      var enemy_roll = Math.floor(Math.random() * enemy_options);
      var enemy_id = atlas.maps[mazemap.current_id].enemies[enemy_roll];
	  combat_set_enemy(enemy_id);

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
    sounds_play(SFX_CLICK);
    return;
  }
  
  // check opening info screen (mouse)
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, BUTTON_POS_INFO)) {
    gamestate = STATE_INFO;
	input_lock.mouse = true;
	redraw = true;
    action.select_pos = BUTTON_POS_INFO;
	info_clear_messages();
	sounds_play(SFX_CLICK);
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

  // DEBUG: coordinates
  // bitfont_render(avatar.x + "," + avatar.y, 2, 2, JUSTIFY_LEFT);
  
  if (explore.message != "") {
    bitfont_render(explore.message, 80, 100, JUSTIFY_CENTER);
  }

}
