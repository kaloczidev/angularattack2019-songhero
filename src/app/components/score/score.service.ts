import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score = new BehaviorSubject<number>(0);

  reset(): void {
    this.score.next(0);
  }

  incrase(value: number = 1): void {
    this.score.next(this.score.value + value);
  }

  reduce(value: number = 1): void {
    if (this.score.value !== 0) {
      this.score.next(this.score.value - value);
    }
  }
}
