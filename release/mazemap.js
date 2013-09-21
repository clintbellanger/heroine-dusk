/**
MazeMap class

MazeMap represents the current active map.
Atlas, another class, is a collection of all the map data.
While Atlas is a static collection, MazeMap can be altered by events.

2013 Clint Bellanger
*/

var mazemap = new Object();
mazemap.current_id = 0;
mazemap.current_song = "";

//---- Public Functions ---------------------------------------------

function mazemap_init() {
  mazemap_set(0);
}

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

// Note: x,y flipped to ease map making
function mazemap_set_tile(pos_x, pos_y, tile_id) {
  if (mazemap_bounds_check(pos_x, pos_y)) {
    mazemap.tiles[pos_y][pos_x] = tile_id;
  }
}

function mazemap_set(map_id) {
  mazemap.tiles = atlas.maps[map_id].tiles;
  mazemap.width = atlas.maps[map_id].width;
  mazemap.height = atlas.maps[map_id].height;
  mazemap.current_id = map_id;

  mapscript_exec(map_id);

  // for save game info
  avatar.map_id = map_id;

  mazemap_set_music(atlas.maps[map_id].music);

}

/**
 * Background music handling
 */
function mazemap_set_music(song_filename) {
  var audio_node = document.getElementById("bgmusic");

  if (OPTIONS.music == false) {
    audio_node.pause();
    mazemap.current_song = "";
    return;
  }
  
  // don't reset song if it's already playing
  if (song_filename == mazemap.current_song) return;

  mazemap.current_song = song_filename;

  var song_path = "music/" + song_filename;
  
  // stop the current song
  audio_node.pause();

  // clear the current song
  audio_node.innerHTML = "";

  // do we need to play ogg or mp3?
  var newsource = document.createElement('source');
  if (audio_node.canPlayType('audio/mpeg;')) {
    newsource.type = "audio/mpeg";
    newsource.src = song_path + ".mp3";
  } else {
    newsource.type = "audio/ogg";
    newsource.src = song_path + ".ogg";
  }
  audio_node.appendChild(newsource);
  audio_node.load();
  audio_node.play();
  
}

/**
 * Each map in the atlas has a list of exits
 * If the avatar is on an exit tile, move them to the new map
 */
function mazemap_check_exit() {
  for (var i=0; i<atlas.maps[mazemap.current_id].exits.length; i++) {

    if ((avatar.x == atlas.maps[mazemap.current_id].exits[i].exit_x) &&
        (avatar.y == atlas.maps[mazemap.current_id].exits[i].exit_y)) {
        
      avatar.x = atlas.maps[mazemap.current_id].exits[i].dest_x;
      avatar.y = atlas.maps[mazemap.current_id].exits[i].dest_y;
      mazemap_set(atlas.maps[mazemap.current_id].exits[i].dest_map);

      return true;
    }  
  }
  return false;
}

function mazemap_check_shop() {
  for (var i=0; i<atlas.maps[mazemap.current_id].shops.length; i++) {

    if ((avatar.x == atlas.maps[mazemap.current_id].shops[i].exit_x) &&
        (avatar.y == atlas.maps[mazemap.current_id].shops[i].exit_y)) {
    
      shop_set(atlas.maps[mazemap.current_id].shops[i].shop_id);

      // put avatar back outside for save purposes
      avatar.x = atlas.maps[mazemap.current_id].shops[i].dest_x;
      avatar.y = atlas.maps[mazemap.current_id].shops[i].dest_y;

      return true;
    }  
  }
  return false;
}

