import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AsyncPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { NgxSpinnerModule } from "ngx-spinner";

import { HttpConfigInterceptor } from './core/interceptors/http-config.interceptor';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './feature/auth/services/auth.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from './core/adapter/datepicker-adapter';
import { FormsModule } from '@angular/forms';
import { UserModule } from './feature/user/user.module';
import { TestModule } from './feature/test/test.module';
import { DataTablesModule } from 'angular-datatables';
import { CustomerModule } from './feature/customer/customer.module';
import { ProductModule } from './feature/product/product.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxSpinnerModule,
    NgbModule,
    FormsModule,
    UserModule,
    TestModule,
    ProductModule,
    CustomerModule,
    DataTablesModule,
    NgxDaterangepickerMd.forRoot()
    
  ],
  providers: [
    AsyncPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(private authService: AuthService) {

    if (this.authService.getToken() !== '') {
      this.authService.saveUserLogin();
    }
  }
}
