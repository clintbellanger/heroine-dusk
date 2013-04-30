/**
 Data collection for Enemies
 Includes the base stats for enemies
 Includes the images for enemies
 */

var ENEMY_COUNT = 8;

var ENEMY_SHADOW_TENDRILS = 0;
var ENEMY_IMP = 1;
var ENEMY_SHADOW_SOUL = 2;
var ENEMY_ZOMBIE = 3;
var ENEMY_SKELETON = 4;
var ENEMY_DRUID = 5;
var ENEMY_MIMIC = 6;
var ENEMY_DEATH_SPEAKER = 7;

var ENEMY_CATEGORY_SHADOW = 0;
var ENEMY_CATEGORY_DEMON = 1;
var ENEMY_CATEGORY_UNDEAD = 2;
var ENEMY_CATEGORY_AUTOMATON = 3;

var enemy = new Object();

enemy.load_counter = 0;
enemy.img = new Array();
enemy.img_loaded = false;
enemy.stats = new Array();
enemy.render_offset = {x:0, y:0};

function enemy_init() {
  for (i=0; i<ENEMY_COUNT; i++) {
    enemy.img[i] = new Image();
  }

  // load enemy images
  enemy.img[ENEMY_SHADOW_TENDRILS].src = "images/enemies/shadow_tendrils.png";
  enemy.img[ENEMY_SHADOW_TENDRILS].onload = function() {enemy_onload();};

  enemy.img[ENEMY_IMP].src = "images/enemies/imp.png";
  enemy.img[ENEMY_IMP].onload = function() {enemy_onload();};

  enemy.img[ENEMY_SHADOW_SOUL].src = "images/enemies/shadow_soul.png";
  enemy.img[ENEMY_SHADOW_SOUL].onload = function() {enemy_onload();};

  enemy.img[ENEMY_ZOMBIE].src = "images/enemies/zombie.png";
  enemy.img[ENEMY_ZOMBIE].onload = function() {enemy_onload();};

  enemy.img[ENEMY_SKELETON].src = "images/enemies/skeleton.png";
  enemy.img[ENEMY_SKELETON].onload = function() {enemy_onload();};

  enemy.img[ENEMY_DRUID].src = "images/enemies/druid.png";
  enemy.img[ENEMY_DRUID].onload = function() {enemy_onload();}

  enemy.img[ENEMY_MIMIC].src = "images/enemies/mimic.png";
  enemy.img[ENEMY_MIMIC].onload = function() {enemy_onload();}

  enemy.img[ENEMY_DEATH_SPEAKER].src = "images/enemies/death_speaker.png";
  enemy.img[ENEMY_DEATH_SPEAKER].onload = function() {enemy_onload();}

  // set enemy stats

  enemy.stats[ENEMY_SHADOW_TENDRILS] = {name:"Shadow Tendrils", hp:6, atk_min:2, atk_max:5, gold_min:1, gold_max:2, category:ENEMY_CATEGORY_SHADOW};
  enemy.stats[ENEMY_SHADOW_TENDRILS].powers = [ENEMY_POWER_ATTACK];

  enemy.stats[ENEMY_IMP] = {name:"Imp", hp:7, atk_min:2, atk_max:6, gold_min:1, gold_max:3, category:ENEMY_CATEGORY_DEMON};
  enemy.stats[ENEMY_IMP].powers = [ENEMY_POWER_ATTACK, ENEMY_POWER_ATTACK, ENEMY_POWER_SCORCH];

  enemy.stats[ENEMY_SHADOW_SOUL] = {name:"Shadow Soul", hp:8, atk_min:3, atk_max:8, gold_min:2, gold_max:4, category:ENEMY_CATEGORY_SHADOW};
  enemy.stats[ENEMY_SHADOW_SOUL].powers = [ENEMY_POWER_ATTACK, ENEMY_POWER_ATTACK, ENEMY_POWER_MPDRAIN];

  enemy.stats[ENEMY_ZOMBIE] = {name:"Zombie", hp:12, atk_min:4, atk_max:10, gold_min:3, gold_max:5, category:ENEMY_CATEGORY_UNDEAD};
  enemy.stats[ENEMY_ZOMBIE].powers = [ENEMY_POWER_ATTACK, ENEMY_POWER_ATTACK, ENEMY_POWER_HPDRAIN];

  enemy.stats[ENEMY_SKELETON] = {name:"Skeleton", hp:18, atk_min:6, atk_max:12, gold_min:4, gold_max:7, category:ENEMY_CATEGORY_UNDEAD};
  enemy.stats[ENEMY_SKELETON].powers = [ENEMY_POWER_ATTACK];

  enemy.stats[ENEMY_DRUID] = {name:"Druid", hp:16, atk_min:7, atk_max:14, gold_min:6, gold_max:10, category:ENEMY_CATEGORY_DEMON};
  enemy.stats[ENEMY_DRUID].powers = [ENEMY_POWER_ATTACK, ENEMY_POWER_SCORCH, ENEMY_POWER_HPDRAIN, ENEMY_POWER_MPDRAIN];

  enemy.stats[ENEMY_MIMIC] = {name:"Mimic", hp:30, atk_min:10, atk_max:16, gold_min:16, gold_max:25, category:ENEMY_CATEGORY_AUTOMATON};
  enemy.stats[ENEMY_MIMIC].powers = [ENEMY_POWER_ATTACK];

  enemy.stats[ENEMY_DEATH_SPEAKER] = {name:"Death Speaker", hp:84, atk_min:8, atk_max:15, gold_min:225, gold_max:275, category:ENEMY_CATEGORY_DEMON};
  enemy.stats[ENEMY_DEATH_SPEAKER].powers = [ENEMY_POWER_ATTACK, ENEMY_POWER_SCORCH];
  
}

function enemy_onload() {
  enemy.load_counter++;
  if (enemy.load_counter == ENEMY_COUNT) enemy.img_loaded = true;
}

function enemy_render(enemy_id) {

  if (!enemy.img_loaded) return;

  ctx.drawImage(
    enemy.img[enemy_id],
    0,
    0,
    160,
    120,
    enemy.render_offset.x * SCALE,
    enemy.render_offset.y * SCALE,
    160 * SCALE,
    120 * SCALE
  );
  
  // optional enemy overlays
  boss_boneshield_render();
}

