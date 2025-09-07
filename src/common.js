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


// Normalize indentation of code blocks while preserving syntax highlighting spans
function normalizeCodeBlocks() {
    const blocks = document.querySelectorAll('.code-block');
    blocks.forEach((block) => {
        // Avoid double-processing
        if (block.__normalized) return;

        // Compute minimal leading spaces across non-empty lines based on textContent
        // Replace tabs with 4 spaces to measure in ch units for monospace fonts
        const raw = block.textContent.replace(/\t/g, '    ');
        const lines = raw.split('\n');
        let minIndent = Infinity;
        for (const line of lines) {
            if (!line.trim()) continue;
            const m = line.match(/^\s+/);
            const indent = m ? m[0].replace(/\t/g, '    ').length : 0;
            if (indent < minIndent) minIndent = indent;
        }

        if (!isFinite(minIndent) || minIndent === 0) {
            block.__normalized = true;
            return;
        }

        // Wrap children to apply a uniform negative offset equal to the common indent
        const wrapper = document.createElement('div');
        wrapper.className = 'code-inner';
        wrapper.style.display = 'inline-block';
        wrapper.style.marginLeft = `-${minIndent}ch`;

        // Move all existing nodes into the wrapper (preserve spans and formatting)
        while (block.firstChild) {
            wrapper.appendChild(block.firstChild);
        }
        block.appendChild(wrapper);
        block.__normalized = true;
    });
}

function onReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
        fn();
    }
}

onReady(() => {
    normalizeCodeBlocks();
});
