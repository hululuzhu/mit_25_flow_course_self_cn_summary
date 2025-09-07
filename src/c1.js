// Chapter 1: 2D GMM Visualization

function initGmmDemo() {
    const canvas = document.getElementById('gmm-canvas');
    const slider = document.getElementById('gmm-count');
    const value = document.getElementById('gmm-count-value');
    const resample = document.getElementById('gmm-resample');
    if (!canvas || !slider || !value || !resample) return;
    const ctx = canvas.getContext('2d');

    const components = [
        { mean: [-2, 0], std: 1, color: '#e74c3c', weight: 0.3 },
        { mean: [2, 0], std: 1, color: '#2ecc71', weight: 0.3 },
        { mean: [0, 2], std: 1, color: '#3498db', weight: 0.4 }
    ];
    const xRange = [-5, 5];
    const yRange = [-5, 5];
    function toCanvas(p) {
        const x = (p[0] - xRange[0]) / (xRange[1] - xRange[0]) * canvas.width;
        const y = canvas.height - (p[1] - yRange[0]) / (yRange[1] - yRange[0]) * canvas.height;
        return [x, y];
    }
    function drawBackground() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function drawPoint(px, py, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    function sampleGaussian(mean, std) {
        return [mean[0] + std * randn(), mean[1] + std * randn()];
    }
    function pickComponent() {
        const r = Math.random();
        let acc = 0;
        for (const c of components) {
            acc += c.weight;
            if (r <= acc) return c;
        }
        return components[components.length - 1];
    }
    function render() {
        const n = parseInt(slider.value, 10);
        value.textContent = String(n);
        drawBackground();
        for (let i = 0; i < n; i++) {
            const c = pickComponent();
            const p = sampleGaussian(c.mean, c.std);
            const [cx, cy] = toCanvas(p);
            drawPoint(cx, cy, c.color);
        }
    }
    slider.addEventListener('input', render);
    resample.addEventListener('click', render);
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    initGmmDemo();
});


