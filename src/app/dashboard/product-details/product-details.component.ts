import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  prdData: any;

  isRated1: boolean = false;
  isRated2: boolean = false;
  isRated3: boolean = false;
  isRated4: boolean = false;
  isRated5: boolean = false;
  strclr: any;
  headerText = "Details";

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.commonService.selectedProduct.subscribe(res =>{
      this.prdData = res;
    })
    // this.commonService.showHeader.next(false);
    // this.commonService.showNav.next(false);
  }

  //Rating
  clkStar(no: number){
    if(no == 1){
      this.isRated1 = true;
      this.isRated2 = false;
      this.isRated3 = false;
      this.isRated4 = false;
      this.isRated5 = false;
      this.strclr='#e88421';
    }
   else if(no == 2){
      this.isRated1 = true;
      this.isRated2 = true;
      this.isRated3 = false;
      this.isRated4 = false;
      this.isRated5 = false;
      this.strclr='#e88421';
    }
    else if(no == 3){
      this.isRated1 = true;
      this.isRated2 = true;
      this.isRated3 = true;
      this.isRated4 = false;
      this.isRated5 = false;
      this.strclr='#e88421';
    }
    else if(no == 4){
      this.isRated1 = true;
      this.isRated2 = true;
      this.isRated3 = true;
      this.isRated4 = true;
      this.isRated5 = false;
      this.strclr='#e88421';
    }
    else if(no == 5){
      this.isRated4 = true;
      this.isRated1 = true;
      this.isRated2 = true;
      this.isRated3 = true;
      this.isRated5 = true;
      this.strclr='#e88421';
    }
  }

  goToHome(){
    this.router.navigate(['/dashboard/list']);
  }

  ngOnDestroy(){
    this.commonService.selectedProduct.next(null);
  }
}
