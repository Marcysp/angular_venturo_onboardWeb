import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/feature/product/product/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent implements OnInit {

  listProduct: any;
  selectedProduct: any = [];
  titleForm: string;
  titleModal: string;
  productId: number;
  showForm: boolean;

  filtercust: {
    name: any,
    customer_id: null
  }

  filterprod: {
    name: any,
    product_category_id: null,
    is_available: '1',
  }
  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.selectedProduct = [];
    this.selectedCustomer = 0;
    this.customerdata = null;
    this.showForm = false;
    this.setDefaultFilter();
    this.getProducts();
    this.getCustomer();
  }

  setDefaultFilter() {
    this.filterprod = {
      name: '',
      product_category_id: null,
      is_available: '1'
    }

    this.filtercust = {
      name: "",
      customer_id: null,
    }
  }

  getProducts() {
    this.productService.getProducts(this.filterprod).subscribe((res: any) => {
      this.listProduct = res.data.list;
    }, (err: any) => {
      console.error(err);
    });
  }

  updateProduct(modalId, product) {
    this.titleModal = 'Edit Menu: ' + product.name;
    this.productId = product.id
    this.modalService.open(modalId, { size: 'xl', backdrop: 'static' });
  }

  selectProduct(product) {
    product.total_item = 1;
    this.selectedProduct.push(product);
    product.selected = true;
    console.log(this.selectedProduct);
  }

  resetselectedData() {
    this.selectedProduct = [];
    this.customerdata = null;
    this.selectedCustomer = [];
  }

  // User
  selectedCustomer: any;
  listCustomer: any;
  customerselect: any;
  customerdata: any;
  customerId: number;

  getCustomer() {
    this.customerService.getCustomer(this.filtercust).subscribe((res: any) => {
      this.listCustomer = res.data.list;
    }, (err: any) => {
      console.error(err);
    });
  }

  onCustomerSelectionChange(event: any) {
    console.log(this.selectedCustomer);
    if (!event) {
      this.customerdata = null;
    } else {
      this.filtercust.customer_id = this.selectedCustomer
      this.customerService.getCustomerById(this.selectedCustomer).subscribe(
        (res: any) => {
          this.customerdata = res.data;
        },
        (err: any) => {
          console.error(err); // Log the error for debugging
        }
      );
    }
    console.log(this.customerdata)
  }
}
