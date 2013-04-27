/**
 * Resolve power use
 */


function power_hero_attack() {

  combat.offense_action = "Attack!";
  
  // check miss
  var hit_chance = Math.random();
  if (hit_chance < 0.20) {
    combat.offense_result = "Miss!";
	return;
  }
  
  // Hit: calculate damage
  var atk_min = info.weapons[avatar.weapon].atk_min + avatar.bonus_atk;
  var atk_max = info.weapons[avatar.weapon].atk_max + avatar.bonus_atk;
  var attack_damage = Math.round(Math.random() * (atk_max - atk_min)) + atk_min;
  
  // check crit
  // hero crits add max damage
  var crit_chance = Math.random();
  if (crit_chance < 0.10) {
    attack_damage += atk_max;
	combat.offense_action = "Critical!";
  }
  
  combat.enemy.hp -= attack_damage;
  combat.offense_result = attack_damage + " damage";
  
  combat.enemy_hurt = true;
  
}

function power_enemy_attack() {
  combat.defense_action = "Attack!";
  
  // check miss
  var hit_chance = Math.random();
  if (hit_chance < 0.30) {
    combat.defense_result = "Miss!";
	return;
  }
  
  var atk_min = enemy.stats[combat.enemy.type].atk_min;
  var atk_max = enemy.stats[combat.enemy.type].atk_max;
  var attack_damage = Math.round(Math.random() * (atk_max - atk_min)) + atk_min;
  
  // check crit
  // enemy crits add min damage
  var crit_chance = Math.random();
  if (crit_chance < 0.05) {
    attack_damage += atk_min;
	combat.defense_action = "Critical!";
  }
  
  // armor absorb
  attack_damage -= info.armors[avatar.armor].def;
  if (attack_damage <= 0) attack_damage = 1;
  
  avatar.hp -= attack_damage;
  combat.defense_result = attack_damage + " damage";
  
  combat.hero_hurt = true;
}
 
function power_heal() {

  if (avatar.mp == 0) return;
  if (avatar.hp == avatar.max_hp) return;

  var heal_amount = Math.floor(avatar.max_hp/2) + Math.floor(Math.random() * avatar.max_hp/2);
  avatar.hp = avatar.hp + heal_amount;
  if (avatar.hp > avatar.max_hp) avatar.hp = avatar.max_hp;

  avatar.mp--;
  
  if (gamestate == STATE_COMBAT) {
    combat.offense_action = "Heal!";
	combat.offense_result = "+" + heal_amount + " HP";  
  }
  else if (gamestate == STATE_INFO) {
    info.power_action = "Heal!";
    info.power_result = "+" + heal_amount + " HP";
  }
}

function power_burn() {
  if (avatar.mp == 0) return;
  
  combat.offense_action = "Burn!";
  
  // for now let's have burn deal triple weapon damage
  var atk_min = (info.weapons[avatar.weapon].atk_min + avatar.bonus_atk) * 3;
  var atk_max = (info.weapons[avatar.weapon].atk_max + avatar.bonus_atk) * 3;
  var attack_damage = Math.round(Math.random() * (atk_max - atk_min)) + atk_min;
  
  avatar.mp--;  
  combat.enemy.hp -= attack_damage;
  combat.offense_result = attack_damage + " damage";
  
  combat.enemy_hurt = true;
  
}

function power_run() {

  combat.offense_action = "Run!";

  var chance_run = Math.random();
  if (chance_run < 0.66) {
    combat.run_success = true;
	combat.offense_result = "";
	return;
  }
  else {
    combat.offense_result = "Blocked!";
	return;  
  }  
}

function power_map_burn() {
  if (avatar.mp == 0) return;
  var burn_target = false;

  // tile 16 (skull pile) burns into tile 5 (dungeon interior)
  
  // don't let the player waste mana if there is no nearby tile to burn
  burn_target = burn_target || power_map_burntile(avatar.x+1, avatar.y);
  burn_target = burn_target || power_map_burntile(avatar.x, avatar.y+1);
  burn_target = burn_target || power_map_burntile(avatar.x-1, avatar.y);
  burn_target = burn_target || power_map_burntile(avatar.x, avatar.y-1);

  if (burn_target) {
    info.power_action = "Burn!";
    info.power_result = "Cleared Path!";
    avatar.mp--;
    avatar_save();
  }
  else {
    info.power_action = "(No Target)";
  }
}

function power_map_burntile(x, y) {
  if (mazemap_get_tile(x,y) == 16) {
    burn_target = true;
    mazemap_set_tile(x,y,5);
    mapscript_bone_pile_save(x,y);
    return true;
  }
  return false;
}


