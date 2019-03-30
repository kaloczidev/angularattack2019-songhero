import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DollService} from './doll.service';

@Component({
  selector: 'app-doll',
  templateUrl: './doll.component.html',
  styleUrls: ['./doll.component.scss'],
})
export class DollComponent implements OnInit {
  @ViewChild('mouth') mouth: ElementRef<SVGPathElement>;
  public kacsint: boolean = false;
  private currentY = 0;
  private minY = 0;
  private maxY = 80;
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
    setInterval(this.doKacsint, 2000);
  }

  private doKacsint = () => {
    this.kacsint = true;
    setTimeout(() => {
      this.kacsint = false;
    }, 100);
  }

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
