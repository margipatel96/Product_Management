import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from './../../services'
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  productList: any = [];

  constructor(private localService: LocalStorageService) { }

  ngOnInit(): void {
    this.getProductList();
    console.log('ProductList', this.productList);
  }

  //getProductList() - Get product list
  getProductList() {
    const tempPrdList =  this.localService.getData();
    this.productList = [];
    if (tempPrdList.length > 0){
      this.productList = tempPrdList.filter(res => {
        if (res.isDeleted) {
         return res;
        }
      });
    }
  }

  //removeProduct() - Delete Product
  removeProduct(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You product has been deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.productList.forEach(element => {
          if (element.id === id){
            element.isDeleted = true;
          }
        });
        this.localService.setData(this.productList);
        this.getProductList();
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You cancelled the operattion',
          'error'
        );
      }
    });

  }

  //restoreProduct() - Restore Product
  restoreProduct(id) {
    this.productList.forEach(element => {
      if (element.id === id){
        element.isDeleted = false;
      }
    });
    this.localService.setData(this.productList);
    this.getProductList();
  }
}
