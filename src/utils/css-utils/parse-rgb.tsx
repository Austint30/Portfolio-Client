/**
 * Parses an CSS rgb or rgba string to an array. Returns 100% alpha if invalid.
 * @param rgbString e.g. rgb(1,2,3) or rgba(1,2,3,1)
 */
export function parseRgb(rgbString: string | number[]): number[] {
	if (!rgbString || rgbString.length < 4) {
		return [0, 0, 0, 0];
	}

	if (Array.isArray(rgbString)) {
		return rgbString;
	}

	let rgbValues: number[] = [];

	let isInNumber = false;

	const checkIfInNumber = (char: string) =>
		!Number.isNaN(Number(char)) || char === ".";

	let currNumber = "";

	let numbersProcessed = 0;

	// Linear scan through string to find each
	// RGB value
	for (let i = 2; i < rgbString.length; i++) {
		const char = rgbString[i];

		if (!isInNumber && checkIfInNumber(char))
			// We entered into a number
			isInNumber = true;
		else if (isInNumber && !checkIfInNumber(char)) {
			// We exited a number
			rgbValues.push(Number(currNumber));
			currNumber = "";
			numbersProcessed++;
			isInNumber = false;
		}
		if (isInNumber) {
			// We are within a number
			currNumber += char;
		}

		if (numbersProcessed >= 4 || char === ")") break;
	}

	return rgbValues;
}
