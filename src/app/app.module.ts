import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie/movie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav'
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './services/api-key.interceptor';
import { DisplayCurrencyPipe } from './services/display-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    DisplayCurrencyPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true}, DisplayCurrencyPipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
