import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';

import { PeopleService } from './../people.service';
import { People } from './../../../models/people';

import { PlanetDialogComponent } from '../../planet/planet-dialog/planet-dialog.component';
import { SpeciesDialogComponent } from './../../species/species-dialog/species-dialog.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people$: Observable<People>;
  isLoading = true;

  constructor(private location: Location, private route: ActivatedRoute,
    private dialog: MatDialog, private peopleService: PeopleService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.peopleService.getPeopleByUrl(params.url)
        .subscribe(people => {
          this.people$ = of(people);
        });
    });
  }

  onBackClick() {
    this.location.back();
  }

  onPlanetClick(url) {
    this.dialogSetup(PlanetDialogComponent, url);
  }

  onSpeciesClick(url) {
    this.dialogSetup(SpeciesDialogComponent, url);
  }

  dialogSetup(dialogRefComponent, url) {
    const dialogRef = this.dialog.open(dialogRefComponent, {
      height: 'auto',
      minHeight: '6.25rem',
      width: '37.5rem',
      disableClose: false,
      data: { url: url }
    });
  }
}
