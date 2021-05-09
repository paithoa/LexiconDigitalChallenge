/*
Seperate api call concerns from the Component
Author(s):
    Handy Hasan
Date Created:
    May 9, 2021

*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoApiResponse } from '../models/InfoApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getInfo(provider: Providers): Observable<InfoApiResponse> {
    return this.http.get<InfoApiResponse>(`https://challenge.lexicondigital.com.au/api/v2/${provider}/movies`)
                    .pipe(catchError(_ => (of({ Provider: provider, Movies: [] } as InfoApiResponse))));
  }
}

export enum Providers {
  Cinemaworld = 'cinemaworld',
  Filmworld = 'filmworld'
}
