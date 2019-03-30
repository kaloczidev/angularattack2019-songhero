import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../../services/player/player.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  songs = [
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
    },
    {
      name: 'WhatIsLove',
      trackId: '86589991'
    }
  ];

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.player.play(this.songs[1].trackId);
  }

}