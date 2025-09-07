// Chapter 2: Vector Field ODE/SDE Demo

function initVectorFieldDemo() {
    const canvas = document.getElementById('vf-canvas');
    const sigmaSlider = document.getElementById('vf-sigma');
    const sigmaValue = document.getElementById('vf-sigma-value');
    const toggleBtn = document.getElementById('vf-toggle');
    const resetBtn = document.getElementById('vf-reset');
    if (!canvas || !sigmaSlider || !sigmaValue || !toggleBtn || !resetBtn) return;
    const ctx = canvas.getContext('2d');

    const world = { x: [-4, 4], y: [-3, 3] };
    function toCanvas(p) {
        const x = (p[0] - world.x[0]) / (world.x[1] - world.x[0]) * canvas.width;
        const y = canvas.height - (p[1] - world.y[0]) / (world.y[1] - world.y[0]) * canvas.height;
        return [x, y];
    }
    function inWorld(p) {
        return p[0] >= world.x[0] && p[0] <= world.x[1] && p[1] >= world.y[0] && p[1] <= world.y[1];
    }

    let particles = [];
    function initParticles() {
        particles = [];
        for (let i = 0; i < 250; i++) {
            const r = 1.2 + Math.random() * 2.0;
            const th = Math.random() * Math.PI * 2;
            const x = r * Math.cos(th);
            const y = r * Math.sin(th);
            particles.push({ p: [x, y] });
        }
    }
    function drift(p) { return [-p[1], p[0]]; }

    function draw() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#2d3436';
        for (const pt of particles) {
            const [cx, cy] = toCanvas(pt.p);
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let running = false;
    let lastTs = null;
    function step(ts) {
        if (!running) return;
        if (lastTs == null) lastTs = ts;
        const dtMs = Math.min(32, ts - lastTs);
        lastTs = ts;
        const dt = dtMs / 1000; // seconds
        const sigma = parseFloat(sigmaSlider.value);

        for (const pt of particles) {
            const v = drift(pt.p);
            const nx = sigma * Math.sqrt(dt) * randn();
            const ny = sigma * Math.sqrt(dt) * randn();
            pt.p[0] += dt * v[0] + nx;
            pt.p[1] += dt * v[1] + ny;
            if (!inWorld(pt.p)) {
                // wrap-around
                if (pt.p[0] < world.x[0]) pt.p[0] = world.x[1];
                if (pt.p[0] > world.x[1]) pt.p[0] = world.x[0];
                if (pt.p[1] < world.y[0]) pt.p[1] = world.y[1];
                if (pt.p[1] > world.y[1]) pt.p[1] = world.y[0];
            }
        }
        draw();
        requestAnimationFrame(step);
    }

    function updateSigmaLabel() {
        sigmaValue.textContent = Number(sigmaSlider.value).toFixed(2);
    }

    toggleBtn.addEventListener('click', () => {
        running = !running;
        toggleBtn.textContent = running ? '暂停' : '开始';
        if (running) {
            lastTs = null;
            requestAnimationFrame(step);
        }
    });
    resetBtn.addEventListener('click', () => { initParticles(); draw(); });
    sigmaSlider.addEventListener('input', updateSigmaLabel);

    initParticles();
    updateSigmaLabel();
    draw();
}

document.addEventListener('DOMContentLoaded', () => {
    initVectorFieldDemo();
});


