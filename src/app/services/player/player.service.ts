import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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
