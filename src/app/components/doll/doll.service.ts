import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DollService {
  mouthDirection: Subject<number> = new Subject();
  shake: Subject<boolean> = new Subject();
  wink: Subject<boolean> = new Subject();

  openMouth(): void {
    this.mouthDirection.next(10);
  }

  closeMouth(): void {
    this.mouthDirection.next(-10);
  }

  shakeHead(): void {
    this.shake.next(true);
  }

  doWink(): any {
    this.wink.next(true);
  }
}
