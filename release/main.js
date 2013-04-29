// html elements
var can;     // canvas
var ctx;     // context
var FPS = 60;
var SCALE = 1;

// this style of game doesn't update visually often
// set this flag anytime the render function should update the view
var redraw = false;
var init_complete = false;

//---- Main Loop --------------------------------------------------

setInterval(function() {
  if (!init_complete) return;
  logic();
  render();
}, 1000/FPS);

//---- Logic Function ---------------------------------------------

function logic() {
  gamestate_logic();
}

//---- Render Function ---------------------------------------------

function render() {

  // only render if something has changed
  if (!redraw) return;
  redraw = false;
  
  gamestate_render();
}

//---- Init Function -----------------------------------------------

function init() {

  can = document.getElementById("gamecanvas");
  if (can.getContext) {
    ctx = can.getContext("2d");
  }

  resizeCanvas();
	
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.oImageSmoothingEnabled = false;  
  
  if (window.addEventListener) {
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
	window.addEventListener('mousedown', handleMouseDown, true);
	window.addEventListener('mouseup', handleMouseUp, true);
	window.addEventListener('touchstart', handleTouchStart, true);
	window.addEventListener('touchend', handleTouchEnd, true);
	window.addEventListener('resize', resizeCanvas, false);
	window.addEventListener('orientationchange', resizeCanvas, false);
  }
  
  // initialize all game units
  tileset_init();
  mazemap_init();
  info_init();
  minimap_init();
  avatar_init();
  bitfont_init();
  action_init();
  enemy_init();
  combat_init();
  dialog_init();

  init_complete = true;
}

