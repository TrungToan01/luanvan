import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;
  confirmPass = true;
  generalError: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit() {
    this.generalError = '';
    if (this.loginForm.value.password != this.loginForm.value.passwordconfirm) {
      this.confirmPass = false;
    } else {
      this.confirmPass = true;
      let response = await this.authService.login(this.loginForm.value);
      if (response && response.ok) {
        this.router.navigate(['']);
      } else {
        this.generalError = 'auth.error.login-failed';
      }
    }
  }
}
