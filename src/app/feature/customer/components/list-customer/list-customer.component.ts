import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit{
  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
  ) { }

  listUser: any;
  titleModal: string;
  customerId: number;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;
 


  getCustomer() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pageLength: 3,
      ajax: (dtParams: any, callback) => {
        const params = {
          ...this.filter,
          per_page: dtParams.length,
          page: (dtParams.start / dtParams.length) + 1,
        };
   
        this.customerService.getCustomer(params).subscribe((res: any) => {
          const { list, meta } = res.data;
   
          let number = dtParams.start + 1;
          list.forEach(val => {
            val.no = number++;
          });
          this.listUser = list;
   
          callback({
            recordsTotal: meta.total,
            recordsFiltered: meta.total,
            data: [],
          });
   
        }, (err: any) => {
          console.error(err);
        });
      },
    };
   }

   reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }

   filter:{
    name: ''
   }

   setDefault(){
    this.filter = {
      name: ''
    }
   }
  createCustomer(modalId) {
    this.titleModal = 'Tambah Customer';
    this.customerId = 0;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }
  updateCustomer(modalId, customer) {
    this.titleModal = 'Edit Customer: ' + customer.name;
    this.customerId = customer.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }
  deleteCustomer(customerId) {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      text: 'Customer ini tidak dapat login setelah kamu menghapus datanya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
      if (!result.value) return false;
 
      this.customerService.deleteCustomer(customerId).subscribe((res: any) => {
        this.getCustomer();
      });
    });
  }
  ngOnInit(): void{
    this.setDefault();
    this.getCustomer();
  }
}
