import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Track} from '../audio/audio.component';
import { ScoreService } from '../score/score.service';

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
  urlChange = new BehaviorSubject<string>('34743391');
  onPositionChanged = new Subject<TrackPosition>();
  seek = new Subject<number>();
  loading = new BehaviorSubject<boolean>(false);
  gamestart = new Subject();
  track: Track;

  constructor(private score: ScoreService) {
  }

  play() {
    this.status.next(PlayerStatus.PLAY);
    this.score.reset();
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
