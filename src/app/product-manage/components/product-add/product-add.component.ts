import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ColorService } from 'src/app/product-configuration/service/color.service';
import { RamService } from 'src/app/product-configuration/service/ram.service';
import { RomService } from 'src/app/product-configuration/service/rom.service';
import { BrandService } from '../../service/brand.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  brandList: any;
  colorList: any;
  ramList: any;
  romList: any;
  @ViewChild('productForm')
  productForm!: NgForm;
  imageSrc: any = [];
  imageList: any = [];
  formData = new FormData();
  constructor(
    private brandService: BrandService,
    private productService: ProductService,
    private colorService: ColorService,
    private ramService: RamService,
    private romService: RomService
  ) {}

  async ngOnInit() {
    await this.getAllBrand();
    await this.getColor();
    await this.getRam();
    await this.getRom();
  }

  //-----------selected file-----------

  filechange(event: any) {
    let files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.imageList.push(element);
      // this.formData.append('image', element);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = e.target?.result;
        this.imageSrc.push(img);
      };
      reader.readAsDataURL(element);
    }
    console.log(this.imageList);
  }
  // -----------brand-----------
  async getAllBrand() {
    let response = await this.brandService.getAllBrands();
    if (response.ok) {
      var newArray = response.data.filter(function (el: any) {
        return el.published == true;
      });
      this.brandList = newArray;
    }
  }
  // -----------color-----------
  async getColor() {
    let response = await this.colorService.getAllColor();
    if (response.ok) {
      this.colorList = response.data;
    }
  }

  // -----------rom-----------
  async getRom() {
    let response = await this.romService.getAllRom();
    if (response.ok) {
      this.romList = response.data;
    }
  }

  // -----------ram-----------
  async getRam() {
    let response = await this.ramService.getAllRam();
    if (response.ok) {
      this.ramList = response.data;
    }
  }
  // -----------create product-----------
  async createProduct() {
    let response = await this.productService.createProduct(
      this.productForm.value
    );
    if (response.ok) {
      alert('đã thêm thành công');
    } else {
      alert('không thể tạo');
    }
  }
}
