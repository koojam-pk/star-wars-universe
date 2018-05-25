import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Species } from './../../models/species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  constructor(private http: HttpClient) { }

  getSpecies(url: string): Observable<Species> {
    return this.http.get<Species>(url);
  }
}
