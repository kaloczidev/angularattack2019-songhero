import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DollService {
  mouthDirection: Subject<number> = new Subject();
  headBolintas: Subject<number> = new Subject();

  openMouth() {
    this.mouthDirection.next(10);
  }

  closeMouth() {
    this.mouthDirection.next(-10);
  }


  bolintRight(): any {
    this.headBolintas.next(8);
  }


  bolintLeft(): any {
    this.headBolintas.next(-8);
  }
}
