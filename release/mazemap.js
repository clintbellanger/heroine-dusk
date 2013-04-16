/**
MazeMap class

2013 Clint Bellanger
*/

var mazemap = new Object();

//---- Properties ---------------------------------------------------

mazemap.width = 10;
mazemap.height = 10;

mazemap.tiles = [
  [2,2,3,2,2,2,2,2,2,2],
  [2,1,1,2,1,1,4,1,1,2],
  [2,1,1,2,1,1,1,1,1,2],
  [2,1,2,2,1,1,4,1,1,2],
  [2,1,2,1,1,1,4,1,1,2],
  [2,1,2,1,2,2,4,1,1,2],
  [2,1,1,1,2,1,1,1,1,2],
  [2,1,2,2,3,1,2,1,2,2],
  [2,1,1,1,2,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2]
];


//---- Public Functions ---------------------------------------------

/**

The visibility cone is shaped like this:
 
.........
..VVVVV..
..VVVVV..
...V@V...
.........

Drawing is done in this order (a=10, b=11, c=12)

.........
..02431..
..57986..
...acb...
.........

*/ 
function mazemap_render(x, y, facing) {

  if (facing == "north") {
    // back row
	mazemap_render_tile(x-2,y-2,0);
	mazemap_render_tile(x+2,y-2,1);
	mazemap_render_tile(x-1,y-2,2);
	mazemap_render_tile(x+1,y-2,3);
	mazemap_render_tile(x,  y-2,4);
    // middle row
	mazemap_render_tile(x-2,y-1,5);
	mazemap_render_tile(x+2,y-1,6);
	mazemap_render_tile(x-1,y-1,7);
	mazemap_render_tile(x+1,y-1,8);
	mazemap_render_tile(x,  y-1,9);
	// front row
	mazemap_render_tile(x-1,y, 10);
	mazemap_render_tile(x+1,y, 11);
	mazemap_render_tile(x,  y, 12);
  }
  else if (facing == "south") {
    // back row
	mazemap_render_tile(x+2,y+2,0);
	mazemap_render_tile(x-2,y+2,1);
	mazemap_render_tile(x+1,y+2,2);
	mazemap_render_tile(x-1,y+2,3);
	mazemap_render_tile(x,y+2,4);
    // middle row
	mazemap_render_tile(x+2,y+1,5);
	mazemap_render_tile(x-2,y+1,6);
	mazemap_render_tile(x+1,y+1,7);
	mazemap_render_tile(x-1,y+1,8);
	mazemap_render_tile(x,y+1,9);
	// front row
	mazemap_render_tile(x+1,y,10);
	mazemap_render_tile(x-1,y,11);
	mazemap_render_tile(x,y,12);  
  }
  else if (facing == "west") {
    // back row
	mazemap_render_tile(x-2,y+2,0);
	mazemap_render_tile(x-2,y-2,1);
	mazemap_render_tile(x-2,y+1,2);
	mazemap_render_tile(x-2,y-1,3);
	mazemap_render_tile(x-2,y,4);
    // middle row
	mazemap_render_tile(x-1,y+2,5);
	mazemap_render_tile(x-1,y-2,6);
	mazemap_render_tile(x-1,y+1,7);
	mazemap_render_tile(x-1,y-1,8);
	mazemap_render_tile(x-1,y,9);
	// front row
	mazemap_render_tile(x,y+1,10);
	mazemap_render_tile(x,y-1,11);
	mazemap_render_tile(x,y,12);    
  }
  else if (facing == "east") {
    // back row
	mazemap_render_tile(x+2,y-2,0);
	mazemap_render_tile(x+2,y+2,1);
	mazemap_render_tile(x+2,y-1,2);
	mazemap_render_tile(x+2,y+1,3);
	mazemap_render_tile(x+2,y,4);
    // middle row
	mazemap_render_tile(x+1,y-2,5);
	mazemap_render_tile(x+1,y+2,6);
	mazemap_render_tile(x+1,y-1,7);
	mazemap_render_tile(x+1,y+1,8);
	mazemap_render_tile(x+1,y,9);
	// front row
	mazemap_render_tile(x,y-1,10);
	mazemap_render_tile(x,y+1,11);
	mazemap_render_tile(x,y,12);      
  }
  
}

function mazemap_bounds_check(pos_x, pos_y) {
  if (pos_x >= 0 && pos_y >= 0 && pos_x < mazemap.width && pos_y < mazemap.height) {
    return true;  
  }
  return false;
}

// Note: x,y flipped to ease map making
function mazemap_render_tile(pos_x, pos_y, position) {
  if (mazemap_bounds_check(pos_x, pos_y)) {
    tileset_render(mazemap.tiles[pos_y][pos_x], position);
  }
}

// Note: x,y flipped to ease map making
function mazemap_get_tile(pos_x, pos_y) {

  if (mazemap_bounds_check(pos_x, pos_y)) {
    return mazemap.tiles[pos_y][pos_x];
  }
  else return 0;
}
