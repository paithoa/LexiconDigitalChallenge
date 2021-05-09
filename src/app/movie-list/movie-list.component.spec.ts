import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoApiResponse } from '../models/InfoApiResponse';
import { DisplayCurrencyPipe } from '../services/display-currency.pipe';
import { MovieService, Providers } from '../services/movie.service';

import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let httpTestingController: HttpTestingController;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule],
      providers: [MovieService, DisplayCurrencyPipe, CurrencyPipe],
      declarations: [ MovieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    movieService = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MovieService to get movie details', () => {
    spyOn(movieService, "getInfo");
    component.load();
    expect(movieService.getInfo).toHaveBeenCalledWith(Providers.Cinemaworld);
    expect(movieService.getInfo).toHaveBeenCalledWith(Providers.Filmworld);
  });

  it('should correctly handle case where both APIs work properly', () => {
    const cinemaworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/cinemaworld/movies`);
    cinemaworld.flush({Provider: "Cinema World", Movies: [{Actors: "actor1,2,3", ID: "cw01", Title: "Film01", Type: "movie", Poster: "testurl", Price: 30.02}]} as InfoApiResponse)
    const filmworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/filmworld/movies`);
    filmworld.flush({Provider: "Film World", Movies: [{Actors: "actor1,2,3", ID: "fw01", Title: "Film01", Type: "movie", Poster: "testurl", Price: 30.06}]} as InfoApiResponse)
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].cinemaworld).toBe("$30.02");
    expect(component.movies[0].filmworld).toBe("$30.06");
    expect(component.movies[0].title).toBe("Film01");
  });
  it('should correctly handle case where Filmworld API fail to work', () => {
    const cinemaworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/cinemaworld/movies`);
    cinemaworld.flush({Provider: "Cinema World", Movies: [{Actors: "actor1,2,3", ID: "cw01", Title: "Film01", Type: "movie", Poster: "testurl", Price: 30.02}]} as InfoApiResponse)
    const filmworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/filmworld/movies`);
    filmworld.flush('intentional 500 testing', {status: 500, statusText: "Internal Service Error"})
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].cinemaworld).toBe("$30.02");
    expect(component.movies[0].filmworld).toBe("unavailable");
    expect(component.movies[0].title).toBe("Film01");
  });
  it('should correctly handle case where Cinemaworld API fail to work', () => {
    const cinemaworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/cinemaworld/movies`);
    cinemaworld.flush('intentional 500 testing', {status: 500, statusText: "Internal Service Error"})
    const filmworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/filmworld/movies`);
    filmworld.flush({Provider: "Film World", Movies: [{Actors: "actor1,2,3", ID: "fw01", Title: "Film01", Type: "movie", Poster: "testurl", Price: 30.06}]} as InfoApiResponse)
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].cinemaworld).toBe("unavailable");
    expect(component.movies[0].filmworld).toBe("$30.06");
    expect(component.movies[0].title).toBe("Film01");
  })
  it('should correctly handle case where both API fail to work', () => {
    const cinemaworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/cinemaworld/movies`);
    cinemaworld.flush('intentional 500 testing', {status: 500, statusText: "Internal Service Error"})
    const filmworld = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/filmworld/movies`);
    filmworld.flush('intentional 500 testing', {status: 500, statusText: "Internal Service Error"})
    expect(component.movies.length).toBe(0);
    expect(component.criticalErrorDetected).toBe(true);
  })
});
