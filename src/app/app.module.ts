import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DollComponent } from './components/doll/doll.component';
import {HttpClientModule} from '@angular/common/http';
import {PlayerService} from './components/player/player.service';
import { PlayerComponent } from './components/player/player.component';
import { AudioComponent } from './components/audio/audio.component';
import { ControlComponent } from './components/control/control.component';
import { ScoreComponent } from './components/score/score.component';
import { StartupComponent } from './components/startup/startup.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    ControlComponent,
    DollComponent,
    PlayerComponent,
    ScoreComponent,
    StartupComponent,
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
