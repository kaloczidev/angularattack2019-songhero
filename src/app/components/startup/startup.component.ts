import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {AppService} from '../../services/app.service';
import {PlayerService} from '../player/player.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  tour: Array<string> = ['1', '2', '3', '4'];
  tourActual = 0;

  constructor(private appService: AppService, private player: PlayerService) {
  }

  ngOnInit() {
    this.modal.open();
  }

  onStart() {
    this.modal.close();
    this.player.gamestart.next();
  }

  next() {
    if (this.tourActual + 1 < this.tour.length) {
      this.tourActual++;
    }
  }

  prev() {
    if (this.tourActual - 1 > -1) {
      this.tourActual--;
    }
  }
}
