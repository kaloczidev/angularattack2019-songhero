import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DollComponent } from './components/doll/doll.component';
import {ApiService} from './services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {AudioSourceService} from './services/player/audio-source.service';
import {PlayerService} from './services/player/player.service';
import { AudioComponent } from './components/audio/audio.component';
import { ControlComponent } from './components/control/control.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    ControlComponent,
    DollComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, AudioSourceService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
