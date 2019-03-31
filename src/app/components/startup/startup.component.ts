import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  tour: Array<string> = ['zsák', 'hugy', 'os', 'faleveles', 'ganaj'];
  tourActual = 0;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    if (this.appService.showStartUp.getValue()) {
      this.modal.open();
    }
  }

  onStart(showDialogAgain: boolean) {
    this.appService.showStartUp.next(!showDialogAgain);
    localStorage.setItem('startUp', JSON.stringify(!showDialogAgain));
    this.modal.close();
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
