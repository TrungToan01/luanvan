import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RomService } from '../../service/rom.service';

@Component({
  selector: 'app-edit-rom',
  templateUrl: './edit-rom.component.html',
  styleUrls: ['./edit-rom.component.scss'],
})
export class EditRomComponent implements OnInit {
  @ViewChild('romForm')
  romForm!: NgForm;
  romInfo: any;
  constructor(
    private romService: RomService,
    public dialogRef: MatDialogRef<EditRomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await this.getColorById(this.data.id);
  }

  async getColorById(id: any) {
    let response = await this.romService.getRomById(id);
    if (response.ok) {
      this.romInfo = response.data;
    }
  }
  async onSubmit() {
    let response = await this.romService.updateRom(
      this.data.id,
      this.romForm.value
    );
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể cập nhật ');
    }
  }
}
