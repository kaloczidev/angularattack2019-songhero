import { Component } from '@angular/core';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  public score = 0;
  public changed = false;

  constructor(service: ScoreService) {
    service.score.subscribe((score) => {
      this.score = score;
      this.changed = true;
      setTimeout(() => {
        this.changed = false;
      }, 100);
    });
  }
}
