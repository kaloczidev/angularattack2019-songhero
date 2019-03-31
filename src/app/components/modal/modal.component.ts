import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  closed = false;
  @HostBinding('class.hidden') hiddenHost = true;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closed = true;
  }

  open() {
    this.hiddenHost = false;
    this.closed = false;
  }

  transitionend() {
    this.hiddenHost = true;
  }

  stopProp(event: MouseEvent) {
    event.stopPropagation();
  }
}
