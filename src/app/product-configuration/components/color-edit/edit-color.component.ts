import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorService } from '../../service/color.service';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.scss'],
})
export class EditColorComponent implements OnInit {
  @ViewChild('ColorForm')
  ColorForm!: NgForm;
  colorInfo: any;
  constructor(
    private colorService: ColorService,
    public dialogRef: MatDialogRef<EditColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await this.getColorById(this.data.id);
  }

  async getColorById(id: any) {
    let response = await this.colorService.getColorById(id);
    if (response.ok) {
      this.colorInfo = response.data;
    }
  }
  async onSubmit() {
    let response = await this.colorService.updateColor(
      this.data.id,
      this.ColorForm.value
    );
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể cập nhật ');
    }
  }
}
