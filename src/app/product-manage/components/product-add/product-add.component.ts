import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../service/brand.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  brandList: any;
  constructor(
    private brandService: BrandService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.getAllBrand();
  }

  async getAllBrand() {
    let response = await this.brandService.getAllBrands();
    if (response.ok) {
      var newArray = response.data.filter(function (el: any) {
        return el.published == true;
      });
      this.brandList = newArray;
    } else {
      alert(response);
    }
  }
}
