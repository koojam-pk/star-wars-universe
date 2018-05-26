import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { People } from './../../models/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url = 'https://swapi.co/api/people';
  private totalCount: Subject<number>;
  private rowIndex = -1;
  private pageIndex = 0;

  constructor(private http: HttpClient) {
    this.totalCount = new Subject<number>();
    this.http.get<any>(this.url).subscribe(data => {
      this.totalCount.next(data.count);
    });
  }

  getPeople(): Observable<People []> {
    let url = this.url;
    if (this.pageIndex > 0) {
      url = encodeURI(url + '/?page=' + (this.pageIndex + 1).toString());
    }
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          this.totalCount.next(data.count);
        })
      , map(data => {
        return data.results;
      }));
  }

  getPeopleByUrl(url): Observable<People> {
    return this.http.get<any>(url);
  }

  getTotalPages(): Subject<number> {
    return this.totalCount;
  }

  setRowIndex(value) {
    this.rowIndex = value;
  }

  getRowIndex() {
    return this.rowIndex;
  }

  setPageIndex(value) {
    this.pageIndex = value;
  }

  getPageIndex() {
    return this.pageIndex;
  }
}
