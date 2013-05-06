// click areas reusable by several modules
var clickarea_up = {x:40, y:0, w:80, h:100};
var clickarea_down = {x:40, y:100, w:80, h:20};
var clickarea_left = {x:0, y:20, w:40, h:100};
var clickarea_right = {x:120, y:20, w:40, h:100};

/**
 * Given a point with x,y and a rect with x,y,w,h
 * Determine if the point is within the rect
 */
function isWithin(point, rect) {
  if (point.x < rect.x) return false;
  if (point.y < rect.y) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}

function resizeCanvas() {
  if (!STRETCH_TO_SCREEN) {
    
	can.width = 160 * SCALE;
	can.height = 120 * SCALE;
	redraw = true;
	
	return;
  }

  var aspect_ratio = 4/3;
    
  // the screen is wider than 4:3
  if (window.innerWidth * (3/4) > window.innerHeight) {  
    can.height = window.innerHeight;
    can.width = can.height * aspect_ratio;
    SCALE = can.height / 120;
  }
  // the screen is taller than 4:3
  else {
    can.width = window.innerWidth;
	can.height = can.width / aspect_ratio;
	SCALE = can.width / 160;
  }
  redraw = true;
  setNearestNeighbor();
}

function setNearestNeighbor() {
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.oImageSmoothingEnabled = false;  
}

/**
 * Generic cookie writer
 * Based on http://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(c_name, value, exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

/**
 * Generic cookie reader
 * Based on http://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(c_name)
{
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  }
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start,c_end));
  }
  return c_value;
}

/**
 * Special case function
 * If somehow the player is stuck,
 * Use this from a command console
 */
function stuck() {
  avatar.x = 1;
  avatar.y = 1;
  avatar.facing = "south";
  avatar.moved = false;
  avatar.map_id = 0;
  mazemap_set(0);
  redraw = true;
}

/**
 * Various cheats and debugging routines
 */
function cheat_gold(gold_amt) {
  avatar.gold += gold_amt;
}

function cheat_weapon(weapon_id) {
  if (weapon_id >= 0 && weapon_id <= 7) {
    avatar.weapon = weapon_id;
  }
  redraw = true;
}

function cheat_armor(armor_id) {
  if (armor_id >= 0 && armor_id <= 7) {
    avatar.armor = armor_id;
  }
  redraw = true;
}

function cheat_spell(spell_id) {
  if (spell_id >= 0 && spell_id <= 6) {
    avatar.spellbook = spell_id;
  }
  redraw = true;
}

function cheat_rest() {
  avatar.hp = avatar.max_hp;
  avatar.mp = avatar.max_mp;
  redraw = true;
}
