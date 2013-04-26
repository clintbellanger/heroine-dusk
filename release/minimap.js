/**
 * Minimap
 * Shown in the Info screen
 */

var MINIMAP_ICON_SIZE = 3; // pixels
 
var MINIMAP_ICON_NONWALKABLE = 0;
var MINIMAP_ICON_WALKABLE = 1;
// var MINIMAP_ICON_HEROINE = 2;
var MINIMAP_ICON_EXIT = 3;

var MINIMAP_CENTER_X = 30;
var MINIMAP_CENTER_Y = 71;

var MINIMAP_CURSOR_WEST = 0;
var MINIMAP_CURSOR_NORTH = 1;
var MINIMAP_CURSOR_EAST = 2;
var MINIMAP_CURSOR_SOUTH = 3;


var minimap = new Object();

minimap.img = new Image();
minimap.img_loaded = false;
minimap.cursor = new Image();
minimap.cursor_loaded = false;



function minimap_init() {

  minimap.img.src = "images/interface/minimap.png";
  minimap.img.onload = function() {minimap_img_onload();};

  minimap.cursor.src = "images/interface/minimap_cursor.png";
  minimap.cursor.onload = function() {minimap_cursor_onload();};
  
}

function minimap_img_onload() {
  minimap.img_loaded = true;
}
function minimap_cursor_onload() {
  minimap.cursor_loaded = true;
}


function minimap_render() {
  
  // determine minmap size
  var total_x = mazemap.width * MINIMAP_ICON_SIZE;
  var total_y = mazemap.height * MINIMAP_ICON_SIZE;
  
  // determine starting draw location
  var left_x = MINIMAP_CENTER_X - (total_x/2);
  var top_y = MINIMAP_CENTER_Y - (total_y/2);
    
  var draw_x;
  var draw_y;
  var target_tile;
  
  // render map
  for (var i=0; i<mazemap.width; i++) {
    draw_x = i * MINIMAP_ICON_SIZE + left_x;
  
    for (var j=0; j<mazemap.height; j++) {
	  draw_y = j * MINIMAP_ICON_SIZE + top_y;
	
      target_tile = mazemap_get_tile(i,j);
      if (tileset.walkable[target_tile]) {	  
	    minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_WALKABLE);
	  }
      else if (target_tile != 0) {
        minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_NONWALKABLE);
      }
	}
  }
  
  // render exits
  var exit_x;
  var exit_y;
  
  for (var i=0; i<atlas.maps[mazemap.current_id].exits.length; i++) {
    exit_x = atlas.maps[mazemap.current_id].exits[i].exit_x;
	exit_y = atlas.maps[mazemap.current_id].exits[i].exit_y;
	draw_x = exit_x * MINIMAP_ICON_SIZE + left_x;
	draw_y = exit_y * MINIMAP_ICON_SIZE + top_y;
	minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_EXIT);
  }
  
  // render shops
  for (var i=0; i<atlas.maps[mazemap.current_id].shops.length; i++) {
    exit_x = atlas.maps[mazemap.current_id].shops[i].exit_x;
	exit_y = atlas.maps[mazemap.current_id].shops[i].exit_y;
	draw_x = exit_x * MINIMAP_ICON_SIZE + left_x;
	draw_y = exit_y * MINIMAP_ICON_SIZE + top_y;
	minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_EXIT);
  }
  
  // render avatar cursor
  draw_x = avatar.x * MINIMAP_ICON_SIZE + left_x;
  draw_y = avatar.y * MINIMAP_ICON_SIZE + top_y;
  var cursor_direction;
  if (avatar.facing == "west") cursor_direction = MINIMAP_CURSOR_WEST;
  else if (avatar.facing == "north") cursor_direction = MINIMAP_CURSOR_NORTH;
  else if (avatar.facing == "east") cursor_direction = MINIMAP_CURSOR_EAST;
  else if (avatar.facing == "south") cursor_direction = MINIMAP_CURSOR_SOUTH;
  minimap_render_cursor(draw_x, draw_y, cursor_direction);

}

function minimap_render_icon(screen_x, screen_y, icon_type) {
 
  ctx.drawImage(
    minimap.img,
    icon_type * MINIMAP_ICON_SIZE,
	0,
	MINIMAP_ICON_SIZE,
	MINIMAP_ICON_SIZE,
    screen_x * SCALE,
    screen_y * SCALE,
    MINIMAP_ICON_SIZE * SCALE,
    MINIMAP_ICON_SIZE * SCALE
  );
}

function minimap_render_cursor(screen_x, screen_y, cursor_dir) {
 ctx.drawImage(
    minimap.cursor,
    cursor_dir * MINIMAP_ICON_SIZE,
	0,
	MINIMAP_ICON_SIZE,
    MINIMAP_ICON_SIZE,
    screen_x * SCALE,
    screen_y * SCALE,
    MINIMAP_ICON_SIZE * SCALE,
    MINIMAP_ICON_SIZE * SCALE
  );
}



