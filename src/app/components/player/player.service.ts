import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export interface TrackPosition {
  currentPosition: number;
  loadedProgress: number;
  relativePosition: number;
  soundId: number;
}

export enum PlayerStatus {
  PLAY,
  PAUSE,
  FINISHED,
  IDLE
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  status = new BehaviorSubject<PlayerStatus>(PlayerStatus.IDLE);
  urlChange = new BehaviorSubject<string>('');
  onPositionChanged = new Subject<TrackPosition>();

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
