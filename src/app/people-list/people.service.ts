import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { People } from './../../models/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url = 'https://swapi.co/api/people';
  private totalCount: Subject<number>;

  constructor(private http: HttpClient) {
    this.totalCount = new Subject<number>();
    this.http.get<any>(this.url).subscribe(data => {
      this.totalCount.next(data.count);
    });
  }

  getPeople(pageIndex: number = 0): Observable<People []> {
    let url = this.url;
    if (pageIndex > 0) {
      url = encodeURI(url + '/?page=' + (pageIndex + 1).toString());
    }
    return this.http.get<any>(url)
      .pipe(map(data => data.results));
  }

  getTotalPages(): Subject<number> {
    return this.totalCount;
  }
}
