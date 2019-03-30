import {Injectable} from '@angular/core';
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
  position = new BehaviorSubject<TrackPosition>({currentPosition: 0, loadedProgress: 0, relativePosition: 0, soundId: 0});

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
