import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm')
  registerForm!: NgForm;
  confirmPass = true;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (
      this.registerForm.value.password !=
      this.registerForm.value.passwordconfirm
    ) {
      this.confirmPass = false;
    } else {
      this.confirmPass = true;
      let response = await this.authService.register(this.registerForm.value);
      if (response && response.ok) {
        this.router.navigate(['/']);
      } else {
        response.mgs;
      }
    }
  }
}
