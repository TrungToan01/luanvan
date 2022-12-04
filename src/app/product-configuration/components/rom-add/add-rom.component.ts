import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RomService } from '../../service/rom.service';

@Component({
  selector: 'app-add-rom',
  templateUrl: './add-rom.component.html',
  styleUrls: ['./add-rom.component.scss'],
})
export class AddRomComponent implements OnInit {
  @ViewChild('addForm')
  addForm!: NgForm;

  constructor(
    private romService: RomService,
    public dialogRef: MatDialogRef<AddRomComponent>
  ) {}

  async ngOnInit() {}

  async onSubmit() {
    if (!this.addForm.value.name) {
      return;
    }
    let response = await this.romService.createRom(this.addForm.value);
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể tạo');
    }
  }
}
