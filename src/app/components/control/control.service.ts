import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerService } from '../../services/player/player.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  map: Uint8Array = new Uint8Array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]);
  position: Subject<number> = new Subject();

  constructor(private playerService: PlayerService) {
    this.playerService.position.subscribe((trackPosition) => {
      const index = this.map.length * trackPosition.relativePosition | 0;
      console.log(index);
    });
  }

  setPosition(percent: number): void {

  }
}
