import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ConstrolService } from './constrol.service';
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

  constructor(private service: ConstrolService,
              private dollService: DollService
  ) {
  }

  ngOnInit(): void {
    this.canvas = this.display.nativeElement;
    this.ctx = this.canvas.getContext('2d');
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
}
