import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [ProductListComponent, ProductAddEditComponent, ProductDeleteComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class DashboardModule { }
