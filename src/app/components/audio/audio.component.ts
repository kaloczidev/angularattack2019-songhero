import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from '../player/player.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @ViewChild('time') time: ElementRef;

  songs = [
    {
      name: 'WhatIsLove',
      trackId: '34743391'
    },
    {
      name: 'Robin Schulz - Sun Goes Down',
      trackId: '167810531'
    },
    {
      name: 'Lost Frequencies - Are you with me',
      trackId: '125851434'
    },
    {
      name: 'Random',
      trackId: '208277289'
    }
  ];

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.player.setUrl(this.songs[0].trackId);
    this.player.onPositionChanged.subscribe((actual) => {
      const current = actual.currentPosition / 1000 | 0;
      const minute = current / 60 | 0;
      const second = (current - minute * 60);
      const sec: string = second < 10 ? `0${second}` : second.toString();
      this.time.nativeElement.innerText = `${actual.relativePosition * 100 | 0}% ${minute}:${sec}`;
    });
  }

  play(id: string) {
    this.player.setUrl(id);
    this.player.play();
  }

  pause() {
    this.player.pause();
  }
}
