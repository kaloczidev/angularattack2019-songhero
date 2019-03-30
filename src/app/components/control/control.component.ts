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

  private spaceKeyPressed = 0;

  constructor(private service: ControlService,
              private dollService: DollService
  ) {
  }

  ngOnInit(): void {
    this.canvas = this.display.nativeElement;
    this.ctx = this.canvas.getContext('2d');
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
}
