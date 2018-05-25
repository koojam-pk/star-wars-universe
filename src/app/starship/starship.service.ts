import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Starship } from './../../models/starship';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  constructor(private http: HttpClient) { }

  getStarship(url: string): Observable<Starship> {
    return this.http.get<Starship>(url);
  }
}
