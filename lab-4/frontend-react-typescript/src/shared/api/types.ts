export type User = {
  username: string;
  fullName?: string;
  bio?: string;
};

export type Point = {
  x: number;
  y: number;
  r: 1 | 2 | 3 | 4 | 5;
};
export const R_values = [1, 2, 3, 4, 5] as const;

export const defaultPoint = {
  x: 0,
  y: 0,
  r: 2,
} as Point;

export type Attempt<P> = {
  isInsideArea: boolean;
  runningTime: number;
} & P;
