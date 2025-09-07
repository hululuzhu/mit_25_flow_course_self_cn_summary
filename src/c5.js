// Chapter 5: CFG Demo

function initCfgDemo() {
    const slider = document.getElementById('cfg-slider');
    const value = document.getElementById('cfg-value');
    const canvas = document.getElementById('cfg-canvas');
    if (!slider || !value || !canvas) return;
    const ctx = canvas.getContext('2d');
    const uncond = { x: 80, y: 140 };
    const cond = { x: 360, y: 80 };
    function draw() {
        const w = parseFloat(slider.value);
        value.textContent = `w = ${w.toFixed(1)}`;
        const mix = { x: (1 - w) * uncond.x + w * cond.x, y: (1 - w) * uncond.y + w * cond.y };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // guide lines
        ctx.strokeStyle = '#ddd';
        ctx.beginPath(); ctx.moveTo(uncond.x, uncond.y); ctx.lineTo(cond.x, cond.y); ctx.stroke();
        // uncond
        ctx.fillStyle = '#888'; circle(uncond.x, uncond.y, 6); label(uncond.x + 8, uncond.y - 8, 'u(x|∅)');
        // cond
        ctx.fillStyle = '#2ecc71'; circle(cond.x, cond.y, 6); label(cond.x + 8, cond.y - 8, 'u(x|y)');
        // mix
        ctx.fillStyle = '#e74c3c'; circle(mix.x, mix.y, 7); label(mix.x + 8, mix.y - 8, 'ũ(x|y)');
    }
    function circle(x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
    function label(x, y, text) { ctx.fillStyle = '#2d3436'; ctx.font = '12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'; ctx.fillText(text, x, y); }
    slider.addEventListener('input', draw);
    draw();
}

document.addEventListener('DOMContentLoaded', () => {
    initCfgDemo();
});
