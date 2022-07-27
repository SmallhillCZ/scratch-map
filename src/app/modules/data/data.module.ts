import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { LoadDataPageComponent } from './pages/load-data-page/load-data-page.component';


@NgModule({
  declarations: [
    LoadDataPageComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule
  ]
})
export class DataModule { }
