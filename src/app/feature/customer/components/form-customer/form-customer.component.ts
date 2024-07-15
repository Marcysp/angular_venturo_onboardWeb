import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent {
  constructor(
    private customerService: CustomerService,
    private landaService: LandaService,
    private progressService: ProgressServiceService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    console.log("customerId" + this.customerId);
  }

  @Input() customerId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  activeMode: string;
  formModel: {
    id: number,
    name: string,
    email: string,
    password: string,
    address: Text,
    phone: number,
    m_user_roles_id: number
  }={
    id: 0,
    name: '',
    email: '',
    password: '',
    address:null,
    phone:null,
    m_user_roles_id:0
  };
  isDisabledForm: boolean = false;


  getCustomer(customerId) {
    this.customerService.getCustomerById(customerId).subscribe((res: any) => {
      this.formModel = res.data;
    }, err => {
      console.log(err);
    });
  }

  roles: any[] = [];

  getRoles() {
    // console.log(this.roles);
    this.customerService.getRoles().subscribe((res: any) => {
      // console.log(res.data.list); // Cetak data ke konsol
      this.roles = res.data.list;
    }, err => {
      console.log(err);
    });
  }

  resetForm() {
    this.formModel = {
      id: 0,
      name: '',
      email: '',
      password: '',
      address: null,
      phone: null,
      m_user_roles_id: 0
    }
    console.log("customerId" + this.customerId);

    if (this.customerId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getCustomer(this.customerId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
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
    this.isDisabledForm = true;
    this.progressService.startLoading();
    console.log(this.formModel);
    this.customerService.createCustomer(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    }, err => {
    console.log(this.formModel);

      this.landaService.alertError('Mohon Maaf', err.error.errors);
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    });
  }

  update() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.customerService.updateCustomer(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    });
  }
  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

}
