// CoderOS Dev Terminal (CoderShell v1.0)
const terminalWindow = document.querySelector("#terminal");

let commandHistory = [];
let historyIndex = -1;
const bootTime = Date.now();

const developerQuotes = [
    "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” — Martin Fowler",
    "“First, solve the problem. Then, write the code.” — John Johnson",
    "“Experience is the name everyone gives to their mistakes.” — Oscar Wilde",
    "“Java is to JavaScript what car is to Carpet.” — Chris Heilmann",
    "“Code is like humor. When you have to explain it, it’s bad.” — Cory House",
    "“Fix the cause, not the symptom.” — Steve Maguire",
    "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra"
];

function scrollTerminalToBottom() {
    if (!terminalContent) return;
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

new ResizeObserver(scrollTerminalToBottom).observe(terminalWindow);

function terminalOpenClose() {
    if (terminalWindow.style.display === "flex") {
        terminalContent.innerHTML = `
            <div class="terminal_highlight">CoderOS Dev Shell [Version 1.0.0 (x86_64-web)]</div>
            <div>Type <span class="terminal_success">'help'</span> for command reference, or <span class="terminal_success">'sysinfo'</span> for system specs.</div>
        `;
        scrollTerminalToBottom();
        setTimeout(function () {
            addInputLine();
        }, 150);
    } else {
        terminalContent.innerHTML = `<div id="terminalText"></div>`;
    }
}

function addInputLine() {
    const existing = document.querySelector("#terminalInputLine");
    if (existing) existing.remove();

    terminalContent.innerHTML += `
        <div class="terminal_input_line" id="terminalInputLine">
            <span class="terminal_prompt">coder@CoderOS:~$ </span>
            <label class="input_label">
                <input class="terminal_input" type="text" id="terminalInput" autofocus autocomplete="off" spellcheck="false">
            </label>
        </div>
    `;
    const newInput = document.querySelector("#terminalInput");
    if (!newInput) return;
    newInput.focus();

    newInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const val = newInput.value.trim();
            if (val) {
                commandHistory.push(val);
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
        "help", "sysinfo", "neofetch", "clear", "cls", "apps", "code", "devtools",
        "files", "browser", "notes", "calc", "todo", "music", "gallery", "settings",
        "theme", "eval", "js", "matrix", "date", "whoami", "quote", "history", "git status"
    ];
    const val = input.value.trim().toLowerCase();
    if (!val) return;
    const match = knownCommands.find(c => c.startsWith(val));
    if (match) {
        input.value = match;
    }
}

function runCommand(rawCommand) {
    const command = rawCommand.trim();
    let output = "";

    const activeInputLine = document.querySelector("#terminalInputLine");
    if (activeInputLine) activeInputLine.remove();

    if (command !== "") {
        terminalContent.innerHTML += `<p><span class="terminal_prompt">coder@CoderOS:~$</span> ${escapeHTML(rawCommand)}</p>`;
    }

    const lowerCmd = command.toLowerCase();

    if (lowerCmd === "") {
        // Just empty enter
    } else if (lowerCmd === "help") {
        output = `
            <div style="margin: 0.5vmin 0;">
                <p class="terminal_highlight">=== CoderOS Developer Commands ===</p>
                <p><span class="terminal_success">sysinfo / neofetch</span> - Display CoderOS system specs & ASCII logo</p>
                <p><span class="terminal_success">code / studio</span>      - Launch Code Studio IDE</p>
                <p><span class="terminal_success">devtools</span>           - Launch Dev Tools Suite (JSON, Regex, Base64)</p>
                <p><span class="terminal_success">apps</span>               - List all available desktop apps</p>
                <p><span class="terminal_success">app &lt;name&gt;</span>          - Launch specific app (e.g. app files)</p>
                <p><span class="terminal_success">eval / js &lt;expr&gt;</span>    - Execute live JavaScript code in shell</p>
                <p><span class="terminal_success">calc &lt;math&gt;</span>         - Evaluate mathematical expression</p>
                <p><span class="terminal_success">theme &lt;name&gt;</span>        - Switch theme (matrix, cyberpunk, dracula, dark, day, sunset, purple, default)</p>
                <p><span class="terminal_success">matrix</span>             - Toggle Matrix digital rain animation</p>
                <p><span class="terminal_success">quote</span>              - Display random developer wisdom</p>
                <p><span class="terminal_success">whoami</span>             - Print current user identity</p>
                <p><span class="terminal_success">date</span>               - Print current system date and time</p>
                <p><span class="terminal_success">git status / log</span>   - Display simulated Git repository state</p>
                <p><span class="terminal_success">history</span>            - Show command history</p>
                <p><span class="terminal_success">clear / cls</span>        - Clear terminal screen</p>
            </div>
        `;
    } else if (lowerCmd === "sysinfo" || lowerCmd === "neofetch" || lowerCmd === "coderfetch") {
        const uptimeSeconds = Math.floor((Date.now() - bootTime) / 1000);
        const currentTheme = document.body.dataset.theme || "default";
        output = `
<div class="terminal_ascii">
   _____          _           ____   _____ 
  / ____|        | |         / __ \ / ____|
 | |     ___   __| | ___ _ _| |  | | (___  
 | |    / _ \ / _\` |/ _ \ '__| |  | |\___ \ 
 | |___| (_) | (_| |  __/ |  | |__| |____) |
  \_____\___/ \__,_|\___|_|   \____/|_____/ 
</div>
<div style="line-height: 1.6;">
  <p><span class="terminal_highlight">OS:</span> CoderOS 1.0.0 Dev Edition (WebOS)</p>
  <p><span class="terminal_highlight">Host:</span> ${navigator.userAgent.includes("Windows") ? "Windows NT Workstation" : "Web Environment"} (${window.innerWidth}x${window.innerHeight})</p>
  <p><span class="terminal_highlight">Kernel:</span> JavaScript V8 / Chromium Engine</p>
  <p><span class="terminal_highlight">Uptime:</span> ${uptimeSeconds} seconds</p>
  <p><span class="terminal_highlight">Shell:</span> CoderShell v1.0</p>
  <p><span class="terminal_highlight">Theme:</span> ${currentTheme}</p>
  <p><span class="terminal_highlight">Memory:</span> ~54MB / 512MB (Active)</p>
</div>`;
    } else if (lowerCmd === "clear" || lowerCmd === "cls") {
        terminalContent.innerHTML = "";
        addInputLine();
        return;
    } else if (lowerCmd === "apps") {
        output = `
            <p class="terminal_highlight">Installed Applications:</p>
            <p> • <span class="terminal_success">code</span> / codeStudio - Code Studio IDE</p>
            <p> • <span class="terminal_success">devtools</span> - Developer Tools Suite</p>
            <p> • <span class="terminal_success">files</span> - File Explorer</p>
            <p> • <span class="terminal_success">browser</span> - Web Browser</p>
            <p> • <span class="terminal_success">notes</span> - Notes App</p>
            <p> • <span class="terminal_success">todo</span> - To-Do List</p>
            <p> • <span class="terminal_success">calc</span> / calculator - Calculator</p>
            <p> • <span class="terminal_success">terminal</span> - Dev Shell</p>
            <p> • <span class="terminal_success">stopwatch</span> - Stopwatch</p>
            <p> • <span class="terminal_success">music</span> - Music Player</p>
            <p> • <span class="terminal_success">gallery</span> - Wallpaper Gallery</p>
            <p> • <span class="terminal_success">settings</span> - System Settings</p>
            <p> • <span class="terminal_success">welcome</span> - Dev Station & Profile</p>
            <p style="color: #64748b;">Tip: Type the app name directly to launch it!</p>
        `;
    } else if (lowerCmd.startsWith("eval ") || lowerCmd.startsWith("js ")) {
        const codeToEval = command.replace(/^(eval|js)\s+/i, '');
        try {
            const res = eval(codeToEval);
            output = `<p class="terminal_success">=> ${escapeHTML(typeof res === 'object' ? JSON.stringify(res) : String(res))}</p>`;
        } catch (err) {
            output = `<p class="terminal_error">Error: ${escapeHTML(err.message)}</p>`;
        }
    } else if (lowerCmd.startsWith("calc ")) {
        const expr = command.substring(5).trim();
        try {
            // Safe basic math evaluator
            if (/^[0-9+\-*/().\s^%]+$/.test(expr)) {
                const res = Function(`'use strict'; return (${expr})`)();
                output = `<p class="terminal_success">Result: ${res}</p>`;
            } else {
                output = `<p class="terminal_error">Invalid math expression</p>`;
            }
        } catch (err) {
            output = `<p class="terminal_error">Math Error: ${escapeHTML(err.message)}</p>`;
        }
    } else if (lowerCmd === "matrix") {
        if (typeof toggleMatrixRain === "function") {
            const state = toggleMatrixRain();
            output = `<p class="terminal_success">Matrix Digital Rain ${state ? "Engaged" : "Disengaged"}.</p>`;
        } else {
            output = `<p class="terminal_warning">Matrix visualizer initializing...</p>`;
        }
    } else if (lowerCmd === "whoami") {
        output = `<p><span class="terminal_highlight">coder@CoderOS</span> (Full Stack Developer / Superuser)</p>`;
    } else if (lowerCmd === "date") {
        output = `<p>${new Date().toString()}</p>`;
    } else if (lowerCmd === "quote") {
        const q = developerQuotes[Math.floor(Math.random() * developerQuotes.length)];
        output = `<p class="terminal_warning">${q}</p>`;
    } else if (lowerCmd.startsWith("echo ")) {
        output = `<p>${escapeHTML(command.substring(5))}</p>`;
    } else if (lowerCmd === "history") {
        output = commandHistory.map((c, i) => `<p>${i + 1}: ${escapeHTML(c)}</p>`).join('');
    } else if (lowerCmd.startsWith("git")) {
        if (lowerCmd.includes("status")) {
            output = `
                <p>On branch <span class="terminal_success">main</span></p>
                <p>Your branch is up to date with 'CoderOS/main'.</p>
                <p style="color: #64748b;">Nothing to commit, working tree clean.</p>
            `;
        } else if (lowerCmd.includes("log")) {
            output = `
                <p><span class="terminal_warning">commit c0de9182</span> (HEAD -> main)</p>
                <p>Author: Coder &lt;developer@coderos.dev&gt;</p>
                <p>Date:   ${new Date().toDateString()}</p>
                <p style="margin-left: 2vmin;">feat: upgraded to CoderOS Developer Edition with Code Studio & CoderShell</p>
            `;
        } else {
            output = `<p>git: '${escapeHTML(command)}' is a simulated command in CoderOS.</p>`;
        }
    } else if (lowerCmd.startsWith("theme")) {
        const parts = command.split(/\s+/);
        if (parts.length > 1) {
            const th = parts[1].toLowerCase();
            const validThemes = ["default", "dark", "day", "purple", "sunset", "pink", "cyberpunk", "matrix", "dracula"];
            if (validThemes.includes(th)) {
                switchTheme(th);
                output = `<p class="terminal_success">Theme successfully switched to '${th}'.</p>`;
            } else {
                output = `<p class="terminal_error">Unknown theme '${th}'. Available: ${validThemes.join(", ")}</p>`;
            }
        } else {
            output = `<p>Available themes: default, dark, day, purple, sunset, pink, cyberpunk, matrix, dracula</p><p>Usage: theme &lt;name&gt;</p>`;
        }
    } else {
        // App launch shortcuts
        const appMap = {
            "code": "codeStudio",
            "studio": "codeStudio",
            "codestudio": "codeStudio",
            "devtools": "devTools",
            "tools": "devTools",
            "files": "files",
            "browser": "browser",
            "notes": "notes",
            "todo": "todoList",
            "todolist": "todoList",
            "calc": "calculator",
            "calculator": "calculator",
            "music": "musicPlayer",
            "gallery": "gallery",
            "settings": "settings",
            "welcome": "welcomeScreen",
            "stopwatch": "stopwatch"
        };

        let targetApp = null;
        if (lowerCmd.startsWith("app ")) {
            const appName = lowerCmd.substring(4).trim();
            targetApp = appMap[appName] || appName;
        } else if (appMap[lowerCmd]) {
            targetApp = appMap[lowerCmd];
        }

        if (targetApp) {
            const el = document.getElementById(targetApp);
            if (el && typeof openWindow === "function") {
                openWindow(el);
                output = `<p class="terminal_success">Launched '${targetApp}' window.</p>`;
            } else {
                output = `<p class="terminal_error">App '${targetApp}' could not be opened.</p>`;
            }
        } else {
            output = `<p class="terminal_error">Command not recognized: '${escapeHTML(command)}'. Type <span class="terminal_success">'help'</span> for list of commands.</p>`;
        }
    }

    if (output) {
        terminalContent.innerHTML += output;
    }

    addInputLine();
    scrollTerminalToBottom();
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}