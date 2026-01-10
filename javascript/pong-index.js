// pong-index.js
// This is the MAIN entry point for the game

// Import game logic files (do not redeclare anything)
import "./pong-classes.js";
import "./pong-util.js";
import "./pong-events.js";

// Import audio safely (native Audio, no Tone)
import {
  ambientSound,
  unlockAudio,
  playDeferredSounds
} from "./pong-audio.js";

// -----------------------------
// AUDIO START (only once)
// -----------------------------
let audioStarted = false;

function startAudioOnce() {
  if (audioStarted) return;
  audioStarted = true;

  unlockAudio();
  ambientSound.play();
  playDeferredSounds();
}

// Browsers require user interaction before sound
window.addEventListener("pointerdown", startAudioOnce, { once: true });
window.addEventListener("keydown", startAudioOnce, { once: true });

// -----------------------------
// GAME START
// -----------------------------
// If your game loop already existed before (it did),
// it will automatically run once these imports load.
// Nothing else is needed here.
