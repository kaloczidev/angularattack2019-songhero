import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.modal.nativeElement.className += ' close';
  }

  open() {

  }

}
