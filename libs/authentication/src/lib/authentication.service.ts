import { ApiServer } from './server';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { User } from './user';

import { ApiResponse } from '@blitz-basic-script/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public token: BehaviorSubject<string>;
  public user: User;

  constructor(private http: HttpClient, public translate: TranslateService) {
    this.token = new BehaviorSubject<string>('');
  }

  register(
    username: string,
    email: string,
    password: string,
    termsAccepted: boolean
  ): Promise<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('email', email)
      .set('password', password)
      .set('termsAccepted', termsAccepted.toString())
      .set('language', this.translate.currentLang);

    return this.http
      .post<ApiResponse<any>>(`${ApiServer.url}/auth/register`, body)
      .toPromise();
  }

  /**
   * Checks whether there are user credentials stored in local storage.
   * If so, send a credential check to the backend.
   */
  public userIsLoggedIn(): Promise<boolean> {
    const storedUser: User = {
      name: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
    };

    if (storedUser.name && storedUser.email && storedUser.token) {
      return this.validateCredentials(storedUser);
    } else {
      return Promise.resolve(false);
    }
  }

  // TODO: error handling
  async login(userOrEmail: string, password: string): Promise<void> {
    const body = new HttpParams()
      .set('userOrEmail', userOrEmail)
      .set('password', password);

    const response = await this.http
      .post<ApiResponse<User>>(`${ApiServer.url}/auth/login`, body)
      .toPromise();
    localStorage.setItem('username', response.data.name);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('token', response.data.token);
  }

  logout(): Promise<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${ApiServer.url}/auth/logout`, {
        userOrEmail: this.user.email,
        token: this.token.value,
      })
      .toPromise();
  }

  usernameExists(username: string): Promise<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${ApiServer.url}/auth/username-exists`, {
        params: {
          username,
        },
      })
      .toPromise();
  }

  emailExists(email: string) {
    return this.http
      .get<ApiResponse<any>>(`${ApiServer.url}/auth/email-exists`, {
        params: {
          email,
        },
      })
      .toPromise();
  }

  async validateCredentials(user: User): Promise<boolean> {
    // TODO: something is horribly wrong here (infinite loop call)
    return null;
    // const response = await this.http
    //   .post<ApiResponse<boolean>>(`${ApiServer.url}/auth/validate-credentials`, {
    //     username: user.name,
    //     email: user.email,
    //     token: user.token
    //   })
    //   .toPromise();
    // return response.data;
  }

  updateToken(token: string): void {
    this.token.next(token);
  }
}
