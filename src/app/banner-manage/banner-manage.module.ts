import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './containers/banners/banners.component';
import { BannersAddComponent } from './components/banners-add/banners-add.component';
import { BannersEditComponent } from './components/banners-edit/banners-edit.component';



@NgModule({
  declarations: [
    BannersComponent,
    BannersAddComponent,
    BannersEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BannerManageModule { }
