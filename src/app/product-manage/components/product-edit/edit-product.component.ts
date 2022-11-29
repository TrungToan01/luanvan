import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from 'src/app/product-configuration/service/color.service';
import { RamService } from 'src/app/product-configuration/service/ram.service';
import { RomService } from 'src/app/product-configuration/service/rom.service';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { BrandService } from '../../service/brand.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productId = this.route.snapshot.paramMap.get('id');
  brandList: any;
  colorList: any;
  ramList: any;
  romList: any;
  @ViewChild('productForm')
  productForm!: NgForm;
  imageSrc: any = [];
  imageList: any = [];
  productInfo: any;
  constructor(
    private brandService: BrandService,
    private productService: ProductService,
    private colorService: ColorService,
    private ramService: RamService,
    private romService: RomService,
    private shareCoreService: ShareCoreService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.getAllBrand();
    await this.getColor();
    await this.getRam();
    await this.getRom();
    await this.getProductById(this.productId);
  }

  //-----------get product by id----------
  async getProductById(id: any) {
    let response = await this.productService.getProductById(id);
    if (response.ok) {
      this.productInfo = response.data;
    }
  }

  //-----------selected file-----------
  filechange(event: any) {
    let files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.imageList.push(element);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = e.target?.result;
        this.imageSrc.push(img);
      };
      reader.readAsDataURL(element);
    }
    console.log(this.imageSrc);
  }

  //------------filter list image-----------
  filterList(data: any) {
    let position = this.imageSrc.indexOf(data);
    this.imageSrc.splice(position, 1);
    this.imageList.splice(position, 1);
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
  // -----------update product-----------
  async updateProduct(id: any) {
    let response = await this.productService.updateProduct(
      id,
      this.productForm.value
    );
    if (response.ok) {
      await this.createImage(this.productId);
    } else {
      alert('không thể tạo');
    }
  }

  //--------------delete image-------------

  async deleteImage(id: any) {
    let response = await this.productService.deleteImage(id);
    if (response.ok) {
      this.getProductById(this.productId);
    }
  }

  //-------------add image product------------
  async createImage(id: any) {
    let formData = new FormData();
    this.imageList.forEach((element: string | Blob) => {
      formData.append('image', element);
      console.log(this.imageList);
    });
    formData.set('productOptionId', id);
    let response = await this.productService.createImage(formData);
    if (response.ok) {
      alert('đã thêm thành công');
    } else {
      alert('không thể thêm hình ảnh sản phẩm');
    }
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
