/**
TileSet class.
  
2013 Clint Bellanger
*/

var TILE_COUNT = 5;
var BACKGROUND_COUNT = 2;

var tileset = new Object();
tileset.tile_img = new Array();
tileset.background_img = new Array();

tileset.walkable = new Array();
tileset.background = new Image();
tileset.render_offset = {x:0, y:0};

// notice we skip 0 which means "no tile"
for (i=1; i<=TILE_COUNT; i++) {
  tileset.tile_img[i] = new Image();
}

for (i=0; i<BACKGROUND_COUNT; i++) {
  tileset.background_img[i] = new Image();
}

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

  // load background images
  tileset.background_img[0].src = "images/backgrounds/black.png";
  tileset.background_img[0].onload = function() {tileset_onload();};
  
  tileset.background_img[1].src = "images/backgrounds/nightsky.png";
  tileset.background_img[1].onload = function() {tileset_onload();};

  tileset.walkable[0] = false;
  
  // load tile images
  tileset.tile_img[1].src = "images/tiles/dungeon_floor.png";
  tileset.tile_img[1].onload = function() {tileset_onload();};
  tileset.walkable[1] = true;
  
  tileset.tile_img[2].src = "images/tiles/dungeon_wall.png";
  tileset.tile_img[2].onload = function() {tileset_onload();};
  tileset.walkable[2] = false;

  tileset.tile_img[3].src = "images/tiles/dungeon_door.png";
  tileset.tile_img[3].onload = function() {tileset_onload();};
  tileset.walkable[3] = true;

  tileset.tile_img[4].src = "images/tiles/pillar_exterior.png";
  tileset.tile_img[4].onload = function() {tileset_onload();};
  tileset.walkable[4] = false;
  
  tileset.tile_img[5].src = "images/tiles/dungeon_ceiling.png";
  tileset.tile_img[5].onload = function() {tileset_onload();};
  tileset.walkable[5] = true;
  
}

function tileset_onload() {
  tileset.load_counter++;
  if (tileset.load_counter == (TILE_COUNT + BACKGROUND_COUNT)) redraw = true;
}

function tileset_background() {
  ctx.drawImage(tileset.background_img[atlas.maps[mazemap.current_id].background],0,0, 640,480);
}

function tileset_render(tile_id, position) {
  
  // 0 reserved for completely empty
  if (tile_id == 0) return;
  
  ctx.drawImage(
    tileset.tile_img[tile_id],
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


