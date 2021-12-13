import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MyCity } from './MyCity';

@Component({
  selector: 'app-my-cities',
  templateUrl: './my-cities.component.html',
  styleUrls: ['./my-cities.component.css']
})
export class MyCitiesComponent implements OnInit {
  public displayedColumns: string[] =['id', 'name','lat', 'lon'];
  public cities: MatTableDataSource<MyCity>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize =10;
    this.getData(pageEvent); 
  }
 
  getData(event:PageEvent){
    const url = this.baseUrl + 'api/cities';
    var params = new HttpParams()
    .set("pageIndex", event.pageIndex.toString())
    .set("pageSize", event.pageSize.toString());

    this.http.get<any>(url, {params: params})
    .subscribe(result=> {
      this.paginator.length = result.totalCount;
      this.paginator.pageIndex = result.pageIndex;
      this.paginator.pageSize = result.pageSize;
      this.cities = new MatTableDataSource<MyCity>(result.data);
    });
  }
}
