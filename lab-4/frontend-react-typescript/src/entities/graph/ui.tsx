import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAttempt, selectAllAttempts } from "entities/attempt";
import { setupCanvasUtils } from "./model";
import { Point } from "shared/api/types";

export const Graph = () => {
  // debugger;
  const [canvasSize, setCanvasSize] = useState(() => {
    const { innerWidth: width, innerHeight: height } = window;
    return width > 800 ? 600 : 300;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const attempts = useSelector(selectAllAttempts);
  const currentR = useSelector(
    (state: any): Point["r"] => state.attempts.currentR
  );
  const attemptStatus = useSelector((state: any) => state.attempts.status);
  const dispatch = useDispatch();
  const commit_point = (point: Point) => {
    dispatch<any>(addNewAttempt(point));
  };

  useEffect(() => {
    if (attemptStatus !== "loading") {
      const cnv = canvasRef.current;
      const { draw_scene, on_click } = setupCanvasUtils(
        currentR,
        cnv,
        attempts
      );
      draw_scene();
      cnv.onclick = on_click;
    }
  }, [currentR, attempts, canvasSize]);

  window.onresize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    setCanvasSize(width > 800 ? 600 : 300);
  };

  return (
    <>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize}>
        You need to enable canvas in browser!
      </canvas>
    </>
  );
};
