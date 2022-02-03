import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayerService, PlayerStatus} from './player.service';
import {interval} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

export const REFRESH_RATE = 1000 / 60;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('audioElement') audio: ElementRef<HTMLAudioElement>;
  status = PlayerStatus.IDLE;

  actualPosition = 0;
  interval = interval(REFRESH_RATE);

  constructor(private player: PlayerService) {
  }

  ngOnInit() {
    this.player.status.subscribe((status) => {
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

    this.interval.pipe(
      filter(() => this.player.status.getValue() === PlayerStatus.PLAY),
      tap(() => {
        this.player.onPositionChanged.next({
          relativePosition: this.actualPosition / this.player.duration,
          currentPosition: this.actualPosition
        });
        this.actualPosition += REFRESH_RATE;
      })
    ).subscribe();

    this.player.seek.subscribe((s) => {
      if (this.player.status.getValue() === PlayerStatus.PLAY) this.audio.nativeElement.currentTime = s;
    });
  }

  play() {
    this.setVolume(1);
    void this.audio.nativeElement.play();
  }

  pause() {
    this.audio.nativeElement.pause();
  }

  setVolume(volume: number) {
    this.audio.nativeElement.volume = volume;
  }

  onEnded() {
    this.player.status.next(PlayerStatus.FINISHED);
  }

  onTimeUpdate() {
    if (Math.abs(this.actualPosition - this.audio.nativeElement.currentTime * 1000) > REFRESH_RATE) {
      this.actualPosition = this.audio.nativeElement.currentTime * 1000;
    }
  }

  onPlay() {
    this.player.status.next(PlayerStatus.PLAY);
  }

  onDurationChange() {
    this.player.duration = this.audio.nativeElement.duration * 1000;
  }

  onLoadedData() {
    this.audio.nativeElement.currentTime = 0;
  }
}
