/**
 Bitamp Font renderer
 Clint Bellanger

Note this class is simplified in several ways:
- Each glyph is the same height (don't need an h var for each glyph)
- The font image has glyphs all in one row (don't need to store the y coord)
- We'll convert all text to uppercase (skip lowercase definitions)
- No word wrap

 */

var JUSTIFY_LEFT = 0;
var JUSTIFY_RIGHT = 1;
var JUSTIFY_CENTER = 2;

var FONT_WHITE = 0;
var FONT_RED = 1;

var bitfont = new Object();

bitfont.img = new Image();
bitfont.imgred = new Image();
bitfont.loaded = false;
bitfont.loadedred = false;
bitfont.color = FONT_WHITE;

bitfont.kerning = -1;
bitfont.height = 8;
bitfont.cursor_x = 0;
bitfont.space = 3;

bitfont.glyph_x = new Array();
bitfont.glyph_w = new Array();

// glyph definitions
bitfont.glyph_x["!"] = 0; bitfont.glyph_w["!"] = 4;
bitfont.glyph_x["\""] = 5; bitfont.glyph_w["\""] = 7;
bitfont.glyph_x["#"] = 13; bitfont.glyph_w["#"] = 9;
bitfont.glyph_x["$"] = 23; bitfont.glyph_w["$"] = 7;
bitfont.glyph_x["%"] = 31; bitfont.glyph_w["%"] = 10;
bitfont.glyph_x["&"] = 42; bitfont.glyph_w["&"] = 9;
bitfont.glyph_x["'"] = 52; bitfont.glyph_w["'"] = 4;
bitfont.glyph_x["("] = 57; bitfont.glyph_w["("] = 5;
bitfont.glyph_x[")"] = 63; bitfont.glyph_w[")"] = 5;
bitfont.glyph_x["*"] = 69; bitfont.glyph_w["*"] = 6;
bitfont.glyph_x["+"] = 76; bitfont.glyph_w["+"] = 8;
bitfont.glyph_x[","] = 85; bitfont.glyph_w[","] = 5;
bitfont.glyph_x["-"] = 91; bitfont.glyph_w["-"] = 6;
bitfont.glyph_x["."] = 98; bitfont.glyph_w["."] = 4;
bitfont.glyph_x["/"] = 103; bitfont.glyph_w["/"] = 6;
bitfont.glyph_x["0"] = 110; bitfont.glyph_w["0"] = 7;
bitfont.glyph_x["1"] = 118; bitfont.glyph_w["1"] = 4;
bitfont.glyph_x["2"] = 123; bitfont.glyph_w["2"] = 7;
bitfont.glyph_x["3"] = 131; bitfont.glyph_w["3"] = 7;
bitfont.glyph_x["4"] = 139; bitfont.glyph_w["4"] = 7;
bitfont.glyph_x["5"] = 147; bitfont.glyph_w["5"] = 7;
bitfont.glyph_x["6"] = 155; bitfont.glyph_w["6"] = 7;
bitfont.glyph_x["7"] = 163; bitfont.glyph_w["7"] = 7;
bitfont.glyph_x["8"] = 171; bitfont.glyph_w["8"] = 7;
bitfont.glyph_x["9"] = 179; bitfont.glyph_w["9"] = 7;
bitfont.glyph_x[":"] = 187; bitfont.glyph_w[":"] = 4;
bitfont.glyph_x[";"] = 192; bitfont.glyph_w[";"] = 4;
bitfont.glyph_x["<"] = 197; bitfont.glyph_w["<"] = 6;
bitfont.glyph_x["="] = 204; bitfont.glyph_w["="] = 6;
bitfont.glyph_x[">"] = 211; bitfont.glyph_w[">"] = 6;
bitfont.glyph_x["?"] = 218; bitfont.glyph_w["?"] = 8;
bitfont.glyph_x["@"] = 227; bitfont.glyph_w["@"] = 8;
bitfont.glyph_x["A"] = 236; bitfont.glyph_w["A"] = 7;
bitfont.glyph_x["B"] = 244; bitfont.glyph_w["B"] = 7;
bitfont.glyph_x["C"] = 252; bitfont.glyph_w["C"] = 7;
bitfont.glyph_x["D"] = 260; bitfont.glyph_w["D"] = 7;
bitfont.glyph_x["E"] = 268; bitfont.glyph_w["E"] = 7;
bitfont.glyph_x["F"] = 276; bitfont.glyph_w["F"] = 7;
bitfont.glyph_x["G"] = 284; bitfont.glyph_w["G"] = 7;
bitfont.glyph_x["H"] = 292; bitfont.glyph_w["H"] = 7;
bitfont.glyph_x["I"] = 300; bitfont.glyph_w["I"] = 4;
bitfont.glyph_x["J"] = 305; bitfont.glyph_w["J"] = 7;
bitfont.glyph_x["K"] = 313; bitfont.glyph_w["K"] = 7;
bitfont.glyph_x["L"] = 321; bitfont.glyph_w["L"] = 7;
bitfont.glyph_x["M"] = 329; bitfont.glyph_w["M"] = 9;
bitfont.glyph_x["N"] = 339; bitfont.glyph_w["N"] = 8;
bitfont.glyph_x["O"] = 348; bitfont.glyph_w["O"] = 7;
bitfont.glyph_x["P"] = 356; bitfont.glyph_w["P"] = 7;
bitfont.glyph_x["Q"] = 364; bitfont.glyph_w["Q"] = 8;
bitfont.glyph_x["R"] = 373; bitfont.glyph_w["R"] = 7;
bitfont.glyph_x["S"] = 381; bitfont.glyph_w["S"] = 7;
bitfont.glyph_x["T"] = 389; bitfont.glyph_w["T"] = 8;
bitfont.glyph_x["U"] = 398; bitfont.glyph_w["U"] = 7;
bitfont.glyph_x["V"] = 406; bitfont.glyph_w["V"] = 7;
bitfont.glyph_x["W"] = 414; bitfont.glyph_w["W"] = 9;
bitfont.glyph_x["X"] = 424; bitfont.glyph_w["X"] = 7;
bitfont.glyph_x["Y"] = 432; bitfont.glyph_w["Y"] = 8;
bitfont.glyph_x["Z"] = 441; bitfont.glyph_w["Z"] = 7;
bitfont.glyph_x["["] = 449; bitfont.glyph_w["["] = 5;
bitfont.glyph_x["\\"] = 455; bitfont.glyph_w["\\"] = 6;
bitfont.glyph_x["]"] = 462; bitfont.glyph_w["]"] = 5;
bitfont.glyph_x["^"] = 468; bitfont.glyph_w["^"] = 8;
bitfont.glyph_x["_"] = 477; bitfont.glyph_w["_"] = 6;
bitfont.glyph_x["`"] = 484; bitfont.glyph_w["`"] = 5;
bitfont.glyph_x["{"] = 490; bitfont.glyph_w["{"] = 5;
bitfont.glyph_x["|"] = 496; bitfont.glyph_w["|"] = 4;
bitfont.glyph_x["}"] = 501; bitfont.glyph_w["}"] = 5;
bitfont.glyph_x["~"] = 507; bitfont.glyph_w["~"] = 9;

function bitfont_init() {
  bitfont.img.src = "images/interface/boxy_bold.png";
  bitfont.img.onload = function() {bitfont_onload();};
  bitfont.imgred.src = "images/interface/boxy_bold_red.png";
  bitfont.imgred.onload = function() {bitfont_onloadred();};
}

function bitfont_onload() {
  bitfont.loaded = true;
}

function bitfont_onloadred() {
  bitfont.loadedred = true;
}

/**
 * Render text left-justified at x,y
 */
function bitfont_render(text, x, y, justify) {

  if (!bitfont.loaded) return;

  var uptext = text.toUpperCase();
  bitfont_setposition(uptext, x, justify);

  for (var i=0; i < uptext.length; i++) {
    bitfont_renderglyph(uptext.charAt(i), y);
  }

}

/**
 * Sets the starting position for rendering text
 * based on the justify option
 */
function bitfont_setposition(text, x, justify) {
  if (justify == JUSTIFY_LEFT) {
    bitfont.cursor_x = x;
  }
  else if (justify == JUSTIFY_RIGHT) {
    bitfont.cursor_x = x - bitfont_calcwidth(text);
  }
  else if (justify == JUSTIFY_CENTER) {
    bitfont.cursor_x = x - (bitfont_calcwidth(text)/2);
  }
}

function bitfont_setcolor(color_id) {
  bitfont.color = color_id;
}

/**
 * Note: contains logic specific to Heroine Dusk
 */
function bitfont_determinecolor() {
  if (!init_complete) bitfont_setcolor(FONT_WHITE);
  else if (!bitfont.loadedred) bitfont_setcolor(FONT_WHITE);
  else if (avatar_badly_hurt()) bitfont_setcolor(FONT_RED);
  else bitfont_setcolor(FONT_WHITE);
}

/**
 * Calculate the total width of a string
 * Useful for center or right justify
 */
function bitfont_calcwidth(text) {
  var total_width = 0;
  var character;

  for (var i=0; i < text.length; i++) {
    character = text.charAt(i);
    if (character == " ") {
      total_width += bitfont.space;
    }
    else {
      total_width += bitfont.glyph_w[character] + bitfont.kerning;
    }
  }
  return total_width - bitfont.kerning;
}

/**
 * Internal function
 * Render glyph at cursor_x, y
 */
function bitfont_renderglyph(character, y) {

  var font_color;
  if (bitfont.color == FONT_WHITE) font_color = bitfont.img;
  else if (bitfont.color == FONT_RED) font_color = bitfont.imgred;

  if (character == " ") {
    bitfont.cursor_x += bitfont.space;
  }
  else {

    ctx.drawImage(
      font_color,
      bitfont.glyph_x[character] * PRESCALE,
      0,
      bitfont.glyph_w[character] * PRESCALE,
      bitfont.height * PRESCALE,
      bitfont.cursor_x * SCALE,
      y * SCALE,
      bitfont.glyph_w[character] * SCALE,
      bitfont.height * SCALE
    );

    bitfont.cursor_x += bitfont.glyph_w[character] + bitfont.kerning;
  }

}

