import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoApiResponse } from '../models/InfoApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getInfo(provider: Providers): Observable<InfoApiResponse> {
    return this.http.get<InfoApiResponse>(`https://challenge.lexicondigital.com.au/api/v2/${provider}/movies`);
  }
}

export enum Providers {
  Cinemaworld = 'cinemaworld',
  Filmworld = 'filmworld'
}
