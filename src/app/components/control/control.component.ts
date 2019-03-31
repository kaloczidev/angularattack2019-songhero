import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ControlService } from './control.service';
import { DollService } from '../doll/doll.service';
import { BitValuesUtil } from '../../utils/bitValues.util';
import { ScoreService } from '../score/score.service';
import {
  DISPLAY_HORIZONTAL_COLORS,
  DISPLAY_HORIZONTAL_DIVISION,
  DISPLAY_HORIZONTAL_POSITION,
  DISPLAY_VERTICAL_DIVISION,
  DISPLAY_WIDTH
} from './control.config';

declare function require(name: string);

const whatIsLoveBuffer: ArrayBuffer = require('./what-is-love.data');
const encypt = require('../score/score').encypt;

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  @ViewChild('display') display: ElementRef<HTMLCanvasElement>;

  spacePressed = false;
  wPressed = false;
  ePressed = false;

  spaceIsActive = false;
  wIsActive = false;
  eIsActive = false;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private unitHeight: number;
  private yArray: Array<number>;

  private akarmi = DISPLAY_VERTICAL_DIVISION - 1;

  private subMap: Uint8Array;

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

      const nextActiveItem = this.subMap[1] || null;
      if (nextActiveItem) {
        this.wIsActive = BitValuesUtil.getBit(nextActiveItem, 0);
        this.spaceIsActive = BitValuesUtil.getBit(nextActiveItem, 1);
        this.eIsActive = BitValuesUtil.getBit(nextActiveItem, 2);
      } else {
        this.wIsActive = false;
        this.spaceIsActive = false;
        this.eIsActive = false;
      }

      this.setScore(this.wPressed, 0);
      this.setScore(this.spacePressed, 1);
      this.setScore(this.ePressed, 2);

      this.draw();
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') return this.spaceDown(event);
    if (event.code === 'KeyE') return this.keyEDown(event);
    if (event.code === 'KeyW') return this.keyWDown(event);
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.code === 'Space') return this.spaceUp(event);
    if (event.code === 'KeyE') return this.keyEUp(event);
    if (event.code === 'KeyW') return this.keyWUp(event);
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateCanvasSize();
  }

  spaceDown(event): void {
    this.spacePressed = true;
    this.dollService.openMouth();
    this.stopEvent(event);
  }

  keyEDown(event): void {
    this.ePressed = true;
    this.dollService.shakeHead();
    this.stopEvent(event);
  }

  keyWDown(event): void {
    this.wPressed = true;
    this.dollService.doWink();
    this.stopEvent(event);
  }

  spaceUp(event): void {
    this.spacePressed = false;
    this.dollService.closeMouth();
    this.stopEvent(event);
  }

  keyEUp(event): void {
    this.ePressed = false;
    this.stopEvent(event);
  }

  keyWUp(event): void {
    this.wPressed = false;
    this.stopEvent(event);
  }

  private calculateCanvasSize() {
    const height = window.innerHeight - 200 | 0;

    this.canvas.width = DISPLAY_WIDTH;
    this.canvas.height = height;

    this.unitHeight = height / DISPLAY_VERTICAL_DIVISION;
    this.yArray = Array.from(new Array(DISPLAY_VERTICAL_DIVISION), (val, index) => index * this.unitHeight);
  }

  private isHighlighted(x: number, y: number): boolean {
    return BitValuesUtil.getBit(this.subMap[this.akarmi - x], y);
  }

  private draw() {
    this.yArray.forEach((y: number, xIndex: number) => {
      DISPLAY_HORIZONTAL_POSITION.forEach((x: number, yIndex: number) => {
        if (this.isHighlighted(xIndex, yIndex)) {
          this.ctx.fillStyle = DISPLAY_HORIZONTAL_COLORS[yIndex];
          this.ctx.fillRect(x, y, DISPLAY_HORIZONTAL_DIVISION[yIndex], this.unitHeight + 1);
        } else {
          this.ctx.clearRect(x, y, DISPLAY_HORIZONTAL_DIVISION[yIndex], this.unitHeight + 1);
        }
      });
    });
  }

  private setScore(keyPressed: boolean, bitIndex: number): void {
    if (keyPressed && this.subMap[0]) {
      encypt(this.subMap[0], bitIndex, keyPressed);
      if (BitValuesUtil.getBit(this.subMap[0], bitIndex) === keyPressed) {
        this.scoreService.incrase();
      } else {
        this.scoreService.reduce();
      }
    }
  }

  private stopEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
