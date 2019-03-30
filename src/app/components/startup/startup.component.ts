import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.modal.nativeElement.className += ' close';
  }

}
