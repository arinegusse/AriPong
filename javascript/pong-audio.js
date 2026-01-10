// Native audio (no Tone.js). Safe on GitHub Pages.
// NOTE: pong-audio.js is inside /javascript, so we must go UP one folder to reach /sounds
const SOUND_BASE = "../sounds/";

class SoundFile {
  constructor(file, { loop = false, volume = 0.6 } = {}) {
    this.file = file;
    this.deferPlay = false;

    this.audio = new Audio(SOUND_BASE + file);
    this.audio.preload = "auto";
    this.audio.loop = loop;
    this.audio.volume = volume;

    // Mark as ready when it can play
    this.ready = false;
    this.audio.addEventListener("canplaythrough", () => {
      this.ready = true;
      if (this.deferPlay) {
        this.deferPlay = false;
        this.play();
      }
    });
  }

  play() {
    // browsers block autoplay until user interacts
    // so we try; if blocked, we mark deferPlay for next unlock
    try {
      this.audio.currentTime = 0;
      const p = this.audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          this.deferPlay = true;
        });
      }
    } catch {
      this.deferPlay = true;
    }
  }

  stop() {
    try {
      this.audio.pause();
      this.audio.currentTime = 0;
    } catch {}
  }
}

export const soundArray = [];

export function playDeferredSounds() {
  for (const s of soundArray) {
    if (s.deferPlay) s.play();
  }
}

// --- Your sounds (must exist in /sounds/) ---
export const wallSound = new SoundFile("wall_hit.wav", { volume: 0.6 });
soundArray.push(wallSound);

export const paddleSound = new SoundFile("paddle_hit.wav", { volume: 0.7 });
soundArray.push(paddleSound);

export const scoreSound = new SoundFile("score_eerie_low.wav", { volume: 0.8 });
soundArray.push(scoreSound);

export const ambientSound = new SoundFile("tree1.mp3", { loop: true, volume: 0.25 });
soundArray.push(ambientSound);

// kept for compatibility if your teacher's code references them
export const adventureMusic = new SoundFile("silence.mp3", { loop: true, volume: 0.25 });
soundArray.push(adventureMusic);

export const villageMusic = new SoundFile("silence.mp3", { loop: true, volume: 0.25 });
soundArray.push(villageMusic);

// Unlock helper (call this once on first click/keypress)
export function unlockAudio() {
  // A tiny play/pause “primes” audio on some browsers
  for (const s of soundArray) {
    try {
      s.audio.play().then(() => {
        s.audio.pause();
        s.audio.currentTime = 0;
      }).catch(() => {});
    } catch {}
  }
}
