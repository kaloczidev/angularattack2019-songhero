import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DollService } from './doll.service';

@Component({
  selector: 'app-doll',
  templateUrl: './doll.component.html',
  styleUrls: ['./doll.component.scss'],
})
export class DollComponent implements OnInit {
  @ViewChild('mouth') mouth: ElementRef<SVGPathElement>;
  @ViewChild('face') face: ElementRef<SVGGElement>;
  public wink = false;
  private currentY = 0;
  private minY = 0;
  private maxY = 80;
  private direction = 20;
  private mouthFrameRequestId = null;
  private headFrameRequestId = null;

  private headRotation = 8;
  private headMaxRotationDeg = 8;

  constructor(private service: DollService) {
  }

  ngOnInit(): void {
    this.service.mouthDirection.subscribe((direction) => {
      this.direction = direction;
      this.stopMouthAnimation();
      this.animateMouth();
    });
    this.service.shake.subscribe(() => {
      this.stopShakeAnimation();
      this.headRotation = 8;
      this.doShake();
    });
    this.service.wink.subscribe(() => {
      this.doWink();
    });
  }

  private doWink(): void {
    this.wink = true;
    setTimeout(() => this.wink = false, 100);
  }

  private animateMouth = (): void => {
    this.currentY += this.direction;

    if (this.currentY < this.minY) {
      this.currentY = this.minY;
    } else if (this.currentY > this.maxY) {
      this.currentY = this.maxY;
    }

    const quadraticShift = 696;
    this.mouth.nativeElement.setAttribute('d', `M750,626 Q815,${quadraticShift + this.currentY} 870,640Z`);

    if (this.currentY === this.minY || this.currentY === this.maxY) {
      this.stopMouthAnimation();
    } else {
      this.mouthFrameRequestId = window.requestAnimationFrame(this.animateMouth);
    }
  };

  private doShake = () => {
    if (this.headRotation > 0) this.headRotation -= 0.5;
    if (this.headRotation > this.headMaxRotationDeg) this.headRotation = this.headMaxRotationDeg;
    this.face.nativeElement.setAttribute('style', `transform: rotate(${this.headRotation}deg)`);
    if (this.headRotation < this.headMaxRotationDeg) this.headFrameRequestId = window.requestAnimationFrame(this.doShake);
  };

  private stopMouthAnimation(): void {
    if (this.mouthFrameRequestId !== null) {
      window.cancelAnimationFrame(this.mouthFrameRequestId);
      this.mouthFrameRequestId = null;
    }
  }

  private stopShakeAnimation() {
    if (this.headFrameRequestId !== null) {
      window.cancelAnimationFrame(this.headFrameRequestId);
      this.headFrameRequestId = null;
    }
  }
}
