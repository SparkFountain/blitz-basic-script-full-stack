import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { environment } from 'apps/frontend/src/environments/environment';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  section: 'form' | 'success' | 'error';
  showTerms: boolean;

  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  termsAccepted: boolean;
  notices: object;

  sendingRequest: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.section = 'form';
    this.showTerms = false;

    this.username = '';
    this.email = '';
    this.password = '';
    this.passwordConfirm = '';
    this.termsAccepted = false;

    this.notices = {};
    this.sendingRequest = false;
  }

  ngOnInit(): void {}

  toggleTerms(): void {
    this.showTerms = !this.showTerms;
  }

  register(): void {
    this.username = this.username.trim();
    this.email = this.email.trim();
    this.notices = {};

    this.checkUsername();
    this.checkEmail();

    if (this.username.length < 2) {
      this.notices['username-too-short'] = true;
    } else if (this.username.length > 32) {
      this.notices['username-too-long'] = true;
    } else if (!environment.usernameRegex.test(this.username)) {
      this.notices['username-must-be-alphanumeric'] = true;
    }

    if (this.email.length === 0) {
      this.notices['email-empty'] = true;
    } else if (!environment.emailRegex.test(this.email)) {
      this.notices['email-invalid'] = true;
    }

    if (this.password.length < 8) {
      this.notices['password-too-short'] = true;
    }

    if (this.passwordConfirm.length === 0) {
      this.notices['password-confirm-empty'] = true;
    } else if (this.passwordConfirm !== this.password) {
      this.notices['passwords-do-not-match'] = true;
    }

    if (!this.termsAccepted) {
      this.notices['terms-must-be-accepted'] = true;
    }

    // console.info('[NOTICES]', this.notices);

    if (Object.keys(this.notices).length === 0) {
      this.sendingRequest = true;

      this.authService
        .register(this.username, this.email, this.password, this.termsAccepted)
        .then((response: ApiResponse<any>) => {
          if (response.status === 'success') {
            this.section = 'success';
          } else {
            console.error('[REGISTRATION ERROR]', response);
            this.section = 'error';
          }
          this.sendingRequest = false;
        });
    }
  }

  checkUsername(): void {
    this.authService
      .usernameExists(this.username)
      .then((response: ApiResponse<any>) => {
        if (response.status === 'success') {
          if (response.data.exists) {
            this.notices['username-exists'] = true;
          } else {
            this.notices['username-exists'] = false;
          }
        }
      });
  }

  checkEmail(): void {
    this.authService
      .emailExists(this.email)
      .then((response: ApiResponse<any>) => {
        if (response.status === 'success') {
          if (response.data.exists) {
            this.notices['email-exists'] = true;
          } else {
            this.notices['email-exists'] = false;
          }
        }
      });
  }
}
