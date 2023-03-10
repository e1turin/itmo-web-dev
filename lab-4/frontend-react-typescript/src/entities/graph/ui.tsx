import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectAllAttempts } from "entities/attempt";
import { setupCanvasUtils } from "./model";
import { Point } from "shared/api/types";
/* 
export type GraphProps = {
  draw: (ctx: any, points: any[]) => any;
}; 
*/

export const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const attempts = useSelector(selectAllAttempts);
  const currentR: Point["r"] = useSelector(
    (state: any): Point["r"] => state.attempts.currentR
  );
  const attemptStatus = useSelector((state: any) => state.attempts.status);

  useEffect(() => {
    if (attemptStatus === "idle") {
      const cnv = canvasRef.current;
      const { draw_scene, on_click } = setupCanvasUtils(
        currentR,
        cnv,
        attempts
      );
      draw_scene();
      cnv.addEventListener("click", on_click);
    }
  }, [currentR, attempts]);

  return (
    <>
      <canvas ref={canvasRef} width={"600px"} height={"600px"}>
        You need to enable canvas in browser!
      </canvas>
    </>
  );
};
