/**
 Atlas.js
 Collection of maps and transition data
 */

var MAP_COUNT = 4;

var atlas = new Object();
atlas.maps = new Array();

for (var i=0; i<MAP_COUNT; i++) {
  atlas.maps[i] = new Object();
  atlas.maps[i].exits = new Array();
}

atlas.maps[0].name = "Serf Quarters";
atlas.maps[0].width = 3;
atlas.maps[0].height = 4;
atlas.maps[0].background = 0;
atlas.maps[0].tiles = [
  [2,2,2],
  [2,5,2],
  [3,5,2],
  [2,2,2]
];
atlas.maps[0].exits[0] = {exit_x:0, exit_y:2, dest_map:1, dest_x:6, dest_y:6};

atlas.maps[1].name = "Gar'ashi Monastery";
atlas.maps[1].width = 9;
atlas.maps[1].height = 11;
atlas.maps[1].background = 1;
atlas.maps[1].tiles = [
  [0,0,2,2,3,2,2,0,0],
  [0,0,2,4,1,4,2,0,0],
  [2,2,2,1,1,1,2,2,2],
  [2,6,6,4,1,4,6,6,2],
  [2,6,6,1,1,1,6,6,2],
  [2,2,6,4,1,4,6,2,2],
  [2,3,6,1,1,1,6,3,2],
  [2,2,6,4,1,4,6,2,2],
  [2,6,6,1,1,1,6,6,2],
  [2,6,6,4,1,4,6,6,2],
  [2,2,2,2,3,2,2,2,2]
];
atlas.maps[1].exits[0] = {exit_x:7, exit_y:6, dest_map:0, dest_x:1, dest_y:2};
atlas.maps[1].exits[1] = {exit_x:1, exit_y:6, dest_map:2, dest_x:1, dest_y:2};
atlas.maps[1].exits[2] = {exit_x:4, exit_y:0, dest_map:3, dest_x:2, dest_y:4};

atlas.maps[2].name = "Monk Quarters";
atlas.maps[2].width = 3;
atlas.maps[2].height = 4;
atlas.maps[2].background = 0;
atlas.maps[2].tiles = [
  [2,2,2],
  [2,5,2],
  [2,5,3],
  [2,2,2]
];
atlas.maps[2].exits[0] = {exit_x:2, exit_y:2, dest_map:1, dest_x:2, dest_y:6};

atlas.maps[3].name = "Meditation Hall";
atlas.maps[3].width = 5;
atlas.maps[3].height = 6;
atlas.maps[3].background = 0;
atlas.maps[3].tiles = [
  [2,2,2,2,2],
  [2,2,5,2,2],
  [2,7,5,7,2],
  [2,5,5,5,2],
  [2,7,5,7,2],  
  [2,2,3,2,2]
];
atlas.maps[3].exits[0] = {exit_x:2, exit_y:5, dest_map:1, dest_x:4, dest_y:1};
