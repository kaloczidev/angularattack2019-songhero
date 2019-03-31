import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  animON = true;

  constructor() { }

  ngOnInit() {
  }

  end(event) {
    this.animON = false;
    console.log('jej');
    this.animON = true;
  }
}
