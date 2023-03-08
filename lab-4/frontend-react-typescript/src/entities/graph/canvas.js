export default function (cnv, points) {
  /** copy-paste from preveous project */
  const ctx = cnv.getContext("2d");
  const point_r = 5; // [px]
  const line_width = 4; // [px]
  const border_offset = 10; // [px]
  const possible_R = [1, 2, 3, 4, 5]; // [dp] = [Density-independent Pixels]
  const point_colors = { in: "#168a38", out: "#ef2d2d" };
  const target_colors = {
    axis: "#2c2c2c",
    background: "#f8d72d",
    area: "#239dff",
  };

  // Changeable radius
  let R = () => {
    return Math.min(...possible_R);
  };

  /* set R value with val [dp] */
  const set_R = (val) => {
    console.log(`[set_R] R := ${val} [dp]`);
    R = () => {
      return val;
    };
  };

  /* coefficient for converting [dp] to [px] */
  let cft = () => {
    return (
      (Math.min(cnv.width, cnv.height) - border_offset) /
      (2 * Math.max(...possible_R))
    ); // [px/dp]
  };

  /* returns center point of canvas [px] */
  let mid = () => {
    return { x: cnv.width / 2, y: cnv.height / 2 };
  };

  const get_points = () => {
    console.log("[get_points] points: ", points);
    return points;
  };

  /* draws circle with center in point (`x`, `y`) with radius `r`, all are [px] */
  const draw_round = ({ x, y }, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  };

  /* draws point with center in point (`x`, `y`) [dp] with fill color corresponding position inside or outside area */
  const draw_point = ({ x, y, isInsideArea }) => {
    ctx.fillStyle = isInsideArea == true ? point_colors.in : point_colors.out;
    draw_round(
      {
        x: x * cft() + mid().x,
        y: -1 * y * cft() + mid().y,
      },
      point_r
    );
  };

  /* draws rectangle from top left point (`x1`, `y1`) [px] to bottom right point (`x2`, `y2`) [px] */
  const draw_rect = ({ x1, y1 }, { x2, y2 }) => {
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  };

  /* draws triangle with 3 points: (`x1`, `y1`), (`x2`, `y2`), (`x3`, `y3`), all in [px] */
  const draw_triangle = ({ x1, y1 }, { x2, y2 }, { x3, y3 }) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
  };

  /* draws axes of the target on the canvas with specified `line_width` */
  const draw_axes = () => {
    /* horizontal axis X */
    draw_rect(
      { x1: /*__0_+__*/ border_offset, y1: mid().y + line_width / 2 },
      { x2: cnv.width - border_offset, y2: mid().y - line_width / 2 }
    );

    /* vertical axis Y */
    draw_rect(
      { x1: mid().x - line_width / 2, y1: border_offset /*__+_0___*/ },
      { x2: mid().x + line_width / 2, y2: cnv.height - border_offset }
    );
  };

  /* draws bottom right sector of round with center in point (`x`, `y`) [px] and radius `r` [px] */
  function draw_sector({ x, y }, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI / 2);
    ctx.fill();
    draw_triangle({ x1: x, y1: y }, { x2: x + r, y2: y }, { x3: x, y3: y + r });
  }

  const draw_areas = () => {
    draw_triangle(
      { x1: mid().x, /*_______________*/ y1: mid().y },
      { x2: mid().x, /*_______________*/ y2: mid().y - R() * cft() },
      { x3: mid().x + (R() / 2) * cft(), y3: mid().y }
    );

    draw_rect(
      { x1: mid().x - R() * cft(), y1: mid().y },
      { x2: mid().x, /*_________*/ y2: mid().y + R() * cft() }
    );

    draw_sector(mid(), (R() / 2) * cft());
  };

  const draw_target = () => {
    ctx.fillStyle = target_colors.background;
    draw_rect({ x1: 0, y1: 0 }, { x2: cnv.width, y2: cnv.height });

    ctx.fillStyle = target_colors.area;
    draw_areas();

    ctx.fillStyle = target_colors.axis;
    draw_axes();
  };

  const draw_scene = () => {
    draw_target();
    let points_filtered = get_points().filter((it) => {
      return it.r == R();
    });

    console.log("[draw_scene] points to draw:");
    console.log(points_filtered);

    for (let point of points_filtered) {
      draw_point(point);
    }
  };

  /* return point (`x`, `y`) [px] of canvas */
  function get_mouse_position(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    console.log(`[get_mouse_position] {x: ${point.x}, y: ${point.y}} [px]`);

    return point;
  }

  const on_click = (event) => {
    let position = get_mouse_position(cnv, event);
    let point = {
      x: (position.x - mid().x) / cft(),
      y: (mid().y - position.y) / cft(),
    };

    console.log(`[on_click] point: {x: ${point.x}, y: ${point.y}} [dp]`);

    commit_attempt(point, R());
  };

  const commit_attempt = ({ x, y }, r) => {};

  return draw_scene;
}
