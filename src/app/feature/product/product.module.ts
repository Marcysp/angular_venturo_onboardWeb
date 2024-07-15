import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkyhookDndModule } from '@angular-skyhook/core';
import { ListCategoryComponent } from './category/components/list-category/list-category.component';
import { ListProductComponent } from './product/components/list-product/list-product.component';
import { FormCategoryComponent } from './category/components/form-category/form-category.component';
import { FormProductComponent } from './product/components/form-product/form-product.component';




@NgModule({
  declarations: [
    ListCategoryComponent,
    ListProductComponent,
    FormCategoryComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule,
    CoreModule,
    CKEditorModule,
    // DndModule
    // NgxDnDModule,
    // SkyhookDndModule.forRoot({ backend: HTML5Backend })
  ],
  exports: [
    FormProductComponent
  ]
})
export class ProductModule { }
