import { selectAllPoints } from "entities/point";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import draw from "./canvas";

export type GraphProps = {
  draw: (ctx: any, points: any[]) => any;
};

export const Graph = ({ draw }: GraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const points = useSelector(selectAllPoints);
  const pointStatus = useSelector((state: any) => state.points.status);
  const error = useSelector((state: any) => state.points.error);

  useEffect(() => {
    if (pointStatus === "idle") {
      const cnv = canvasRef.current;
      draw(cnv, points);
    }
  }, [draw, points]);

  return (
    <canvas ref={canvasRef} width={"600px"} height={"600px"}>
      You need to enable canvas in browser!
    </canvas>
  );
};
