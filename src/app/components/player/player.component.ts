import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService, PlayerStatus} from '../../services/player/player.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';

declare var SC: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('audio') audio: ElementRef;

  BASE_URL = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  constructor(private player: PlayerService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.player.status.subscribe((status) => {
      console.log(status);
      switch (status) {
        case PlayerStatus.PLAY: this.play(); break;
        case PlayerStatus.PAUSE: this.pause(); break;
      }
    });

    this.player.urlChange
      .subscribe((url) => {
      this.setUrl(url);
    });
  }

  setUrl(src: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.BASE_URL}${src}`);
  }

  play() {
    SC.Widget(this.audio.nativeElement).play();
  }
  pause() {
    SC.Widget(this.audio.nativeElement).pause();
  }

  onload() {
    if (this.player.status.getValue() === PlayerStatus.PLAY) { this.play(); }
  }
}
