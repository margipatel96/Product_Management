import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  getData(){
    const data = localStorage.getItem('productList');
    if(data){
      return JSON.parse(data);
    }else{
      return [];
    }
   
  }

  setData(data: any){
    localStorage.setItem('productList', JSON.stringify(data));
  }

  clearLocalStorage(){
    localStorage.clear();
  }
}
