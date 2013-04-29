/**
Basic input handling.
Use these lines in the init() function to enable:
  window.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener('keyup', handleKeyUp, true);

2013 Clint Bellanger
*/

//---- Key States ---------------------------------------------------

var pressing = new Object();
pressing.up = false;
pressing.down = false;
pressing.left = false;
pressing.right = false;
pressing.action = false;
pressing.mouse = false;

var input_lock = new Object();
input_lock.up = false;
input_lock.down = false;
input_lock.left = false;
input_lock.right = false;
input_lock.action = false;
input_lock.mouse = false;

var mouse_pos = {x:0, y:0};

//---- Key Bindings -------------------------------------------------

var KEYCODE_UP     = 38; // arrow up
var KEYCODE_DOWN   = 40; // arrow down
var KEYCODE_LEFT   = 37; // arrow left
var KEYCODE_RIGHT  = 39; // arrow right
var KEYCODE_ACTION = 32; // space

// secondary
var ALTCODE_UP     = 87; // w
var ALTCODE_DOWN   = 83; // s
var ALTCODE_LEFT   = 65; // a
var ALTCODE_RIGHT  = 68; // d
var ALTCODE_ACTION = 13; // enter

//---- Input Functions ----------------------------------------------

function handleKeyDown(evt) {

  evt.preventDefault();

  if (evt.keyCode == KEYCODE_UP || evt.keyCode == ALTCODE_UP) {
    pressing.up = true;
  }
  else if (evt.keyCode == KEYCODE_DOWN || evt.keyCode == ALTCODE_DOWN) {
    pressing.down = true;
  }
  else if (evt.keyCode == KEYCODE_LEFT || evt.keyCode == ALTCODE_LEFT) {
    pressing.left = true;
  }
  else if (evt.keyCode == KEYCODE_RIGHT || evt.keyCode == ALTCODE_RIGHT) {
    pressing.right = true;
  }
  else if (evt.keyCode == KEYCODE_ACTION || evt.keyCode == ALTCODE_ACTION) {
    pressing.action = true;
  }
  
}

function handleKeyUp(evt) {

  if (evt.keyCode == KEYCODE_UP || evt.keyCode == ALTCODE_UP) {
    pressing.up = false;
	input_lock.up = false;
  }
  else if (evt.keyCode == KEYCODE_DOWN || evt.keyCode == ALTCODE_DOWN) {
    pressing.down = false;
	input_lock.down = false;
  }
  else if (evt.keyCode == KEYCODE_LEFT || evt.keyCode == ALTCODE_LEFT) {
    pressing.left = false;
	input_lock.left = false;
  }
  else if (evt.keyCode == KEYCODE_RIGHT || evt.keyCode == ALTCODE_RIGHT) {
    pressing.right = false;
	input_lock.right = false;
  }
  else if (evt.keyCode == KEYCODE_ACTION || evt.keyCode == ALTCODE_ACTION) {
    pressing.action = false;
	input_lock.action = false;  
  }

}

function handleMouseDown(evt) {
  evt.preventDefault();
  pressing.mouse = true;
  mouse_pos = clickCoord(evt);
}

function handleMouseUp(evt) {
  pressing.mouse = false;
  input_lock.mouse = false;
}

function clickCoord(evt) {

  var canx;
  var cany;
  
  if (evt.pageX || evt.pageY) { 
    canx = evt.pageX;
    cany = evt.pageY;
  }
  else { 
    canx = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    cany = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  } 
  canx -= can.offsetLeft;
  cany -= can.offsetTop;
  
  canx /= SCALE;
  cany /= SCALE;
  
  return {x:canx, y:cany}  
}

/** Touch Handler **/

function handleTouchStart(evt) {
  evt.preventDefault();
  pressing.mouse = true;
  mouse_pos = touchCoord(evt);
}

function handleTouchEnd(evt) {
  pressing.mouse = false;
  input_lock.mouse = false;
}

function touchCoord(evt) {
  var canx = evt.touches[0].pageX;
  var cany = evt.touches[0].pageY;
  
  canx -= can.offsetLeft;
  cany -= can.offsetTop;
  
  canx /= SCALE;
  cany /= SCALE;
  
  return {x:canx, y:cany}  
}
