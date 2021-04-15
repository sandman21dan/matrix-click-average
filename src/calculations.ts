import { MatrixPoint } from "./types";

/**
 * Converts number to percentage based on max number of scale
 */
export function percentageOfMax(value: number, max: number): number {
  return value * 100 / max;
}

export function calculateMeanPoint(pointList: MatrixPoint[]): MatrixPoint {
  const [ aggregatedX, aggregatedY ] = pointList.reduce(([ accumX, accumY ], [ pointX, pointY ]) => {
      return [
        accumX + pointX,
        accumY + pointY,
      ];
    },
    [0, 0],
  );

  return [
    aggregatedX / pointList.length,
    aggregatedY / pointList.length,
  ];
}
