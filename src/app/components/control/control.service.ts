import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { PlayerService } from '../player/player.service';
import { DISPLAY_VERTICAL_DIVISION } from './control.config';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  map: Uint8Array = new Uint8Array([]);
  subMap: Subject<Uint8Array> = new Subject();

  constructor(private playerService: PlayerService) {
    this.playerService.onPositionChanged.subscribe((trackPosition) => {
      const index = this.map.length * trackPosition.relativePosition | 0;
      if (index > 0) this.subMap.next(this.map.subarray(index, index + DISPLAY_VERTICAL_DIVISION));
    });
  }
}
