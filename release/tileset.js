/**
TileSet class.
  
2013 Clint Bellanger
*/

var tileset = new Object();
tileset.img = new Array();
tileset.walkable = new Array();
tileset.background = new Image();
tileset.render_offset = {x:0, y:0};

// image loader progress
tileset.load_counter = 0;

//---- Properties ---------------------------------------------------

//---- Tiles --------------------------------------------------------

// Each tile has the same layout on the sprite sheet
// tiles 0-12 also represent position 0-12
tileset.draw_area = [
  {"width": 80,  "height": 120, "src_x": 0,   "src_y": 0, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 80,  "src_y": 0, "dest_x": 80, "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 160, "src_y": 0, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 240, "src_y": 0, "dest_x": 80, "dest_y": 0},  
  {"width": 160, "height": 120, "src_x": 320, "src_y": 0, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 480, "src_y": 0, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 560, "src_y": 0, "dest_x": 80, "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 0,   "src_y": 120, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 80,  "src_y": 120, "dest_x": 80, "dest_y": 0},
  {"width": 160, "height": 120, "src_x": 160, "src_y": 120, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 320, "src_y": 120, "dest_x": 0,  "dest_y": 0},
  {"width": 80,  "height": 120, "src_x": 400, "src_y": 120, "dest_x": 80, "dest_y": 0},
  {"width": 160, "height": 120, "src_x": 480, "src_y": 120, "dest_x": 0,  "dest_y": 0}
];

//---- Public Functions ---------------------------------------------

function tileset_init() {

  for (i=1; i<=4; i++) {
    tileset.img[i] = new Image();
  }
  tileset.background = new Image();
  tileset.background.src = "images/backgrounds/nightsky.png";
  tileset.background.onload = function() {tileset_onload();};

  tileset.walkable[0] = false;
  
  tileset.img[1].src = "images/tiles/dungeon_floor.png";
  tileset.img[1].onload = function() {tileset_onload();};
  tileset.walkable[1] = true;
  
  tileset.img[2].src = "images/tiles/dungeon_wall.png";
  tileset.img[2].onload = function() {tileset_onload();};
  tileset.walkable[2] = false;

  tileset.img[3].src = "images/tiles/dungeon_door.png";
  tileset.img[3].onload = function() {tileset_onload();};
  tileset.walkable[3] = false;

  tileset.img[4].src = "images/tiles/pillar_exterior.png";
  tileset.img[4].onload = function() {tileset_onload();};
  tileset.walkable[4] = false;
  
}

function tileset_onload() {
  tileset.load_counter++;
  if (tileset.load_counter == 5) redraw = true;
}

function tileset_background() {
 
  ctx.drawImage(tileset.background,0,0, 640,480);
}

function tileset_render(tile_id, position) {
  
  // 0 reserved for completely empty
  if (tile_id == 0) return;
  
  ctx.drawImage(
    tileset.img[tile_id],
	tileset.draw_area[position].src_x,
	tileset.draw_area[position].src_y,
	tileset.draw_area[position].width,
	tileset.draw_area[position].height,
	(tileset.draw_area[position].dest_x + tileset.render_offset.x) * SCALE,
	(tileset.draw_area[position].dest_y + tileset.render_offset.y) * SCALE,
	tileset.draw_area[position].width * SCALE,
	tileset.draw_area[position].height * SCALE
  );

}


