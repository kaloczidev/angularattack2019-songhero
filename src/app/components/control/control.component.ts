import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ControlService } from './control.service';
import { DollService } from '../doll/doll.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  @ViewChild('display') display: ElementRef<HTMLCanvasElement>;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(private service: ControlService,
              private dollService: DollService
  ) {
  }

  ngOnInit(): void {
    const b = this.setBits([1, 0, 1, 0]);
    console.log(b);

    const a = this.getBits(b);
    console.log(a);

    this.canvas = this.display.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let i = 0;

    setInterval(() => {
      const map = this.service.map.subarray(i, i + 4);
      if (map.length) {
        this.draw(map);
      }
      ++i;
    }, 1000 / 16);
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

  draw(map) {
    // this.ctx.beginPath();
    // this.ctx.moveTo(50, 20);
    // this.ctx.quadraticCurveTo(60, 32, 70, 20);
    // this.ctx.closePath();

    // this.ctx.lineJoin = 'round';
    // this.ctx.lineWidth = 6;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    map.forEach((value, index) => {
      if (value) {
        this.ctx.rect(20, index * 10, 10, 10);
      }
    });

    this.ctx.fillStyle = 'red';
    // this.ctx.strokeStyle = 'red';
    // this.ctx.stroke();
    this.ctx.fill();
  }

  private getBits(value: number): Array<number> {
    const result = new Array(8);
    for (let i = 0; i < 8; ++i) {
      result[i] = value & (1 << i) ? 1 : 0;
    }
    return result;
  }

  private setBits(values: Array<number>): number {
    let result = 0;
    for (let i = 0; i < 8; ++i) {
      if (values[i]) {
        result |= 1 << i;
      }
    }
    return result;
  }
}
