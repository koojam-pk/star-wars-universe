import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Planet } from './../../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  constructor(private http: HttpClient) { }

  getPlanet(url: string): Observable<Planet> {
    return this.http.get<Planet>(url);
  }
}
