import { Component, HostListener } from '@angular/core';
import { ControlService } from './control.service';
import { DollService } from '../doll/doll.service';
import { BitValuesUtil } from '../../utils/bitValues.util';

declare function require(name: string);

const whatIsLoveBuffer: ArrayBuffer = require('./what-is-love.data');

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent {
  z: Uint8Array;

  private spaceKeyPressed = 0;


  constructor(private service: ControlService,
              private dollService: DollService
  ) {
    this.z = new Uint8Array(4 * 8);
    this.z.fill(0);

    service.map = new Uint8Array(whatIsLoveBuffer);
    service.subMap.subscribe((subMap: Uint8Array) => this.z = subMap);
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.spaceKeyPressed = 0;
      this.dollService.openMouth();
      event.preventDefault();
    }
    if(event.code === 'ArrowRight') this.dollService.bolintRight();
    if(event.code === 'ArrowLeft') this.dollService.bolintLeft();
    if(event.code === 'KeyW') {
      this.dollService.doWink();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.spaceKeyPressed = 1;
      this.dollService.closeMouth();
    }
  }

  isHighlighted(x: number, y: number): boolean {
    return BitValuesUtil.getBit(this.z[x], y);
  }
}
