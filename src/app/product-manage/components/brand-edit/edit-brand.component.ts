import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandService } from '../../service/brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  @ViewChild('editBrandForm')
  editBrandForm!: NgForm;

  dataBrand: any;
  constructor(
    public dialogRef: MatDialogRef<EditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandService
  ) {}

  async ngOnInit() {
    console.log(this.data.id);
    this.getBrandById(this.data.id);
  }

  async getBrandById(id: any) {
    const response = await this.brandService.getBrandsById(id);
    if (response.ok) {
      console.log(response);
      this.dataBrand = response.data;
    }
  }

  async onSubmit() {
    let response = await this.brandService.updateBrands(
      this.data.id,
      this.editBrandForm.value
    );
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể tạo');
    }
  }
}
