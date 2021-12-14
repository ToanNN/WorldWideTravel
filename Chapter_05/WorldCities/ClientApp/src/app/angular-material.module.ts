import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
 
@NgModule({
  imports:[MatTableModule, MatPaginatorModule, MatSelectModule, MatFormFieldModule, MatSortModule, MatInputModule ],
  exports:[MatTableModule, MatPaginatorModule, MatSelectModule, MatFormFieldModule, MatSortModule, MatInputModule ]
})
export class AngularMaterialModule{}