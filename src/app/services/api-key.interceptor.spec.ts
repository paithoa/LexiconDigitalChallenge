import { HttpClient, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiKeyInterceptor } from './api-key.interceptor';

describe('ApiKeyInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      ApiKeyInterceptor
    ]
  }); httpClient = TestBed.inject(HttpClient); httpMock = TestBed.inject(HttpTestingController)});

  it('should be created', () => {
    const interceptor: ApiKeyInterceptor = TestBed.inject(ApiKeyInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should append a request with an API key', () => {
    const interceptor: ApiKeyInterceptor = TestBed.inject(ApiKeyInterceptor);
    httpClient.get("/test").subscribe();
    let req = httpMock.expectOne("/test");
    req.flush([]);
    expect(req.request.headers.get('x-api-key')).toBeDefined();
  })
});
