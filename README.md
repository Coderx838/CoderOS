# ⚡ CoderOS

> A fun personal project: building a cozy, customized developer desktop environment right inside the browser.

[![Live Demo](https://img.shields.io/badge/Live_Demo-coderx838.github.io%2FCoderOS-38bdf8?style=for-the-badge&logo=googlechrome&logoColor=white)](https://coderx838.github.io/CoderOS/)
[![GitHub](https://img.shields.io/badge/GitHub-Coderx838%2FCoderOS-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Coderx838/CoderOS)
[![Stack](https://img.shields.io/badge/Built_With-Vanilla_JS_•_HTML5_•_CSS3-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/Coderx838/CoderOS)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

---

## 🚀 Live Demo

Try it out in full screen:  
👉 **[https://coderx838.github.io/CoderOS/](https://coderx838.github.io/CoderOS/)**

*(No installation, sign-ups, or extensions needed — runs entirely client-side in any modern browser).*

---

## 💡 Why I Built This

I wanted to make a fun, interactive personal Web OS that feels like my dream coding desktop in the browser. 

Instead of building a static portfolio page, I thought: *why not build a mini operating system where you can actually write code, listen to 24/7 lofi coding radio, run terminal commands, test regex/JSON payloads, and customize themes?*

This is a **fun experimental project** built with pure Vanilla JavaScript, HTML5 Canvas, and CSS. Zero frameworks, zero heavy npm bundles, and fast load times.

---

## 🕹️ What's Inside

### 💻 Code Studio IDE
- A live code playground for HTML, CSS, and JavaScript with an instant preview frame.
- Line numbers gutter, status bar cursor tracker (`Ln X, Col Y`), 1-click code formatting, and standalone HTML bundle exporter.
- **Built-in Templates:**
  - 🎮 **Retro Snake Arcade:** A fully playable classic snake game with live high-score tracking right inside the canvas.
  - ✨ **Particle Network:** Floating interactive physics nodes that react to mouse movements.
  - 🕒 **Neon Cyber Clock:** Glowing digital clock display.
  - 📄 **Blank Canvas:** Fast sandbox for prototyping ideas.

### 📟 CoderShell Terminal
- Custom zsh-style prompt (`~/Projects on  main ❯`) with monospace typography and font zoom controls (`A-`, `14px`, `A+`).
- **Virtual Filesystem:** Explore virtual directories using standard commands like `ls`, `cd`, `cat`, `mkdir`, `touch`, and `tree`.
- **Fun Commands:**
  - `neofetch` / `sysinfo` — ASCII banner and live system diagnostics.
  - `matrix` — Toggle full-screen digital green rain across the desktop.
  - `eval <expr>` — Live JavaScript execution in the shell.
  - `theme <name>` — Switch color palettes straight from the command line.

### 🎵 YouTube Music & 24/7 Lofi Radio
- Built-in streaming radio with live focus stations:
  - ☕ **Lofi Girl Radio** (24/7 live lofi hip-hop)
  - 🌆 **Synthwave Chill** (Retro cyberpunk coding beats)
  - 🌧️ **Rain & Coffee Shop** (Atmospheric rain and cafe ambience)
  - 🕹️ **8-Bit Chiptune Radio** (Retro video game tunes)
- **Custom Player:** Paste any YouTube or YouTube Music link/ID to stream your favorite playlists with an active animated equalizer visualizer.

### 🛠️ Dev Tools Suite
A collection of everyday utilities I often reach for:
- **JSON Workbench:** Format, validate, and minify JSON with syntax highlighting.
- **Base64 Converter:** UTF-8 text encoder/decoder.
- **URL Tools:** Encode and decode URLs and parameters.
- **Color Converter:** HEX ↔ RGB converter with color picker.
- **Regex Tester:** Live regular expression tester with match flags and highlight counts.

### 🎨 Themes & 4K Wallpapers
Switch between popular developer palettes:
- **Tokyo Night** (Deep Tokyo indigo with neon cyan & lavender)
- **Catppuccin Mocha** (Cozy pastel dark palette with mauve & rosewater)
- **Nordic Frost (Nord)** (Arctic blues with icy cyan & aurora green)
- **Dracula, Cyberpunk & Matrix** (Classic vibrant hacker aesthetics)
- **Wallpapers:** Curated high-res backgrounds including *Tokyo Cyber Rain*, *Cozy Lofi Coding Desk*, and *Nordic Aurora Fjord*.

### 🍎 macOS-Inspired Touches
- **Auto-Hiding Dock:** When you maximize any window, the dock slides down smoothly to give you full screen space. Hover your mouse at the bottom edge to peek at the dock.
- **Window Header Icons:** Dedicated vector squircle icons for every application in the title bar.
- **Top-Left Start Pill:** Quick-access menu for launching apps with one click.

---

## 🧰 Tech Stack

- **Core:** 100% Vanilla JavaScript (ES6+), HTML5, CSS3 Glassmorphism
- **Window Manager:** Custom coordinate clamping, z-index layering, and drag physics
- **Audio & Media:** YouTube Iframe API & Web Audio API
- **Graphics:** HTML5 2D Canvas
- **Storage:** Browser `localStorage` for persisting themes, notes, and file states
- **Dependencies:** **0 external npm dependencies** (lightning-fast load)

---

## 🏃 Running Locally

Since this has zero build steps or npm installations, you can clone and run it immediately:

```bash
# Clone the repository
git clone https://github.com/Coderx838/CoderOS.git

# Enter project directory
cd CoderOS

# Serve locally (any static server works)
# Using Python:
python -m http.server 8000

# Or using Node:
npx serve .
```

Then visit `http://localhost:8000` in your browser.

---

## 📄 License

MIT License — Feel free to fork, customize, explore the code, and make your own version!

---

<p align="center">
  Crafted with ❤️ for developers by <a href="https://github.com/Coderx838">Coderx838</a>
</p>
