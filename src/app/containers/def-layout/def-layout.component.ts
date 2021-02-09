import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-def-layout',
  templateUrl: './def-layout.component.html',
  styleUrls: ['./def-layout.component.css']
})
export class DefLayoutComponent implements OnInit {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBreadCrumbs(event);
      }
    });
   }

  ngOnInit(): void {
  }

  setBreadCrumbs(event: any){
    console.log(event.url);
  }
}
