export type User = {
  name: string;
  fullName?: string;
  bio?: string;
};

export const R_values = [1, 2, 3, 4, 5] as const;
export type Point = {
  x: number;
  y: number;
  r: 1 | 2 | 3 | 4 | 5;
};

export const defaultPoint = {
  x: 0,
  y: 0,
  r: 2,
} as Point;

/**
 * Type for interoption with server api, Attempt is record type that contains values of Point type
 */
export type Attempt<P> = {
  isInsideArea: boolean;
  runningTime: number;
} & P;

export type ErrorResponse = {
  error: string;
  details?: Map<string, string>;
};
