import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import { TransaksiService } from '../../services/transaksi.service';

@Component({
  selector: 'app-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss']
})
export class FormSaleComponent implements OnInit {

  constructor(
    private landaService: LandaService,
    private saleService : TransaksiService,
    private modalService: NgbModal,
  ) { }

  readonly USER_UPDATE = 'user';
  readonly PRODUK_UPDATE = 'produk';

  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, "0");
  day = String(this.currentDate.getDate()).padStart(2, "0");
  formattedDate = `${this.year}-${this.month}-${this.day}`;

  ngOnInit(): void {
    console.log("setelah reset form"+this.product)
  }

  ngOnChanges(changes: SimpleChange): void {
    if (changes['selectedCustomer']) {
      console.log("ngOnChanges - selectedCustomer: ", changes['selectedCustomer'].currentValue);
    }
  }

  @Input() userId: number;
  @Input() selectedCustomer: any;
  @Input() product: any;
  @Output() afterSave = new EventEmitter<boolean>();
  titleModal: any;
  customerId: any;
  customer: any;

  formModel: {
    id: number,
    m_customer_id: any,
    date: string,
    product_detail: any,
  };

  updateCustomer(modalId) {
    this.titleModal = 'Edit Customer: ' + this.selectedCustomer.name;
    this.customerId = this.selectedCustomer.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  addAmount(product, i) {
    product.total_item++
  }

  minAmount(product, i) {
    product.total_item--
  }

  unselectProduct(product) {
    product.total_item = 0;
    const index = this.product.indexOf(product);
    if (index !== -1) {
      this.product.splice(index, 1);
    }
    product.selected = false;
  }

  total(product){
    let totalprice = 0;
    product.forEach(val => {
      totalprice = totalprice + (val.price * val.total_item)
    });
    if(totalprice > 0){
      return totalprice
    }
    return 0
  }

  insert() {
    this.formModel = {
      id: 0,
      m_customer_id: this.selectedCustomer.id,
      date: this.formattedDate,
      product_detail: this.product.map(product => {
        return {
          is_added: true,
          m_product_id: product.id,
          m_product_detail_id: product.details.length == 0 ? null : product.details[0].id,
          total_item: product.total_item,
          price: product.price,
        }
      })
    }
    console.log("isi form model "+this.formModel)
    this.saleService.CreateSale(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.resetForm();
      console.log("setelah reset form"+this.product)
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

    resetForm() {
      this.product.forEach(val => {
        val.total_item = 0;
        val.selected = false;
      });
      this.product = [];
      this.customer = [];
      this.ngOnInit();
    }

  }
