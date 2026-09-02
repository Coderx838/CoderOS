// CoderOS Developer System Metrics & Architecture Wisdom
const catWidgetImage = document.querySelector('#catImageContainer');
const catMeowAudio = document.querySelector('#catMeowSound');
const duckSpeechBubble = document.querySelector('#duckSpeechBubble');
const cpuBarFill = document.querySelector('#cpuBarFill');
const ramBarFill = document.querySelector('#ramBarFill');
const cpuText = document.querySelector('#cpuText');
const ramText = document.querySelector('#ramText');

const devPrinciples = [
    "💡 Premature optimization is the root of all evil. Profile first.",
    "💡 Keep dependencies minimal. The fastest code is the code never written.",
    "💡 Prefer composition over inheritance. Small, focused modules win.",
    "💡 Make the change easy, then make the easy change. — Kent Beck",
    "💡 Pure functions and immutable state prevent 90% of race conditions.",
    "💡 Use AbortController for clean async lifecycle management.",
    "💡 Treat infrastructure as code and automate reproducible builds.",
    "💡 Readable code is better than clever code. Always optimize for humans.",
    "💡 Cache invalidation and naming things: the two hard problems in CS.",
    "💡 Git commit small, atomic units of work with clear context."
];

let principleIndex = 0;

if (catWidgetImage) {
    catWidgetImage.addEventListener('click', function () {
        if (window.cyberAudio) {
            window.cyberAudio.playKeyClick();
        }
        catWidgetImage.classList.add("cat_pressed");
        setTimeout(function () {
            catWidgetImage.classList.remove("cat_pressed");
        }, 150);

        principleIndex = (principleIndex + 1) % devPrinciples.length;
        if (duckSpeechBubble) {
            duckSpeechBubble.textContent = devPrinciples[principleIndex];
        }
    });
}

if (duckSpeechBubble) {
    duckSpeechBubble.addEventListener('click', function () {
        if (window.cyberAudio) window.cyberAudio.playKeyClick();
        principleIndex = (principleIndex + 1) % devPrinciples.length;
        duckSpeechBubble.textContent = devPrinciples[principleIndex];
    });
}

// Realistic subtle system metrics oscillation
setInterval(() => {
    if (!cpuBarFill || !ramBarFill) return;
    const cpu = Math.floor(18 + Math.random() * 14);
    const ramGB = (3.8 + Math.random() * 0.6).toFixed(1);
    const ramPercent = Math.floor((ramGB / 16.0) * 100);

    cpuBarFill.style.width = cpu + '%';
    ramBarFill.style.width = ramPercent + '%';

    if (cpuText) cpuText.textContent = `${cpu}% (8 Cores)`;
    if (ramText) ramText.textContent = `${ramGB} GB / 16 GB`;
}, 2500);