// CoderOS Matrix Digital Rain Screen Effect
let matrixActive = false;
let matrixInterval = null;

function initMatrixOverlay() {
    let canvas = document.getElementById("matrixOverlayCanvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "matrixOverlayCanvas";
        document.body.appendChild(canvas);
    }
}

function toggleMatrixRain() {
    initMatrixOverlay();
    const canvas = document.getElementById("matrixOverlayCanvas");
    if (!canvas) return false;

    matrixActive = !matrixActive;

    if (matrixActive) {
        canvas.style.display = "block";
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*<>{}[]=/+";
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        matrixInterval = setInterval(() => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00ff66";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 33);
    } else {
        canvas.style.display = "none";
        clearInterval(matrixInterval);
    }

    return matrixActive;
}

window.addEventListener("resize", () => {
    const canvas = document.getElementById("matrixOverlayCanvas");
    if (canvas && matrixActive) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
