import { Component, Input, OnInit } from '@angular/core';
import { CombinedMovie } from '../models/CombinedMovie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input()
  movie: CombinedMovie;

  constructor() { }

  ngOnInit(): void {
  }

}
