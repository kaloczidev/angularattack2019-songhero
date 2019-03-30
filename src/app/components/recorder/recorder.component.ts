import { Component, HostListener } from '@angular/core';
import { DollService } from '../doll/doll.service';
import { PlayerService, PlayerStatus, TrackPosition } from '../player/player.service';
import { BitValuesUtil } from '../../utils/bitValues.util';

@Component({
  selector: 'app-recorder',
  template: '',
})
export class RecorderComponent {
  private spaceKeyPressed = 0;
  private recordedDataByteLength = 14500;
  private recordedData = new Uint8Array(this.recordedDataByteLength);

  constructor(private dollService: DollService,
              private playerService: PlayerService,
  ) {
    this.playerService.onPositionChanged.subscribe((trackPosition: TrackPosition) => {
      const index = this.recordedDataByteLength * trackPosition.relativePosition | 0;
      this.recordedData[index] = BitValuesUtil.set([this.spaceKeyPressed]);
    });

    playerService.status.subscribe((status: PlayerStatus) => {
      if (status === PlayerStatus.PLAY) {
        this.recordedData.fill(0);
      } else if (status === PlayerStatus.FINISHED) {
        const blob = new Blob([this.recordedData.buffer], {type: 'application/octet-stream'});
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'what-is-love.data';
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
