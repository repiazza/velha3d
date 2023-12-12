
document.querySelectorAll("canvas")].forEach((canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  let count = 0;

  function draw(e, radius = 10) {
    const pos = {
      x: (e.offsetX * ctx.canvas.width) / ctx.canvas.clientWidth,
      y: (e.offsetY * ctx.canvas.height) / ctx.canvas.clientHeight,
    };
    document.querySelector("#debug").textContent = count;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = hsl((count++ % 100) / 100, 1, 0.5);
    ctx.fill();
  }

  function preventDefault(e) {
    e.preventDefault();
  }

  if (window.PointerEvent) {
    canvas.addEventListener("pointermove", (e) => {
      draw(e, Math.max(Math.max(e.width, e.height) / 2, 1));
    });
    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });
  } else {
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mousedown", preventDefault);
  }
});

function hsl(h, s, l) {
  return `hsl(${(h * 360) | 0},${(s * 100) | 0}%,${(l * 100) | 0}%)`;
}
