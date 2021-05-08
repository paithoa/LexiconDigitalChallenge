import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modReq = request.clone({
      headers: request.headers.append('x-api-key','Yr2636E6BTD3UCdleMkf7UEdqKnd9n361TQL9An7')
    })
    return next.handle(modReq);
  }
}
