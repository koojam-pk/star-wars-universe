import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { PlanetDialogComponent } from './../planet/planet-dialog/planet-dialog.component';
import { SpeciesDialogComponent } from './../species/species-dialog/species-dialog.component';
import { PeopleService } from './people.service';

import { People } from './../../models/people';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnDestroy, AfterViewInit {
  allPeople$: Observable<People []>;
  subscription: Subscription;

  peopleCount$: Observable<number>;

  step = -1;
  pageIndex = 0;

  public cols: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private router: Router,
    private peopleService: PeopleService) { }

  ngOnInit() {

    this.allPeople$ = this.peopleService.getPeople();
      this.subscription = this.peopleService.getTotalPages().subscribe(totalPage => {
        this.peopleCount$ = of(totalPage);
      });

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          this.pageIndex = this.peopleService.getPageIndex();
          this.step = this.peopleService.getRowIndex();
          this.allPeople$ = this.peopleService.getPeople();
          this.paginator.pageIndex = this.pageIndex;
        }
    });
  }

  ngOnDestroy() {
    /* To prevent memory leakage when component exited */
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    /* To monitor the page change and trigger retrieval of data via api */
    this.paginator.page
      .pipe(
          tap(() => {
            this.step = -1;
            this.peopleService.setRowIndex(this.step);
            this.pageIndex = this.paginator.pageIndex;
            this.peopleService.setPageIndex(this.pageIndex);
            return this.allPeople$ = this.peopleService.getPeople();
          })
      )
      .subscribe();
  }

  /* This function is used to expand and collapse the expansion panel.
   * Without this function, once the panel is expanded it will not close when user select
   * another panel.
   */
  setStep(index: number) {
    this.step = index;
    this.peopleService.setRowIndex(index);
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
      data: { url: url }
    });
  }
}
