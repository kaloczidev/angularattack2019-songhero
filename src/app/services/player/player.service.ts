import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface TrackPosition {
  currentPosition: number;
  loadedProgress: number;
  relativePosition: number;
  soundId: number;
}

export enum PlayerStatus {
  PLAY,
  PAUSE
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  status = new BehaviorSubject<PlayerStatus>(null);
  urlChange = new BehaviorSubject<string>('');
  position = new BehaviorSubject<TrackPosition>(null);
  constructor() {
  }
  play() {
    this.status.next(PlayerStatus.PLAY);
  }

  pause() {
    this.status.next(PlayerStatus.PAUSE);
  }
  setUrl(url: string) {
    this.urlChange.next(url);
  }
}
