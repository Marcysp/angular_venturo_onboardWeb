import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { SalesMenuComponent } from './report/components/sales-menu/sales-menu.component';
import { ReportModule } from './report/report.module';
import { Daterangepicker } from 'ng2-daterangepicker';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true,
//     wheelSpeed: 0.3
// };

@NgModule({
    declarations: [
        DashboardComponent,
        // SalesMenuComponent,
    ],
    imports: [
        ReactiveFormsModule,
        NgbAlertModule,
        CommonModule,
        FeatureRoutingModule,
        UserModule,
        ProductModule,
        TransaksiModule,
        // ReportModule,
        // FormsModule
        // PerfectScrollbarModule,
    ],
    providers: [
        // {
        //     provide: PERFECT_SCROLLBAR_CONFIG,
        //     useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        // }
    ]
})
export class FeatureModule { }
