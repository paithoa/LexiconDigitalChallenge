import { TestBed } from '@angular/core/testing';

import { MovieService, Providers } from './movie.service';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return test data on correct request', () => {
    service.getInfo(Providers.Cinemaworld).subscribe((_) => expect(_.Provider).toBe("Cinema World"));

    const req = httpTestingController.expectOne(`https://challenge.lexicondigital.com.au/api/v2/cinemaworld/movies`);
    expect(req.request.method).toBe("GET");
    req.flush({Provider: "Cinema World", Movies: []});
  });

  it('should not pass error on to subscriber', () => {
    service.getInfo(Providers.Filmworld).subscribe(_ => expect(_.Provider).toBe("filmworld"));

    const req = httpTestingController.expectOne('https://challenge.lexicondigital.com.au/api/v2/filmworld/movies');
    req.flush('Internal Service Error', {status: 500, statusText: 'Internal Service Error'});
  })
});
