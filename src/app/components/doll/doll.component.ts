import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DollService} from './doll.service';

@Component({
  selector: 'app-doll',
  templateUrl: './doll.component.html',
  styleUrls: ['./doll.component.scss'],
})
export class DollComponent implements OnInit {
  @ViewChild('mouth') mouth: ElementRef<SVGPathElement>;
  @ViewChild('face') face: ElementRef<SVGGElement>;
  public kacsint = false;
  private currentY = 0;
  private minY = 0;
  private maxY = 80;
  private direction = 20;
  private mouthFrameRequestId = null;
  private headFrameRequestId = null;

  private headMax = 8;
  private headMin = -8;

  private headRotation = 0;

  constructor(private service: DollService) {
  }

  ngOnInit(): void {
    this.service.mouthDirection.subscribe((direction) => {
      this.direction = direction;
      this.stopMouthAnimation();
      this.animateMouth();
    });
    this.service.headBolintas.subscribe(deg => {
      this.stopBolint();
      this.doBolint();
      this.bolint(deg);
    });
    this.service.wink.subscribe( (a) => {
      this.doKacsint();
    });
    setInterval(this.doKacsint, 2000);
  }

  private doKacsint = () => {
    this.kacsint = true;
    setTimeout(() => {
      this.kacsint = false;
    }, 100);
  };

  private animateMouth = (): void => {
    this.currentY += this.direction;

    if (this.currentY < this.minY) {
      this.currentY = this.minY;
    } else if (this.currentY > this.maxY) {
      this.currentY = this.maxY;
    }

    const quadraticShift = 313;
    this.mouth.nativeElement.setAttribute('d', `M69,243 Q143,${quadraticShift + this.currentY} 191,258Z`);

    if (this.currentY === this.minY || this.currentY === this.maxY) {
      this.stopMouthAnimation();
    } else {
      this.mouthFrameRequestId = window.requestAnimationFrame(this.animateMouth);
    }
  };

  private bolint(deg: number) {
    this.headRotation += deg;
  }

  private doBolint = () => {
    if (this.headRotation !== 0) {
      if (this.headRotation > 0) {
        this.headRotation -= 0.5;
      }
      if (this.headRotation < 0) {
        this.headRotation += 0.5;
      }
    }
    if (this.headRotation > this.headMax) {
      this.headRotation = this.headMax;
    }
    if (this.headRotation < this.headMin) {
      this.headRotation = this.headMin;
    }
    this.face.nativeElement.setAttribute('style', `transform: rotate(${this.headRotation}deg)`);
    if (this.headRotation > this.headMax || this.headRotation < this.headMin) {
      this.stopBolint();
    } else {
      this.headFrameRequestId = window.requestAnimationFrame(this.doBolint);
    }
  };


  private stopMouthAnimation(): void {
    if (this.mouthFrameRequestId !== null) {
      window.cancelAnimationFrame(this.mouthFrameRequestId);
      this.mouthFrameRequestId = null;
    }
  }

  private stopBolint() {
    if (this.headFrameRequestId !== null) {
      window.cancelAnimationFrame(this.headFrameRequestId);
      this.headFrameRequestId = null;
    }
  }
}
