// CoderOS Developer Mascot & Rubber Duck Debugger Widget
const catWidgetImage = document.querySelector('#catImageContainer');
const catMeowAudio = document.querySelector('#catMeowSound');
const duckSpeechBubble = document.querySelector('#duckSpeechBubble');
const cpuBarFill = document.querySelector('#cpuBarFill');
const ramBarFill = document.querySelector('#ramBarFill');
const cpuText = document.querySelector('#cpuText');
const ramText = document.querySelector('#ramText');

const duckAdvice = [
    "Duck: Have you tried explaining your code line-by-line?",
    "Duck: Check your semicolons and closing brackets! 🦆",
    "Duck: Did you check for null or undefined?",
    "Duck: 'It works on my machine' is not a deployment strategy! 😉",
    "Duck: Try restarting the dev server.",
    "Duck: Git commit before trying risky refactoring!",
    "Duck: Drink some water and stretch your legs.",
    "Duck: When in doubt, console.log everything!",
    "Duck: 99 bugs in the code, fix one, 127 bugs in the code.",
    "Duck: Remember: Premature optimization is the root of all evil."
];

let adviceIndex = 0;

if (catWidgetImage) {
    catWidgetImage.addEventListener('click', function () {
        if (catMeowAudio) {
            try {
                catMeowAudio.currentTime = 0;
                catMeowAudio.play().catch(() => {});
            } catch (e) {}
        }
        catWidgetImage.classList.add("cat_pressed");
        setTimeout(function () {
            catWidgetImage.classList.remove("cat_pressed");
        }, 150);

        adviceIndex = (adviceIndex + 1) % duckAdvice.length;
        if (duckSpeechBubble) {
            duckSpeechBubble.textContent = duckAdvice[adviceIndex];
        }
    });
}

// Simulated real-time CPU & RAM oscillation
setInterval(() => {
    if (!cpuBarFill || !ramBarFill) return;
    const cpu = Math.floor(12 + Math.random() * 25);
    const ram = Math.floor(42 + Math.random() * 8);

    cpuBarFill.style.width = cpu + '%';
    ramBarFill.style.width = ram + '%';

    if (cpuText) cpuText.textContent = `CPU: ${cpu}%`;
    if (ramText) ramText.textContent = `RAM: ${ram}%`;
}, 2000);