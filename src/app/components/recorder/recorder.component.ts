import { Component, HostListener } from '@angular/core';
import { DollService } from '../doll/doll.service';
import { PlayerService, PlayerStatus } from '../player/player.service';
import { BitValuesUtil } from '../../utils/bitValues.util';

@Component({
  selector: 'app-recorder',
  template: '',
})
export class RecorderComponent {
  private spaceKeyPressed = 0;
  private recordedData = [];
  private fps = 16;
  private timeout = 1000 / this.fps;

  constructor(private dollService: DollService,
              private playerService: PlayerService,
  ) {
    playerService.status.subscribe((status: PlayerStatus) => {
      if (status === PlayerStatus.PLAY) {
        console.log('record start');
        this.recordedData = [];

        setInterval(() => {
          const value = BitValuesUtil.set([this.spaceKeyPressed]);
          this.recordedData.push(value);
        }, this.timeout);
      } else if (status === PlayerStatus.FINISHED) {
        console.log('record stop');
        console.log(this.recordedData);
        const buffer = (new Uint8Array(this.recordedData)).buffer;

        const blob = new Blob([buffer], {type: 'text/plain'});
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'recorded';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.spaceKeyPressed = 0;
      this.dollService.openMouth();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.spaceKeyPressed = 1;
      this.dollService.closeMouth();
    }
  }
}
