import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService, PlayerStatus, TrackPosition} from './player.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as MobileDetect from 'mobile-detect';

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
  md = new MobileDetect(window.navigator.userAgent);
  iframeHide = true;
  accessed = false;

  constructor(private player: PlayerService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.player.status.subscribe((status) => {
      switch (status) {
        case PlayerStatus.PLAY: this.play(); break;
        case PlayerStatus.PAUSE: this.pause(); break;
        default: break;
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
    this.pause();
    this.accessed = false;
    SC.Widget(this.audio.nativeElement).play();
  }
  pause() {
    SC.Widget(this.audio.nativeElement).pause();
  }

  onload() {
    SC.Widget(this.audio.nativeElement).unbind(SC.Widget.Events.PLAY_PROGRESS);
    SC.Widget(this.audio.nativeElement).unbind(SC.Widget.Events.FINISH);
    SC.Widget(this.audio.nativeElement).unbind(SC.Widget.Events.PLAY);

    SC.Widget(this.audio.nativeElement).bind(SC.Widget.Events.PLAY, (event: TrackPosition) => {
      if (this.accessed && !this.iframeHide) {
        this.iframeHide = true;
        this.cdr.detectChanges();
      }
      if (this.md.mobile() || this.md.tablet() || this.md.phone()) {
        this.iframeHide = false;
        this.accessed = true;
      }
    });

    SC.Widget(this.audio.nativeElement).bind(SC.Widget.Events.FINISH, (event: TrackPosition) => {
      this.player.status.next(PlayerStatus.FINISHED);
    });
    SC.Widget(this.audio.nativeElement).bind(SC.Widget.Events.PLAY_PROGRESS, (event: TrackPosition) => {
      this.player.onPositionChanged.next(event);
    });

    if (this.player.status.getValue() === PlayerStatus.PLAY) { this.play(); }
  }
}
