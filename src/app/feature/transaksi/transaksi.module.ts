import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSaleComponent } from './components/list-sale/list-sale.component';
import { FormSaleComponent } from './components/form-sale/form-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { CustomerModule } from '../customer/customer.module';



@NgModule({
  declarations: [
    ListSaleComponent,
    FormSaleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    ProductModule,
    CustomerModule
  ]
})
export class TransaksiModule { }
