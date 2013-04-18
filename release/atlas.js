/**
 Atlas.js
 Collection of maps and transition data
 */

var MAP_COUNT = 2;

var atlas = new Object();
atlas.maps = new Array();

for (var i=0; i<MAP_COUNT; i++) {
  atlas.maps[i] = new Object();
  atlas.maps[i].exits = new Array();
}

// demo area
atlas.maps[0].name = "Gar'ashi Monastery";
atlas.maps[0].width = 10;
atlas.maps[0].height = 10;
atlas.maps[0].tiles = [
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
atlas.maps[0].exits[0] = {exit_x:2, exit_y:0, dest_map:1, dest_x:1, dest_y:6};

// test 2 area
atlas.maps[1].name = "Test Hallway";
atlas.maps[1].width = 3;
atlas.maps[1].height = 8;
atlas.maps[1].tiles = [
  [2,2,2],
  [2,1,2],
  [2,1,2],
  [2,1,2],
  [2,1,2],
  [2,1,2],
  [2,1,2],  
  [2,3,2],
];
atlas.maps[1].exits[0] = {exit_x:1, exit_y:7, dest_map:0, dest_x:2, dest_y:1};


