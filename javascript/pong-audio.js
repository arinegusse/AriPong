import * as Tone from "./Tone.js";

class soundFile {
  constructor(file) {
    this.deferPlay = false;

    // Use the simple constructor form that works reliably in Tone v14
    this.player.loop = false;
    this.player.autostart = false;
  }

  // Play function with pre-stop and deferred playing
  play() {
    if (this.player.loaded === true) {
      this.deferPlay = false;
      this.player.stop();
      this.player.start();
    } else {
      this.deferPlay = true;
    }
  }

  stop() {
    this.player.stop();
  }
}

// Try to play sounds that had their playback deferred
export function playDeferredSounds() {
  for (let i = 0; i < soundArray.length; i++) {
    if (soundArray[i].deferPlay === true) {
      soundArray[i].play();
    }
  }
}

export const soundArray = [];

// --- Sound players ---
export const wallSound = new soundFile("wall_hit.wav");
soundArray.push(wallSound);

export const paddleSound = new soundFile("paddle_hit.wav");
soundArray.push(paddleSound);

export const scoreSound = new soundFile("score_eerie_low.wav");
soundArray.push(scoreSound);

export const ambientSound = new soundFile("tree1.mp3");
soundArray.push(ambientSound);
ambientSound.player.loop = true;
ambientSound.player.volume.value = -20;

// Keep these if your teacher’s project expects them
export const adventureMusic = new soundFile("silence.mp3");
soundArray.push(adventureMusic);
adventureMusic.player.loop = true;
adventureMusic.player.volume.value = -16;

export const villageMusic = new soundFile("silence.mp3");
soundArray.push(villageMusic);
villageMusic.player.loop = true;
villageMusic.player.volume.value = -16;
