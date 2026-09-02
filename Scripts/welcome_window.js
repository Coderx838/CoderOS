const pageSelector1 = document.querySelector("#welcomeWindowPageSelector1");
const pageSelector2 = document.querySelector("#welcomeWindowPageSelector2");
const pageSelector3 = document.querySelector("#welcomeWindowPageSelector3");
const windowContent = document.querySelector("#welcomeWindowContent");

let savedDevName = localStorage.getItem("coderOS_devName") || "Ayan (Lead Developer)";
let savedDevTitle = localStorage.getItem("coderOS_devTitle") || "Full Stack Software Engineer & Hacker";
let savedDevBio = localStorage.getItem("coderOS_devBio") || "Welcome to CoderOS — my tailored web operating system for coding, experiments, and developer productivity.";

function getWelcomePages() {
    return [
        {
            content: `
                <div class="welcome_window_page">
                    <div class="welcome_window_page_header">
                        <h1 class="welcome_window_title">CoderOS Station</h1>
                    </div>
                    <div class="welcome_window_content">
                        <div class="welcome_profile_card">
                            <img src="Images/Favicon.svg" alt="Dev Logo" class="welcome_profile_avatar">
                            <div class="welcome_profile_details">
                                <input type="text" id="devNameInput" class="welcome_profile_name_input" value="${escapeWelcomeHTML(savedDevName)}" placeholder="Your Name">
                                <input type="text" id="devTitleInput" class="welcome_profile_title_input" value="${escapeWelcomeHTML(savedDevTitle)}" placeholder="Your Title">
                            </div>
                        </div>

                        <h3 style="font-size: 1.4vmin; color: #38ef7d; margin-top: 1vmin;">About Workspace:</h3>
                        <p style="font-size: 1.25vmin; line-height: 1.4; color: #cbd5e1;" contenteditable="true" id="devBioInput">${escapeWelcomeHTML(savedDevBio)}</p>

                        <h3 style="font-size: 1.4vmin; color: #00f2fe; margin-top: 1vmin;">Tech Stack & Tooling:</h3>
                        <div class="tech_badge_container">
                            <span class="tech_badge">JavaScript (ES6+)</span>
                            <span class="tech_badge">HTML5 / CSS3</span>
                            <span class="tech_badge">Python</span>
                            <span class="tech_badge">React & Node.js</span>
                            <span class="tech_badge">Git & Shell</span>
                            <span class="tech_badge">Docker</span>
                            <span class="tech_badge">Linux</span>
                        </div>

                        <div style="font-size: 1.1vmin; color: #94a3b8; margin-top: 1vmin;">
                            💡 Tip: You can edit your name, title, and bio directly above — changes are saved automatically!
                        </div>
                    </div>
                </div>
            `
        },
        {
            content: `
                <div class="welcome_window_page">
                    <div class="welcome_window_page_header">
                        <h1 class="welcome_window_title">Developer Apps & Features</h1>
                    </div>
                    <div class="welcome_window_content welcome_feature_list">
                        <div class="welcome_feature_item">
                            <i class="material-icons">code</i>
                            <div><strong>Code Studio IDE:</strong> Write HTML, CSS, & JS with live interactive sandboxed preview and preset templates.</div>
                        </div>
                        <div class="welcome_feature_item">
                            <i class="material-icons">terminal</i>
                            <div><strong>CoderShell v1.0:</strong> Interactive developer terminal with JS eval, neofetch sysinfo, and app launchers.</div>
                        </div>
                        <div class="welcome_feature_item">
                            <i class="material-icons">build</i>
                            <div><strong>Dev Tools Suite:</strong> JSON formatter/minifier, Base64 encoder/decoder, URL tools, and Regex tester.</div>
                        </div>
                        <div class="welcome_feature_item">
                            <i class="material-icons">folder</i>
                            <div><strong>Files Explorer:</strong> Manage mock projects, scripts, documentation, and notes.</div>
                        </div>
                        <div class="welcome_feature_item">
                            <i class="material-icons">public</i>
                            <div><strong>Web Browser:</strong> Browse developer documentation and online resources.</div>
                        </div>
                        <div class="welcome_feature_item">
                            <i class="material-icons">palette</i>
                            <div><strong>Cyber Themes:</strong> Matrix digital rain, Cyberpunk neon, Dracula dark, and custom palettes.</div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            content: `
                <div class="welcome_window_page">
                    <div class="welcome_window_page_header">
                        <h1 class="welcome_window_title">Shortcuts & Cheatsheet</h1>
                    </div>
                    <div class="welcome_window_content">
                        <p style="margin-bottom: 1vmin; font-size: 1.3vmin;">Master your CoderOS workflow with these shortcuts:</p>
                        
                        <div style="background: rgba(0,0,0,0.3); padding: 1vmin; border-radius: 0.8vmin; font-family: monospace; font-size: 1.2vmin; line-height: 1.8;">
                            <div><span style="color: #38ef7d;">Terminal -> 'code'</span>       : Launch Code Studio</div>
                            <div><span style="color: #38ef7d;">Terminal -> 'devtools'</span>   : Launch Dev Tools Suite</div>
                            <div><span style="color: #38ef7d;">Terminal -> 'eval &lt;code&gt;'</span> : Run JS in terminal</div>
                            <div><span style="color: #38ef7d;">Terminal -> 'matrix'</span>     : Toggle Matrix rain</div>
                            <div><span style="color: #38ef7d;">Terminal -> 'theme matrix'</span>: Switch to Matrix theme</div>
                            <div><span style="color: #38ef7d;">Top Bar Clock</span>          : Open Control Center</div>
                            <div><span style="color: #38ef7d;">Top Left Logo</span>          : Quick App Search</div>
                        </div>

                        <div style="margin-top: 1.5vmin; text-align: center; color: #38ef7d; font-weight: bold; font-size: 1.4vmin;">
                            CoderOS — Built for Developers, Hackers & Builders.
                        </div>
                    </div>
                </div>
            `
        }
    ];
}

function escapeWelcomeHTML(str) {
    return String(str).replace(/"/g, '&quot;');
}

function setWelcomeContent(index) {
    const pages = getWelcomePages();
    windowContent.innerHTML = pages[index].content;

    if (index === 0) {
        const nameInput = document.querySelector("#devNameInput");
        const titleInput = document.querySelector("#devTitleInput");
        const bioInput = document.querySelector("#devBioInput");

        if (nameInput) {
            nameInput.addEventListener("input", (e) => {
                savedDevName = e.target.value;
                localStorage.setItem("coderOS_devName", savedDevName);
            });
        }
        if (titleInput) {
            titleInput.addEventListener("input", (e) => {
                savedDevTitle = e.target.value;
                localStorage.setItem("coderOS_devTitle", savedDevTitle);
            });
        }
        if (bioInput) {
            bioInput.addEventListener("input", (e) => {
                savedDevBio = e.target.innerText;
                localStorage.setItem("coderOS_devBio", savedDevBio);
            });
        }
    }
}

setWelcomeContent(0);

if (pageSelector1) {
    pageSelector1.innerHTML = "1";
    pageSelector1.classList.add("page_selected");
    pageSelector1.addEventListener("click", function () {
        pageSelector1.classList.add("select_page");
        setWelcomeContent(0);
        setTimeout(() => pageSelector1.classList.remove("select_page"), 150);
        pageSelector1.classList.add("page_selected");
        pageSelector2.classList.remove("page_selected");
        pageSelector3.classList.remove("page_selected");
    });
}

if (pageSelector2) {
    pageSelector2.innerHTML = "2";
    pageSelector2.addEventListener("click", function () {
        pageSelector2.classList.add("select_page");
        setWelcomeContent(1);
        setTimeout(() => pageSelector2.classList.remove("select_page"), 150);
        pageSelector1.classList.remove("page_selected");
        pageSelector2.classList.add("page_selected");
        pageSelector3.classList.remove("page_selected");
    });
}

if (pageSelector3) {
    pageSelector3.innerHTML = "3";
    pageSelector3.addEventListener("click", function () {
        pageSelector3.classList.add("select_page");
        setWelcomeContent(2);
        setTimeout(() => pageSelector3.classList.remove("select_page"), 150);
        pageSelector1.classList.remove("page_selected");
        pageSelector2.classList.remove("page_selected");
        pageSelector3.classList.add("page_selected");
    });
}