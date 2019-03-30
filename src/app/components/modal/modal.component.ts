import {Component, ElementRef, EventEmitter, HostBinding, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  hidden = true;
  closed = false;
  @Output() onclose: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.hidden') hiddenHost = false;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closed = true;
  }

  open() {
    this.hidden = false;
  }

  transitionend() {
    this.hidden = true;
    this.hiddenHost = true;
    this.onclose.emit();
  }
}
