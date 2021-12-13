import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../cities/city';
import { Country } from '../countries/country';
import { MyCity } from '../my-cities/MyCity';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  title: string;
  form: FormGroup;
  city: MyCity;
  // null when adding a new city
  id?: number;
  countries: Country[];
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      lat: new FormControl(''),
      lon: new FormControl(''),
      countryId: new FormControl()
    });
    this.loadData();
  }

  loadData() {
    this.loadCountries();
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    //fetch the city from the server
    if (this.id) {
      let url = this.baseUrl + 'api/cities/' + this.id;
      this.http.get<MyCity>(url).subscribe(result => {
        this.city = result;
        this.title = "Edit - " + this.city.name;
        this.form.setValue(this.city)
      }, err => console.error(err));
    } else {
      this.title = "Create a new city";
    }
  }

  loadCountries() {
    let url = this.baseUrl + "api/countries";
    let params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999").set("sortColumn", "name");

    this.http.get<any>(url, { params })
      .subscribe(res => {
        this.countries = res.data;
      }, err => console.error(err));
  }

  onSubmit() {
    let city = this.id ? this.city : <MyCity>{};
    city.name = this.form.get("name").value;
    city.lat = +this.form.get('lat').value;
    city.lon = +this.form.get('lon').value;
    city.countryId = +this.form.get("countryId").value;
    if (this.id) {
      let url = this.baseUrl + 'api/cities/' + this.city.id;
      this.http.put<MyCity>(url, city)
        .subscribe(result => {
          console.log("City " + city.id + " has been updated");
          this.router.navigate(["/cities"]);
        },
          err => console.error(err));
    } else {
      let url = this.baseUrl + "api/cities";
      this.http.post<City>(url, city)
        .subscribe(x => {
          console.log('Added a new city ' + x.id);
          this.router.navigate(['/cities']);
        }, err => console.error(err));
    }
  }
}
