// click areas reusable by several modules
var clickarea_up = {x:40, y:0, w:80, h:100};
var clickarea_down = {x:40, y:100, w:80, h:20};
var clickarea_left = {x:0, y:20, w:40, h:100};
var clickarea_right = {x:120, y:20, w:40, h:100};
var clickarea_info = {x:140, y:0, w:20, h:20};

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
