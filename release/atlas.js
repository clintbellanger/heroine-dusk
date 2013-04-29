/**
 Atlas.js
 Collection of maps and transition data
 */

var MAP_COUNT = 11;

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
  [2,17,2],
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
atlas.maps[1].enemies = [ENEMY_SHADOW_TENDRILS, ENEMY_IMP];

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
  [ 0, 0, 0,12,10,11,12,12,12,12, 1, 6,12,12],
  [ 0, 0, 0, 0,12,12,12,12,12, 6, 1, 6,12,12],
  [ 0, 0, 0, 0, 0, 0, 0,12,12, 2, 3, 2,12,12]
];
atlas.maps[4].exits[0] = {exit_x:6, exit_y:1, dest_map:1, dest_x:4, dest_y:9};
atlas.maps[4].exits[1] = {exit_x:10, exit_y:15, dest_map:5, dest_x:3, dest_y:1};
atlas.maps[4].enemies = [ENEMY_SHADOW_TENDRILS, ENEMY_IMP, ENEMY_SHADOW_SOUL];
atlas.maps[4].shops[0] = {exit_x:5, exit_y:13, shop_id:4, dest_x:5, dest_y:12};

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
atlas.maps[5].exits[1] = {exit_x:9, exit_y:11, dest_map:6, dest_x:4, dest_y:3};
atlas.maps[5].shops[0] = {exit_x:6, exit_y:4, shop_id:0, dest_x:6, dest_y:5};
atlas.maps[5].shops[1] = {exit_x:6, exit_y:8, shop_id:1, dest_x:6, dest_y:7};
atlas.maps[5].shops[2] = {exit_x:8, exit_y:8, shop_id:2, dest_x:9, dest_y:8};
atlas.maps[5].shops[3] = {exit_x:1, exit_y:8, shop_id:3, dest_x:2, dest_y:8};

atlas.maps[6].name = "Zuruth Plains";
atlas.maps[6].width = 16;
atlas.maps[6].height = 16;
atlas.maps[6].background = 2;
atlas.maps[6].tiles = [
  [ 0, 0, 0, 0, 0, 0, 2,12,12,12,12,12,12,15,15,15],
  [ 0, 0, 0, 0, 0, 0, 2,12,12,12,12,12,12,15,15,15],
  [ 2, 2, 2, 2, 3, 2, 2, 6, 6, 6, 6, 6, 6,15,15,15],
  [12,12,12, 6, 1, 6, 6, 6, 7, 5, 7, 6, 6,15,15,15],
  [12,12, 6, 6, 1, 6,12, 6, 5, 8, 5, 6, 6,15,15,15],
  [12,12, 6,12, 1, 6, 6, 6, 7, 5, 7, 6, 6,15,15,15],
  [12,12, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 4,15,15,15],
  [12,12, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [12,12,12, 6, 6, 6, 6, 6, 1, 6, 6, 6, 4,15,15,15],
  [12,12, 6, 6, 6, 6,12, 6, 1, 6,12, 6, 6,15,15,15],
  [12,12, 6, 6, 6,12, 6, 6, 1, 6, 6, 6, 6,15,15,15],
  [12,12,12, 6, 6, 6, 6,12, 1, 6, 6, 6,12,15,15,15],
  [12,12, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6,15,15,15],
  [12, 7, 5, 7, 5, 7, 5, 7, 5, 7, 5, 7, 6, 4,15, 4],  
  [12, 2, 5, 5, 5, 2, 5, 5, 5, 5, 5, 2, 6,15, 9,15],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2]
];
atlas.maps[6].exits[0] = {exit_x:4, exit_y:2, dest_map:5, dest_x:9, dest_y:10};
atlas.maps[6].exits[1] = {exit_x:14, exit_y:7, dest_map:7, dest_x:2, dest_y:5};
atlas.maps[6].exits[2] = {exit_x:8, exit_y:15, dest_map:10, dest_x:2, dest_y:1};
atlas.maps[6].enemies = [ENEMY_IMP, ENEMY_SHADOW_SOUL, ENEMY_ZOMBIE];

atlas.maps[7].name = "Canal Boneyard";
atlas.maps[7].width = 15;
atlas.maps[7].height = 11;
atlas.maps[7].background = 2;
atlas.maps[7].tiles = [
  [ 0,15,15,15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [ 0,15,15,15,12, 6, 6, 6, 6, 6,14,14,13,14, 2],
  [ 0,15,15,15,13, 6,14, 1,14, 6,13,13,14,13, 2],
  [ 6,15,15,15, 6, 6,14, 1,13, 6, 6, 6, 6, 6, 2],
  [ 4,15,15,15, 4, 6,13, 1,14, 6, 2, 2, 2, 5, 2],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2, 8, 2],
  [ 4,15,15,15, 4, 6,14, 1,13, 6, 2, 2, 2, 5, 2],
  [ 6,15,15,15, 6, 6,13, 1,14, 6, 6, 6, 6, 6, 2],
  [ 0,15,15,15,13, 6,14, 1,13, 6,14,13,13,14, 2],
  [ 0,15,15,15,12, 6, 6, 6, 6, 6,14,13,14,13, 2],
  [ 0,15,15,15, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]  
];
atlas.maps[7].exits[0] = {exit_x:1, exit_y:5, dest_map:6, dest_x:13, dest_y:7};
atlas.maps[7].exits[1] = {exit_x:10, exit_y:5, dest_map:8, dest_x:1, dest_y:7};
atlas.maps[7].enemies = [ENEMY_SHADOW_SOUL, ENEMY_ZOMBIE, ENEMY_SKELETON];

atlas.maps[8].name = "Mausoleum";
atlas.maps[8].width = 16;
atlas.maps[8].height = 15;
atlas.maps[8].background = 2;
atlas.maps[8].tiles = [
  [ 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [ 0, 0, 2, 2, 2, 7, 5, 5, 5, 5, 5, 5, 7, 0, 0, 2],
  [ 0, 0, 2, 8,16, 5, 5, 5, 0, 0, 5, 5, 5, 5, 0, 2],
  [ 0, 0, 2, 2, 2, 2, 2, 5, 2, 2, 5, 2, 2, 5, 2, 2],
  [ 0, 0, 0, 0, 0, 2, 2, 5, 2, 2, 5, 2, 7, 5, 2, 0],
  [ 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5,16, 2, 5, 2, 0],
  [ 2, 5, 7, 5, 2, 2, 5, 6, 6, 6, 6, 5, 2, 5, 7, 2],
  [ 3, 5, 5, 5,16, 5, 5, 6, 6, 6, 6, 5, 5,16, 5, 3],
  [ 2, 5, 7, 5, 2, 2, 5, 6, 6, 6, 6, 5, 2, 5, 7, 2],
  [ 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5,17, 2, 5, 2, 0],
  [ 0, 0, 0, 0, 0, 2, 2, 5, 2, 2, 5, 2, 7, 5, 2, 0],
  [ 0, 0, 2, 2, 2, 2, 2, 5, 2, 2, 5, 2, 2, 5, 2, 2],
  [ 0, 0, 2, 8,18, 5, 5, 5, 0, 0, 5, 5, 5, 5, 0, 2],
  [ 0, 0, 2, 2, 2, 7, 5, 5, 5, 5, 5, 5, 7, 0, 0, 2],
  [ 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];
atlas.maps[8].exits[0] = {exit_x:0, exit_y:7, dest_map:7, dest_x:9, dest_y:5};
atlas.maps[8].exits[1] = {exit_x:15, exit_y:7, dest_map:9, dest_x:1, dest_y:5};
atlas.maps[8].enemies = [ENEMY_ZOMBIE, ENEMY_SKELETON, ENEMY_DRUID];

atlas.maps[9].name = "Dead Walkways";
atlas.maps[9].width = 13;
atlas.maps[9].height = 10;
atlas.maps[9].background = 2;
atlas.maps[9].tiles = [
  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
  [ 0, 4, 0, 0, 4, 0, 1, 5,16, 1, 0, 4, 0],
  [ 0, 0, 0, 1, 0, 0, 1, 2, 2, 1, 0, 0, 0],
  [ 2, 0, 0, 1, 2, 2, 1, 0, 0, 1,13,14,13],
  [ 3, 1, 1, 1, 5,16, 1, 0, 0, 1, 6, 6,14],
  [ 2, 0, 0, 1, 2, 2, 1, 0, 0, 1,14,13,14],
  [ 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [ 0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 0],
  [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];
atlas.maps[9].exits[0] = {exit_x:0, exit_y:5, dest_map:8, dest_x:14, dest_y:7};
atlas.maps[9].enemies = [ENEMY_ZOMBIE, ENEMY_SKELETON, ENEMY_DRUID];

atlas.maps[10].name = "Trade Tunnel";
atlas.maps[10].width = 16;
atlas.maps[10].height = 16;
atlas.maps[10].background = 2;
atlas.maps[10].tiles = [
  [ 2, 2, 3, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
  [ 2, 5, 5, 5, 2, 5, 5, 5, 2, 0, 2, 2, 2, 2, 2, 0],
  [ 2, 5, 5, 5,16, 5,15, 5, 2, 0, 2, 8, 2, 8, 2, 0],
  [ 2, 5, 5, 5, 2, 5,15, 5, 2, 2, 2,18, 2,18, 2, 0],
  [ 2, 2,16, 2, 2, 5, 1, 5, 5, 5, 5, 5, 5, 5, 2, 0],
  [ 2, 5, 5, 5, 2, 5,15, 5, 2, 2, 2, 2, 2, 2, 2, 0],
  [ 2, 5, 5, 5, 2, 5,15, 5, 2, 0, 0, 0, 0, 0, 0, 0],
  [ 2, 5, 5, 5, 2, 5, 1, 5, 2, 0, 0, 2, 2, 3, 2, 2],
  [ 2, 2, 5, 5, 2, 5,15, 5, 2, 0, 0, 2, 5, 5, 5, 2],
  [ 2, 5, 5, 5, 2, 5,15, 5, 2, 0, 0, 3, 5, 5, 5, 2],
  [ 2, 5, 5, 5, 5, 5, 1, 5, 2, 0, 0, 2, 5, 5, 5, 2],
  [ 2, 5, 5, 5, 2, 5,15, 5, 2, 2, 2, 2, 2, 5, 2, 2],
  [ 2, 2, 5, 2, 2, 5,15, 5, 5, 5, 5, 5, 5, 5, 5, 2],
  [ 0, 2, 5, 2, 2, 5,15,15, 1,15,15, 1,15,15, 5, 2],
  [ 0, 2, 5, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2],
  [ 0, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
atlas.maps[10].exits[0] = {exit_x:2, exit_y:0, dest_map:6, dest_x:8, dest_y:14};
atlas.maps[10].enemies = [ENEMY_ZOMBIE, ENEMY_SKELETON, ENEMY_DRUID];
atlas.maps[10].shops[0] = {exit_x:2, exit_y:15, shop_id:5, dest_x:2, dest_y:14};
atlas.maps[10].shops[1] = {exit_x:11, exit_y:9, shop_id:6, dest_x:12, dest_y:9};
atlas.maps[10].shops[2] = {exit_x:13, exit_y:7, shop_id:7, dest_x:13, dest_y:8};

