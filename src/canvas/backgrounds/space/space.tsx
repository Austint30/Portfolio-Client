import { CssUtils } from "utils";

export function SpaceBackground(ctx: CanvasRenderingContext2D) {
	function animate() {
		if (!ctx) return;
		let cW = ctx.canvas.width;
		let cH = ctx.canvas.height;

		ctx.save();
		ctx.clearRect(0, 0, cW, cH);

		// Create gradient
		let grd = ctx.createLinearGradient(0, cH, 0, 0);
		grd.addColorStop(0, "rgb(0, 0, 0)");
		grd.addColorStop(1, "rgb(6, 12, 24)");

		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, cW, cH);

		ctx.restore();
	}

	let interval = setInterval(animate, 16.66);
	return () => clearInterval(interval);
}
