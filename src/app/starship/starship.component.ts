import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Starship } from './../../models/starship';
import { StarshipService } from './starship.service';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent implements OnInit {
  starship$: Observable<Starship>;

  constructor(private location: Location, private route: ActivatedRoute,
    private starshipService: StarshipService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.starshipService.getStarship(params.url)
        .subscribe(starship => {
          this.starship$ = of(starship);
        });
    });
  }

  onBackClick() {
    this.location.back();
  }
}
