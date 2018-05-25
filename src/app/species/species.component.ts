import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Species } from './../../models/species';
import { SpeciesService } from './species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {
  species$: Observable<Species>;

  constructor(private location: Location, private route: ActivatedRoute,
    private speciesService: SpeciesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.speciesService.getSpecies(params.url)
        .subscribe(species => {
          this.species$ = of(species);
        });
    });
  }

  onBackClick() {
    this.location.back();
  }
}
