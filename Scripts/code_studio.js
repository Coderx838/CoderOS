// CoderOS Code Studio IDE Implementation

const codeStudioTemplates = {
    particles: {
        html: `<canvas id="c"></canvas>`,
        css: `body { margin: 0; overflow: hidden; background: #0b0f19; }
canvas { display: block; }`,
        js: `const c = document.getElementById('c');
const ctx = c.getContext('2d');
let w = c.width = window.innerWidth;
let h = c.height = window.innerHeight;

const pts = [];
for (let i = 0; i < 50; i++) {
    pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
    });
}

function loop() {
    ctx.fillStyle = 'rgba(11, 15, 25, 0.2)';
    ctx.fillRect(0, 0, w, h);
    
    for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        for (let j = i + 1; j < pts.length; j++) {
            const p2 = pts[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 120) {
                ctx.strokeStyle = 'rgba(0, 242, 254, ' + (1 - d / 120) * 0.5 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(loop);
}
loop();
console.log("Particle network running! Move window to see it resize.");`
    },
    matrix: {
        html: `<canvas id="matrix"></canvas>`,
        css: `body { margin: 0; background: #000; overflow: hidden; }
canvas { display: block; }`,
        js: `const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*<>{}[]=+/';
const fontSize = 14;
const cols = Math.floor(canvas.width / fontSize);
const drops = Array(cols).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(draw, 35);
console.log("Matrix rain initialized.");`
    },
    clock: {
        html: `<div class="card">
    <div class="glow"></div>
    <h1 id="time">00:00:00</h1>
    <p id="date">CoderOS Live Clock</p>
</div>`,
        css: `body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, #1a1e29, #090c12);
    font-family: 'Segoe UI', monospace;
    color: #fff;
}
.card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 242, 254, 0.3);
    padding: 30px 50px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
}
#time {
    font-size: 48px;
    margin: 0;
    background: linear-gradient(90deg, #00f2fe, #4facfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
}
#date {
    margin-top: 10px;
    color: #94a3b8;
    font-size: 14px;
}`,
        js: `function update() {
    const now = new Date();
    document.getElementById('time').textContent = now.toTimeString().split(' ')[0];
    document.getElementById('date').textContent = now.toDateString() + ' • CoderOS';
}
setInterval(update, 1000);
update();
console.log("Neon clock active!");`
    },
    blank: {
        html: `<div style="text-align: center; padding: 40px; font-family: sans-serif;">
    <h1 style="color: #00f2fe;">Hello from CoderOS!</h1>
    <p style="color: #64748b;">Write your HTML, CSS, and JS here.</p>
    <button onclick="greet()" style="padding: 10px 20px; border-radius: 8px; border: none; background: #38ef7d; color: #000; font-weight: bold; cursor: pointer;">
        Click Me
    </button>
</div>`,
        css: `body { margin: 0; background: #0f172a; color: white; }`,
        js: `function greet() {
    console.log("Button was clicked! Welcome to CoderOS IDE.");
    alert("CoderOS Code Studio: Code successfully executed!");
}`
    }
};

let currentTab = "html";
let codeStore = {
    html: codeStudioTemplates.particles.html,
    css: codeStudioTemplates.particles.css,
    js: codeStudioTemplates.particles.js
};

// Try restore from localStorage
const savedProject = localStorage.getItem("coderOS_codeStudio_code");
if (savedProject) {
    try {
        const parsed = JSON.parse(savedProject);
        if (parsed.html !== undefined) codeStore = parsed;
    } catch (e) {}
}

function initCodeStudio() {
    const textarea = document.querySelector("#codeStudioEditor");
    const iframe = document.querySelector("#codeStudioPreview");
    const consoleBox = document.querySelector("#codeStudioConsole");
    const tabButtons = document.querySelectorAll(".code_studio_tab");
    const templateSelect = document.querySelector("#codeStudioTemplate");
    const runBtn = document.querySelector("#codeStudioRunBtn");
    const saveBtn = document.querySelector("#codeStudioSaveBtn");

    if (!textarea || !iframe) return;

    textarea.value = codeStore[currentTab];

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            codeStore[currentTab] = textarea.value;
            currentTab = btn.dataset.tab;
            textarea.value = codeStore[currentTab];
        });
    });

    textarea.addEventListener("input", () => {
        codeStore[currentTab] = textarea.value;
    });

    // Indent handling with Tab key
    textarea.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            codeStore[currentTab] = this.value;
        }
    });

    if (runBtn) {
        runBtn.addEventListener("click", runStudioCode);
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            codeStore[currentTab] = textarea.value;
            localStorage.setItem("coderOS_codeStudio_code", JSON.stringify(codeStore));
            printToConsole("[System] Code project saved to CoderOS storage.");
        });
    }

    if (templateSelect) {
        templateSelect.addEventListener("change", (e) => {
            const tmpl = codeStudioTemplates[e.target.value];
            if (tmpl) {
                codeStore.html = tmpl.html;
                codeStore.css = tmpl.css;
                codeStore.js = tmpl.js;
                textarea.value = codeStore[currentTab];
                runStudioCode();
            }
        });
    }

    runStudioCode();
}

function printToConsole(msg, isError = false) {
    const consoleBox = document.querySelector("#codeStudioConsole");
    if (!consoleBox) return;
    const line = document.createElement("div");
    line.style.color = isError ? "#f87171" : "#38ef7d";
    line.style.marginBottom = "2px";
    line.textContent = `> ${msg}`;
    consoleBox.appendChild(line);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function runStudioCode() {
    const textarea = document.querySelector("#codeStudioEditor");
    const iframe = document.querySelector("#codeStudioPreview");
    const consoleBox = document.querySelector("#codeStudioConsole");

    if (textarea) codeStore[currentTab] = textarea.value;
    if (consoleBox) consoleBox.innerHTML = `<div class="code_studio_console_title">Output Console</div>`;

    const fullSrc = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                ${codeStore.css}
            </style>
        </head>
        <body>
            ${codeStore.html}
            <script>
                (function() {
                    const _log = console.log;
                    const _error = console.error;
                    console.log = function(...args) {
                        window.parent.postMessage({ type: 'studio_log', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
                        _log.apply(console, args);
                    };
                    console.error = function(...args) {
                        window.parent.postMessage({ type: 'studio_error', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
                        _error.apply(console, args);
                    };
                    window.onerror = function(msg, url, line) {
                        window.parent.postMessage({ type: 'studio_error', message: msg + ' (Line ' + line + ')' }, '*');
                    };
                })();
                try {
                    ${codeStore.js}
                } catch(err) {
                    console.error(err.message);
                }
            <\/script>
        </body>
        </html>
    `;

    if (iframe) {
        iframe.srcdoc = fullSrc;
    }
}

window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "studio_log") {
        printToConsole(event.data.message, false);
    } else if (event.data && event.data.type === "studio_error") {
        printToConsole(event.data.message, true);
    }
});

// Auto-init when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCodeStudio);
} else {
    setTimeout(initCodeStudio, 50);
}
