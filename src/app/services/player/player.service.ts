import { Injectable } from '@angular/core';
import {AudioSourceService} from './audio-source.service';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private audioSource: AudioSourceService, private apiService: ApiService) {

  }


  play(url: string) {
    this.apiService.getTrack(url).subscribe((track) => {
      if (track.hasOwnProperty('stream_url')) {
        this.audioSource.setTrack(this.makeUrl(track.stream_url));
        this.audioSource.play();
      }
    });
  }

  makeUrl(url: string): string {
    return `${url}?client_id=${this.apiService.CLIENT_ID}`;
  }

}
