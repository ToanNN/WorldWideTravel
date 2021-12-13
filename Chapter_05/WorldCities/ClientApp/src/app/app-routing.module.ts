import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { MyCitiesComponent } from './my-cities/my-cities.component';
import { AngularMaterialModule } from './angular-material.module';
import { CityEditComponent } from './city-edit/city-edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cities', component: MyCitiesComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'city/:id', component: CityEditComponent },
  { path: 'city', component: CityEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AngularMaterialModule, CommonModule, 
    ReactiveFormsModule, MatSelectModule],
  exports: [RouterModule],
  declarations: [MyCitiesComponent, HomeComponent, CityEditComponent]
})
export class AppRoutingModule { }
