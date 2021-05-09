import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CombinedMovie } from '../models/CombinedMovie';
import { InfoApiResponse } from '../models/InfoApiResponse';
import { DisplayCurrencyPipe } from '../services/display-currency.pipe';
import { MovieService, Providers } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: CombinedMovie[];
  criticalErrorDetected = false;

  constructor(private movieService: MovieService, private displayCurrency: DisplayCurrencyPipe) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    const filmworld$ = this.movieService.getInfo(Providers.Filmworld);
    const cinemaworld$ = this.movieService.getInfo(Providers.Cinemaworld);

    forkJoin([filmworld$, cinemaworld$]).pipe(
      map(res => {
        const [filmworld, cinemaworld] = res;
        const combinedArray: CombinedMovie[] = []
        if (filmworld.Movies.length === 0 && cinemaworld.Movies.length === 0){
          this.criticalErrorDetected = true;
          return [];
        }
        if (filmworld.Movies.length > 0) {
          filmworld.Movies.forEach(movie => {
            combinedArray.push({
              title: movie.Title,
              poster: movie.Poster,
              filmworld: movie.Price,
              cinemaworld: cinemaworld.Movies.findIndex(m => m.Title === movie.Title) != -1 ? cinemaworld.Movies[cinemaworld.Movies.findIndex(m => m.Title === movie.Title)].Price : undefined
            })
          })
        } else {
          cinemaworld.Movies.forEach(movie => {
            combinedArray.push({
              title: movie.Title,
              poster: movie.Poster,
              cinemaworld: movie.Price,
              filmworld: undefined
            })
          })
        }
        return combinedArray;
      }),
      map(res => {
        res.forEach(movie => { movie.cinemaworld = this.displayCurrency.transform(movie.cinemaworld as number); movie.filmworld = this.displayCurrency.transform(movie.filmworld as number) });
        return res;
      })
    ).subscribe(res => {
      this.movies = res;
    })
  }

}
