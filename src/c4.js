// Chapter 4: Flow Matching Interpolation Demo

function initFlowMatchingDemo() {
    const canvas = document.getElementById('fm-canvas');
    const slider = document.getElementById('fm-t');
    const value = document.getElementById('fm-t-value');
    const resample = document.getElementById('fm-resample');
    if (!canvas || !slider || !value || !resample) return;
    const ctx = canvas.getContext('2d');

    const world = { x: [-4, 4], y: [-3, 3] };
    function toCanvas(p) {
        const x = (p[0] - world.x[0]) / (world.x[1] - world.x[0]) * canvas.width;
        const y = canvas.height - (p[1] - world.y[0]) / (world.y[1] - world.y[0]) * canvas.height;
        return [x, y];
    }

    let z = [randn(), randn()];
    let eps = [randn(), randn()];
    function resamplePoints() { z = [randn(), randn()]; eps = [randn(), randn()]; render(); }

    function drawPoint(p, color, r = 5) {
        const [cx, cy] = toCanvas(p);
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    }
    function drawArrow(from, to, color) {
        const [x1, y1] = toCanvas(from);
        const [x2, y2] = toCanvas(to);
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        const head = 10;
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - head * (ux + 0.5 * uy), y2 - head * (uy - 0.5 * ux));
        ctx.lineTo(x2 - head * (ux - 0.5 * uy), y2 - head * (uy + 0.5 * ux));
        ctx.closePath(); ctx.fill();
    }

    function render() {
        const t = parseFloat(slider.value);
        value.textContent = `t = ${t.toFixed(2)}`;
        const xt = [t * z[0] + (1 - t) * eps[0], t * z[1] + (1 - t) * eps[1]];
        const u = [z[0] - eps[0], z[1] - eps[1]]; // u_target

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // line between eps and z
        ctx.strokeStyle = '#999'; ctx.lineWidth = 1.5;
        const [lx1, ly1] = toCanvas(eps); const [lx2, ly2] = toCanvas(z);
        ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly2); ctx.stroke();

        drawPoint(eps, '#2980b9', 5);
        drawPoint(z, '#27ae60', 5);
        drawPoint(xt, '#2d3436', 4);
        // arrow u_target from eps to z
        drawArrow(eps, z, '#e74c3c');
    }
    slider.addEventListener('input', render);
    resample.addEventListener('click', resamplePoints);
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    initFlowMatchingDemo();
});


