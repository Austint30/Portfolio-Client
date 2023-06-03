import { MathUtils } from "utils";
import { parseRgb } from "./index";

export function linearColorBlend(
	start: string | number[],
	end: string | number[],
	time: number
): number[] {
	let color1 = Array.isArray(start) ? start : parseRgb(start);
	let color2 = Array.isArray(end) ? end : parseRgb(end);

	let r = MathUtils.numLerp(color1[0], color2[0], time);
	let g = MathUtils.numLerp(color1[1], color2[1], time);
	let b = MathUtils.numLerp(color1[2], color2[2], time);

	let a: number;
	let finalColor: number[] = [r, g, b];

	if (color1.length === 4 && color2.length === 4) {
		a = MathUtils.numLerp(color1[3], color2[3], time);
		finalColor.push(a);
	}
	return finalColor;
}

export function projectAlphaOnOpaque(
	alphaColor: string | number[],
	opaqueColor: string | number[]
) {
	let color1 = Array.isArray(alphaColor)
		? [...alphaColor]
		: parseRgb(alphaColor);
	let color2 = Array.isArray(opaqueColor)
		? [...opaqueColor]
		: parseRgb(opaqueColor);

	if (color2.length === 4) {
		color2.splice(3, 1); // Remove alpha channel
	}
	let alpha = color1[3];

	let blended = linearColorBlend(color2, color1, alpha);

	return blended;
}
