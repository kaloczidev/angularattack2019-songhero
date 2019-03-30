import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  hidden = false;
  closed = false;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closed = true;
  }

  open() {

  }

  animationend() {
    this.hidden = true;
  }
}
