const startMenu = document.querySelector("#startMenu");
const enterDesktopButton = document.querySelector("#enterDesktopButton");

const loadingScreen = document.querySelector("#loadingScreen");
const loadingScreenProgressBar = document.querySelector("#loadingProgress");
const loadingText = document.querySelector("#loadingText");

let loadingProgress = 0;
let pageLoaded = false;
const totalPathLength = 280;
let isFinished = false;

function setCatStroke(progressVal) {
    if (!loadingScreenProgressBar) return;
    const offset = totalPathLength - (Math.min(progressVal, 100) / 100) * totalPathLength;
    loadingScreenProgressBar.style.strokeDashoffset = offset;
}

function finishLoading() {
    if (isFinished) return;
    isFinished = true;
    pageLoaded = true;
    clearInterval(loadingInterval);
    loadingProgress = 100;
    setCatStroke(100);

    if (loadingScreenProgressBar) {
        loadingScreenProgressBar.style.transition = "stroke-dashoffset 0.25s ease-out";
    }
    if (loadingText) {
        loadingText.classList.add("no_animation");
        loadingText.innerHTML = "<span>C</span><span>o</span><span>d</span><span>e</span><span>r</span><span>O</span><span>S</span><span>&nbsp;</span><span>R</span><span>e</span><span>a</span><span>d</span><span>y</span><span>!</span>";
    }

    setTimeout(function () {
        if (loadingScreen) {
            loadingScreen.classList.add("loading_screen_hidden");
            setTimeout(function () {
                loadingScreen.style.display = "none";
            }, 350);
        }
    }, 450);
}

// Smooth animated loader that completes in ~1.2 seconds
const loadingInterval = setInterval(function () {
    if (pageLoaded) return;

    if (loadingProgress < 60) {
        loadingProgress += 4;
    } else if (loadingProgress < 90) {
        loadingProgress += 2.5;
    } else if (loadingProgress < 100) {
        loadingProgress += 1.5;
    } else {
        finishLoading();
        return;
    }

    setCatStroke(loadingProgress);
}, 25);

function enterDesktop() {
    enterDesktopButton.classList.add("enter_desktop_button_pressed");
    startMenu.classList.add("start_menu_hide");
    setTimeout(function () {
        enterDesktopButton.classList.remove("enter_desktop_button_pressed");
        startMenu.style.display = "none";
    }, 200);
}

function enterStartMenu() {
    startMenu.style.display = "flex";
    void startMenu.offsetWidth;
    startMenu.classList.remove("start_menu_hide");
}

// Allow user to click anywhere on loading screen to bypass
if (loadingScreen) {
    loadingScreen.addEventListener("click", finishLoading);
}

// Load event trigger
window.addEventListener("load", function () {
    setTimeout(finishLoading, 400);
});

// Fallbacks: if already loaded or after guaranteed timeout
if (document.readyState === "complete") {
    setTimeout(finishLoading, 600);
}
setTimeout(finishLoading, 1800);

if (enterDesktopButton) {
    enterDesktopButton.addEventListener("click", function () {
        enterDesktop();
    });
}