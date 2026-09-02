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

function enterDesktop() {
    if (enterDesktopButton) enterDesktopButton.classList.add("enter_desktop_button_pressed");
    if (startMenu) {
        startMenu.classList.add("start_menu_hide");
        setTimeout(function () {
            startMenu.style.display = "none";
        }, 150);
    }
}

function enterStartMenu() {
    if (!startMenu) return;
    startMenu.style.display = "flex";
    void startMenu.offsetWidth;
    startMenu.classList.remove("start_menu_hide");
}

function finishLoading() {
    if (isFinished) return;
    isFinished = true;
    pageLoaded = true;
    clearInterval(loadingInterval);
    loadingProgress = 100;
    setCatStroke(100);

    if (loadingScreenProgressBar) {
        loadingScreenProgressBar.style.transition = "stroke-dashoffset 0.2s ease-out";
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
            }, 300);
        }
        // Transition straight into desktop
        enterDesktop();
    }, 400);
}

// Fast, smooth boot progress (completes in ~800ms)
const loadingInterval = setInterval(function () {
    if (pageLoaded) return;

    if (loadingProgress < 70) {
        loadingProgress += 5;
    } else if (loadingProgress < 100) {
        loadingProgress += 3;
    } else {
        finishLoading();
        return;
    }

    setCatStroke(loadingProgress);
}, 20);

// Allow clicking anywhere to skip boot instantly
if (loadingScreen) {
    loadingScreen.addEventListener("click", finishLoading);
}

// Window load triggers finish
window.addEventListener("load", function () {
    setTimeout(finishLoading, 200);
});

// Guaranteed failsafe timeout
if (document.readyState === "complete") {
    setTimeout(finishLoading, 400);
}
setTimeout(finishLoading, 1000);

if (enterDesktopButton) {
    enterDesktopButton.addEventListener("click", function () {
        enterDesktop();
    });
}