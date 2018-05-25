import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleComponent } from './people-list/people/people.component';
import { PlanetComponent } from './planet/planet.component';
import { FilmComponent } from './film/film.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { StarshipComponent } from './starship/starship.component';
import { SpeciesComponent } from './species/species.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/people-list', pathMatch: 'full' },
  { path: 'people', component: PeopleComponent },
  { path: 'people-list', component: PeopleListComponent },
  { path: 'planet', component: PlanetComponent },
  { path: 'film', component: FilmComponent },
  { path: 'starship', component: StarshipComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'species', component: SpeciesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
