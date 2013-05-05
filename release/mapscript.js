/**
 Scripting for various maps
 */


var mapscript = new Object();

mapscript.bone_piles = new Array();
mapscript.bone_piles = [
  {map_id:8, x:4, y:7, status:"bone1"},
  {map_id:8, x:4, y:2, status:"bone2"},
  {map_id:8, x:13, y:7, status:"bone3"},
  {map_id:8, x:11, y:5, status:"bone4"},
  {map_id:9, x:5, y:5, status:"bone5"},
  {map_id:9, x:8, y:2, status:"bone6"},
  {map_id:10, x:2, y:4, status:"bone7"},
  {map_id:10, x:4, y:2, status:"bone8"}
];

mapscript.locked_doors = new Array();
mapscript.locked_doors = [
  {map_id:8, x:4, y:12, status:"door1"},
  {map_id:10, x:11, y:3, status:"door2"},
  {map_id:10, x:13, y:3, status:"door3"}
];


function mapscript_exec(map_id) {

  var result = false;
  switch (map_id) {

    case 0: // Serf Quarters
      result = mapscript_haybale(1,1);
      // result = result || mapscript_message(1,2,"serfmsg","This place is no longer safe");
      return result;

    case 1: // Gar'ashi Monastery
      return false;

    case 2: // Monk Quarters
      return mapscript_chest(1,1,"stick", "Wood Stick", 1);

    case 3: // Meditation Point
      return mapscript_chest(2,1,"heal", "Spellbook: Heal", 1);

    case 4: // Monastery Trail
      return mapscript_chest(2,2,"hp1", "Magic Emerald (HP Up)", 1);

    case 5: // Cedar Village
      return mapscript_chest(7,10,"g1", "Gold", 10);

    case 6: // Zuruth Plains
      return mapscript_chest(9,4,"mp1", "Magic Sapphire (MP Up)", 1);

    case 7: // Canal Boneyard
      return mapscript_chest(13,5,"def1", "Magic Diamond (Def Up)", 1);

    case 8: // Mausoleum
      mapscript_bone_pile_load(8);
      mapscript_locked_door_load(8);
      result = mapscript_haybale(11,9);
      result = result || mapscript_chest(3,2,"atk1", "Magic Ruby (Atk Up)", 1);
      result = result || mapscript_chest(3,12,"mp2", "Magic Sapphire (MP Up)", 1);
      result = result || mapscript_chest(6,9, "g2", "Gold", 25);

      return result;
    
    case 9: // Dead Walkways
      mapscript_bone_pile_load(9);
      boss_alter_map();
      result = mapscript_enemy(4,9, ENEMY_MIMIC, "");
      result = result || mapscript_enemy(11,5, ENEMY_DEATH_SPEAKER, "dspeak");
      return result;

    case 10: // Trade Tunnel
      mapscript_locked_door_load(10);
      mapscript_bone_pile_load(10);
      
      result = mapscript_chest(11,2, "hp2", "Magic Emerald (HP Up)", 1);
      result = result || mapscript_chest(13,2, "g3", "Gold", 100);
      result = result || mapscript_enemy(14,9, ENEMY_MIMIC, "");
      result = result || mapscript_enemy(6,4, ENEMY_MIMIC, "");

      return result;
  }
  return false;
}

// general script types
function mapscript_message(x, y, status, message) {
  if (avatar.x == x && avatar.y == y) {

    // if the player has already read this message, skip it
    if (avatar.campaign.indexOf(status) > -1) {
      return false;
    }

    explore.message = message;
    avatar.campaign.push(status);
    return true;

  }
  return false;
}


function mapscript_haybale(x, y) {

  // don't rest if just starting the game
  if (!avatar.moved) return false;

  if (avatar.x == x && avatar.y == y) { 
    explore.message = "You rest for awhile.";
    avatar_sleep();
	sounds_play(SFX_COIN);
    return true;
  }
  return false;
}

function mapscript_chest(x, y, status, item_type, item_count) {

  // if the player has already opened this chest, hide the chest
  if (avatar.campaign.indexOf(status) > -1) {

    // interior chest
    if (mazemap_get_tile(x,y) == 8) {
      mazemap_set_tile(x, y, 5);
    }
    // exterior chest
    else if (mazemap_get_tile(x,y) == 9) {
      mazemap_set_tile(x, y, 1);
    }

  }

  // if this is a new chest, open it and grant the reward.
  else {
    if (avatar.x == x && avatar.y == y) { 
      avatar.campaign.push(status);
      mapscript_grant_item(item_type, item_count);
      return true;
    }
  }

  return false;
}

/**
 Found items have permanent unique effects, handle those here
 */
function mapscript_grant_item(item, item_count) {

  sounds_play(SFX_COIN);

  if (item_count == 1) {
    explore.message = "Found " + item + "!";
  }
  else if (item_count > 1) {
    explore.message = "Found " + item_count + " " + item;
  }

  if (item == "Gold") {
    avatar.gold += item_count;
  }
  else if (item == "Wood Stick") {
    // only keep the stick if it's better than what you already have
    if (avatar.weapon == 0) avatar.weapon = 1;
  }
  else if (item == "Spellbook: Heal") {
    if (avatar.spellbook == 0) avatar.spellbook = 1;
  }
  else if (item == "Magic Emerald (HP Up)") {
    avatar.hp += 5;
    avatar.max_hp += 5;
  }
  else if (item == "Magic Sapphire (MP Up)") {
    avatar.mp += 2;
    avatar.max_mp += 2;
  }
  else if (item == "Magic Ruby (Atk Up)") {
    avatar.bonus_atk += 1;
  }
  else if (item == "Magic Diamond (Def Up)") {
    avatar.bonus_def += 1;
  }
  
}

function mapscript_bone_pile_save(x, y) {

  // the player has just burned bones, lookup and save the status
  for (var i=0; i < mapscript.bone_piles.length; i++) {
    if (mazemap.current_id == mapscript.bone_piles[i].map_id &&
        x == mapscript.bone_piles[i].x &&
        y == mapscript.bone_piles[i].y) {

      avatar.campaign.push(mapscript.bone_piles[i].status);
    }
  }
}

function mapscript_bone_pile_load(map_id) {

  // check all bones previously burned
  for (var i=0; i < mapscript.bone_piles.length; i++) {
    if (mapscript.bone_piles[i].map_id == map_id) {
    
      if (avatar.campaign.indexOf(mapscript.bone_piles[i].status) > -1) {
        mazemap_set_tile(mapscript.bone_piles[i].x, mapscript.bone_piles[i].y, 5);
      }
    }
  }
}

function mapscript_locked_door_save(x, y) {

  // the player has just unlocked a door, lookup and save the status
  for (var i=0; i < mapscript.locked_doors.length; i++) {
    if (mazemap.current_id == mapscript.locked_doors[i].map_id &&
        x == mapscript.locked_doors[i].x &&
        y == mapscript.locked_doors[i].y) {

      avatar.campaign.push(mapscript.locked_doors[i].status);
    }
  }
}

function mapscript_locked_door_load(map_id) {

  // check all doors previously unlocked
  for (var i=0; i < mapscript.locked_doors.length; i++) {
    if (mapscript.locked_doors[i].map_id == map_id) {
    
      if (avatar.campaign.indexOf(mapscript.locked_doors[i].status) > -1) {
        mazemap_set_tile(mapscript.locked_doors[i].x, mapscript.locked_doors[i].y, 3);
      }
    }
  }
}

// a specific enemy is on this tile
function mapscript_enemy(x, y, enemy_id, status) {

  // don't spawn the enemy if just loading
  if (!init_complete) return false;
  
  // if heroine is at the enemy location
  if (avatar.x == x && avatar.y == y) { 

    // if heroine has not already defeated this enemy
    if (status != "") {
      if (avatar.campaign.indexOf(status) > -1) {
        return false;
      }
    }
    
    // prepare combat mode
    explore.encounter_chance = 0.0;
    gamestate = STATE_COMBAT;
    action.select_pos = BUTTON_POS_ATTACK;
    combat.timer = COMBAT_INTRO_DELAY;
    combat.phase = COMBAT_PHASE_INTRO;
    combat_set_enemy(enemy_id);
    combat.victory_status = status;

    return true;
  }
  return false;
}

