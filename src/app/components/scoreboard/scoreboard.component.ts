import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {PlayerService, PlayerStatus} from '../player/player.service';
import {ScoreService} from '../score/score.service';
import { getLeaderboard, db, save } from '../../utils/firestore';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public scores = [];
  public score = 0;
  public username = '';
  public submitted = false;
  @ViewChild('modal') public modal: ModalComponent;

  constructor(private playerService: PlayerService, private scoreService: ScoreService) {
  }

  ngOnInit() {
    this.playerService.status.subscribe((status) => {
      if (status === PlayerStatus.FINISHED) this.finish();
    });
  }

  finish() {
    getLeaderboard().then((scores) => {
      this.scores = scores;
      this.score = this.scoreService.score.getValue();
      this.modal.open();
    });
  }

  retry() {
    this.playerService.play();
    this.modal.close();
    this.submitted = false;
  }

  onNameChange(event) {
    this.username = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitted = true;
    save(this.username, (window as any).encryptedScore).then(() => {
      const unsubscribe = db.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) =>  {
          if (change.type === 'modified') {
            getLeaderboard().then((scores) => this.scores = scores);
            unsubscribe();
          }
        });
      });
    }).catch(() => {
      alert('Sorry backend is not available. Unfortunately we can\'t save your score');
      this.submitted = false;
    });
  }
}
