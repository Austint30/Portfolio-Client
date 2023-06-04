import { CanvasBackgrounds } from "canvas";
import { ClearSideEffects } from "canvas/backgrounds/types";
import React, { HTMLAttributes, useEffect, useRef } from "react";

export interface AmbientBackgroundProps
	extends HTMLAttributes<HTMLCanvasElement> {
	canvasRef?: React.RefObject<HTMLCanvasElement>;
	canvasFunction?: CanvasBackgrounds.CanvasBackgroundFunction;
}

// TODO: Use canvas.toDataURL() to use this as a background style instead

const AmbientBackground: React.FC<AmbientBackgroundProps> = (props) => {
	const { canvasRef, canvasFunction, ...rest } = props;

	const canvasRefInternal = canvasRef || useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<{ stopAnimation: ClearSideEffects | null }>({
		stopAnimation: null,
	});

	useEffect(() => {
		// Set up canvas

		// Clear interval from previous background animation
		if (animationRef.current.stopAnimation !== null) {
			animationRef.current.stopAnimation();
			animationRef.current.stopAnimation = null;
		}

		const canvas = canvasRefInternal.current;
		if (!canvas) return;

		const context = canvas.getContext("2d");
		if (!context) return;

		const updateCanvasSize = () => {
			let width = canvas.offsetWidth;
			let height = canvas.offsetHeight;
			canvas.width = width;
			canvas.height = height;
		};

		const resizeObserver = new ResizeObserver(updateCanvasSize);
		resizeObserver.observe(canvas);

		updateCanvasSize();

		let canvasFunInternal = canvasFunction;

		if (!canvasFunInternal)
			// Fallback to BlurryMovingCirclesBackground if not given
			canvasFunInternal = CanvasBackgrounds.BlurryMovingCirclesBackground;

		animationRef.current.stopAnimation = canvasFunInternal(context);

		return () => {
			animationRef.current.stopAnimation?.();
			resizeObserver.disconnect();
		};
	}, [canvasFunction?.toString()]);

	const style: React.CSSProperties = {
		...props.style,
		width: "100%",
		height: "100%",
	};

	return <canvas {...rest} style={style} ref={canvasRef} />;
};

export default AmbientBackground;
