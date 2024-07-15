import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CategoryService } from 'src/app/feature/product/category/services/category.service';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

@Component({
  selector: 'app-sales-menu',
  templateUrl: './sales-menu.component.html',
  styleUrls: ['./sales-menu.component.scss']
})
export class SalesMenuComponent implements OnInit {

  filter: {
    start_date: string,
    end_date: string,
    category_id: any
  }= {
    start_date: '',
    end_date: '',
    category_id: null
  };
  sales: [];
  meta: {
    dates: any[],
    total_per_date: number[],
    grand_total: number
  } = {
    dates: [],
    total_per_date: [],
    grand_total: 0
  };
  showLoading: boolean;
  categories: any[] = [];
 
  constructor(
    private salesService: SalesService,
    private categoryService: CategoryService,
    private landaService: LandaService
  ) {  }

  ngOnInit(): void {
    this.resetFilter();
    this.getCategories();
   }

  getCategories(name = '') {
    this.showLoading = true;
    this.categoryService.getCategories({ name: name }).subscribe((res: any) => {
      this.categories = res.data.list;
      this.showLoading = false;
    }, err => {
      console.log(err);
    });
   }
   
   resetFilter() {
    this.filter = {
      start_date: null,
      end_date: null,
      category_id: null
    }
   
    this.meta = {
      dates: [],
      total_per_date: [],
      grand_total: 0
    }
   
    this.showLoading = false;
   }
   

   filterByPeriode(period) {
    this.filter.start_date = period.startDate;
    this.filter.end_date = period.endDate;
    this.reloadSales();
  }

  reloadSales() {
    this.runFilterValidation();
   
    this.salesService.getSalesMenu(this.filter).subscribe((res: any) => {
      const { data, settings } = res;
      this.sales = data;
      this.meta = settings;
    });
   }
   
   runFilterValidation() {
    if (!this.filter.start_date || !this.filter.end_date) {
      Swal.fire({
        title: 'Terjadi Kesalahan',
        text: 'Silahkan isi periode penjualan terlebih dahulu',
        icon: 'warning',
        showCancelButton: false
      });
      throw new Error("Start and End date is required");
    }
   }

   setFilterPeriod($event) {
    this.filter.start_date = $event.startDate;
    this.filter.end_date = $event.endDate;
  }
  // setFilterPeriod(event: any) {
  //   this.filter.start_date = event.startDate;
  //   this.filter.end_date = event.endDate;
  //   this.reloadSales();
  // }
  
 
  setFilterCategory($event) {
    this.filter.category_id = $event.id;
  }

 
}
