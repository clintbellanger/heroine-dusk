/**
 * Title screen
 */
 
var TITLE_MENU_MAIN = 0;
var TITLE_MENU_OPTIONS = 1;

var title = new Object();

title.img = new Image();
title.img_loaded = false;
title.menu_id = -1;
title.text_h = 11;

function title_set_menu(id) {
  if (title.menu_id != id) title.menu_selector = 0;
  title.menu_id = id;

  title.menu = new Array();
  
  if (id == TITLE_MENU_MAIN) {
    if (avatar_continue) title.menu[0] = "Continue";
    else title.menu[0] = "Start";

    title.menu[1] = "Options";
  }
  else if (id == TITLE_MENU_OPTIONS) {
    if (OPTIONS.animation) title.menu[0] = "Animations are on";
    else title.menu[0] = "Animations are off";

    if (OPTIONS.music) title.menu[1] = "Music is on";
    else title.menu[1] = "Music is off";

    if (OPTIONS.sfx) title.menu[2] = "Sounds are on";
    else title.menu[2] = "Sounds are off";

    if (OPTIONS.minimap) title.menu[3] = "Minimap is on";
    else title.menu[3] = "Minimap is off";
    
    title.menu[4] = "Back";
  }

  redraw = true;
}

function title_init() {
  title.img.src = "images/backgrounds/title.png";
  title.img.onload = function() {title_onload();};
  title_set_menu(TITLE_MENU_MAIN);
  redraw = true;
}

function title_onload() {
  title.img_loaded = true;
}

function title_logic() {
  title.menu_confirm = false;

  // move past title screen by clicking or pressing the action button
  if (pressing.mouse && !input_lock.mouse) {  
    for (var i=0; i<title.menu.length; i++) {
      var pos = {x:0, y:50+(i*title.text_h), w:160, h:title.text_h};
      if (isWithin(mouse_pos, pos)) {
        title.menu_selector = i;
        input_lock.mouse = true;
        title.menu_confirm = true;
        redraw = true;
      }
    }
  }
  else if (pressing.action && !input_lock.action) {
    input_lock.action = true;
    title.menu_confirm = true;
  }
  else if (pressing.up && !input_lock.up) {
    input_lock.up = true;
    if (title.menu_selector > 0) {
      title.menu_selector--;
      redraw = true;
    }
  }
  else if (pressing.down && !input_lock.down) {
    input_lock.down = true;
    if (title.menu_selector < title.menu.length-1) {
      title.menu_selector++;
      redraw = true;
    }
  }

  if (title.menu_confirm == true) {
    if (title.menu_id == TITLE_MENU_MAIN) {
      if (title.menu_selector == 0) {
        if (avatar_continue) title_continue();
        else title_start();
      }
      else if (title.menu_selector == 1) {
        title_set_menu(TITLE_MENU_OPTIONS);
      }
    }
    else if (title.menu_id == TITLE_MENU_OPTIONS) {
      if (title.menu_selector == 0) {
        OPTIONS.animation = !OPTIONS.animation;
        title_set_menu(TITLE_MENU_OPTIONS);
      }
      else if (title.menu_selector == 1) {
        OPTIONS.music = !OPTIONS.music;        
        title_set_menu(TITLE_MENU_OPTIONS);
      }
      else if (title.menu_selector == 2) {
        OPTIONS.sfx = !OPTIONS.sfx;
        title_set_menu(TITLE_MENU_OPTIONS);
      }
      else if (title.menu_selector == 3) {
         OPTIONS.minimap = !OPTIONS.minimap;
         title_set_menu(TITLE_MENU_OPTIONS);
      }
      else if (title.menu_selector == 4) {
        title_set_menu(TITLE_MENU_MAIN);
      }
      var json_save = JSON.stringify(OPTIONS);
      setCookie("options",json_save,90);
    }
  }
}

function title_render() {

  if (!bitfont.loaded || !title.img_loaded) {
    redraw = true;
    return;
  }

  ctx.drawImage(title.img, 0, 0, 160*SCALE, 120*SCALE);
  
  for (var i=0; i<title.menu.length; i++) {
    if (title.menu_selector == i) {
      bitfont_render("[ "+title.menu[i]+" ]", 80, 50+(i*title.text_h), JUSTIFY_CENTER);
    }
    else {
      bitfont_render(title.menu[i], 80, 50+(i*title.text_h), JUSTIFY_CENTER);
    }
  }
  
  if (title.menu_id == TITLE_MENU_MAIN) {
    bitfont_render("by Clint Bellanger 2013", 80, 100, JUSTIFY_CENTER);
    bitfont_render("ft. music by Yubatake", 80, 110, JUSTIFY_CENTER);
  }
}

function title_start() {
  gamestate = STATE_DIALOG;
  shop_set(8);
  dialog.option[2].msg1 = "Wake up";
  mazemap_set_music(atlas.maps[mazemap.current_id].music);
  redraw = true;
}

function title_continue() {
  mazemap_set_music(atlas.maps[mazemap.current_id].music);
  gamestate = STATE_EXPLORE;
  redraw = true;
}
