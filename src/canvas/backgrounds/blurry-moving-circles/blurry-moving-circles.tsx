export function BlurryMovingCirclesBackground(
	canvasContext: CanvasRenderingContext2D
) {
	let ascending = true;
	let alpha = 0;

	/*	TODO: Implement moving circles background animation. (currently same as turquoise-pulse but red-orange)
      Specification:
        - Dark background.
        - Large animated blurred circles that move around in random directions (one or two on screen max.)
        - Circles must use add color blending when overlapping.
        - Circles must be heavily blurred so it feels out of focus (page content is the main focus.)
        - Disabled on light theme.
  */
	function animate() {
		if (!canvasContext) return;
		canvasContext.clearRect(
			0,
			0,
			canvasContext.canvas.width,
			canvasContext.canvas.height
		);

		if (alpha > 1) {
			ascending = false;
		}
		if (alpha < 0) {
			ascending = true;
		}

		if (ascending) alpha += 0.01;
		else alpha -= 0.01;

		canvasContext.fillStyle = `rgba(80, 30, 0, ${alpha})`;
		canvasContext.fillRect(
			0,
			0,
			canvasContext.canvas.width,
			canvasContext.canvas.height
		);
	}

	let interval = setInterval(animate, 300);
	return () => clearInterval(interval);
}
