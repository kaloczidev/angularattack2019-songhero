import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {PlayerService, PlayerStatus} from '../player/player.service';
import {ScoreService} from '../score/score.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public scores: Array<{ name: string; score: number }> = [];
  @ViewChild('modal') modal: ModalComponent;
  score = 0;

  constructor(private playerService: PlayerService, private scoreService: ScoreService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    //this.modal.open();
    this.playerService.status.subscribe((status) => {
      if (status === PlayerStatus.FINISHED) {
        this.score = this.scoreService.score.getValue();
        this.modal.open();
        this.cdr.detectChanges();
      }
    });
  }

  retry() {
    this.playerService.play();
    this.modal.close();
    this.cdr.detectChanges();
  }
}
