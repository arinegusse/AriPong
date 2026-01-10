// Native browser audio (no Tone.js)
// pong-audio.js lives in /javascript, sounds live in /sounds, so use ../sounds/
const SOUND_BASE = "../sounds/";

class SoundFile {
  constructor(file, { loop = false, volume = 0.6 } = {}) {
    this.file = file;
    this.deferPlay = false;

    this.audio = new Audio(SOUND_BASE + file);
    this.audio.preload = "auto";
    this.audio.loop = loop;
    this.audio.volume = volume;
  }

  play() {
    // Restart sound cleanly
    try {
      this.audio.currentTime = 0;
    } catch {}

    // Play; if blocked (autoplay rules), mark deferred
    const p = this.audio.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        this.deferPlay = true;
      });
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

// Try to play sounds that were blocked before user gesture
export function playDeferredSounds() {
  for (const s of soundArray) {
    if (s.deferPlay) {
      s.deferPlay = false;
      s.play();
    }
  }
}

// Unlock audio on first user gesture (helps Safari/Chrome policies)
export function unlockAudio() {
  // Prime audio elements (play/pause quickly)
  for (const s of soundArray) {
    try {
      const p = s.audio.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          s.audio.pause();
          s.audio.currentTime = 0;
        }).catch(() => {});
      }
    } catch {}
  }
}

// ---- Sounds (make sure these files exist in /sounds/) ----
export const wallSound = new SoundFile("wall_hit.wav", { volume: 0.6 });
soundArray.push(wallSound);

export const paddleSound = new SoundFile("paddle_hit.wav", { volume: 0.7 });
soundArray.push(paddleSound);

export const scoreSound = new SoundFile("score_eerie_low.wav", { volume: 0.85 });
soundArray.push(scoreSound);

export const ambientSound = new SoundFile("tree1.mp3", { loop: true, volume: 0.25 });
soundArray.push(ambientSound);

// Optional “placeholders” if other files reference them
export const adventureMusic = new SoundFile("silence.mp3", { loop: true, volume: 0.0 });
soundArray.push(adventureMusic);

export const villageMusic = new SoundFile("silence.mp3", { loop: true, volume: 0.0 });
soundArray.push(villageMusic);
