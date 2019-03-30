import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface RequestOptions {
  url: string;
}

export interface Track {
  stream_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_BASE_URL = 'https://api.soundcloud.com';
  private API_TRACK_URL = 'tracks';
  CLIENT_ID = '9yZSvlXAK7Wmu4xhb0hdMtjP9D2z351X';

  constructor(private http: HttpClient) { }

  getTrack(trackid: string): Observable<Partial<Track>> {
    return this.request( {
      url:  `${this.API_TRACK_URL}/${trackid}`
    });
  }

  request(options: RequestOptions): Observable<object> {
    return this.http.get(`${this.API_BASE_URL}/${options.url}`,
      {params: {client_id: this.CLIENT_ID }});
  }
}
