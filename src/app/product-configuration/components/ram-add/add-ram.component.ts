import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RamService } from '../../service/ram.service';

@Component({
  selector: 'app-add-ram',
  templateUrl: './add-ram.component.html',
  styleUrls: ['./add-ram.component.scss'],
})
export class AddRamComponent implements OnInit {
  @ViewChild('addForm')
  addForm!: NgForm;

  constructor(
    private ramService: RamService,
    public dialogRef: MatDialogRef<AddRamComponent>
  ) {}

  async ngOnInit() {}

  async onSubmit() {
    let response = await this.ramService.createRam(this.addForm.value);
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert('không thể tạo');
    }
  }
}
