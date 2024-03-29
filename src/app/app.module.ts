import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudioComponent } from './components/audio/audio.component';
import { ControlComponent } from './components/control/control.component';
import { DollComponent } from './components/doll/doll.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerService } from './components/player/player.service';
import { RecorderComponent } from './components/recorder/recorder.component';
import { ScoreComponent } from './components/score/score.component';
import { ModalComponent } from './components/modal/modal.component';
import { StartupComponent } from './components/startup/startup.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { AppService } from './services/app.service';
import { CountdownComponent } from './components/countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    ControlComponent,
    DollComponent,
    PlayerComponent,
    RecorderComponent,
    ScoreComponent,
    ModalComponent,
    StartupComponent,
    ScoreboardComponent,
    CountdownComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [AppService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
