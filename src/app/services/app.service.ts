import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

function getStartUpInit() {
  try {
    const value = JSON.parse(localStorage.getItem('startUp'));
    return value === null || value;
  } catch (e) {
    return true;
  }
}

@Injectable()
export class AppService {
  showStartUp = new BehaviorSubject<boolean>(getStartUpInit());
}
