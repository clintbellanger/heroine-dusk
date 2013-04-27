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

function mapscript_exec(map_id) {
  switch (map_id) {

    case 0: // Serf Quarters
      return mapscript_haybale(1,1);

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
      return false;
    
    case 9: // Dead Walkways
      mapscript_bone_pile_load(9);
      return false;

    case 10: // Trade Tunnel
      mapscript_bone_pile_load(10);
      return false;
  }
  return false;
}

// general script types

function mapscript_haybale(x, y) {
  if (avatar.x == x && avatar.y == y) { 
    explore.message = "You rest for awhile.";
    avatar.hp = avatar.max_hp;
    avatar.mp = avatar.max_mp;
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
  // check all bones for the player has just burned bones, lookup and save the status
  for (var i=0; i < mapscript.bone_piles.length; i++) {
    if (mapscript.bone_piles[i].map_id == map_id) {
    
      if (avatar.campaign.indexOf(mapscript.bone_piles[i].status) > -1) {
        mazemap_set_tile(mapscript.bone_piles[i].x, mapscript.bone_piles[i].y, 5);
      }
    }
  }
}

