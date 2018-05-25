import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { CapitalizefirstPipe } from './shared/capitalizefirst.pipe';
import { AppRoutingModule } from './app-routing.module';
import { PlanetComponent } from './planet/planet.component';
import { SpeciesComponent } from './species/species.component';
import { PeopleComponent } from './people-list/people/people.component';
import { FilmComponent } from './film/film.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { StarshipComponent } from './starship/starship.component';
import { PlanetDialogComponent } from './planet/planet-dialog/planet-dialog.component';
import { SpeciesDialogComponent } from './species/species-dialog/species-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    CapitalizefirstPipe,
    PlanetComponent,
    SpeciesComponent,
    PeopleComponent,
    FilmComponent,
    VehicleComponent,
    StarshipComponent,
    PlanetDialogComponent,
    SpeciesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [
    PlanetDialogComponent,
    SpeciesDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
