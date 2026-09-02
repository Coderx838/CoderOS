// CoderOS Cyber Synthesizer Engine (Pure Web Audio API - Zero External Dependencies)
class CyberAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem("coderOS_sound_enabled") !== "false";
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    toggleSound(forceState) {
        this.enabled = forceState !== undefined ? forceState : !this.enabled;
        localStorage.setItem("coderOS_sound_enabled", this.enabled);
        return this.enabled;
    }

    // Mechanical keyboard switch click
    playKeyClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Mechanical clack click frequencies
        const baseFreq = 800 + Math.random() * 300;
        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    // High-tech window open chime (upward arpeggio)
    playWindowOpen() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = this.ctx.currentTime + idx * 0.04;

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.05, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.12);
        });
    }

    // High-tech window close swoosh
    playWindowClose() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    // Terminal retro beep
    playBeep(freq = 880, duration = 0.08) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    // Retro 8-bit victory chime (e.g. for hacker access granted)
    playHackSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const melody = [
            { f: 440, d: 0.08 },
            { f: 554.37, d: 0.08 },
            { f: 659.25, d: 0.08 },
            { f: 880, d: 0.25 }
        ];

        let time = this.ctx.currentTime;
        melody.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "square";
            osc.frequency.setValueAtTime(note.f, time);

            gain.gain.setValueAtTime(0.06, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + note.d);
            time += note.d * 0.85;
        });
    }
}

window.cyberAudio = new CyberAudioEngine();

// Hook mechanical typing audio into textareas, inputs, and editable elements
document.addEventListener("keydown", (e) => {
    // Only play on key characters or navigation
    if (e.key && e.key.length === 1 || e.key === "Backspace" || e.key === "Enter" || e.key === "Tab") {
        window.cyberAudio.playKeyClick();
    }
});
