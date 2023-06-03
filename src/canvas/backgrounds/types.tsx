/**
 * All canvas backgrounds must adhere to this signature. The return value is a function that
 * clears any side-effects such as intervals.
 */
export type CanvasBackgroundFunction = (
	canvasContext: CanvasRenderingContext2D
) => (...args: any[]) => void;
