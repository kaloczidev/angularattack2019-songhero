import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { Encryptor } from '../../utils/encryptor';

const encryptor = new Encryptor('you shall not pass');

let score = 0;

function incrase() {
  return score++;
}

function reduce() {
  if (score !== 0) score--;
  return score;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score = new BehaviorSubject<number>(0);
  encryptedScore: string;

  reset(): void {
    score = 0;
  }

  incrase(value: number = 1): void {
    this.score.next(incrase());
    this.setEncryptedScore();
  }

  reduce(value: number = 1): void {
    this.score.next(reduce());
    this.setEncryptedScore();

  }

  private setEncryptedScore() {
    this.encryptedScore = encryptor.encrypt(String(this.score.getValue()));
  }
}
