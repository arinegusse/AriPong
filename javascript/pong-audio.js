import * as Tone from "./Tone.js";

/* Pong audio (Tone.js v14-safe) */

class SoundFile {
  constructor(file) {
    this.deferPlay = false;

    // IMPORTANT: do NOT chain .toDestination() on the assignment line
    this.player = new Tone.Player("./sounds/" + file);
    this.player.toDestination();

    // Defaults
    this.player.loop = false;
    this.player.autostart = false;
  }

  play() {
    // defer playback if sound isn't finished loading
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

export const soundArray = [];

export function playDeferredSounds() {
  for (let i = 0; i < soundArray.length; i++) {
    if (soundArray[i].deferPlay === true) {
      soundArray[i].play();
    }
  }
}

// --- Sounds ---
export const wallSound = new SoundFile("wall_hit.wav");
soundArray.push(wallSound);

export const paddleSound = new SoundFile("paddle_hit.wav");
soundArray.push(paddleSound);

export const scoreSound = new SoundFile("score_eerie_low.wav");
soundArray.push(scoreSound);

export const ambientSound = new SoundFile("tree1.mp3");
soundArray.push(ambientSound);
ambientSound.player.loop = true;
ambientSound.player.volume.value = -20;

// Keep these if your instructor code expects them
export const adventureMusic = new SoundFile("silence.mp3");
soundArray.push(adventureMusic);
adventureMusic.player.loop = true;
adventureMusic.player.volume.value = -16;

export const villageMusic = new SoundFile("silence.mp3");
soundArray.push(villageMusic);
villageMusic.player.loop = true;
villageMusic.player.volume.value = -16;
