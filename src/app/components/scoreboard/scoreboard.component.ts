import {Component, OnInit, ViewChild} from '@angular/core';
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

  constructor(private playerService: PlayerService, scoreService: ScoreService) {
  }

  ngOnInit() {
    this.playerService.status.subscribe((status) => {
      if (status === PlayerStatus.FINISHED) {
        // this.modal.open();
      }
    });
  }

}
