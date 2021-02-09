import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

import { CommonService, LocalStorageService } from './../../services';


@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit, OnDestroy {
  addProductForm: FormGroup;
  productList;
  public productID = "0";
  headerText = "Add";

  constructor(private formBuilder: FormBuilder, private router: Router,
              private localService: LocalStorageService, private commonService: CommonService,
              private location: Location) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(150)]],
      price: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: [null, [Validators.required]],
      location: [null, [Validators.required]],
      stockQty: ['', [Validators.required]]
    });
    this.commonService.selectedProduct.subscribe(res => {
      if (res) {
        this.addProductForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          unit: res.unit,
          image: res.image,
          category: res.category,
          location: res.location,
          stockQty: res.stockQty
        });
        this.productID = res.id;
        this.headerText = 'Edit';
      }
    });
    this.productList = this.localService.getData();
    if (this.productList.length == 0){
      this.productList = [];
    }
  }

  get f() { return this.addProductForm.controls; }


  // saveProduct() - Add product
  saveProduct() {
    if (this.addProductForm.invalid) {
      Swal.fire('Please enter product details completely', 'error')
      return;
    }
    else {
      let product = new Product();
      this.productID = this.productList.length + 1;

      product.id = Number.parseInt(this.productID);
      product.name = this.addProductForm.value.name;
      product.description = this.addProductForm.value.description;
      product.category = this.addProductForm.value.category;
      product.price = this.addProductForm.value.price;
      product.image = this.addProductForm.value.image;
      product.stockQty = this.addProductForm.value.stockQty;
      product.unit = this.addProductForm.value.unit;
      product.location = this.addProductForm.value.location;
      product.rating = "5";
      product.isDeleted = false;
      product.isLiked = false;
      this.productList.push(product);
      this.localService.setData(this.productList);
      Swal.fire('Success!', 'Item Added', 'success');
      this.addProductForm.reset();
      this.location.back();
    }
  }

  // editProduct -- EditProduct
  editProduct() {
    if (this.addProductForm.invalid) {
      return;
    }
    else {
       this.productList.forEach(product => {
         if (product.id === this.productID){
            product.name = this.addProductForm.value.name;
            product.description = this.addProductForm.value.description;
            product.category = this.addProductForm.value.category;
            product.price = this.addProductForm.value.price;
            product.image = this.addProductForm.value.image;
            product.stockQty = this.addProductForm.value.stockQty;
            product.unit = this.addProductForm.value.unit;
            product.location = this.addProductForm.value.location;
         }
       });
       this.localService.setData(this.productList);
       Swal.fire('Success!', 'Item updated', 'success');
       this.addProductForm.reset();
       this.location.back();
    }
  }

  onSubmit(){
    if (this.productID != "0"){
      this.editProduct();
    }
    else{
      this.saveProduct();
    }
  }

    ngOnDestroy() {
      this.commonService.selectedProduct.next(null);
    }

    goToHome(){
      this.router.navigate(['/dashboard/list']);
    }
}
