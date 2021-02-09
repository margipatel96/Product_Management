import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }
  showHeader = new BehaviorSubject<any>(true);
  showNav = new BehaviorSubject<any>(true);
  selectedProduct  = new  BehaviorSubject<any>(null);

}
