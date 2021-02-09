import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practical';
  isExpanded = false;
  showHeader = true;
  showNav = true;

  constructor(private router: Router, private commonService: CommonService){
    this.commonService.showHeader.subscribe(res => {
      this.showHeader = res;
    })
    this.commonService.showNav.subscribe(res =>{
      this.showNav = res;
    })
  }

  changeView(){
    this.isExpanded = !this.isExpanded;
  }

  goToList(){
    this.router.navigate(['dashboard/list']);
  }

  goToTrash(){
    this.router.navigate(['dashboard/trash']);
  }
}
