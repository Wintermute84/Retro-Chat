// sound.js
import { Howl } from 'howler';

export const playMessageSound = () => {
  console.log("played")
  new Howl({ src: ['./assets/soundeffects/ding.mp3'] }).play();
};

