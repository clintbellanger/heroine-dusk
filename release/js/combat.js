/**
 Combat routines

 */

var COMBAT_PHASE_INTRO = 0;
var COMBAT_PHASE_INPUT = 1;
var COMBAT_PHASE_OFFENSE = 2;
var COMBAT_PHASE_DEFENSE = 3;
var COMBAT_PHASE_VICTORY = 4;
var COMBAT_PHASE_DEFEAT = 5;

var COMBAT_INTRO_DELAY = 15;

// object setup
var combat = new Object();

combat.timer = 0;
combat.phase = COMBAT_PHASE_INTRO;

combat.enemy = new Object();

combat.offense_action = "";
combat.offense_result = "";
combat.defense_action = "";
combat.defense_result = "";
combat.reward_result = "";
combat.gold_treasure = 0;

combat.victory_status = "";
combat.enemy_hurt = false;
combat.hero_hurt = false;
combat.run_success = false;

function combat_init() {
  combat_clear_messages();
  
}

/**
 * Set the variable info for this enemy
 * Anything that changes during combat goes here (e.g. hp)
 * Otherwise we read values from the enemy list
 */
function combat_set_enemy(enemy_id) {
  combat.enemy.type = enemy_id;
  combat.enemy.hp = enemy.stats[enemy_id].hp;
  combat.enemy.category = enemy.stats[enemy_id].category;
  boss_reset();
  combat.victory_status = "";
  sounds_play(SFX_MISS);
}

/**** Logic **************************/
function combat_logic() {
  
  switch (combat.phase) {
    case COMBAT_PHASE_INTRO:
	  combat_logic_intro();
	  break;
	case COMBAT_PHASE_INPUT:
	  combat_logic_input();
	  break;
	case COMBAT_PHASE_OFFENSE:
	  combat_logic_offense();
	  break;
	case COMBAT_PHASE_DEFENSE:
	  combat_logic_defense();
	  break;
	case COMBAT_PHASE_VICTORY:
	  combat_logic_victory();
	  break;
	case COMBAT_PHASE_DEFEAT:
	  combat_logic_defeat();
	  break;
  }
  
}

function combat_logic_intro() {
    if (OPTIONS.animation == true) {
      combat.timer--;
      
      // animated sliding in from the left
      enemy.render_offset.x = 0 - combat.timer * 10;
      redraw = true;
    }
    else {
      combat.timer = 0;
    }
 
    if (combat.timer == 0) {
      combat.phase = COMBAT_PHASE_INPUT;	
      redraw = true;
    }
}

function combat_logic_input() {

  combat.enemy_hurt = false;
  combat.hero_hurt = false;
  combat.run_success = false;

  var used_action = false;
  
  if (action_checkuse(BUTTON_POS_ATTACK)) {
    power_hero_attack();
	used_action = true;
  }
  else if (action_checkuse(BUTTON_POS_HEAL) && avatar.mp > 0 && avatar.spellbook >= 1 && avatar.hp < avatar.max_hp) {
    power_heal();
	used_action = true;
  }
  else if (action_checkuse(BUTTON_POS_BURN) && avatar.mp > 0 && avatar.spellbook >= 2) {
    power_burn();
	used_action = true;
  }
  else if (action_checkuse(BUTTON_POS_UNLOCK) && avatar.mp > 0 && avatar.spellbook >= 3 && combat.enemy.category == ENEMY_CATEGORY_AUTOMATON) {
    power_unlock();
    used_action = true;
  }
  else if (action_checkuse(BUTTON_POS_RUN)) {
    power_run();
	used_action = true;
  }

  if (used_action) {
    combat.phase = COMBAT_PHASE_OFFENSE;
    redraw = true;
    if (OPTIONS.animation == true) {
      combat.timer = 30;
    }
    else {
      combat.timer = 1;
    }
    return;
  }

  action_logic();

}

function combat_logic_offense() {
  combat.timer--;

  // assist text delay
  if (combat.timer == 25) redraw = true;
  
  if (combat.timer > 15 && combat.enemy_hurt) {
    enemy.render_offset.x = Math.round(Math.random() * 4) - 2;
    enemy.render_offset.y = Math.round(Math.random() * 4) - 2;
	redraw = true;
  }
  else if (combat.timer == 15) {
    enemy.render_offset = {x:0, y:0};
	redraw = true;
  }
  
  if (combat.timer == 0) {
  
    // check for defeated enemy
    if (combat.enemy.hp <= 0) {
	  combat.phase = COMBAT_PHASE_VICTORY;
	  sounds_play(SFX_COIN);
	  redraw = true;
	  combat_determine_reward();
	  return;
	}
	// check for successfully running away
	else if (combat.run_success) {	
      combat_clear_messages();
      gamestate = STATE_EXPLORE;
      redraw = true;
	  avatar_save();
      return;
	}
	else {
	
      power_enemy(combat.enemy.type);
      combat.phase = COMBAT_PHASE_DEFENSE;
	  redraw = true;
	  combat.timer = 30;
    if (OPTIONS.animation == true) {
      combat.timer = 30;
    }
    else {
      combat.timer = 1;
    }
	  return;
	}
  }

}

function combat_logic_defense() {
  combat.timer--;

  if (combat.timer > 15 && combat.hero_hurt) {
    tileset.render_offset.x = Math.round(Math.random() * 4) - 2;
    tileset.render_offset.y = Math.round(Math.random() * 4) - 2;
	redraw = true;
  }
  else if (combat.timer == 15) {
    tileset.render_offset = {x:0, y:0};
	redraw = true;
  }
  
  if (combat.timer == 0) {
  
    // check for defeated hero
	if (avatar.hp <= 0) {
	  combat.phase = COMBAT_PHASE_DEFEAT;
      avatar_save();
	  redraw = true;
	  sounds_play(SFX_DEFEAT);
	  return;
	}
	else {
      combat.phase = COMBAT_PHASE_INPUT;
	  redraw = true;
	  return;
	}
  }

}

function combat_logic_victory() {
  
  // end combat by clicking or pressing the action button  
  if (pressing.mouse && !input_lock.mouse) {  
    input_lock.mouse = true;
    combat_clear_messages();
    gamestate = STATE_EXPLORE;
    redraw = true;
    return;  
  }
  
  if (pressing.action && !input_lock.action) {
    input_lock.action = true;
    combat_clear_messages();
    gamestate = STATE_EXPLORE;
    redraw = true;
    return;  	
  }
}

function combat_logic_defeat() {
  return;
}

function combat_clear_messages() {
  combat.offense_action = "";
  combat.offense_result = "";
  combat.defense_action = "";
  combat.defense_result = "";
}

function combat_determine_reward() {

  // for now, just gold rewards
  var gold_min = enemy.stats[combat.enemy.type].gold_min;
  var gold_max = enemy.stats[combat.enemy.type].gold_max;
  
  var gold_reward = Math.round(Math.random() * (gold_max - gold_min)) + gold_min;
  combat.reward_result = "+" + gold_reward + " Gold!";
  
  avatar.gold += gold_reward;
  combat.gold_treasure = gold_reward;
  
  // if killed a named creature, remember
  if (combat.victory_status != "") {
    avatar.campaign.push(combat.victory_status);  
  }
  
  avatar_save();

}


/**** Render **************************/
function combat_render() {

  // visuals common to all combat phases
  tileset_background();
  mazemap_render(avatar.x, avatar.y, avatar.facing);

  switch (combat.phase) {
    case COMBAT_PHASE_INTRO:
	  combat_render_intro();
	  break;
	case COMBAT_PHASE_INPUT:
	  combat_render_input();
	  break;
	case COMBAT_PHASE_OFFENSE:
	  combat_render_offense();
	  break;
	case COMBAT_PHASE_DEFENSE:
	  combat_render_defense();
	  break;
	case COMBAT_PHASE_VICTORY:
	  combat_render_victory();
	  break;
	case COMBAT_PHASE_DEFEAT:
	  combat_render_defeat();
	  break;
  }
}

function combat_render_intro() {

  // TEMP: skip first frame if we want to animate in combat logic()
  if (combat.timer < COMBAT_INTRO_DELAY) enemy_render(combat.enemy.type);
  bitfont_render(enemy.stats[combat.enemy.type].name, 80, 2, JUSTIFY_CENTER);
}

function combat_render_input() {
  enemy_render(combat.enemy.type);
  bitfont_render(enemy.stats[combat.enemy.type].name, 80, 2, JUSTIFY_CENTER);
  info_render_hpmp();
  action_render();
  combat_render_offense_log();
  combat_render_defense_log();
}

function combat_render_offense() {
  enemy_render(combat.enemy.type);
  bitfont_render(enemy.stats[combat.enemy.type].name, 80, 2, JUSTIFY_CENTER);  
  
  // make text disappear for a short moment
  if (combat.timer <= 25) combat_render_offense_log();
}

function combat_render_defense() {
  enemy_render(combat.enemy.type);
  bitfont_render(enemy.stats[combat.enemy.type].name, 80, 2, JUSTIFY_CENTER);  

  combat_render_offense_log();
  combat_render_defense_log();    
}

function combat_render_victory() {
  combat_render_offense_log();
  bitfont_render(enemy.stats[combat.enemy.type].name, 80, 2, JUSTIFY_CENTER); 
  info_render_hpmp();
  bitfont_render("Victory!", 80, 60, JUSTIFY_CENTER);
  bitfont_render(combat.reward_result, 80, 70, JUSTIFY_CENTER);
  treasure_render_gold(combat.gold_treasure);
}

function combat_render_defeat() {
  enemy_render(combat.enemy.type);
  bitfont_render(enemy.stats[combat.enemy.type].name, 80, 2, JUSTIFY_CENTER);  
  combat_render_offense_log();
  combat_render_defense_log();
  info_render_hpmp();
  bitfont_render("You are defeated...", 158, 110, JUSTIFY_RIGHT);
  bitfont_render("Final Gold: " + avatar.gold, 158, 100, JUSTIFY_RIGHT);
}

function combat_render_offense_log() {
  if (combat.offense_action != "") {
    bitfont_render("You:", 2, 20, JUSTIFY_LEFT);
	bitfont_render(combat.offense_action, 2, 30, JUSTIFY_LEFT);
	bitfont_render(combat.offense_result, 2, 40, JUSTIFY_LEFT);
  }
}

function combat_render_defense_log() {
  if (combat.defense_action != "") {
    bitfont_render("Enemy:", 2, 60, JUSTIFY_LEFT);
	bitfont_render(combat.defense_action, 2, 70, JUSTIFY_LEFT);
	bitfont_render(combat.defense_result, 2, 80, JUSTIFY_LEFT);	
  }
}

