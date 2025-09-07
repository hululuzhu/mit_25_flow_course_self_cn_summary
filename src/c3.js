// Chapter 3: Probability Path 1D Density Demo

function initProbPathDemo() {
    const canvas = document.getElementById('prob-canvas');
    const slider = document.getElementById('prob-t');
    const value = document.getElementById('prob-t-value');
    if (!canvas || !slider || !value) return;
    const ctx = canvas.getContext('2d');

    const xRange = [-5, 5];
    function N(x, m, s) {
        const var2 = s * s;
        return Math.exp(-0.5 * (x - m) * (x - m) / var2) / Math.sqrt(2 * Math.PI * var2);
    }
    function p0(x) { return N(x, 0, 1); }
    function p1(x) { return 0.5 * N(x, -2, 0.6) + 0.5 * N(x, 2, 0.6); }

    function toCanvas(x, y, yMax) {
        const cx = (x - xRange[0]) / (xRange[1] - xRange[0]) * canvas.width;
        const cy = canvas.height - y / yMax * (canvas.height - 24) - 12; // margins
        return [cx, cy];
    }

    function render() {
        const t = parseFloat(slider.value);
        value.textContent = `t = ${t.toFixed(2)}`;
        const xs = [];
        const y0 = [], y1 = [], yt = [];
        const steps = 480;
        let maxY = 0;
        for (let i = 0; i <= steps; i++) {
            const x = xRange[0] + (xRange[1] - xRange[0]) * i / steps;
            const a = p0(x);
            const b = p1(x);
            const c = (1 - t) * a + t * b;
            xs.push(x); y0.push(a); y1.push(b); yt.push(c);
            if (a > maxY) maxY = a;
            if (b > maxY) maxY = b;
            if (c > maxY) maxY = c;
        }
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // axes
        ctx.strokeStyle = '#ddd';
        ctx.beginPath();
        const [ax1, ay1] = toCanvas(xRange[0], 0, maxY);
        const [ax2, ay2] = toCanvas(xRange[1], 0, maxY);
        ctx.moveTo(ax1, ay1); ctx.lineTo(ax2, ay2); ctx.stroke();

        function drawLine(ys, color, width) {
            ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath();
            for (let i = 0; i < xs.length; i++) {
                const [cx, cy] = toCanvas(xs[i], ys[i], maxY);
                if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
            }
            ctx.stroke();
        }
        drawLine(y0, '#95a5a6', 1);
        drawLine(y1, '#bdc3c7', 1);
        drawLine(yt, '#8e44ad', 2);
    }
    slider.addEventListener('input', render);
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    initProbPathDemo();
});


