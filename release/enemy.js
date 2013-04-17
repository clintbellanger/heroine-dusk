/**
 Data collection for Enemies
 Includes the base stats for enemies
 Includes the images for enemies
 */

var ENEMY_COUNT = 1;
var ENEMY_SKELETON = 0;

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

  enemy.img[ENEMY_SKELETON].src = "images/enemies/skeleton.png";
  enemy.img[ENEMY_SKELETON].onload = function() {enemy_onload();};

  enemy.stats[ENEMY_SKELETON] = {name:"Skeleton", hp:15, atk_min:5, atk_max:12, gold_min:1, gold_max:4};
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
}

