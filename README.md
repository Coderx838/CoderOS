# ⚡ CoderOS — Personal Developer Web Operating System

> **CoderOS** is a personalized, feature-packed web operating system designed specifically for software engineers, hackers, and web creators. It provides an in-browser development environment, developer utilities, terminal shell, and productivity tools with fluid glassmorphism aesthetics and cyber themes.

---

## 🚀 Key Highlights & Built-in Apps

### 💻 1. Code Studio IDE
- **Interactive Code Playground:** Write HTML, CSS, and JavaScript with instant sandboxed live preview.
- **Console Output Interception:** Captures `console.log()` and `console.error()` directly inside the IDE's built-in console panel.
- **Built-in Templates:** Instant-load interactive templates:
  - *⚡ Particle Network:* Interactive HTML5 canvas particle simulation that reacts to physics.
  - *⚡ Matrix Digital Rain:* Classic streaming green matrix rain effect.
  - *⚡ Neon Cyber Clock:* Glowing gradient digital clock.
  - *⚡ Blank Canvas:* Starter template for quick prototyping.
- **Local Persistence:** Automatically saves your work in browser local storage.

### 📟 2. CoderShell Terminal (v1.0)
- **Live JavaScript REPL:** Execute code directly inside the terminal with `eval <expr>` or `js <expr>`.
- **System Information:** Run `sysinfo`, `neofetch`, or `coderfetch` to view ASCII banner and live system diagnostics (kernel, uptime, resolution, memory).
- **Matrix Mode:** Toggle full-screen Matrix digital rain across your desktop with `matrix`.
- **Command History:** Cycle through your previous commands with `ArrowUp` and `ArrowDown`.
- **Tab Auto-Completion:** Press `Tab` to quickly complete commands.
- **Direct App Launchers:** Type `code`, `devtools`, `files`, `browser`, `notes`, `calc`, etc. to open windows.

### 🛠️ 3. Dev Tools Suite
- **JSON Tools:** Prettify, minify, and validate JSON data with one click.
- **Base64 Converter:** Encode and decode UTF-8 strings to Base64 format.
- **URL Tools:** Encode and decode URL strings and query parameters.
- **Color Converter & Palette:** Real-time HEX ↔ RGB converter with native color picker preview.
- **Regex Tester:** Test regular expressions against input text with live match counting and highlighting.

### 🦆 4. Rubber Duck Debugger & Live System Monitor
- **Rubber Duck Debugging:** Click the developer mascot duck on the desktop to receive helpful debugging wisdom, coding tips, and comic relief.
- **Live Resource Monitor:** Dynamic CPU and RAM gauges oscillating in real-time.

### 👤 5. CoderOS Station & Developer Profile
- **Editable Profile:** Real-time editable developer name, title, and bio that automatically persist to local storage.
- **Tech Stack Badges:** Visual highlights for JavaScript, Python, React, Node.js, Docker, Git, and Linux.
- **Cheat Sheet:** Built-in reference for shortcuts, terminal syntax, and features.

### 📁 6. File Explorer
- Hierarchical virtual file system preloaded with developer directories:
  - `/Projects`: Sample canvas animations, mock JSON APIs
  - `/Scripts`: Deployment shell scripts, automation routines
  - `/Docs`: Cheatsheets and guides
  - `/Desktop`: Notes and markdown documentation

### 🎨 7. Themes & Visual Customization
Switch themes anytime via the Settings window or by running `theme <name>` in CoderShell:
- **Matrix:** Dark hacker aesthetic with glowing emerald green typography.
- **Cyberpunk:** High-contrast neon cyan and electric pink.
- **Dracula:** Slate background with pastel purples, greens, and pinks.
- **Dark:** Deep obsidian glassmorphism.
- **Day / Light:** Crisp blue and emerald daytime themes.
- **Sunset & Purple:** Atmospheric twilight colorways.

---

## ⌨️ CoderShell Command Reference

| Command | Description |
|---|---|
| `help` | Display all available commands |
| `sysinfo` / `neofetch` | Display ASCII logo and system specs |
| `code` / `studio` | Launch Code Studio IDE |
| `devtools` | Launch Dev Tools Suite |
| `eval <expr>` | Evaluate live JavaScript expression |
| `calc <math>` | Evaluate math formula |
| `matrix` | Toggle fullscreen matrix digital rain |
| `theme <name>` | Switch theme (`matrix`, `cyberpunk`, `dracula`, `dark`, etc.) |
| `apps` | List all desktop applications |
| `quote` | Print a developer quote |
| `whoami` | Show current user identity |
| `git status` | View virtual git repository state |
| `history` | List command history |
| `clear` / `cls` | Clear terminal display |

---

## 🛠️ Architecture & Tech Stack

- **Core:** Pure Vanilla JavaScript (ES6+), HTML5, CSS3.
- **UI Architecture:** Custom window manager with z-indexing, dragging bounds, and responsive clamping.
- **Storage:** Browser `localStorage` for profiles, files, themes, and IDE projects.
- **Graphics:** HTML5 Canvas 2D API for Matrix rain and particle animations.

---

## 🏃 Running Locally

Open `index.html` directly in any modern web browser, or serve it with any local static HTTP server:

```powershell
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Navigate to `http://localhost:8000` to launch CoderOS!
