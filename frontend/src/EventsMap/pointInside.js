
function Point([x, y]) {
  return {
    x,
    y,
  };
}

// Given three colinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
function onSegment(p, q, r)
{
  if (q.x <= Math.max(p.x, r.x)
    && q.x >= Math.min(p.x, r.x)
    && q.y <= Math.max(p.y, r.y)
    && q.y >= Math.min(p.y, r.y)
  ) {
    return true;
  }
  return false;
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
const ORIENTATION = {
  COLINEAR: 0,
  CLOCKWISE: 1,
  COUNTER_CLOCKWISE: 2,
};
function orientation(p, q, r)
{
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return ORIENTATION.COLINEAR;
  return (val > 0) ? ORIENTATION.CLOCKWISE : ORIENTATION.COUNTER_CLOCKWISE;
}

// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
function doIntersect(p1, q1, p2, q2) {
    // Find the four orientations needed for general and
    // special cases
    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);

    // General case
    if (o1 !== o2 && o3 !== o4)
        return true;

    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    if (o1 === 0 && onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are colinear and q2 lies on segment p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    if (o3 === 0 && onSegment(p2, p1, q2)) return true;

     // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true;

    return false;
}


function pointInsideBox(point, box) {
  const { min, max } = box;
  if (point.x < min.x) return false;
  if (point.x > max.x) return false;
  if (point.y < min.y) return false;
  if (point.y > max.y) return false;
  return true;
}

const clamp = (num, a=0, b=1) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
const DEPTH = {
  'Polygon': 1,
  'MultiPolygon': 2,
};
export function pointInside(geoFeature, point, resolution=1.0) {
  const { box, geometry } = geoFeature;

  if (!pointInsideBox(point, box)) return false;

  const { coordinates, type } = geometry;
  const points = coordinates.flat(DEPTH[type]);
  const len = points.length;
  const outside = [0.0, 0.0];
  const step = 1;//Math.round(1.0 / clamp(resolution));
  let intersections = 0;
  for (let i=0;i<len;i=i+step) {
    const p1 = Point(points[i]);
    const q1 = Point(points[(i+1)%len]);
    const p2 = Point(point);
    const q2 = Point(outside);
    if (doIntersect(p1, q1, p2, q2)) {
      ++intersections;
    }
  }
  return Boolean(intersections & 1);
}

export function getBoundingBox(geoFeature) {
  const { geometry } = geoFeature;
  const { coordinates, type } = geometry;
  const points = coordinates.flat(DEPTH[type]);
  let min = Point(points[0]);
  let max = Point(points[0]);
  for (const [x, y] of points) {
    if (x < min.x) {
      min.x = x;
    }
    if (x > max.x) {
      max.x = x;
    }
    if (y < min.y) {
      min.y = y;
    }
    if (y > max.y) {
      max.y = y;
    }
  }
  return { min, max };
}
