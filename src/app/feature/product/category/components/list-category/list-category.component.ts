import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DndDropEvent } from 'ngx-drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  listCategory: any;
  titleModal: string;
  categoryId: number;

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pageLength: 25,
      ajax: (dtParams: any, callback) => {
        const params = {
          per_page: dtParams.length,
          page: (dtParams.start / dtParams.length) + 1,
        };

        this.categoryService.getCategories(params).subscribe((res: any) => {
          const { list, meta } = res.data;

          let number = dtParams.start + 1;
          list.forEach(val => (
            val.no = number++
            ));
          this.listCategory = list;

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

  createCategory(modalId) {
    this.titleModal = 'Tambah Category';
    this.categoryId = 0;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  updateCategory(modalId, category) {
    this.titleModal = 'Edit Category: ' + category.name;
    this.categoryId = category.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  deleteCategory(categoryId: number) {
    console.log('Attempting to delete category with ID:', categoryId);
    Swal.fire({
      title: 'Apakah kamu yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, hapus data ini!',
    }).then((result) => {
      if (!result.value) {
        console.log('Deletion cancelled by user.');
        return false;
      }

      console.log('Sending delete request to service...');
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (res: any) => {
          console.log('Category deleted successfully:', res);
          this.reloadDataTable();
        },
        error: (err: any) => {
          console.error('Error deleting category:', err);
          Swal.fire('Error', 'Tidak dapat menghapus kategori.', 'error');
        }
      });
    });
  }




  //  /**
  //   * on dragging category
  //   * @param item item dragged
  //   * @param list list from item dragged
  //   */
  //  onDragged(item: any, list: any[]) {
  //    const index = list.indexOf(item);
  //    list.splice(index, 1);


  //    //variable yang menampung payload untuk mengupdate data index
  //    var final = {
  //      id: item.id,
  //      index: this.listCategory.findIndex(x => x.id === item.id), // untuk mencari index sebenarnya
  //      drag: true,
  //    };


  //    //mengirim data payload ke api
  //    this.categoryService.updateCategory(final).subscribe((res: any) => {
  //    });
  //  }


  //  /**
  //   * On task drop event
  //   */
  //  onDrop(event: DndDropEvent, filteredList?: any[]) {
  //    if (filteredList && event.dropEffect === 'move') {
  //      let index = event.index;


  //      if (typeof index === 'undefined') {
  //        index = filteredList.length;
  //      }


  //      filteredList.splice(index, 0, event.data);
  //    }
  //  }

}
