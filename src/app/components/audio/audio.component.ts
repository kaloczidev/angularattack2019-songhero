import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService, PlayerStatus} from '../player/player.service';

export interface Track {
  name: string;
  trackId: string;
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
      trackId: '34743391',
      duration: 254660
    },
    // {
    //   name: 'Robin Schulz - Sun Goes Down',
    //   trackId: '167810531',
    //   duration: 176211
    // },
    // {
    //   name: 'Lost Frequencies - Are you with me',
    //   trackId: '125851434',
    //   duration: 152360
    // },
    // {
    //   name: 'Random',
    //   trackId: '208277289',
    //   duration: 198260
    // }
  ];

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.player.setTrack(this.songs[0]);
    this.player.onPositionChanged.subscribe((actual) => {
      const current = actual.currentPosition / 1000 | 0;
      const minute = current / 60 | 0;
      const second = (current - minute * 60);
      const sec: string = second < 10 ? `0${second}` : second.toString();
      this.time.nativeElement.innerText = ` ${actual.relativePosition * 100 | 0}% ${minute}:${sec}`;
    });
  }

  play(track: Track) {
    this.player.setTrack(track);
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  seek() {
    this.player.seek.next(this.player.track.duration - 3000);
  }

  finish() {
    this.player.status.next(PlayerStatus.FINISHED);
  }
}
