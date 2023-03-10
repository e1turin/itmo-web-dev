import { addNewAttempt } from "entities/attempt";
import { store } from "entities/store";
import { Attempt, Point } from "shared/api/types";

type dot = { x: number; y: number };
/**
 * Copy-Paste from preveous project
 * @param R Radius parameter
 * @param cnv canvas reference
 * @param points array of points from attempts to drow on `cnv`
 * @returns two functions: `draw_scene` to drow all the stuff on the canvas
 */
export const setupCanvasUtils = (
  R: Point["r"],
  cnv: HTMLCanvasElement,
  points: Attempt<Point>[]
) => {
  const ctx = cnv.getContext("2d")!; //FIXME: nonnull ??
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

  /* coefficient for converting [dp] to [px] */
  let cft = (): number => {
    return (
      (Math.min(cnv.width, cnv.height) - border_offset) /
      (2 * Math.max(...possible_R))
    ); // [px/dp]
  };

  /* returns center point of canvas [px] */
  let mid = (): dot => {
    return { x: cnv.width / 2, y: cnv.height / 2 };
  };

  const draw_round = ({ x, y }: dot, r: number) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  };

  /* draws point with center in point (`x`, `y`) [dp] with fill color corresponding position inside or outside area */
  const draw_point = ({ x, y, isInsideArea }: Attempt<Point>) => {
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
  const draw_rect = (p1: dot, p2: dot) => {
    ctx.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
  };

  /* draws triangle with 3 points: (`x1`, `y1`), (`x2`, `y2`), (`x3`, `y3`), all in [px] */
  const draw_triangle = (d1: dot, d2: dot, d3: dot) => {
    ctx.beginPath();
    ctx.moveTo(d1.x, d1.y);
    ctx.lineTo(d2.x, d2.y);
    ctx.lineTo(d3.x, d3.y);
    ctx.fill();
  };

  /* draws axes of the target on the canvas with specified `line_width` */
  const draw_axes = () => {
    /* horizontal axis X */
    draw_rect(
      { x: /*__0_+__*/ border_offset, y: mid().y + line_width / 2 },
      { x: cnv.width - border_offset, y: mid().y - line_width / 2 }
    );

    /* vertical axis Y */
    draw_rect(
      { x: mid().x - line_width / 2, y: border_offset /*__+_0___*/ },
      { x: mid().x + line_width / 2, y: cnv.height - border_offset }
    );
  };

  /* draws bottom right sector of round with center in point (`x`, `y`) [px] and radius `r` [px] */
  function draw_sector({ x, y }: dot, r: number) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI / 2);
    ctx.fill();
    draw_triangle({ x: x, y: y }, { x: x + r, y: y }, { x: x, y: y + r });
  }

  const draw_areas = () => {
    draw_triangle(
      { x: mid().x, /*_____________*/ y: mid().y },
      { x: mid().x, /*_____________*/ y: mid().y - R * cft() },
      { x: mid().x + (R / 2) * cft(), y: mid().y }
    );

    draw_rect(
      { x: mid().x - R * cft(), y: mid().y },
      { x: mid().x, /*_______*/ y: mid().y + R * cft() }
    );

    draw_sector(mid(), (R / 2) * cft());
  };

  const draw_target = () => {
    ctx.fillStyle = target_colors.background;
    draw_rect({ x: 0, y: 0 }, { x: cnv.width, y: cnv.height });

    ctx.fillStyle = target_colors.area;
    draw_areas();

    ctx.fillStyle = target_colors.axis;
    draw_axes();
  };

  const draw_scene = () => {
    draw_target();
    let points_filtered = points.filter((it) => {
      return it.r == R;
    });

    console.log("[draw_scene] points to draw:");
    console.log(points_filtered);

    for (let point of points_filtered) {
      draw_point(point);
    }
  };

  const on_click = (event: MouseEvent) => {
    /* return point (`x`, `y`) [px] of canvas */
    const get_mouse_position = (
      canvas: HTMLCanvasElement,
      event: MouseEvent
    ) => {
      let rect = canvas.getBoundingClientRect();
      let position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      console.log(
        `[get_mouse_position] {x: ${position.x}, y: ${position.y}} [px]`
      );
      return position;
    };

    let position = get_mouse_position(cnv, event);
    let point = {
      x: (position.x - mid().x) / cft(),
      y: (mid().y - position.y) / cft(),
      r: R,
    };

    console.log(`[on_click] point: {x: ${point.x}, y: ${point.y}} [dp]`);

    commit_point(point);
  };

  return { draw_scene, on_click };
};

const commit_point = (point: Point) => {
  const dispatcher = store.dispatch(addNewAttempt(point));
};
