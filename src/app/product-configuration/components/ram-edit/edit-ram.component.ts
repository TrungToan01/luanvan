import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RamService } from '../../service/ram.service';

@Component({
  selector: 'app-edit-ram',
  templateUrl: './edit-ram.component.html',
  styleUrls: ['./edit-ram.component.scss'],
})
export class EditRamComponent implements OnInit {
  @ViewChild('ramForm')
  ramForm!: NgForm;
  ramInfo: any;
  constructor(
    private ramService: RamService,
    public dialogRef: MatDialogRef<EditRamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await this.getColorById(this.data.id);
  }

  async getColorById(id: any) {
    let response = await this.ramService.getRamById(id);
    if (response.ok) {
      this.ramInfo = response.data;
    }
  }
  async onSubmit() {
    let response = await this.ramService.updateRam(
      this.data.id,
      this.ramForm.value
    );
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể cập nhật ');
    }
  }
}
