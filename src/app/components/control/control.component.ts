import { Component, HostListener } from '@angular/core';
import { ControlService } from './control.service';
import { DollService } from '../doll/doll.service';

declare function require(name: string);

const whatIsLoveBuffer: ArrayBuffer = require('./what-is-love.data');

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent {
  private spaceKeyPressed = 0;

  constructor(private service: ControlService,
              private dollService: DollService
  ) {
    console.log(new Uint8Array(whatIsLoveBuffer));
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.spaceKeyPressed = 0;
      this.dollService.openMouth();
      event.preventDefault();
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
    return x === 1 && y === 2;
  }
}
