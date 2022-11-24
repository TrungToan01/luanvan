import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddBrandComponent } from 'src/app/product-manage/components/brand-add/add-brand.component';
import { ColorService } from '../../service/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.scss'],
})
export class AddColorComponent implements OnInit {
  @ViewChild('addColorForm')
  addColorForm!: NgForm;

  constructor(
    private colorService: ColorService,
    public dialogRef: MatDialogRef<AddColorComponent>
  ) {}

  async ngOnInit() {}

  async onSubmit() {
    let response = await this.colorService.createColor(this.addColorForm.value);
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể tạo');
    }
  }
}
