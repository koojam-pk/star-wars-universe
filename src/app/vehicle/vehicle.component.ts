import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Vehicle } from './../../models/vehicle';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicle$: Observable<Vehicle>;

  constructor(private location: Location, private route: ActivatedRoute,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vehicleService.getVehicle(params.url)
        .subscribe(vehicle => {
          this.vehicle$ = of(vehicle);
        });
    });
  }

  onBackClick() {
    this.location.back();
  }
}
