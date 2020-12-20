
export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  intersects(line) {
    let d1, d2;
    let a1, a2, b1, b2, c1, c2;

    // Convert vector 1 to a line (line 1) of infinite length.
    // We want the line in linear equation standard form: A*x + B*y + C = 0
    // See: http://en.wikipedia.org/wiki/Linear_equation
    a1 = this.p2.y - this.p1.y;
    b1 = this.p1.x - this.p2.x;
    c1 = (this.p2.x * this.p1.y) - (this.p1.x * this.p2.y);

    // Every point (x,y), that solves the equation above, is on the line,
    // every point that does not solve it, is not. The equation will have a
    // positive result if it is on one side of the line and a negative one
    // if is on the other side of it. We insert (x1,y1) and (x2,y2) of vector
    // 2 into the equation above.
    d1 = (a1 * line.p1.x) + (b1 * line.p1.y) + c1;
    d2 = (a1 * line.p2.x) + (b1 * line.p2.y) + c1;

    // If d1 and d2 both have the same sign, they are both on the same side
    // of our line 1 and in that case no intersection is possible. Careful,
    // 0 is a special case, that's why we don't test ">=" and "<=",
    // but "<" and ">".
    if (d1 > 0 && d2 > 0) return false;
    if (d1 < 0 && d2 < 0) return false;

    // The fact that vector 2 intersected the infinite line 1 above doesn't
    // mean it also intersects the vector 1. Vector 1 is only a subset of that
    // infinite line 1, so it may have intersected that line before the vector
    // started or after it ended. To know for sure, we have to repeat the
    // the same test the other way round. We start by calculating the
    // infinite line 2 in linear equation standard form.
    a2 = line.p2.y - line.p1.y;
    b2 = line.p1.x - line.p2.x;
    c2 = (line.p2.x * line.p1.y) - (line.p1.x * line.p2.y);

    // Calculate d1 and d2 again, this time using points of vector 1.
    d1 = (a2 * this.p1.x) + (b2 * this.p1.y) + c2;
    d2 = (a2 * this.p2.x) + (b2 * this.p2.y) + c2;

    // Again, if both have the same sign (and neither one is 0),
    // no intersection is possible.
    if (d1 > 0 && d2 > 0) return false;
    if (d1 < 0 && d2 < 0) return false;

    // If we get here, only two possibilities are left. Either the two
    // vectors intersect in exactly one point or they are collinear, which
    // means they intersect in any number of points from zero to infinite.
    if ((a1 * b2) - (a2 * b1) == 0.0) return false;

    return true;
  }
}

class Rect {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  inside(point) {
    const { x, y } = point;
    if (x < this.min.x) return false;
    if (x > this.max.x) return false;
    if (y < this.min.y) return false;
    if (y > this.max.y) return false;
    return true;
  }
}

export class Polygon {
  constructor(points) {
    this.points = points;
    this.bounds = Polygon.getBounds(points);
  }

  static getBounds(points) {
    const bounds = new Rect(
      new Point(),
      new Point(),
    );
    for (const point of points) {
      if (!bounds.min.x) {
        bounds.min.x = point.x;
        bounds.max.x = point.x;
        bounds.min.y = point.y;
        bounds.max.y = point.y;
      }
      if (point.x < bounds.min.x) {
        bounds.min.x = point.x;
      }
      if (point.x > bounds.max.x) {
        bounds.max.x = point.x;
      }
      if (point.y < bounds.min.y) {
        bounds.min.y = point.y;
      }
      if (point.y > bounds.max.y) {
        bounds.max.y = point.y;
      }
    }
    return bounds;
  }

  inside(point) {
    if (!this.bounds.inside(point)) {
      return false;
    }
    // TODO: point inside polygon

    // 1) pick a point outside the boudning box
    const outsidePoint = new Point(this.bounds.min.x, this.bounds.min.y);

    // 2) Test the ray against all sides
    const line = new Line(outsidePoint, point);
    let intersections = 0;
    for (let i=0; i<this.points.length; ++i) {
      const side = new Line(this.points[i], this.points[(i+1)%this.points.length]);
      if(line.intersects(side)) {
        ++intersections;
      }
    }

    if ((intersections & 1) == 1) {
        return true;
    } else {
        return false;
    }
  }
}
