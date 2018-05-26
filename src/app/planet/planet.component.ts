import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Planet } from './../../models/planet';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planet$: Observable<Planet>;

  constructor(private location: Location, private route: ActivatedRoute,
      private planetService: PlanetService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.planetService.getPlanet(params.url)
        .subscribe(planet => {
          this.planet$ = of(planet);
        });
    });
  }

  onBackClick() {
    this.location.back();
  }
}
