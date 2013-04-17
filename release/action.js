/*
 Action menu for combat or casting spells out of combat
 */

var BUTTON_SIZE = 16;
var SELECT_SIZE = 20;
var BUTTON_OFFSET = 2;

var BUTTON_POS_INFO = {x:140, y:0};
var BUTTON_POS_ATTACK = {x:120, y:30};
var BUTTON_POS_RUN = {x:140, y:30};
var BUTTON_POS_HEAL = {x:120, y:60};
var BUTTON_POS_BURN = {x:140, y:60};
var BUTTON_POS_UNLOCK = {x:120, y:80};
var BUTTON_POS_LIGHT = {x:140, y:80};
var BUTTON_POS_FREEZE = {x:120, y:100};
var BUTTON_POS_REFLECT = {x:140, y:100};


var action = new Object();

action.button_img = new Image();
action.button_img_loaded = false;
action.select_img = new Image();
action.select_img_loaded = false;

action.select_pos = BUTTON_POS_INFO;



/**** Initialize ***************/
function action_init() {

  action.button_img.src = "images/action_buttons.png";
  action.button_img.onload = function() {action_button_onload();};
  action.select_img.src = "images/select.png";
  action.select_img.onload = function() {action_select_onload();};
}

function action_button_onload() {action.button_img_loaded = true;}
function action_select_onload() {action.select_img_loaded = true;}

/**** Logic functions ***************/
function action_logic() {

  // handle clicking on a button


  // handle keypress to activate the selected button

  
  // handle arrowkeys to navigate the select cursor

}


/**** Render functions ***************/
function action_render() {

  if (!action.button_img_loaded) return;

  // if in combat, show fight and run
  if (gamestate == STATE_COMBAT) {
    action_render_button(0, BUTTON_POS_ATTACK);
    action_render_button(1, BUTTON_POS_RUN);
  }


  // show spells
  if (avatar.spellbook >= 1) action_render_button(2, BUTTON_POS_HEAL);
  if (avatar.spellbook >= 2) action_render_button(3, BUTTON_POS_BURN);
  if (avatar.spellbook >= 3) action_render_button(4, BUTTON_POS_UNLOCK);
  if (avatar.spellbook >= 4) action_render_button(5, BUTTON_POS_LIGHT);
  if (avatar.spellbook >= 5) action_render_button(6, BUTTON_POS_FREEZE);
  if (avatar.spellbook >= 6) action_render_button(7, BUTTON_POS_REFLECT);

  action_render_select(action.select_pos);
  
}

function action_render_button(id, pos) {
  ctx.drawImage(
    action.button_img,
    id * BUTTON_SIZE,
    0,
    BUTTON_SIZE,
    BUTTON_SIZE,	
    (pos.x + BUTTON_OFFSET) * SCALE,
    (pos.y + BUTTON_OFFSET) * SCALE,
    BUTTON_SIZE * SCALE,
    BUTTON_SIZE * SCALE
  );
}

function action_render_select(pos) {
  if (!action.select_img_loaded) return;
  ctx.drawImage(
    action.select_img,
    0,
    0,
    SELECT_SIZE,
    SELECT_SIZE,	
    pos.x * SCALE,
    pos.y * SCALE,
    SELECT_SIZE * SCALE,
    SELECT_SIZE * SCALE
  );
}

