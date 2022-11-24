import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrandService } from '../../service/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {
  @ViewChild('addBrandForm')
  addBrandForm!: NgForm;

  constructor(
    private brandService: BrandService,
    public dialogRef: MatDialogRef<AddBrandComponent>
  ) {}

  async ngOnInit() {}

  async onSubmit() {
    let response = await this.brandService.createBrand(this.addBrandForm.value);
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể tạo');
    }
  }
}
