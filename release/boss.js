/**
 * Boss encounter logic and special art
 */
 
var boss = new Object();

boss.boneshield_img = new Image();
boss.boneshield_loaded = false;
boss.boneshield_active = false;
boss.boneshield_count = 0;

function boss_init() {
  boss.boneshield_img.src = "images/enemies/bone_shield.png";
  boss.boneshield_img.onload = function() {boss_boneshield_onload();};
}

function boss_reset() {
  boss.boneshield_active = false;
  boss.boneshield_count = 0;
  boss_alter_map();
}

function boss_boneshield_onload() {
  boss.boneshield_loaded = true;
}

function boss_alter_map() {
  if (avatar.campaign.indexOf("dspeak") > -1) {
    if (mazemap.current_id == 9) {
      mazemap_set_tile(11,5,6);
	}
  }
}


function boss_boneshield_activate() {
  boss.boneshield_active = true;
  combat.defense_action = "Bone Shield!";
  combat.defense_result = "+Def Up!";
  combat.hero_hurt = false;

}

// if the boss' bone shield is up, override the regular hero attack
function boss_boneshield_heroattack() {
  combat.offense_result = "Absorbed!";
  combat.enemy_hurt = false;
}

function boss_boneshield_render() {
  if (!boss.boneshield_loaded) return;
  if (!boss.boneshield_active) return;
  ctx.drawImage(boss.boneshield_img, 0, 0, 160*SCALE, 120*SCALE);
}

/**
 * The boss chooses which action to perform
 */
function boss_power() {

  var power_roll = Math.random();

  // 2/3rds chance to simply attack
  if (power_roll < 0.66) {
    power_enemy_attack();
	return;
  }
  else {
  
    power_roll = Math.random();	
  
    // otherwise use scorch or boneshield (up to 3x)
    if (boss.boneshield_active || boss.boneshield_count >= 3 || power_roll < 0.33) {
	  power_scorch();
	  return;
	}
	else {
	  boss_boneshield_activate();
	  boss.boneshield_count++;
	  return;
	}
  }

}
