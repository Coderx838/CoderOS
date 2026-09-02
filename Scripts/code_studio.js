// CoderOS Code Studio IDE (OP Edition with Line Numbers, Snake Game, & Export)

const codeStudioTemplates = {
    snake: {
        html: `<div class="game-container">
  <div class="header">
    <div class="title">🐍 RETRO CODER SNAKE</div>
    <div class="score-board">SCORE: <span id="score">0</span> | BEST: <span id="best">0</span></div>
  </div>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <div class="controls-hint">Use Arrow Keys or W/A/S/D to Steer</div>
</div>`,
        css: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #090d16;
  font-family: 'Segoe UI', monospace;
  color: #fff;
  user-select: none;
}
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}
.header {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-bottom: 12px;
  font-weight: bold;
}
.title { color: #38ef7d; letter-spacing: 1px; }
.score-board { color: #38bdf8; }
canvas {
  background: #030712;
  border: 2px solid rgba(56, 189, 248, 0.4);
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
}
.controls-hint {
  margin-top: 10px;
  color: #64748b;
  font-size: 12px;
}`,
        js: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');

const grid = 20;
let count = 0;
let score = 0;
let best = 0;

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

let apple = { x: 320, y: 320 };

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  if (score > best) {
    best = score;
    bestEl.textContent = best;
  }
  score = 0;
  scoreEl.textContent = score;
  apple.x = getRandomInt(0, 20) * grid;
  apple.y = getRandomInt(0, 20) * grid;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 6) return; // 10 FPS
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid dots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 20; c++) {
      ctx.fillRect(c * grid + 9, r * grid + 9, 2, 2);
    }
  }

  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap edges
  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) snake.cells.pop();

  // Draw apple
  ctx.fillStyle = '#f43f5e';
  ctx.shadowColor = '#f43f5e';
  ctx.shadowBlur = 10;
  ctx.fillRect(apple.x + 2, apple.y + 2, grid - 4, grid - 4);
  ctx.shadowBlur = 0;

  // Draw snake
  snake.cells.forEach(function(cell, index) {
    ctx.fillStyle = index === 0 ? '#38ef7d' : '#10b981';
    ctx.fillRect(cell.x + 1, cell.y + 1, grid - 2, grid - 2);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score += 10;
      scoreEl.textContent = score;
      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        resetGame();
      }
    }
  });
}

window.addEventListener('keydown', function(e) {
  if ((e.key === 'ArrowLeft' || e.key === 'a') && snake.dx === 0) {
    snake.dx = -grid; snake.dy = 0;
  } else if ((e.key === 'ArrowUp' || e.key === 'w') && snake.dy === 0) {
    snake.dy = -grid; snake.dx = 0;
  } else if ((e.key === 'ArrowRight' || e.key === 'd') && snake.dx === 0) {
    snake.dx = grid; snake.dy = 0;
  } else if ((e.key === 'ArrowDown' || e.key === 's') && snake.dy === 0) {
    snake.dy = grid; snake.dx = 0;
  }
});

requestAnimationFrame(loop);
console.log('Retro Snake game loaded! Focus preview and use arrow keys.');`
    },
    particles: {
        html: `<canvas id="c"></canvas>`,
        css: `body { margin: 0; overflow: hidden; background: #0a0e17; }
canvas { display: block; }`,
        js: `const c = document.getElementById('c');
const ctx = c.getContext('2d');
let w = c.width = window.innerWidth;
let h = c.height = window.innerHeight;

const pts = [];
for (let i = 0; i < 60; i++) {
    pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
    });
}

function loop() {
    ctx.fillStyle = 'rgba(10, 14, 23, 0.25)';
    ctx.fillRect(0, 0, w, h);
    
    for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        for (let j = i + 1; j < pts.length; j++) {
            const p2 = pts[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 110) {
                ctx.strokeStyle = 'rgba(56, 189, 248, ' + (1 - d / 110) * 0.4 + ')';
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
window.addEventListener('resize', () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; });
console.log("Particle network running! Move or resize window.");`
    },
    clock: {
        html: `<div class="card">
    <h1 id="time">00:00:00</h1>
    <p id="date">CoderOS Live Clock</p>
</div>`,
        css: `body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, #1e293b, #090d16);
    font-family: 'Segoe UI', monospace;
    color: #fff;
}
.card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 30px 50px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);
}
#time {
    font-size: 52px;
    margin: 0;
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
}
#date { color: #94a3b8; margin-top: 10px; }`,
        js: `function update() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString();
    document.getElementById('date').textContent = now.toDateString() + ' • CoderOS';
}
setInterval(update, 1000);
update();`
    },
    blank: {
        html: `<div style="text-align: center; padding: 40px; font-family: sans-serif;">
    <h1 style="color: #38bdf8;">Hello from CoderOS!</h1>
    <p style="color: #94a3b8;">Write your HTML, CSS, and JS here.</p>
    <button onclick="greet()" style="padding: 10px 20px; border-radius: 8px; border: none; background: #6366f1; color: #fff; font-weight: bold; cursor: pointer;">
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
    html: codeStudioTemplates.snake.html,
    css: codeStudioTemplates.snake.css,
    js: codeStudioTemplates.snake.js
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
    const gutter = document.querySelector("#codeStudioGutter");
    const iframe = document.querySelector("#codeStudioPreview");
    const tabButtons = document.querySelectorAll(".code_studio_tab");
    const templateSelect = document.querySelector("#codeStudioTemplate");
    const runBtn = document.querySelector("#codeStudioRunBtn");
    const saveBtn = document.querySelector("#codeStudioSaveBtn");
    const formatBtn = document.querySelector("#codeStudioFormatBtn");
    const exportBtn = document.querySelector("#codeStudioExportBtn");
    const popoutBtn = document.querySelector("#codeStudioPopoutBtn");
    const cursorPosEl = document.querySelector("#codeStudioCursorPos");
    const statsEl = document.querySelector("#codeStudioStats");
    const deviceBtns = document.querySelectorAll(".preview_device_btn");
    const frameWrapper = document.querySelector(".preview_frame_wrapper");

    if (!textarea || !iframe) return;

    textarea.value = codeStore[currentTab];
    updateGutter();
    updateStats();

    function updateGutter() {
        if (!gutter || !textarea) return;
        const lineCount = (textarea.value.split("\n").length) || 1;
        let lineStr = "";
        for (let i = 1; i <= lineCount; i++) {
            lineStr += i + "\n";
        }
        gutter.textContent = lineStr;
        gutter.scrollTop = textarea.scrollTop;
    }

    function updateStats() {
        if (!textarea) return;
        const text = textarea.value;
        const lines = text.split("\n").length;
        const chars = text.length;
        if (statsEl) statsEl.textContent = `${lines} lines • ${chars} chars`;

        const selStart = textarea.selectionStart || 0;
        const upToCursor = text.substring(0, selStart);
        const curLine = upToCursor.split("\n").length;
        const curCol = upToCursor.split("\n").pop().length + 1;
        if (cursorPosEl) cursorPosEl.textContent = `Ln ${curLine}, Col ${curCol}`;
    }

    textarea.addEventListener("scroll", () => {
        if (gutter) gutter.scrollTop = textarea.scrollTop;
    });

    textarea.addEventListener("input", () => {
        codeStore[currentTab] = textarea.value;
        updateGutter();
        updateStats();
    });

    textarea.addEventListener("keyup", updateStats);
    textarea.addEventListener("click", updateStats);

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            codeStore[currentTab] = textarea.value;
            currentTab = btn.dataset.tab;
            textarea.value = codeStore[currentTab];
            updateGutter();
            updateStats();
        });
    });

    // Tab key indent
    textarea.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            codeStore[currentTab] = this.value;
            updateGutter();
            updateStats();
        }
    });

    if (runBtn) runBtn.addEventListener("click", runStudioCode);

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            codeStore[currentTab] = textarea.value;
            localStorage.setItem("coderOS_codeStudio_code", JSON.stringify(codeStore));
            printToConsole("[System] Project saved to CoderOS storage.");
            if (window.cyberAudio) window.cyberAudio.playSuccess();
        });
    }

    if (formatBtn) {
        formatBtn.addEventListener("click", () => {
            codeStore[currentTab] = textarea.value;
            let val = textarea.value;
            // Clean multi-blank lines
            val = val.replace(/\n\s*\n\s*\n/g, "\n\n");
            textarea.value = val;
            codeStore[currentTab] = val;
            updateGutter();
            printToConsole("[System] Code formatted.");
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            codeStore[currentTab] = textarea.value;
            const bundle = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Exported from CoderOS Code Studio</title>
  <style>
${codeStore.css}
  </style>
</head>
<body>
${codeStore.html}
  <script>
${codeStore.js}
  <\/script>
</body>
</html>`;
            const blob = new Blob([bundle], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "coderos-app.html";
            a.click();
            URL.revokeObjectURL(url);
            printToConsole("[System] Downloaded 'coderos-app.html'.");
        });
    }

    if (popoutBtn) {
        popoutBtn.addEventListener("click", () => {
            codeStore[currentTab] = textarea.value;
            const bundle = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${codeStore.css}</style></head>
<body>${codeStore.html}<script>${codeStore.js}<\/script></body></html>`;
            const blob = new Blob([bundle], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        });
    }

    deviceBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.id === "codeStudioPopoutBtn") return;
            deviceBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (frameWrapper) {
                if (btn.dataset.device === "mobile") {
                    frameWrapper.classList.add("mobile_mode");
                } else {
                    frameWrapper.classList.remove("mobile_mode");
                }
            }
        });
    });

    if (templateSelect) {
        templateSelect.addEventListener("change", (e) => {
            const key = e.target.value;
            if (codeStudioTemplates[key]) {
                codeStore = {
                    html: codeStudioTemplates[key].html,
                    css: codeStudioTemplates[key].css,
                    js: codeStudioTemplates[key].js
                };
                textarea.value = codeStore[currentTab];
                updateGutter();
                updateStats();
                runStudioCode();
                printToConsole(`[System] Loaded template: ${key}`);
            }
        });
    }

    runStudioCode();
}

function runStudioCode() {
    const textarea = document.querySelector("#codeStudioEditor");
    const iframe = document.querySelector("#codeStudioPreview");
    if (textarea) codeStore[currentTab] = textarea.value;
    if (!iframe) return;

    printToConsole("[Build] Compiling project...");

    const source = `
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
            const origLog = console.log;
            const origError = console.error;
            const origWarn = console.warn;
            console.log = function(...args) {
                window.parent.postMessage({ type: 'console', level: 'info', msg: args.join(' ') }, '*');
                origLog.apply(console, args);
            };
            console.error = function(...args) {
                window.parent.postMessage({ type: 'console', level: 'error', msg: args.join(' ') }, '*');
                origError.apply(console, args);
            };
            console.warn = function(...args) {
                window.parent.postMessage({ type: 'console', level: 'warn', msg: args.join(' ') }, '*');
                origWarn.apply(console, args);
            };
            window.onerror = function(msg, url, line) {
                window.parent.postMessage({ type: 'console', level: 'error', msg: msg + ' (line ' + line + ')' }, '*');
            };
        })();
        try {
            ${codeStore.js}
        } catch(e) {
            console.error("Execution error: " + e.message);
        }
    <\/script>
</body>
</html>
    `;

    iframe.srcdoc = source;
    printToConsole("[Build] Output rendered successfully.");
}

function printToConsole(msg, level = "info") {
    const consoleBox = document.querySelector("#codeStudioConsole");
    if (!consoleBox) return;

    const row = document.createElement("div");
    row.style.margin = "2px 0";
    row.style.wordBreak = "break-word";

    if (level === "error") {
        row.style.color = "#f87171";
    } else if (level === "warn") {
        row.style.color = "#f59e0b";
    } else {
        row.style.color = "#38ef7d";
    }

    row.textContent = msg;
    consoleBox.appendChild(row);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "console") {
        printToConsole(event.data.msg, event.data.level);
    }
});

document.addEventListener("DOMContentLoaded", initCodeStudio);
