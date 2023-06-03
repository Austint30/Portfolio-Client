import React, { HTMLAttributes, useEffect, useRef } from "react";

export interface AmbientBackgroundProps
	extends HTMLAttributes<HTMLCanvasElement> {
	canvasRef?: React.RefObject<HTMLCanvasElement>;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = (props) => {
	const { canvasRef, ...rest } = props;

	const canvasRefInternal = canvasRef || useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		// Set up canvas
		const canvas = canvasRefInternal.current;
		const context = canvas?.getContext("2d", { willReadFrequently: true });
		let ascending = true;
		let alpha = 0;

		/*	TODO: Implement ambient background animation.
				Specification:
					- Dark background.
					- Large animated blurred circles that move around in random directions (one or two on screen max.)
					- Circles must use add color blending when overlapping.
					- Circles must be heavily blurred so it feels out of focus (page content is the main focus.)
					- Disabled on light theme.
		*/
		function animate() {
			if (!context) return;
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);

			if (alpha > 1) {
				ascending = false;
			}
			if (alpha < 0) {
				ascending = true;
			}

			if (ascending) alpha += 0.01;
			else alpha -= 0.01;

			context.fillStyle = `rgba(0, 30, 30, ${alpha})`;
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		}

		let interval = setInterval(animate, 300);
		return () => clearInterval(interval);
	}, []);

	const style: React.CSSProperties = {
		...props.style,
		width: "100%",
		height: "100%",
	};

	return <canvas {...rest} style={style} ref={canvasRef} />;
};

export default AmbientBackground;
