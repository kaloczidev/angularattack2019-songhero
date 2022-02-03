import {interval, Observable, Subject, Subscriber} from 'rxjs';

import {Injectable} from '@angular/core';

import {PlayerService} from '../player/player.service';
import {DISPLAY_DELAY_UNIT, DISPLAY_VERTICAL_DIVISION} from './control.config';
import {REFRESH_RATE} from '../player/player.component';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  map: Uint8Array = new Uint8Array([]);
  subMap: Subject<Uint8Array> = new Subject();

  delayPlayback(delayTime: number) {
    return <T>(source: Observable<T>) => {
      const buffer = [];
      return new Observable((subscriber: Subscriber<T>) => {
        source.subscribe((value) => {
          buffer.push(value);
        });

        interval(delayTime)
          .subscribe(() => {
            const next = buffer.shift();
            if (next) subscriber.next(next);
          });
      });
    };
  }

  constructor(private playerService: PlayerService) {
    this.playerService.onPositionChanged.pipe(
      this.delayPlayback(REFRESH_RATE * 1.1)
    ).subscribe((trackPosition) => {
      const index = (this.map.length * trackPosition.relativePosition | 0) - DISPLAY_DELAY_UNIT;
      if (index > 0) this.subMap.next(this.map.subarray(index, index + DISPLAY_VERTICAL_DIVISION));
    });
  }
}
