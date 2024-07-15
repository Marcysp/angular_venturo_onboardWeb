import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestDirectiveComponent } from './components/test-directive/test-directive.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TestDirectiveComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule
  ]
})
export class TestModule { }
