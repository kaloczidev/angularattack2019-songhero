import { Component } from '@angular/core';
import { CONSOLE_LOGO } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    console.log(CONSOLE_LOGO);
  }
}
