/**
 Atlas.js
 Collection of maps and transition data
 */

var MAP_COUNT = 6;

var atlas = new Object();
atlas.maps = new Array();

for (var i=0; i<MAP_COUNT; i++) {
  atlas.maps[i] = new Object();
  atlas.maps[i].exits = new Array();
  atlas.maps[i].enemies = new Array();
  atlas.maps[i].shops = new Array();
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
  [2,3,1,1,1,1,1,3,2],
  [2,2,6,4,1,4,6,2,2],
  [2,6,6,1,1,1,6,6,2],
  [2,6,6,4,1,4,6,6,2],
  [2,2,2,2,3,2,2,2,2]
];
atlas.maps[1].exits[0] = {exit_x:7, exit_y:6, dest_map:0, dest_x:1, dest_y:2};
atlas.maps[1].exits[1] = {exit_x:1, exit_y:6, dest_map:2, dest_x:1, dest_y:2};
atlas.maps[1].exits[2] = {exit_x:4, exit_y:0, dest_map:3, dest_x:2, dest_y:4};
atlas.maps[1].exits[3] = {exit_x:4, exit_y:10, dest_map:4, dest_x:6, dest_y:2};
atlas.maps[1].enemies = [ENEMY_SHADOW_TENDRILS, ENEMY_SKELETON];

atlas.maps[2].name = "Monk Quarters";
atlas.maps[2].width = 3;
atlas.maps[2].height = 4;
atlas.maps[2].background = 0;
atlas.maps[2].tiles = [
  [2,2,2],
  [2,8,2],
  [2,5,3],
  [2,2,2]
];
atlas.maps[2].exits[0] = {exit_x:2, exit_y:2, dest_map:1, dest_x:2, dest_y:6};

atlas.maps[3].name = "Meditation Point";
atlas.maps[3].width = 5;
atlas.maps[3].height = 6;
atlas.maps[3].background = 2;
atlas.maps[3].tiles = [
  [0,0,0,0,0],
  [0,0,9,0,0],
  [0,7,5,7,0],
  [0,5,5,5,0],
  [0,7,5,7,0],
  [2,2,3,2,2]
];
atlas.maps[3].exits[0] = {exit_x:2, exit_y:5, dest_map:1, dest_x:4, dest_y:1};

atlas.maps[4].name = "Monastery Trail";
atlas.maps[4].width = 14;
atlas.maps[4].height = 16;
atlas.maps[4].background = 1;
atlas.maps[4].tiles = [
  [ 0,12,12, 2, 0, 0, 0, 0, 0, 2,12, 0, 0, 0],
  [12,12,12, 2, 2, 2, 3, 2, 2, 2,12, 0, 0, 0],
  [12,12, 9, 6,12, 6, 1, 6, 6,12,12,12, 0, 0],
  [12,12,12, 6, 6, 6, 1,12, 6, 6,12,12, 0, 0],
  [ 0,12,12,12,12, 6, 1, 6, 6,12,12,12, 0, 0],
  [ 0, 0,12,12,12,12, 6, 6,12,12,12,12, 0, 0],
  [ 0, 0, 0,12,12, 6, 6, 6, 6,12,12,12,12, 0],
  [ 0, 0,12,12,12, 6, 6,12, 6, 6, 6,12,12, 0],
  [ 0,12,12,12, 6, 6,12,12,12, 6,12,12,12, 0],
  [ 0,12,12, 6, 6, 6,12,12, 6, 6, 6,12,12, 0],
  [ 0,12,12,12, 6, 6, 6, 6, 6, 6,12,12,12, 0],
  [ 0, 0,12,12, 6, 6, 6,12, 6, 6, 6,12,12,12],
  [ 0, 0,12,12,12, 6,12,12,12, 6, 1, 6,12,12],
  [ 0, 0, 0,12,10,10,12,12,12,12, 1, 6,12,12],
  [ 0, 0, 0, 0,12,12,12,12,12, 6, 1, 6,12,12],
  [ 0, 0, 0, 0, 0, 0, 0,12,12, 2, 3, 2,12,12]
];
atlas.maps[4].exits[0] = {exit_x:6, exit_y:1, dest_map:1, dest_x:4, dest_y:9};
atlas.maps[4].exits[1] = {exit_x:10, exit_y:15, dest_map:5, dest_x:3, dest_y:1};
atlas.maps[4].enemies = [ENEMY_SHADOW_TENDRILS, ENEMY_SKELETON, ENEMY_SHADOW_SOUL];

atlas.maps[5].name = "Cedar Village";
atlas.maps[5].width = 12;
atlas.maps[5].height = 12;
atlas.maps[5].background = 1;
atlas.maps[5].tiles = [
  [ 2, 2, 2, 3, 2, 2, 2, 2, 0, 0, 0, 0],
  [ 2, 6,12, 1,12, 6, 6, 2, 0, 0, 0, 0],
  [ 2, 6, 6, 1, 6, 6,12, 2, 0, 0, 0, 0],  
  [ 2,12, 6, 1, 6,10,10, 2, 2, 2, 2, 2],
  [ 2,10,10, 1,10,10,11,10,10, 1,10, 2],
  [ 2,10,10, 1,10, 1, 1, 1,10, 1,10, 2],
  [ 2, 1, 1, 1, 1, 1,12, 1, 1, 1, 1, 2],
  [ 2,10, 6,10,10, 1, 1, 1,10, 1,10, 2],
  [ 2,11, 6,10,10,10,11,10,11, 1,10, 2],
  [ 2,10, 6,10,10,10,10,10,10, 1, 6, 2],
  [ 2,12, 6, 6, 6, 6, 6, 9,12, 1,12, 2],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2],  
];
atlas.maps[5].exits[0] = {exit_x:3, exit_y:0, dest_map:4, dest_x:10, dest_y:14};
atlas.maps[5].shops[0] = {exit_x:6, exit_y:4, shop_id:0, dest_x:6, dest_y:5};
atlas.maps[5].shops[1] = {exit_x:6, exit_y:8, shop_id:1, dest_x:6, dest_y:7};
atlas.maps[5].shops[2] = {exit_x:8, exit_y:8, shop_id:2, dest_x:9, dest_y:8};
atlas.maps[5].shops[3] = {exit_x:1, exit_y:8, shop_id:3, dest_x:2, dest_y:8};



