import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';




@NgModule({
  declarations: [
    FormUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
})
export class UserModule { }
