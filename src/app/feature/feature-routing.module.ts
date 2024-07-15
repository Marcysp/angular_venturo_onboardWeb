import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TestDirectiveComponent } from './test/components/test-directive/test-directive.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { ListCustomerComponent } from './customer/components/list-customer/list-customer.component';
import { ListCategoryComponent } from './product/category/components/list-category/list-category.component';
import { ListProductComponent } from './product/product/components/list-product/list-product.component';
import { ListSaleComponent } from './transaksi/components/list-sale/list-sale.component';
import { SalesMenuComponent } from './report/components/sales-menu/sales-menu.component';
import { SalesCustomerComponent } from './report/components/sales-customer/sales-customer.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent ,pathMatch: 'full'},
    { path: 'user', component: ListUserComponent ,pathMatch: 'full' },
    { path: 'test', component: TestDirectiveComponent ,pathMatch: 'full' },
    { path: 'customer', component: ListCustomerComponent ,pathMatch: 'full' },
    { path: 'category', component: ListCategoryComponent },
    { path: 'product', component: ListProductComponent },
    { path: 'sale', component: ListSaleComponent },
    // { path: 'report/sales-promo', component: SalesPromoComponent },
   { path: 'report/sales-menu', component: SalesMenuComponent },
   { path: 'report/sales-customer', component: SalesCustomerComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
