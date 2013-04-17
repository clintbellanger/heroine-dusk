/**
 Maze Avatar
 **/
 
var avatar = new Object();

// location info
avatar.x = 2;
avatar.y = 1;
avatar.facing = "north";
avatar.moved = false;

// equipment info
avatar.weapon = 4;
avatar.armor = 3;

// status info
avatar.hp = 25;
avatar.max_hp = 25;
avatar.mp = 4;
avatar.max_mp = 4;

// currency
avatar.gold = 0;

// bonuses
// Note that hp_max, mp_max already contain bonuses
avatar.bonus_atk = 0;
avatar.bonus_def = 0;

// quest progress
avatar.quest = 0;
avatar.spellbook = 2;


//---- Public Functions ---------------------------------------------

function avatar_explore() {
  avatar.moved = false;

  var input_up = pressing.up && !input_lock.up;
  var input_down = pressing.down && !input_lock.down;
  var input_left = pressing.left && !input_lock.left;
  var input_right = pressing.right && !input_lock.right;
  
  if (pressing.mouse && !input_lock.mouse) {
    input_up = input_up || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_up));
    input_down = input_down || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_down));
    input_left = input_left || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_left));
    input_right = input_right || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_right));
  }
  
  // check movement
  if (input_up) {
	if (pressing.up) input_lock.up = true;
	if (pressing.mouse) input_lock.mouse = true;
	
    if (avatar.facing == "north") avatar_move(0,-1);
	else if (avatar.facing == "west") avatar_move(-1,0);
	else if (avatar.facing == "south") avatar_move(0,1);
	else if (avatar.facing == "east") avatar_move(1,0);
  }
  else if (input_down) {
	if (pressing.down) input_lock.down = true;
	if (pressing.mouse) input_lock.mouse = true;
	
    if (avatar.facing == "north") avatar_move(0,1);
	else if (avatar.facing == "west") avatar_move(1,0);
	else if (avatar.facing == "south") avatar_move(0,-1);
	else if (avatar.facing == "east") avatar_move(-1,0);
  }
  else if (input_left) {
	if (pressing.left) input_lock.left = true;
	if (pressing.mouse) input_lock.mouse = true;
	
	avatar_turn_left();
  }
  else if (input_right) {
	if (pressing.right) input_lock.right = true;
	if (pressing.mouse) input_lock.mouse = true;
	
	avatar_turn_right();
  }  
  
}

function avatar_move(dx,dy) {
  var target_tile = mazemap_get_tile(avatar.x+dx,avatar.y+dy);
  if (tileset.walkable[target_tile]) {
    avatar.x += dx;
	avatar.y += dy;
	redraw = true;
    avatar.moved = true;
  }
}

function avatar_turn_left() {
  if (avatar.facing == "north") avatar.facing = "west";
  else if (avatar.facing == "west") avatar.facing = "south";
  else if (avatar.facing == "south") avatar.facing = "east";
  else if (avatar.facing == "east") avatar.facing = "north";
  redraw = true;
}

function avatar_turn_right() {
  if (avatar.facing == "north") avatar.facing = "east";
  else if (avatar.facing == "east") avatar.facing = "south";
  else if (avatar.facing == "south") avatar.facing = "west";
  else if (avatar.facing == "west") avatar.facing = "north";
  redraw = true;
}

