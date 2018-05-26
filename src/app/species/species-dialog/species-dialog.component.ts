import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from 'rxjs';

import { Species } from './../../../models/species';
import { SpeciesService } from './../species.service';

@Component({
  selector: 'app-species-dialog',
  templateUrl: './species-dialog.component.html',
  styleUrls: ['./species-dialog.component.scss']
})
export class SpeciesDialogComponent implements OnInit {
  species$: Observable<Species>;

  constructor(private speciesService: SpeciesService, public dialogRef: MatDialogRef<SpeciesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.speciesService.getSpecies(this.data.url)
      .subscribe(species => {
        this.species$ = of(species);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
