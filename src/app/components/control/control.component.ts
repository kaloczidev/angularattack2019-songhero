import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ControlService } from './control.service';
import { DollService } from '../doll/doll.service';
import { BitValuesUtil } from '../../utils/bitValues.util';
import { ScoreService } from '../score/score.service';
import { DISPLAY_COLORS, DISPLAY_HORIZONTAL_DIVISION, DISPLAY_VERTICAL_DIVISION } from './control.config';

declare function require(name: string);

const whatIsLoveBuffer: ArrayBuffer = require('./what-is-love.data');

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  @ViewChild('display') display: ElementRef<HTMLCanvasElement>;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private yArray = Array.from(new Array(DISPLAY_VERTICAL_DIVISION), (val, index) => index * 20 + 20);
  private xArray = Array.from(new Array(DISPLAY_HORIZONTAL_DIVISION), (val, index) => index * 20 + 20);
  private akarmi = DISPLAY_VERTICAL_DIVISION - 1;

  private subMap: Uint8Array;

  private spacePressed = false;
  private arrowRightPressed = false;
  private arrowLeftPressed = false;
  private keyWPressed = false;

  constructor(private service: ControlService,
              private dollService: DollService,
              private scoreService: ScoreService
  ) {
    this.subMap = new Uint8Array(4 * 30);
    this.subMap.fill(0);

    service.map = new Uint8Array(whatIsLoveBuffer);
    service.subMap.subscribe((subMap: Uint8Array) => {
      this.subMap = subMap;
      this.draw();

      if (BitValuesUtil.getBit(this.subMap[0], 0) === this.spacePressed) {
        this.scoreService.incrase();
      } else {
        this.scoreService.reduce();
      }
    });
  }

  ngOnInit(): void {
    this.canvas = this.display.nativeElement;
    this.canvas.width = 500;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    event.preventDefault();

    if (event.code === 'Space') {
      this.spacePressed = true;
      this.dollService.openMouth();
    } else if (event.code === 'ArrowRight') {
      this.arrowRightPressed = true;
      this.dollService.bolintRight();
    } else if (event.code === 'ArrowLeft') {
      this.arrowLeftPressed = true;
      this.dollService.bolintLeft();
    } else if (event.code === 'KeyW') {
      this.keyWPressed = true;
      this.dollService.doWink();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    event.preventDefault();

    if (event.code === 'Space') {
      this.spacePressed = false;
      this.dollService.closeMouth();
    } else if (event.code === 'ArrowRight') {
      this.arrowRightPressed = false;
    } else if (event.code === 'ArrowLeft') {
      this.arrowLeftPressed = false;
    } else if (event.code === 'KeyW') {
      this.keyWPressed = false;
    }
  }

  private isHighlighted(x: number, y: number): boolean {
    return BitValuesUtil.getBit(this.subMap[this.akarmi - x], y);
  }

  private draw() {
    this.yArray.forEach((y: number, xIndex: number) => {
      this.xArray.forEach((x: number, yIndex: number) => {
        if (this.isHighlighted(xIndex, yIndex)) {
          this.ctx.fillStyle = DISPLAY_COLORS[yIndex];
          this.ctx.fillRect(x, y, 10, 20);
        } else {
          this.ctx.clearRect(x, y, 10, 20);
        }
      });
    });
  }
}
