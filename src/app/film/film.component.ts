import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Film } from './../../models/film';
import { FilmService } from './film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  film$: Observable<Film>;

  constructor(private location: Location, private route: ActivatedRoute,
    private filmService: FilmService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filmService.getFilm(params.url)
        .subscribe(film => {
          this.film$ = of(film);
        });
    });
  }

  onBackClick() {
    this.location.back();
  }
}
