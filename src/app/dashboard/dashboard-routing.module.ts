import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [{
  path: '',
  children: [{
      path: '',
      redirectTo: 'list'
    },
    {
      path: 'list',
      component: ProductListComponent
    },
    {
      path: 'add',
      component: ProductAddEditComponent
    },
    {
      path: 'edit',
      component: ProductAddEditComponent
    },
    {
      path: 'trash',
      component: ProductDeleteComponent
    },
    {
      path: 'details',
      component: ProductDetailsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
