import { Component } from '@angular/core';
import { DollService } from './components/doll/doll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dollService: DollService) {

  }
}
