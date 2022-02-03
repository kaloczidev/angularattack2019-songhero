import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Track} from '../audio/audio.component';
import { ScoreService } from '../score/score.service';

export interface TrackPosition {
  currentPosition?: number;
  loadedProgress?: number;
  relativePosition: number;
  soundId?: number;
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
  onPositionChanged = new Subject<TrackPosition>();
  seek = new Subject<number>();
  loading = new BehaviorSubject<boolean>(false);
  gamestart = new Subject();
  duration = 0;

  constructor(private score: ScoreService) {
  }

  play() {
    this.status.next(PlayerStatus.PLAY);
    this.score.reset();
  }

  pause() {
    this.status.next(PlayerStatus.PAUSE);
  }

  seekTo(s: number) {
    this.seek.next(s);
  }
}
