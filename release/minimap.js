/**
 * Minimap
 * Shown in the Info screen
 */

var MINIMAP_ICON_SIZE = 3; // pixels
 
var MINIMAP_ICON_NONWALKABLE = 0;
var MINIMAP_ICON_WALKABLE = 1;
var MINIMAP_ICON_HEROINE = 2;

var MINIMAP_CENTER_X = 30;
var MINIMAP_CENTER_Y = 70;

var minimap = new Object();

minimap.img = new Image();
minimap.img_loaded = false;



function minimap_init() {

  minimap.img.src = "images/interface/minimap.png";
  minimap.img.onload = function() {minimap_onload();};
  
}

function minimap_onload() {
  minimap.img_loaded = true;
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
	
	  if (avatar.x == i && avatar.y == j) {
	    minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_HEROINE);
	  }
	  else {
	    target_tile = mazemap_get_tile(i,j);
        if (tileset.walkable[target_tile]) {	  
	       minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_WALKABLE);
	    }
		else if (target_tile != 0) {
		  minimap_render_icon(draw_x, draw_y, MINIMAP_ICON_NONWALKABLE);
		}		
	  }	  
	}
  }
  
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


