import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, forwardRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => FormUserComponent),
  //     multi: true,
  //   }
  // ]
})

export class FormUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private landaService: LandaService,
    private progressService: ProgressServiceService,
  ) { }

  // cities = ["Malang", "Surabaya", "Mojokerto"];

  ngOnInit(): void {
    this.getRoles();
  }

  @Input() userId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  activeMode: string;
  formModel: {
    id: number,
    name: string,
    email: string,
    password: string,
    m_user_role_id: string
  } = {
      id: 0,
      name: '',
      email: '',
      password: '',
      m_user_role_id: ''
    };
  isDisabledForm: boolean = false;

  getUser(userId) {
    this.userService.getUserById(userId).subscribe((res: any) => {
      console.log(res.data.list);
      this.formModel = res.data;
      
    }, err => {
      console.log(err);
    });
  }

  roles: [];
  
  getRoles() {
    // console.log(this.roles);
    this.userService.getRoles().subscribe((res: any) => {
      console.log(res.data.list); // Cetak data ke konsol
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
      m_user_role_id:''
    }

    if (this.userId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getUser(this.userId);
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
    this.userService.createUser(this.formModel).subscribe((res: any) => {
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

  update() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.userService.updateUser(this.formModel).subscribe((res: any) => {
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
