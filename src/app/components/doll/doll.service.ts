import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DollService {
  mouthDirection: Subject<number> = new Subject();

  openMouth() {
    this.mouthDirection.next(20);
  }

  closeMouth() {
    this.mouthDirection.next(-20);
  }
}
