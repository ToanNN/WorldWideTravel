import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../countries/country';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {
  title: string;
  form: FormGroup;
  country: Country;
  countryId?: number;


  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required, this.isDuplicateValue("name")],
      iso2: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)], this.isDuplicateValue("iso2") ],
      iso3: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)], this.isDuplicateValue("iso3")]
    });
    this.loadData();
  }

  loadData(){
    this.countryId = + this.activatedRoute.snapshot.paramMap.get('id');
    if(this.countryId){
      let url = this.baseUrl + 'api/countries/'+ this.countryId;
      this.http.get<Country>(url).subscribe(res=> {
        this.country = res;
        this.title = "Edit - " + this.country.name;
        this.form.setValue(this.country);
      }, err=> console.error(err));
    }else{
      this.title ="Create a new country";
    }
  }

  onSubmit(){
    let country = this.countryId ? this.country : <Country>{};
    country.name = this.form.get('name').value;
    country.iso2 = this.form.get('iso2').value;
    country.iso3 = this.form.get('iso3').value;

    if(this.countryId){
      let url = this.baseUrl +'api/countries/' + this.country.id;
      this.http.put<Country>(url, country)
      .subscribe(res=>{
        console.log('Country '+ country.name + 'has been updated');
        this.router.navigate(['/countries']);
      }, err => console.error(err));
      return;
    }

    let url = this.baseUrl + 'api/countries';
    this.http.post<Country>(url, country)
    .subscribe(res=> {
      console.log(`Country ${country.name} has been created`);
      this.router.navigate(["/countries"]);
    }, err => console.error(err));

  }


  isDuplicateValue(fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any | null }> => {
      var params = new HttpParams()
        .set("fieldValue", control.value)
        .set("fieldName", fieldName);

      let url = this.baseUrl + "api/countries/isduplicatevalue";
      return this.http.get(url, { params })
        .pipe(map(res => {
          return res ? { isDuplicateValue: true } : null
        }));
    };
  }

}
