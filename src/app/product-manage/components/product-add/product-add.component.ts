import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrandService } from '../../service/brand.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  brandList: any;
  product = false;
  @ViewChild('productForm')
  productForm!: NgForm;
  productInfo: any;
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

  async createProduct() {
    console.log(this.productForm.value);
    let response = await this.productService.createProduct(
      this.productForm.value
    );
    if (response.ok) {
      this.product = true;
      this.productInfo = response.data;
      console.log(response);
    } else {
      alert('không thể tạo');
    }
  }
}
