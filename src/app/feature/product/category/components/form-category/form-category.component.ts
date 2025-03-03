import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit{

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() categoryId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  formModel: {
    id: number,
    name: string,
  }={
    id:0,
    name:''
  }
  isDisabledForm: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private landaService: LandaService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  resetForm() {
    console.log(this.categoryId);
    this.formModel = {
      id: 0,
      name: '',
    }
    console.log(this.categoryId);

    // if (this.categoryId > 0) {
    if (this.categoryId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getCategory(this.categoryId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  getCategory(categoryId) {
    this.categoryService.getCategoryById(categoryId).subscribe((res: any) => {
      this.formModel = res.data;
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
    this.categoryService.createCategory(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.categoryService.updateCategory(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }
}
