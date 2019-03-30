import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DollService } from './doll.service';

@Component({
  selector: 'app-doll',
  templateUrl: './doll.component.html',
  styleUrls: ['./doll.component.scss'],
})
export class DollComponent implements OnInit {
  @ViewChild('mouth') mouth: ElementRef<SVGPathElement>;

  private currentY = 0;
  private minY = 0;
  private maxY = 200;
  private direction = 20;
  private requestId = null;

  constructor(private service: DollService) {
  }

  ngOnInit(): void {
    this.service.mouthDirection.subscribe((direction) => {
      this.direction = direction;
      this.stopMouthAnimation();
      this.animateMouth();
    });
  }

  private animateMouth = (): void => {
    this.currentY += this.direction;

    if (this.currentY < this.minY) {
      this.currentY = this.minY;
    } else if (this.currentY > this.maxY) {
      this.currentY = this.maxY;
    }

    this.mouth.nativeElement.setAttribute('d', `M0,0 Q 120,${this.currentY} 200,0Z`);

    if (this.currentY === this.minY || this.currentY === this.maxY) {
      this.stopMouthAnimation();
    } else {
      this.requestId = window.requestAnimationFrame(this.animateMouth);
    }
  };

  private stopMouthAnimation(): void {
    if (this.requestId !== null) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }
}
