import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { CategoryService } from '../../../category/services/category.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';
  readonly DEFAULT_TYPE = 'Toping';
  readonly DEFAULT_STATUS = '1';

  @Input() productId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  configEditor = ClassicEditor;

  activeMode: string;
  formModel: {
    id: number,
    name: string,
    price: number,
    product_category_id: number,
    is_available: number,
    description: string,
    photo_url: string,
    details: any[],
    details_deleted: any[]
  } = {
    id: 0,
    name: '',
    price: null,
    product_category_id: null,
    is_available: null,
    description: '',
    photo_url: '',
    details: [],
    details_deleted: []
  };

  isDisabledForm: boolean = false;
  categories: any; // Deklarasi categories
  showLoading: boolean = false; // Deklarasi showLoading


  constructor(
    private productService: ProductService,
    private landaService: LandaService,
    private categoryService: CategoryService // Inject CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  resetForm() {
    // console.log(this.productId);
    this.formModel = {
      id: 0,
      name: '',
      price: null,
      product_category_id: null,
      is_available: null,
      description: '',
      photo_url: '',
      details: [],
      details_deleted: []
    };
    // console.log(this.productId);

    if (this.productId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getProduct(this.productId);
    } else {
      this.activeMode = this.MODE_CREATE;
    }
  }

  getProduct(productId: number) {
    this.productService.getProductId(productId).subscribe((res: any) => {
      this.formModel = res.data;
      this.formModel.details_deleted = []; // Initialize details_deleted when fetching data
    }, err => {
      console.log(err);
    });
  }

  getCategories(name = '') {
    this.showLoading = true;
    this.categoryService.getCategories().subscribe((res: any) => {
    // this.categoryService.getCategories({name: name}).subscribe((res: any) => {
      this.categories = res.data.list;
      this.showLoading = false;
    }, err => {
      console.log(err);
    });
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
  }

  insert() {
    this.productService.createProduct(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit(true);
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
      this.afterSave.emit(false);
    });
  }

  update() {
    console.log(this.formModel);
    this.productService.updateProduct(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit(true);
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
      this.afterSave.emit(false);
    });
  }

  addDetail() {
    let val = {
      is_added: true,
      description: '',
      type: this.DEFAULT_TYPE,
      price: 0,
    };
    this.formModel.details.push(val);
  }

  removeDetail(details, paramIndex) {
    if (details[paramIndex]?.id) {
      this.formModel.details_deleted.push(details[paramIndex]);
    }
    details.splice(paramIndex, 1);
  }

  changeDetail(details) {
    if (details?.id) {
      details.is_updated = true;
    }
  }
  getCroppedImage($event) {
    this.formModel.photo_url = $event;
   }
}
