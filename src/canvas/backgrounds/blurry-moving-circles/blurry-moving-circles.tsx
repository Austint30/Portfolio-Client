import { CssUtils } from "utils";

export function BlurryMovingCirclesBackground(ctx: CanvasRenderingContext2D) {
	/*	TODO: Implement moving circles background animation.
      Specification:
        - [DONE] Dark background.
        - [DONE] Large animated blurred circles that move around in random directions (one or two on screen max.)
        - [DONE] Circles must use add color blending when overlapping.
        - [DONE] Circles must be heavily blurred so it feels out of focus (page content is the main focus.)
        - [DONE] Disabled on light theme.
				- Add support for multiple colors
  */

	const MAX_CIRCLES = 2;
	const MAX_CIRCLE_LIFETIME = 10; // seconds
	const MIN_CIRCLE_LIFETIME = 5; // seconds
	const MAX_CIRCLE_DELAY_TIME = 10; // seconds

	class BlurryCircle {
		private color: number[] = [0, 0, 0, 0];
		private x: number = 0;
		private y: number = 0;
		private radius: number = 100;
		private lifetime: number = 5;

		private startTime: number = -1;

		constructor(
			color: string,
			x: number,
			y: number,
			radius: number,
			lifetime: number,
			startDelay: number
		) {
			this.color = CssUtils.parseRgb(color);
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.lifetime = lifetime * 1000;

			this.startTime = new Date().getTime() + startDelay * 1000;
		}

		public getCurrentTime() {
			return new Date().getTime() - this.startTime;
		}

		public setStartTime(startTime: number) {
			this.startTime = startTime;
		}

		public isDead() {
			return (
				this.startTime !== null && this.getCurrentTime() > this.lifetime
			);
		}

		public render() {
			ctx.save();
			ctx.globalCompositeOperation = "screen";
			ctx.beginPath();

			const state = this.computeCurrState();

			const rdg = ctx.createRadialGradient(
				this.x,
				this.y,
				0,
				this.x,
				this.y,
				this.radius
			);

			const colorCpy = [...this.color];
			const alphaValue = (this.color.at(3) || 1) * state.opacity;

			if (colorCpy.length === 3) colorCpy.push(alphaValue);
			else colorCpy[3] = alphaValue;

			let stop0 = colorCpy;
			let stop1 = [this.color[0], this.color[1], this.color[2], 0];

			rdg.addColorStop(0, CssUtils.stringifyRgb(stop0));
			rdg.addColorStop(1, CssUtils.stringifyRgb(stop1));

			ctx.fillStyle = rdg;
			ctx.fillRect(
				this.x - this.radius,
				this.y - this.radius,
				this.radius * 2,
				this.radius * 2
			);

			ctx.restore();
		}

		private computeCurrState() {
			const x = this.getCurrentTime() / this.lifetime;

			// Smooth curve where y=0 at the start, y=1 at x=0.5, then y=0 at x=1
			let y = Math.cos((x + 0.5) * Math.PI * 2) / 2 + 0.5;

			if (x < 0) {
				y = 0;
			}

			return {
				radiusMult: y,
				opacity: y,
			};
		}
	}

	const circleStack: BlurryCircle[] = [];

	function removeDeadCircles() {
		let deadCircleIdx: number[] = [];

		circleStack.forEach((circle, i) => {
			if (circle.isDead()) {
				deadCircleIdx.push(i);
			}
		});

		deadCircleIdx.forEach((i) => circleStack.splice(i, 1));
	}

	function createCircle(
		vWidth: number,
		vHeight: number,
		startDelay: number = MAX_CIRCLE_DELAY_TIME
	) {
		const circle = new BlurryCircle(
			"rgba(40, 255, 100, 0.1)",
			Math.random() * vWidth,
			Math.random() * vHeight,
			800,
			Math.max(MIN_CIRCLE_LIFETIME, Math.random()) * MAX_CIRCLE_LIFETIME,
			Math.random() * startDelay
		);

		circleStack.push(circle);
		return circle;
	}

	function animate() {
		if (!ctx) return;
		let cW = ctx.canvas.width;
		let cH = ctx.canvas.height;

		ctx.save();
		ctx.clearRect(0, 0, cW, cH);

		// Create gradient
		let grd = ctx.createLinearGradient(0, cH, 0, 0);
		grd.addColorStop(0, "rgb(16, 22, 34)");
		grd.addColorStop(1, "rgb(26, 32, 44)");

		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, cW, cH);

		removeDeadCircles();
		if (circleStack.length === 0) {
			// Create first circle without any delay
			let circle = createCircle(cW, cH, 0);
			circle.setStartTime(new Date().getTime() - 10000);
		}
		if (circleStack.length < MAX_CIRCLES) {
			createCircle(cW, cH);
		}

		circleStack.forEach((circle) => circle.render());

		ctx.restore();
	}

	let interval = setInterval(animate, 16.66);
	return () => clearInterval(interval);
}
