import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  constructor() { }

  ngOnInit() {
    this.modal.open();
  }

  close() {

  }
}
