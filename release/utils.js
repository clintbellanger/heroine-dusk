// click areas reusable by several modules
var clickarea_up = {x:40, y:0, w:80, h:100};
var clickarea_down = {x:40, y:100, w:80, h:20};
var clickarea_left = {x:0, y:20, w:40, h:100};
var clickarea_right = {x:120, y:20, w:40, h:100};

/**
 * Given a point with x,y and a rect with x,y,w,h
 * Determine if the point is within the rect
 */
function isWithin(point, rect) {
  if (point.x < rect.x) return false;
  if (point.y < rect.y) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}


/**
 * Generic cookie writer
 * Based on http://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(c_name, value, exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

/**
 * Generic cookie reader
 * Based on http://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(c_name)
{
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  }
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start,c_end));
  }
  return c_value;
}

