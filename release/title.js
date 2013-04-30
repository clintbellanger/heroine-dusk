/**
 * Title screen
 */
 
var title = new Object();

title.img = new Image();
title.img_loaded = false;

function title_init() {
  title.img.src = "images/backgrounds/title.png";
  title.img.onload = function() {title_onload();};
  redraw = true;
}

function title_onload() {
  title.img_loaded = true;
}

function title_logic() {

  // move past title screen by clicking or pressing the action button
  if (pressing.mouse && !input_lock.mouse) {  
    input_lock.mouse = true;
	
	if (avatar_continue) title_continue();
	else title_start();
	
  }
  else if (pressing.action && !input_lock.action) {
    input_lock.action = true;

	if (avatar_continue) title_continue();
	else title_start();

  }
}

function title_render() {

  if (!bitfont.loaded || !title.img_loaded) {
    redraw = true;
	return;
  }

  ctx.drawImage(title.img, 0, 0, 160*SCALE, 120*SCALE);
  
  if (avatar_continue) {
    bitfont_render("[ Continue ]", 80, 90, JUSTIFY_CENTER);
  }
  else {
    bitfont_render("[ Start ]", 80, 90, JUSTIFY_CENTER);
  }
  
  bitfont_render("Clint Bellanger 2013", 80, 110, JUSTIFY_CENTER);
}

function title_start() {
  gamestate = STATE_DIALOG;
  shop_set(8);
  dialog.option[2].msg1 = "Wake up";
  redraw = true;
}

function title_continue() {
  gamestate = STATE_EXPLORE;
  redraw = true;
}
