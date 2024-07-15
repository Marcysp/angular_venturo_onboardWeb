import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesMenuComponent } from './components/sales-menu/sales-menu.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SalesCustomerComponent } from './components/sales-customer/sales-customer.component';



@NgModule({
  declarations: [
    SalesMenuComponent,
    SalesCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
    // Daterangepicker
  ]
})
export class ReportModule { }
