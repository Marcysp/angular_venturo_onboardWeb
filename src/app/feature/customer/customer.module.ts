import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ListCustomerComponent,
    FormCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports:[
    FormCustomerComponent
  ]
})
export class CustomerModule { }
