import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Vehicle } from './../../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicle(url: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(url);
  }
}
