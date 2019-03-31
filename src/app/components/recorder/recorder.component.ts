import { Subject } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { Component, HostListener } from '@angular/core';
import { DollService } from '../doll/doll.service';
import { PlayerService, PlayerStatus, TrackPosition } from '../player/player.service';
import { BitValuesUtil } from '../../utils/bitValues.util';

@Component({
  selector: 'app-recorder',
  styles: [`
    :host {
      position: fixed;
      top: 0;
      right: 0;
      background: red;
      color: white;
      font-size: 20px;
      padding: 10px;
    }
  `],
  template: 'RECORDER: Don\'t forget to remove!!!!',
})
export class RecorderComponent {
  private previousIndex = 0;

  private spacePressed = 0;
  private arrowRightPressed = 0;
  private arrowLeftPressed = 0;
  private keyWPressed = 0;

  private recordedDataByteLength = 14500; // TODO: sound duration * ????
  private spaceKeyPressed = 0;
  private spaceKeySignal = new Subject<number>();

  private recordedData = new Uint8Array(this.recordedDataByteLength);

  constructor(private dollService: DollService,
              private playerService: PlayerService,
  ) {

    this.spaceKeySignal.pipe(auditTime(50)).subscribe(val => {
      this.spaceKeyPressed = val;
    });

    this.playerService.onPositionChanged.subscribe((trackPosition: TrackPosition) => {
      const index = this.recordedDataByteLength * trackPosition.relativePosition | 0;

      if (index === this.previousIndex) {
        this.recordedData[index] = BitValuesUtil.set([this.spacePressed, this.arrowRightPressed, this.arrowLeftPressed, this.keyWPressed]);
      } else {
        for (let i = this.previousIndex; i < index; ++i) {
          this.recordedData[i] = BitValuesUtil.set([this.spacePressed, this.arrowRightPressed, this.arrowLeftPressed, this.keyWPressed]);
        }
      }

      this.previousIndex = index;
    });

    playerService.status.subscribe((status: PlayerStatus) => {
      if (status === PlayerStatus.PLAY) {
        this.previousIndex = 0;
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
    let usePreventDefault = false;

    if (event.code === 'Space') {
      this.spacePressed = 1;
      this.dollService.openMouth();
      usePreventDefault = true;
    } else if (event.code === 'ArrowRight') {
      this.arrowRightPressed = 1;
      this.dollService.bolintRight();
      usePreventDefault = true;
    } else if (event.code === 'ArrowLeft') {
      this.arrowLeftPressed = 1;
      this.dollService.bolintLeft();
      usePreventDefault = true;
    } else if (event.code === 'KeyW') {
      this.keyWPressed = 1;
      this.dollService.doWink();
      usePreventDefault = true;
    }

    if (usePreventDefault) event.preventDefault();
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    let usePreventDefault = false;

    if (event.code === 'Space') {
      this.spacePressed = 0;
      this.dollService.closeMouth();
      usePreventDefault = true;
    } else if (event.code === 'ArrowRight') {
      this.arrowRightPressed = 0;
      usePreventDefault = true;
    } else if (event.code === 'ArrowLeft') {
      this.arrowLeftPressed = 0;
      usePreventDefault = true;
    } else if (event.code === 'KeyW') {
      this.keyWPressed = 0;
      usePreventDefault = true;
    }

    if (usePreventDefault) event.preventDefault();
  }
}
