/**
 Scripting for various maps
 */
 
function mapscript(map_id) {
  switch (map_id) {
    case 0:
      return mapscript_map0();
    case 2:
      return mapscript_map2();
    case 3:
      return mapscript_map3();
	case 4:
	  return mapscript_map4();
	case 5:
	  return mapscript_map5();
	  
  }
  return false;
}

// scripting for individual maps
function mapscript_map0() {
  return mapscript_haybale(1,1);
}

function mapscript_map2() {
  return mapscript_chest(1,1,"stick", "Wood Stick", 1);
}

function mapscript_map3() {
  return mapscript_chest(2,1,"heal", "Spellbook: Heal", 1);
}

function mapscript_map4() {
  return mapscript_chest(2,2,"trailhp", "Magic Emerald (HP Up)", 1);
}

function mapscript_map5() {
  return mapscript_chest(7,10,"cedarg", "Gold", 10);
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


