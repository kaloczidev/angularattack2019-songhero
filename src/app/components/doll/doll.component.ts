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

    // from => to:
    // M191.102 259.969s-20.99 57.29-59.102 56.913c-39.023-.386-63.109-71.555-63.109-71.555l122.211 14.642z
    // M191.102 259.969s-20.99 14.29-59.102 13.913c-39.023-.386-63.109-28.555-63.109-28.555l122.211 14.642z
    // const normalize1 = (54 - 14) / 100 * this.currentY + 14;
    // const normalize2 = (56 - 14) / 100 * this.currentY + 14;
    // const normalize3 = (71 - 28) / 100 * this.currentY + 28;
    // console.log(this.currentY, normalize1);
    this.mouth.nativeElement.setAttribute('d',
      // `M0,0 Q 120,${this.currentY} 200,0Z`
      `M191 100 Q 150,${this.currentY}  200 100 Z`
    // `M191.102 259.969s-20.99 ${normalize1}-59.102 ${normalize2}c-39.023-.386-63.109-${normalize3}-63.109-71.555l122.211 14.642z`
    );

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
