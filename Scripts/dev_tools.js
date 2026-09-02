// CoderOS Dev Tools Suite Logic

function initDevTools() {
    const navButtons = document.querySelectorAll(".dev_tools_nav_btn");
    const panels = document.querySelectorAll(".dev_tool_panel");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            const targetPanel = document.getElementById("devToolPanel_" + btn.dataset.tool);
            if (targetPanel) targetPanel.classList.add("active");
        });
    });

    // JSON Tool
    const jsonInput = document.querySelector("#jsonToolInput");
    const jsonOutput = document.querySelector("#jsonToolOutput");
    const jsonFormatBtn = document.querySelector("#jsonFormatBtn");
    const jsonMinifyBtn = document.querySelector("#jsonMinifyBtn");
    const jsonStatus = document.querySelector("#jsonStatus");

    if (jsonFormatBtn && jsonInput && jsonOutput) {
        jsonFormatBtn.addEventListener("click", () => {
            try {
                const parsed = JSON.parse(jsonInput.value);
                jsonOutput.value = JSON.stringify(parsed, null, 2);
                if (jsonStatus) {
                    jsonStatus.textContent = "Valid JSON ✓";
                    jsonStatus.className = "dev_tool_status valid";
                }
            } catch (err) {
                if (jsonStatus) {
                    jsonStatus.textContent = "Error: " + err.message;
                    jsonStatus.className = "dev_tool_status invalid";
                }
            }
        });

        jsonMinifyBtn.addEventListener("click", () => {
            try {
                const parsed = JSON.parse(jsonInput.value);
                jsonOutput.value = JSON.stringify(parsed);
                if (jsonStatus) {
                    jsonStatus.textContent = "Minified JSON ✓";
                    jsonStatus.className = "dev_tool_status valid";
                }
            } catch (err) {
                if (jsonStatus) {
                    jsonStatus.textContent = "Error: " + err.message;
                    jsonStatus.className = "dev_tool_status invalid";
                }
            }
        });
    }

    // Base64 Tool
    const b64Input = document.querySelector("#b64Input");
    const b64Output = document.querySelector("#b64Output");
    const b64EncodeBtn = document.querySelector("#b64EncodeBtn");
    const b64DecodeBtn = document.querySelector("#b64DecodeBtn");

    if (b64EncodeBtn && b64Input && b64Output) {
        b64EncodeBtn.addEventListener("click", () => {
            try {
                b64Output.value = btoa(unescape(encodeURIComponent(b64Input.value)));
            } catch (e) {
                b64Output.value = "Encoding error: " + e.message;
            }
        });
        b64DecodeBtn.addEventListener("click", () => {
            try {
                b64Output.value = decodeURIComponent(escape(atob(b64Input.value)));
            } catch (e) {
                b64Output.value = "Invalid Base64 string!";
            }
        });
    }

    // URL Tool
    const urlInput = document.querySelector("#urlInput");
    const urlOutput = document.querySelector("#urlOutput");
    const urlEncodeBtn = document.querySelector("#urlEncodeBtn");
    const urlDecodeBtn = document.querySelector("#urlDecodeBtn");

    if (urlEncodeBtn && urlInput && urlOutput) {
        urlEncodeBtn.addEventListener("click", () => {
            urlOutput.value = encodeURIComponent(urlInput.value);
        });
        urlDecodeBtn.addEventListener("click", () => {
            try {
                urlOutput.value = decodeURIComponent(urlInput.value);
            } catch (e) {
                urlOutput.value = "Malformed URL sequence";
            }
        });
    }

    // Color Tool
    const colorPickerInput = document.querySelector("#colorPickerInput");
    const colorPreviewBox = document.querySelector("#colorPreviewBox");
    const colorHexVal = document.querySelector("#colorHexVal");
    const colorRgbVal = document.querySelector("#colorRgbVal");

    function hexToRgb(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return `rgb(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255})`;
    }

    if (colorPickerInput) {
        colorPickerInput.addEventListener("input", () => {
            const hex = colorPickerInput.value;
            if (colorPreviewBox) colorPreviewBox.style.backgroundColor = hex;
            if (colorHexVal) colorHexVal.value = hex;
            if (colorRgbVal) colorRgbVal.value = hexToRgb(hex);
        });
    }

    // Regex Tool
    const regexPattern = document.querySelector("#regexPattern");
    const regexFlags = document.querySelector("#regexFlags");
    const regexTestText = document.querySelector("#regexTestText");
    const regexMatches = document.querySelector("#regexMatches");

    function testRegex() {
        if (!regexPattern || !regexTestText || !regexMatches) return;
        const pat = regexPattern.value;
        const flags = regexFlags ? regexFlags.value : "g";
        const text = regexTestText.value;

        if (!pat) {
            regexMatches.innerHTML = `<span style="color: #64748b;">Enter pattern to test...</span>`;
            return;
        }

        try {
            const re = new RegExp(pat, flags);
            const matches = [...text.matchAll(re)];
            if (matches.length === 0) {
                regexMatches.innerHTML = `<span style="color: #f87171;">No matches found.</span>`;
            } else {
                regexMatches.innerHTML = `<div style="color: #38ef7d; margin-bottom: 0.5vmin;">Found ${matches.length} match(es):</div>` +
                    matches.map((m, i) => `<div style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; margin-bottom: 3px;">Match ${i+1}: <strong>"${m[0]}"</strong> at index ${m.index}</div>`).join('');
            }
        } catch (e) {
            regexMatches.innerHTML = `<span style="color: #f87171;">Regex Error: ${e.message}</span>`;
        }
    }

    if (regexPattern) regexPattern.addEventListener("input", testRegex);
    if (regexFlags) regexFlags.addEventListener("input", testRegex);
    if (regexTestText) regexTestText.addEventListener("input", testRegex);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDevTools);
} else {
    setTimeout(initDevTools, 50);
}
