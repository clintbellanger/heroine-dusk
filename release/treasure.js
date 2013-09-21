/**
 Treasure
 Handles display and rewards for loot
 */

var GOLD_ICON_SIZE = 32;


var treasure = new Object();

treasure.gold_img = new Image();
treasure.gold_img_loaded = false;

treasure.gold_pos = new Array();

/*** Initialize **********************/
function treasure_init() {

  treasure.gold_img.src = "images/treasure/gold.png";
  treasure.gold_img.onload = function() {treasure_gold_onload();};  
  
  // icon positions on sprite sheet and on ground in 3D view
  // see art_src/treasure/gold_pos.xcf for destinations reference
  treasure.gold_pos[0] = {src_x: 0,   src_y:  0, dest_x: 65, dest_y: 93};
  treasure.gold_pos[1] = {src_x: 32,  src_y:  0, dest_x: 56, dest_y: 96};
  treasure.gold_pos[2] = {src_x: 64,  src_y:  0, dest_x: 74, dest_y: 95};
  treasure.gold_pos[3] = {src_x: 96,  src_y:  0, dest_x: 74, dest_y: 86};
  treasure.gold_pos[4] = {src_x: 128, src_y:  0, dest_x: 50, dest_y: 80};
  treasure.gold_pos[5] = {src_x: 0,   src_y: 32, dest_x: 63, dest_y: 78};
  treasure.gold_pos[6] = {src_x: 32,  src_y: 32, dest_x: 41, dest_y: 92};
  treasure.gold_pos[7] = {src_x: 64,  src_y: 32, dest_x: 90, dest_y: 76};
  treasure.gold_pos[8] = {src_x: 96,  src_y: 32, dest_x: 87, dest_y: 94};
  treasure.gold_pos[9] = {src_x: 128, src_y: 32, dest_x: 29, dest_y: 77};

}

/*** Image loading Helpers **********************/
function treasure_gold_onload() {treasure.gold_img_loaded = true;}

/**
 * This function renders a gold pile
 * with correct gold value up to 1023 currently
 */
function treasure_render_gold(total_value) {

  // arranged in treasure pile draw order
  if (total_value & 128) treasure_render_gold_icon(7);
  if (total_value & 512) treasure_render_gold_icon(9);
  if (total_value & 32) treasure_render_gold_icon(5);
  if (total_value & 16) treasure_render_gold_icon(4);
  if (total_value & 8) treasure_render_gold_icon(3);
  if (total_value & 1) treasure_render_gold_icon(0);
  if (total_value & 4) treasure_render_gold_icon(2);
  if (total_value & 64) treasure_render_gold_icon(6);
  if (total_value & 2) treasure_render_gold_icon(1);
  if (total_value & 256) treasure_render_gold_icon(8);

}

function treasure_render_gold_icon(icon_id) {

  ctx.drawImage(
    treasure.gold_img,
    treasure.gold_pos[icon_id].src_x * PRESCALE,
    treasure.gold_pos[icon_id].src_y * PRESCALE,
    GOLD_ICON_SIZE * PRESCALE,
    GOLD_ICON_SIZE * PRESCALE,
    treasure.gold_pos[icon_id].dest_x * SCALE,
    treasure.gold_pos[icon_id].dest_y * SCALE,
    GOLD_ICON_SIZE * SCALE,
    GOLD_ICON_SIZE * SCALE 
  );
}


