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

  private unitHeight: number;
  private unitWidth: number;
  private yArray;
  private xArray;

  private akarmi = DISPLAY_VERTICAL_DIVISION - 1;

  private subMap: Uint8Array;

  private spacePressed = false;
  private arrowRightPressed = false;
  private keyWPressed = false;

  constructor(private service: ControlService,
              private dollService: DollService,
              private scoreService: ScoreService
  ) {
  }

  ngOnInit(): void {
    this.canvas = this.display.nativeElement;
    this.canvas.width = 500;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.calculateCanvasSize();

    this.subMap = new Uint8Array(4 * 30);
    this.subMap.fill(0);

    this.service.map = new Uint8Array(whatIsLoveBuffer);
    this.service.subMap.subscribe((subMap: Uint8Array) => {
      this.subMap = subMap;
      this.draw();

      this.setScore(this.spacePressed, 0);
      this.setScore(this.arrowRightPressed, 1);
      this.setScore(this.keyWPressed, 2);
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    let usePreventDefault = false;

    if (event.code === 'Space') {
      this.spacePressed = true;
      this.dollService.openMouth();
      usePreventDefault = true;
    } else if (event.code === 'ArrowRight') {
      this.arrowRightPressed = true;
      this.dollService.shakeHead();
      usePreventDefault = true;
    } else if (event.code === 'KeyW') {
      this.keyWPressed = true;
      this.dollService.doWink();
      usePreventDefault = true;
    }

    if (usePreventDefault) event.preventDefault();
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    let usePreventDefault = false;

    if (event.code === 'Space') {
      this.spacePressed = false;
      this.dollService.closeMouth();
      usePreventDefault = true;
    } else if (event.code === 'ArrowRight') {
      this.arrowRightPressed = false;
      usePreventDefault = true;
    } else if (event.code === 'KeyW') {
      this.keyWPressed = false;
      usePreventDefault = true;
    }

    if (usePreventDefault) event.preventDefault();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateCanvasSize();
  }

  private calculateCanvasSize() {
    const height = window.innerHeight - 90 | 0;

    this.canvas.width = 460;
    this.canvas.height = height;

    this.unitHeight = height / DISPLAY_VERTICAL_DIVISION | 0;
    this.unitWidth = 10;

    this.yArray = Array.from(new Array(DISPLAY_VERTICAL_DIVISION), (val, index) => index * this.unitHeight);
    this.xArray = Array.from(new Array(DISPLAY_HORIZONTAL_DIVISION), (val, index) => index * 50);
  }

  private isHighlighted(x: number, y: number): boolean {
    return BitValuesUtil.getBit(this.subMap[this.akarmi - x], y);
  }

  private draw() {
    this.yArray.forEach((y: number, xIndex: number) => {
      this.xArray.forEach((x: number, yIndex: number) => {
        if (this.isHighlighted(xIndex, yIndex)) {
          this.ctx.fillStyle = DISPLAY_COLORS[yIndex];
          this.ctx.fillRect(x, y, this.unitWidth, this.unitHeight + 1);
        } else {
          this.ctx.clearRect(x, y, this.unitWidth, this.unitHeight + 1);
        }
      });
    });
  }

  private setScore(keyPressed: boolean, bitIndex: number): void {
    if (keyPressed) {
      if (BitValuesUtil.getBit(this.subMap[0], bitIndex) === keyPressed) {
        this.scoreService.incrase();
      } else {
        this.scoreService.reduce();
      }
    }
  }
}
