import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, LocalStorageService } from './../../services';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

// @Pipe({
//   name: 'filter'
// })

export class ProductListComponent implements OnInit {

  productList: any = [];
  isStock= "1";
  public search = '';

  task: any = {
    name: 'All Product Categories',
    completed: false,
    color: '',
    subtasks: [
      {name: 'Clothes', completed: false, color: ''},
      {name: 'Electronics', completed: false, color: ''},
      {name: 'Mobiles', completed: false, color: ''}
    ]
  };

  location: any = {
    name: 'Location',
    completed: false,
    color: '',
    subtasks: [
      {name: 'Room1', completed: false, color: ''},
      {name: 'Room2', completed: false, color: ''},
    ]
  };

  allComplete: boolean = false;
  allCompleteLocation: boolean = false;

  constructor(private localService: LocalStorageService, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  //Search pipe
  transform(arr: any[], field:string, value: string): any[] {
    if(!arr) return [];
    if(!value) return this.productList;

    return this.productList.filter( str => {
          return str[field].toLowerCase().includes(value.toLowerCase());
        });
   }

   applyFilter(){
    const tempPrdList = this.localService.getData();
    this.productList  = tempPrdList.filter(res => {
      if (!res.isDeleted) {
        return res;
      }
    });
    if (this.isStock === '0'){
      this.productList  = this.productList.filter(res => {
        if (res.stockQty === 0) {
          return res;
        }
      });
    }
    if (this.isStock === '1'){
      this.productList  = this.productList.filter(res => {
        if (res.stockQty > 0) {
          return res;
        }
      });
    }
    if (this.allCompleteLocation === false){
      this.location.subTasks.forEach(element => {
          if (element.completed){
            this.productList  = this.productList.filter(res => {
              if (res.location === element.name) {
                return res;
              }
            });
          }
      });
    }
    if (this.allComplete === false){
      this.task.subTasks.forEach(element => {
          if (element.completed){
            this.productList  = this.productList.filter(res => {
              if (res.category === element.name) {
                return res;
              }
            });
          }
      });
    }
  }

  // getProductList() - Get product list
  getProductList() {
    const tempPrdList = this.localService.getData();
    this.productList = [];
    if (tempPrdList.length > 0){
      this.productList  = tempPrdList.filter(res => {
        if (!res.isDeleted) {
          return res;
        }
      });
    }
  }

  // removeProduct() - Delete Product
  removeProduct(id) {
    this.productList.forEach(element => {
      if (element.id === id){
        element.isDeleted = true;
      }
    });
    this.localService.setData(this.productList);
    this.getProductList();
  }

  // openProductDetails - Open Details
  openProductDetails(product){
    this.commonService.selectedProduct.next(product);
    this.router.navigate(['/dashboard/details']);
  }

  editProduct(product){
    this.commonService.selectedProduct.next(product);
    this.router.navigate(['/dashboard/edit']);
  }

  goToAdd(){
    this.router.navigate(['/dashboard/add']);
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  updateAllCompleteLocation() {
    this.allCompleteLocation = this.location.subtasks != null && this.location.subtasks.every(t => t.completed);
  }

  // setAllLocation(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  setAllLocation(completed: boolean) {
    this.allCompleteLocation = completed;
    if (this.location.subtasks == null) {
      return;
    }
    this.location.subtasks.forEach(t => t.completed = completed);
  }

  setLike(index, isLiked){
    this.productList[index].isLiked = !isLiked;
    this.localService.setData(this.productList);
    this.getProductList();
  }

}
