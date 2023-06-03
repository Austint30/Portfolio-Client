
export function TurquisePulseBackground(canvasContext: CanvasRenderingContext2D){
  let ascending = true;
	let alpha = 0;
  function animate() {
    if (!canvasContext) return;
    canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

    if (alpha > 1) {
      ascending = false;
    }
    if (alpha < 0) {
      ascending = true;
    }

    if (ascending) alpha += 0.01;
    else alpha -= 0.01;

    canvasContext.fillStyle = `rgba(0, 30, 30, ${alpha})`;
    canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  }

  let interval = setInterval(animate, 300);
  return () => clearInterval(interval);
}