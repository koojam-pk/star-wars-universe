import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { tap, map, takeWhile, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ObservableMedia } from '@angular/flex-layout';

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
  selection = new SelectionModel<People>(false, []);

  step = -1;

  public cols: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private observableMedia: ObservableMedia, private peopleService: PeopleService) { }

  ngOnInit() {
    this.allPeople$ = this.peopleService.getPeople();
    this.subscription = this.peopleService.getTotalPages().subscribe(totalPage => {
      this.peopleCount$ = of(totalPage);
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
            return this.allPeople$ = this.peopleService.getPeople(this.paginator.pageIndex);
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
  }

  flatContent(content, label) {
    return '<span class="card-label">' + label + ':</span><br>' + content.join('<br>');
  }
}
