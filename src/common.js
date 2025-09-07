// ---- Common Utilities extracted from flow_diffusion_mit.html ----

function showChapter(n) {
    const chapters = document.querySelectorAll('.chapter');
    const tabs = document.querySelectorAll('.nav-tab');
    chapters.forEach((c, i) => {
        c.classList.toggle('active', i === n - 1);
        if (tabs[i]) tabs[i].classList.toggle('active', i === n - 1);
    });
    const progress = document.getElementById('progress');
    const pct = Math.round((n / 5) * 100);
    if (progress) progress.style.width = pct + '%';
    const label = document.getElementById('progress-text');
    if (label) label.textContent = `第${n}章 / 共5章`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAnswer(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('show');
}

function showDemo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('show');
}

// Helpers
function randn() {
    const u = Math.random() || 1e-12;
    const v = Math.random() || 1e-12;
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Expose helpers if needed
window.showChapter = showChapter;
window.toggleAnswer = toggleAnswer;
window.showDemo = showDemo;
window.randn = randn;


