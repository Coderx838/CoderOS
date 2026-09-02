// CoderOS Pro Terminal (CoderShell v2.0 - Real UNIX Workstation Shell)
const terminalWindow = document.querySelector("#terminal");
const terminalContent = document.querySelector("#terminalContent");

let commandHistory = JSON.parse(localStorage.getItem("coderOS_term_history") || "[]");
let historyIndex = commandHistory.length;
const termBootTime = Date.now();
let currentTermFontSize = parseInt(localStorage.getItem("coderOS_term_font_size") || "14", 10);

function applyTermFontSize(size) {
    currentTermFontSize = Math.min(Math.max(size, 11), 24);
    localStorage.setItem("coderOS_term_font_size", currentTermFontSize);
    const content = document.querySelector("#terminalContent");
    if (content) {
        content.style.fontSize = `${currentTermFontSize}px`;
    }
}

window.termZoomIn = () => applyTermFontSize(currentTermFontSize + 2);
window.termZoomOut = () => applyTermFontSize(currentTermFontSize - 2);
window.termZoomReset = () => applyTermFontSize(14);

if (terminalWindow) {
    terminalWindow.addEventListener("click", () => {
        const inp = document.querySelector("#terminalInput");
        if (inp) inp.focus();
    });
}

// Virtual Filesystem
let virtualFS = {
    "Projects": {
        type: "dir",
        children: {
            "web-sandbox": {
                type: "dir",
                children: {
                    "index.html": { type: "file", size: 1420, content: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Sandbox</title>\n</head>\n<body>\n  <h1>Welcome to CoderOS</h1>\n</body>\n</html>" },
                    "style.css": { type: "file", size: 840, content: "body {\n  background: #0a0c10;\n  color: #38bdf8;\n  font-family: sans-serif;\n}" },
                    "app.js": { type: "file", size: 520, content: "console.log('⚡ CoderOS Dev Sandbox Ready');" }
                }
            },
            "api-mock": {
                type: "dir",
                children: {
                    "users.json": { type: "file", size: 480, content: '[\n  {"id": 1, "name": "Coder", "role": "Lead Architect"},\n  {"id": 2, "name": "Dev", "role": "Full Stack"}\n]' },
                    "server.py": { type: "file", size: 390, content: "# CoderOS API Server\nfrom http.server import HTTPServer, SimpleHTTPRequestHandler\nprint('Server listening on port 8000')" }
                }
            },
            "deploy.sh": { type: "file", size: 320, content: "#!/usr/bin/env bash\necho '⚡ Deploying CoderOS artifacts to production...'\necho '✓ Build passed!'" },
            "README.md": { type: "file", size: 980, content: "# Personal CoderOS Workspace\nBespoke developer web operating system designed for software engineers." }
        }
    },
    "Docs": {
        type: "dir",
        children: {
            "shortcuts.md": { type: "file", size: 420, content: "## CoderOS Shortcuts\n- Tab: Autocomplete\n- Up/Down: Command History\n- code: Launch Code Studio\n- devtools: Launch Dev Tools" },
            "git-guide.md": { type: "file", size: 760, content: "# Git Workflow\n- git status: check working branch\n- git log: view commit history\n- git commit -m '...': commit changes" }
        }
    },
    "Scripts": {
        type: "dir",
        children: {
            "benchmark.js": { type: "file", size: 360, content: "console.time('runtime');\n// Benchmark simulation\nconsole.timeEnd('runtime');" },
            "clean.sh": { type: "file", size: 190, content: "rm -rf .cache tmp\necho '✓ Cache cleaned successfully'" }
        }
    }
};

// Restore virtualFS from localStorage if available
const savedFS = localStorage.getItem("coderOS_virtual_fs");
if (savedFS) {
    try {
        const parsed = JSON.parse(savedFS);
        if (parsed.Projects) virtualFS = parsed;
    } catch(e) {}
}

function saveVirtualFS() {
    localStorage.setItem("coderOS_virtual_fs", JSON.stringify(virtualFS));
}

let currentPath = ["Projects"];

function getDirFromPath(pathArray) {
    let curr = { type: "dir", children: virtualFS };
    for (const segment of pathArray) {
        if (!curr.children || !curr.children[segment] || curr.children[segment].type !== "dir") {
            return null;
        }
        curr = curr.children[segment];
    }
    return curr;
}

function getPromptString() {
    const pathDisplay = currentPath.length === 0 ? "~" : `~/${currentPath.join("/")}`;
    return `<span style="color: #38bdf8; font-weight: 600;">${pathDisplay}</span> <span style="color: #a855f7;">on</span> <span style="color: #10b981;"> main</span> <span style="color: #6366f1; font-weight: bold;">❯</span> `;
}

function scrollTerminalToBottom() {
    if (!terminalContent) return;
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

new ResizeObserver(scrollTerminalToBottom).observe(terminalWindow);

function terminalOpenClose() {
    if (terminalWindow.style.display === "flex") {
        if (!terminalContent.innerHTML.trim() || terminalContent.innerHTML.includes("terminalText")) {
            terminalContent.innerHTML = `
                <div style="color: #64748b; margin-bottom: 0.8vmin; font-size: 1.1vmin; font-family: 'Consolas', monospace;">
                    CoderOS Workstation Shell • zsh 5.9 (x86_64-apple-darwin23.0)<br>
                    Type <span style="color: #38bdf8;">'help'</span> for commands, or <span style="color: #10b981;">'neofetch'</span> for system specs.
                </div>
            `;
            setTimeout(addInputLine, 100);
        } else {
            setTimeout(addInputLine, 50);
        }
    }
}

function addInputLine() {
    const existing = document.querySelector("#terminalInputLine");
    if (existing) existing.remove();

    const line = document.createElement("div");
    line.className = "terminal_input_line";
    line.id = "terminalInputLine";
    line.innerHTML = `
        <span class="terminal_prompt">${getPromptString()}</span>
        <label class="input_label" style="flex: 1;">
            <input class="terminal_input" type="text" id="terminalInput" autofocus autocomplete="off" spellcheck="false">
        </label>
    `;
    terminalContent.appendChild(line);

    const newInput = document.querySelector("#terminalInput");
    if (!newInput) return;
    newInput.focus();

    newInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const val = newInput.value.trim();
            if (val) {
                commandHistory.push(val);
                if (commandHistory.length > 100) commandHistory.shift();
                localStorage.setItem("coderOS_term_history", JSON.stringify(commandHistory));
                historyIndex = commandHistory.length;
                runCommand(val);
            } else {
                runCommand("");
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                newInput.value = commandHistory[historyIndex];
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                newInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                newInput.value = "";
            }
        } else if (event.key === "Tab") {
            event.preventDefault();
            autoCompleteCommand(newInput);
        }
    });

    scrollTerminalToBottom();
}

function autoCompleteCommand(input) {
    const knownCommands = [
        "help", "neofetch", "sysinfo", "clear", "cls", "pwd", "ls", "cd", "cat",
        "touch", "mkdir", "rm", "tree", "curl", "git", "git status", "git log",
        "code", "devtools", "files", "browser", "notes", "todo", "calc",
        "eval", "node", "theme", "whoami", "date", "history", "echo"
    ];

    const val = input.value;
    const parts = val.split(" ");
    
    if (parts.length === 1) {
        const match = knownCommands.find(c => c.startsWith(parts[0].toLowerCase()));
        if (match) input.value = match;
    } else if (parts.length === 2 && (parts[0] === "cd" || parts[0] === "cat" || parts[0] === "rm")) {
        const currDir = getDirFromPath(currentPath);
        if (currDir && currDir.children) {
            const fileMatch = Object.keys(currDir.children).find(name => name.toLowerCase().startsWith(parts[1].toLowerCase()));
            if (fileMatch) input.value = `${parts[0]} ${fileMatch}`;
        }
    }
}

async function runCommand(cmdString) {
    const inputLine = document.querySelector("#terminalInputLine");
    if (inputLine) {
        inputLine.innerHTML = `<span class="terminal_prompt">${getPromptString()}</span><span style="color: #f1f5f9;">${escapeHTML(cmdString)}</span>`;
        inputLine.removeAttribute("id");
    }

    const trimmed = cmdString.trim();
    if (!trimmed) {
        addInputLine();
        return;
    }

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    let output = "";

    switch (cmd) {
        case "help":
            output = `
<div style="line-height: 1.6; color: #cbd5e1; font-family: 'Consolas', monospace;">
  <p style="color: #38bdf8; font-weight: bold;">⚡ CoderOS Shell Command Reference:</p>
  <table style="border-collapse: collapse; width: 100%; margin: 0.5vmin 0;">
    <tr><td style="color: #10b981; width: 16vmin;">ls, ls -la</td><td>List directory contents with file details</td></tr>
    <tr><td style="color: #10b981;">cd &lt;dir&gt;</td><td>Change directory (supports '..', '~', '/')</td></tr>
    <tr><td style="color: #10b981;">pwd</td><td>Print current working directory</td></tr>
    <tr><td style="color: #10b981;">cat &lt;file&gt;</td><td>Display file contents with line numbers</td></tr>
    <tr><td style="color: #10b981;">touch &lt;file&gt;</td><td>Create new file</td></tr>
    <tr><td style="color: #10b981;">mkdir &lt;dir&gt;</td><td>Create new directory</td></tr>
    <tr><td style="color: #10b981;">rm &lt;name&gt;</td><td>Remove file or directory</td></tr>
    <tr><td style="color: #10b981;">tree</td><td>Print visual ASCII directory tree</td></tr>
    <tr><td style="color: #10b981;">curl &lt;url&gt;</td><td>Fetch data from HTTP API</td></tr>
    <tr><td style="color: #10b981;">git status / log</td><td>Check virtual git repository status</td></tr>
    <tr><td style="color: #10b981;">neofetch / sysinfo</td><td>Display system hardware and environment specs</td></tr>
    <tr><td style="color: #10b981;">eval / node &lt;js&gt;</td><td>Evaluate live JavaScript expression</td></tr>
    <tr><td style="color: #10b981;">code / devtools</td><td>Launch Code Studio IDE / Dev Tools Suite</td></tr>
    <tr><td style="color: #10b981;">theme &lt;name&gt;</td><td>Switch desktop theme (dark, matrix, cyberpunk, dracula)</td></tr>
    <tr><td style="color: #10b981;">clear / cls</td><td>Clear terminal screen</td></tr>
  </table>
</div>`;
            break;

        case "pwd":
            output = `<p style="color: #f1f5f9;">/Users/coder/${currentPath.join("/")}</p>`;
            break;

        case "cd":
            if (args.length === 0 || args[0] === "~" || args[0] === "/") {
                currentPath = [];
            } else if (args[0] === "..") {
                if (currentPath.length > 0) currentPath.pop();
            } else {
                const target = args[0].replace(/\/$/, "");
                const currDir = getDirFromPath(currentPath);
                if (currDir && currDir.children && currDir.children[target] && currDir.children[target].type === "dir") {
                    currentPath.push(target);
                } else {
                    output = `<p style="color: #f87171;">cd: no such file or directory: ${escapeHTML(target)}</p>`;
                }
            }
            break;

        case "ls":
        case "ll":
            const isLong = cmd === "ll" || (args.includes("-la") || args.includes("-l") || args.includes("-a"));
            const currDir = getDirFromPath(currentPath);
            if (!currDir || !currDir.children) {
                output = `<p style="color: #64748b;">(empty)</p>`;
            } else {
                const entries = Object.keys(currDir.children);
                if (isLong) {
                    let rows = `
                        <div style="font-family: 'Consolas', monospace; color: #cbd5e1; line-height: 1.5;">
                        <div style="color: #64748b; font-size: 1.05vmin;">total ${entries.length} items</div>
                    `;
                    entries.forEach(name => {
                        const item = currDir.children[name];
                        const isDir = item.type === "dir";
                        const perms = isDir ? "drwxr-xr-x" : (name.endsWith(".sh") ? "-rwxr-xr-x" : "-rw-r--r--");
                        const sizeStr = isDir ? "4.0K" : `${item.size || 512}B`;
                        const color = isDir ? "#38bdf8" : (name.endsWith(".js") ? "#f59e0b" : (name.endsWith(".sh") ? "#10b981" : (name.endsWith(".json") ? "#eab308" : "#e2e8f0")));
                        const icon = isDir ? "📁 " : "📄 ";
                        rows += `<div style="display: flex; gap: 2vmin;"><span style="color: #64748b;">${perms}</span> <span style="color: #94a3b8;">coder staff</span> <span style="width: 5vmin; text-align: right; color: #64748b;">${sizeStr}</span> <span style="color: ${color}; font-weight: ${isDir ? 'bold' : 'normal'};">${icon}${name}</span></div>`;
                    });
                    rows += "</div>";
                    output = rows;
                } else {
                    let items = entries.map(name => {
                        const isDir = currDir.children[name].type === "dir";
                        const color = isDir ? "#38bdf8; font-weight: bold;" : "#e2e8f0";
                        return `<span style="color: ${color}; margin-right: 2vmin;">${isDir ? '📁' : '📄'} ${name}</span>`;
                    }).join("");
                    output = `<div>${items}</div>`;
                }
            }
            break;

        case "cat":
            if (!args[0]) {
                output = `<p style="color: #f87171;">usage: cat &lt;filename&gt;</p>`;
            } else {
                const currDir = getDirFromPath(currentPath);
                const file = currDir && currDir.children ? currDir.children[args[0]] : null;
                if (!file) {
                    output = `<p style="color: #f87171;">cat: ${escapeHTML(args[0])}: No such file</p>`;
                } else if (file.type === "dir") {
                    output = `<p style="color: #f87171;">cat: ${escapeHTML(args[0])}: Is a directory</p>`;
                } else {
                    const lines = (file.content || "").split("\n");
                    let formatted = `<div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 1vmin; font-family: 'Consolas', monospace;">`;
                    lines.forEach((l, idx) => {
                        formatted += `<div><span style="color: #475569; user-select: none; width: 3vmin; display: inline-block;">${idx + 1}</span> <span style="color: #f1f5f9;">${escapeHTML(l)}</span></div>`;
                    });
                    formatted += `</div>`;
                    output = formatted;
                }
            }
            break;

        case "touch":
            if (!args[0]) {
                output = `<p style="color: #f87171;">usage: touch &lt;filename&gt;</p>`;
            } else {
                const currDir = getDirFromPath(currentPath);
                if (currDir && currDir.children) {
                    currDir.children[args[0]] = { type: "file", size: 0, content: "" };
                    saveVirtualFS();
                    output = `<p style="color: #10b981;">Created file: ${escapeHTML(args[0])}</p>`;
                }
            }
            break;

        case "mkdir":
            if (!args[0]) {
                output = `<p style="color: #f87171;">usage: mkdir &lt;dirname&gt;</p>`;
            } else {
                const currDir = getDirFromPath(currentPath);
                if (currDir && currDir.children) {
                    currDir.children[args[0]] = { type: "dir", children: {} };
                    saveVirtualFS();
                    output = `<p style="color: #10b981;">Created directory: ${escapeHTML(args[0])}</p>`;
                }
            }
            break;

        case "rm":
            if (!args[0]) {
                output = `<p style="color: #f87171;">usage: rm &lt;name&gt;</p>`;
            } else {
                const currDir = getDirFromPath(currentPath);
                if (currDir && currDir.children && currDir.children[args[0]]) {
                    delete currDir.children[args[0]];
                    saveVirtualFS();
                    output = `<p style="color: #cbd5e1;">Removed: ${escapeHTML(args[0])}</p>`;
                } else {
                    output = `<p style="color: #f87171;">rm: ${escapeHTML(args[0])}: No such file or directory</p>`;
                }
            }
            break;

        case "tree":
            function renderTree(dirObj, prefix = "") {
                let res = "";
                const keys = Object.keys(dirObj);
                keys.forEach((key, index) => {
                    const isLast = index === keys.length - 1;
                    const pointer = isLast ? "└── " : "├── ";
                    const item = dirObj[key];
                    const isDir = item.type === "dir";
                    const color = isDir ? "#38bdf8" : "#cbd5e1";
                    res += `<div><span style="color: #64748b;">${prefix}${pointer}</span><span style="color: ${color}; font-weight: ${isDir ? 'bold' : 'normal'};">${isDir ? '📁 ' : '📄 '}${key}</span></div>`;
                    if (isDir && item.children) {
                        res += renderTree(item.children, prefix + (isLast ? "    " : "│   "));
                    }
                });
                return res;
            }
            output = `<div style="font-family: 'Consolas', monospace; line-height: 1.4;"><span style="color: #38bdf8; font-weight: bold;">.</span>${renderTree(virtualFS)}</div>`;
            break;

        case "curl":
            if (!args[0]) {
                output = `<p style="color: #f87171;">usage: curl &lt;url&gt;</p>`;
            } else {
                const url = args[0].startsWith("http") ? args[0] : `https://${args[0]}`;
                output = `<div style="color: #94a3b8;">Fetching ${escapeHTML(url)}...</div>`;
                try {
                    const resp = await fetch(url);
                    const text = await resp.text();
                    output = `<div style="max-height: 25vmin; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 0.8vmin; border-radius: 4px; color: #38ef7d; font-family: monospace;">${escapeHTML(text.slice(0, 2000))}${text.length > 2000 ? '\n...[truncated]' : ''}</div>`;
                } catch(e) {
                    output = `<p style="color: #f87171;">curl: (7) Failed to connect or blocked by CORS: ${escapeHTML(e.message)}</p>`;
                }
            }
            break;

        case "git":
            if (args[0] === "status") {
                output = `
<div style="font-family: 'Consolas', monospace; color: #cbd5e1;">
  <p>On branch <span style="color: #10b981; font-weight: bold;">main</span></p>
  <p>Your branch is up to date with 'origin/main'.</p>
  <p style="color: #10b981;">nothing to commit, working tree clean</p>
</div>`;
            } else if (args[0] === "log") {
                output = `
<div style="font-family: 'Consolas', monospace; font-size: 1.1vmin; line-height: 1.5;">
  <p><span style="color: #f59e0b;">commit b9eb4fe (HEAD -> main)</span><br>
  Author: Coder &lt;dev@coder.os&gt;<br>
  Date:   ${new Date().toDateString()}<br>
  <span style="color: #f1f5f9; padding-left: 2vmin;">feat: Aesthetic CoderOS Workstation architecture</span></p>
</div>`;
            } else {
                output = `<p style="color: #64748b;">usage: git &lt;status|log|commit&gt;</p>`;
            }
            break;

        case "neofetch":
        case "sysinfo":
            const uptimeMinutes = Math.floor((Date.now() - termBootTime) / 60000);
            output = `
<div style="display: flex; gap: 3vmin; font-family: 'Consolas', monospace; align-items: center; margin: 1vmin 0;">
  <div style="color: #6366f1; font-size: 1.1vmin; line-height: 1.15; font-weight: bold; user-select: none;">
    &nbsp;&nbsp;/\_____/\\<br>
   /  o   o  \\<br>
  ( ==  ^  == )<br>
   )         (<br>
  (           )<br>
 ( (  )   (  ) )<br>
(__(__)___(__)__)
  </div>
  <div style="line-height: 1.55; font-size: 1.1vmin;">
    <p><span style="color: #38bdf8; font-weight: bold;">coder</span>@<span style="color: #6366f1; font-weight: bold;">CoderOS</span></p>
    <p style="color: #475569;">---------------------------</p>
    <p><span style="color: #a855f7; font-weight: bold;">OS:</span> CoderOS 1.0.0 Workstation (x86_64)</p>
    <p><span style="color: #a855f7; font-weight: bold;">Host:</span> Developer Workstation (${window.innerWidth}x${window.innerHeight})</p>
    <p><span style="color: #a855f7; font-weight: bold;">Kernel:</span> Chromium V8 Engine / ES2024</p>
    <p><span style="color: #a855f7; font-weight: bold;">Uptime:</span> ${uptimeMinutes}m</p>
    <p><span style="color: #a855f7; font-weight: bold;">Shell:</span> CoderShell Pro (zsh 5.9)</p>
    <p><span style="color: #a855f7; font-weight: bold;">Terminal:</span> Alacritty WebGL</p>
    <p><span style="color: #a855f7; font-weight: bold;">Memory:</span> 4.2 GB / 16.0 GB</p>
    <div style="margin-top: 0.6vmin; display: flex; gap: 0.5vmin;">
      <span style="background: #0f172a; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #ef4444; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #10b981; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #f59e0b; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #3b82f6; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #8b5cf6; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #06b6d4; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
      <span style="background: #f8fafc; width: 1.8vmin; height: 1.2vmin; display: inline-block; border-radius: 2px;"></span>
    </div>
  </div>
</div>`;
            break;

        case "eval":
        case "node":
        case "js":
            const codeToRun = args.join(" ");
            if (!codeToRun) {
                output = `<p style="color: #f87171;">usage: eval &lt;javascript expression&gt;</p>`;
            } else {
                try {
                    const res = eval(codeToRun);
                    output = `<p style="color: #10b981;">=> ${escapeHTML(typeof res === 'object' ? JSON.stringify(res, null, 2) : String(res))}</p>`;
                } catch(err) {
                    output = `<p style="color: #f87171;">EvalError: ${escapeHTML(err.message)}</p>`;
                }
            }
            break;

        case "whoami":
            output = `<p style="color: #f1f5f9;">coder (uid=1000, gid=1000, groups=admin,wheel,developers)</p>`;
            break;

        case "date":
            output = `<p style="color: #f1f5f9;">${new Date().toUTCString()}</p>`;
            break;

        case "clear":
        case "cls":
            terminalContent.innerHTML = "";
            addInputLine();
            return;

        case "code":
        case "studio":
            if (typeof openWindow === "function" && window.codeStudio) openWindow(window.codeStudio);
            output = `<p style="color: #10b981;">Launched Code Studio IDE.</p>`;
            break;

        case "devtools":
            if (typeof openWindow === "function" && window.devTools) openWindow(window.devTools);
            output = `<p style="color: #10b981;">Launched Dev Tools Suite.</p>`;
            break;

        case "files":
            if (typeof openWindow === "function" && window.files) openWindow(window.files);
            output = `<p style="color: #10b981;">Launched File Explorer.</p>`;
            break;

        case "browser":
            if (typeof openWindow === "function" && window.browser) openWindow(window.browser);
            output = `<p style="color: #10b981;">Launched Browser.</p>`;
            break;

        case "theme":
            if (args[0]) {
                if (typeof switchTheme === "function") switchTheme(args[0]);
                output = `<p style="color: #10b981;">Theme updated to '${escapeHTML(args[0])}'.</p>`;
            } else {
                output = `<p style="color: #64748b;">usage: theme &lt;dark|matrix|cyberpunk|dracula|day&gt;</p>`;
            }
            break;

        case "history":
            output = commandHistory.map((h, i) => `<div style="color: #94a3b8;"><span style="color: #475569; width: 4vmin; display: inline-block;">${i+1}</span> ${escapeHTML(h)}</div>`).join("");
            break;

        default:
            output = `<p style="color: #f87171;">zsh: command not found: ${escapeHTML(cmd)}. Type <span style="color: #38bdf8;">'help'</span> for available commands.</p>`;
            break;
    }

    if (output) {
        const outDiv = document.createElement("div");
        outDiv.style.marginBottom = "0.8vmin";
        outDiv.innerHTML = output;
        terminalContent.appendChild(outDiv);
    }

    addInputLine();
}

function escapeHTML(str) {
    if (typeof str !== "string") str = String(str);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}