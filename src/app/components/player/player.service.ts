import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Track} from '../audio/audio.component';

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
  seek = new Subject<number>();
  track: Track;

  constructor() {
  }

  play() {
    this.status.next(PlayerStatus.PLAY);
    console.log('genny');
  }

  pause() {
    this.status.next(PlayerStatus.PAUSE);
  }

  getDuration() {
    return this.track.duration;
  }

  seekTo(ms: number) {
    this.seek.next(ms);
  }

  setTrack(track: Track) {
    this.track = track;
    this.urlChange.next(track.trackId);
  }
}
