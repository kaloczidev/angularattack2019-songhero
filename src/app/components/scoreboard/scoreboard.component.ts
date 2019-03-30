import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public scores: Array<{name: string; score: number}> = [];
  @ViewChild('modal') modal: ModalComponent;

  constructor() { }

  ngOnInit() {
    //this.modal.open();
  }

}
