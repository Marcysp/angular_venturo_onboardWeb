import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-error/404/page-not-found.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [PageTitleComponent, PageNotFoundComponent, UploadImageComponent, DaterangepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule,
    // NgxDaterangepickerMd.forRoot(),
    // Daterangepicker
  ],
  exports: [
    PageTitleComponent,
    PageNotFoundComponent,
    UploadImageComponent,
    DaterangepickerComponent,
  ]
})
export class SharedModule { }
