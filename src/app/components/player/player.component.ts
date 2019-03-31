import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('blur') blur: ElementRef<HTMLInputElement>;

  BASE_URL = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
  url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  md = new MobileDetect(window.navigator.userAgent);
  isMobile = this.md.mobile() || this.md.tablet() || this.md.phone();
  status = PlayerStatus.IDLE;
  isSafari = (window as any).safari !== undefined;

  constructor(private player: PlayerService, private sanitizer: DomSanitizer, private zone: NgZone) {
  }

  ngOnInit() {
    this.player.status.subscribe((status) => {
      this.blur.nativeElement.focus();
      this.status = status;
      switch (status) {
        case PlayerStatus.PLAY:
          this.play();
          break;
        case PlayerStatus.PAUSE:
          this.pause();
          break;
        default:
          break;
      }
    });

    this.player.urlChange
      .subscribe((url) => {
        this.setUrl(url);
      });

    this.player.seek.subscribe((ms) => {
      if (this.player.status.getValue() === PlayerStatus.PLAY) {
        SC.Widget(this.audio.nativeElement).seekTo(ms);
      }
    });
  }

  setUrl(src: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.BASE_URL}${src}${this.isSafari ? '?auto_play=true' : ''}`);
  }

  play() {
    if (this.isSafari) {
      this.setUrl('34743391');
    }
    this.setVolume(100);
    this.player.seekTo(0);
    SC.Widget(this.audio.nativeElement).play();
  }

  pause() {
    SC.Widget(this.audio.nativeElement).pause();
  }

  setVolume(volume: number) {
    SC.Widget(this.audio.nativeElement).setVolume(volume);
  }

  onload() {
    SC.Widget(this.audio.nativeElement).unbind(SC.Widget.Events.PLAY_PROGRESS);
    SC.Widget(this.audio.nativeElement).unbind(SC.Widget.Events.FINISH);
    SC.Widget(this.audio.nativeElement).unbind(SC.Widget.Events.PAUSE);

    SC.Widget(this.audio.nativeElement).bind(SC.Widget.Events.FINISH, (event: TrackPosition) => this.zone.run(() => {
      this.player.status.next(PlayerStatus.FINISHED);
    }));

    SC.Widget(this.audio.nativeElement).bind(SC.Widget.Events.PAUSE, (event: TrackPosition) => this.zone.run(() => {
      if (this.isSafari) {
        this.blur.nativeElement.focus();
        SC.Widget(this.audio.nativeElement).play();
      }
    }));

    SC.Widget(this.audio.nativeElement).bind(SC.Widget.Events.PLAY_PROGRESS, (event: TrackPosition) => this.zone.run(() => {
      if (this.player.loading.getValue()) {
        this.player.loading.next(false);
      }

      if (this.status === PlayerStatus.PLAY) {
        if (this.isSafari) {
          this.setVolume(100);
        }
        this.player.onPositionChanged.next(event);
      } else if (!this.isSafari) {
        this.player.pause();
      }
    }));

    this.setVolume(0);
    this.player.loading.next(true);
    if (!this.isSafari) {
      SC.Widget(this.audio.nativeElement).play();
    }
  }
}
