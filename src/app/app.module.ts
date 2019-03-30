import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AudioComponent } from './components/audio/audio.component';
import { ControlComponent } from './components/control/control.component';
import { DollComponent } from './components/doll/doll.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './components/player/player.component';
import { PlayerService } from './components/player/player.service';
import { RecorderComponent } from './components/recorder/recorder.component';
import { ScoreComponent } from './components/score/score.component';
import { ModalComponent } from './components/modal/modal.component';
import { BackgroundComponent } from './components/background/background.component';
import { StartupComponent } from './components/startup/startup.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

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
    BackgroundComponent,
    StartupComponent,
    ScoreboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
