import * as Tone from "./Tone.js";

/*
  Audio system for Pong
  Uses Tone.js v14 in a safe, non-crashing way
*/

class SoundFile {
  constructor(file) {
    this.deferPlay = false;

    // Create player using supported Tone v14 syntax
    this.player = new Tone.Player("./sounds/" + file);
    this.player.toDestination();
    this.player.loop = false;
  }

  play() {
    if (this.player.loaded) {
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

// Retry any sounds that tried to play before loading
export function playDeferredSounds() {
  soundArray.forEach(sound => {
    if (sound.deferPlay) sound.play();
  });
}

export const soundArray = [];

// ---- GAME SOUNDS ----
export const wallSound = new SoundFile("wall_hit.wav");
soundArray.push(wallSound);

export const paddleSound = new SoundFile("paddle_hit.wav");
soundArray.push(paddleSound);

export const scoreSound = new SoundFile("score_eerie_low.wav");
soundArray.push(scoreSound);

// ---- AMBIENT LOOP ----
export const ambientSound = new SoundFile("tree1.mp3");
soundArray.push(ambientSound);
ambientSound.player.loop = true;
ambientSound.player.volume.value = -20;

// ---- UNUSED (kept for compatibility with your project) ----
export const adventureMusic = new SoundFile("silence.mp3");
soundArray.push(adventureMusic);

export const villageMusic = new SoundFile("silence.mp3");
soundArray.push(villageMusic);
