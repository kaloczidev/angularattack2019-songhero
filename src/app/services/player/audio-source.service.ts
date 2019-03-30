import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioSourceService {
  audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  setTrack(url: string) {
    this.audio.src = url;
  }

  play() {
    return this.audio.play();
  }

  pause() {
    return this.audio.pause();
  }


}
