import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  template: 'RECORDER: Don\'t forget to remove!!!! <input type="checkbox" #dwr> Download Record<br>',
})
export class RecorderComponent {
  @ViewChild('dwr') dwr: ElementRef;
  private previousIndex = 0;

  private wPressed = 0;
  private spacePressed = 0;
  private ePressed = 0;

  private recordedDataByteLength = 14500; // TODO: sound duration * ????

  private recordedData = new Uint8Array(this.recordedDataByteLength);

  constructor(private dollService: DollService,
              private playerService: PlayerService,
  ) {

    this.playerService.onPositionChanged.subscribe((trackPosition: TrackPosition) => {
      const index = this.recordedDataByteLength * trackPosition.relativePosition | 0;
      const keyOrder = [this.wPressed, this.spacePressed, this.ePressed];

      if (index === this.previousIndex + 1) {
        this.recordedData[index] = BitValuesUtil.set(keyOrder);
      } else {
        for (let i = this.previousIndex + 1; i <= index; ++i) {
          this.recordedData[i] = BitValuesUtil.set(keyOrder);
        }
      }

      this.previousIndex = index;
    });

    playerService.status.subscribe((status: PlayerStatus) => {
      if (status === PlayerStatus.PLAY) {
        this.previousIndex = 0;
        this.recordedData.fill(0);
      } else if (status === PlayerStatus.FINISHED && this.dwr.nativeElement.checked) {
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
    } else if (event.code === 'KeyE') {
      this.ePressed = 1;
      this.dollService.shakeHead();
      usePreventDefault = true;
    } else if (event.code === 'KeyW') {
      this.wPressed = 1;
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
    } else if (event.code === 'KeyE') {
      this.ePressed = 0;
      usePreventDefault = true;
    } else if (event.code === 'KeyW') {
      this.wPressed = 0;
      usePreventDefault = true;
    }

    if (usePreventDefault) event.preventDefault();
  }
}
