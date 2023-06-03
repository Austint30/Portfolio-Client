/**
 * Converts a RGB/RGBA vector to the CSS equivalent
 * @param colorVector Array of 3 or 4 numbers representing RGB and RGBA respectively
 * @returns rgb(...) or rgba(...) CSS strings
 */
export function stringifyRgb(colorVector: number[]) {
	let joined = colorVector.join(", ");

	if (colorVector.length === 4) {
		return `rgba(${joined})`;
	}
	return `rgba(${joined})`;
}
