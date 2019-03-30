import {Component, OnInit} from '@angular/core';
import {DollService} from '../doll/doll.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, delay} from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  public score = 0;
  public changed = false;

  constructor(private dollService: DollService) {
  }

  ngOnInit() {
    this.dollService.mouthDirection.pipe(debounceTime(100)).subscribe(trigger => {
      this.score++;
      this.changed = true;
      setTimeout(() => {this.changed = false; }, 100);
    });
  }

}
