import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      lat: new FormControl(''),
      lon: new FormControl('')
    });
    this.loadData();
  }

  loadData() {
    var id = +this.activatedRoute.snapshot.paramMap.get('id');
    //fetch the city from the server
    let url = this.baseUrl + 'api/cities/' + id;
    this.http.get<MyCity>(url).subscribe(result => {
      this.city = result;
      this.title = "Edit - " + this.city.name;
      this.form.patchValue(this.city)
    }, err => console.error(err));
  }

  onSubmit() {
    let city = this.city;
    city.name = this.form.get("name").value;
    city.lat = +this.form.get('lat').value;
    city.lon = +this.form.get('lon').value;
    let url = this.baseUrl + 'api/cities/' + this.city.id;

    this.http.put<MyCity>(url, city)
      .subscribe(result => {
        console.log("City " + city.id + " has been updated");
        this.router.navigate(["/cities"]);
      },
        err => console.error(err));
  }

}
