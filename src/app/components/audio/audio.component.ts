import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService, PlayerStatus} from '../player/player.service';

export interface Track {
  name: string;
  duration: number;
}

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @ViewChild('time') time: ElementRef;

  songs: Array<Track> = [
    {
      name: 'WhatIsLove',
      duration: 254660
    }
  ];

  constructor(public player: PlayerService) { }

  ngOnInit() {
    this.player.onPositionChanged.subscribe((actual) => {
      const current = actual.currentPosition / 1000 | 0;
      const minute = current / 60 | 0;
      const second = (current - minute * 60);
      const sec: string = second < 10 ? `0${second}` : second.toString();
      this.time.nativeElement.innerText = ` ${actual.relativePosition * 100 | 0}% ${minute}:${sec}`;
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  seek() {
    this.player.seek.next(this.player.duration - 3000);
  }

  finish() {
    this.player.status.next(PlayerStatus.FINISHED);
  }
}
