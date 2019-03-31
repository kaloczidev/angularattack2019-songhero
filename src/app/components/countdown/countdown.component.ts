import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../player/player.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  animON = false;
  array = [3, 2, 1];
  actual = 0;
  hide = true;

  constructor(private player: PlayerService) {
  }


  ngOnInit() {
    this.player.gamestart.subscribe(() => {
      this.start();
    });
  }

  start() {
    this.actual = 0;
    this.animON = true;
    this.hide = false;
  }

  end(event) {
    this.animON = false;
    if (this.actual + 1 < this.array.length) {
      this.actual++;
      setTimeout(() => {
        this.animON = true;
      }, 20);
    } else {
      this.hide = true;
      this.player.play();
    }
  }
}
