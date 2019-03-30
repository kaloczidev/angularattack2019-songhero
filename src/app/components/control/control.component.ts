import { Component, HostListener } from '@angular/core';
import { ConstrolService } from './constrol.service';
import { DollService } from '../doll/doll.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent {
  constructor(private service: ConstrolService,
              private dollService: DollService
  ) {
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.dollService.closeMouth();
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.dollService.openMouth();
    }
  }
}
