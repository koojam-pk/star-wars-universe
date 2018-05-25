import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Planet } from './../../../models/planet';
import { PlanetService } from './../planet.service';

@Component({
  selector: 'app-planet-dialog',
  templateUrl: './planet-dialog.component.html',
  styleUrls: ['./planet-dialog.component.scss']
})
export class PlanetDialogComponent implements OnInit {
  planet$: Observable<Planet>;

  constructor(private planetService: PlanetService,
    public dialogRef: MatDialogRef<PlanetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.planetService.getPlanet(this.data.url)
      .subscribe(planet => {
        this.planet$ = of(planet);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
