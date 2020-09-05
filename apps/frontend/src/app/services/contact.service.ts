import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<ApiResponse<boolean>> {
    console.info('[SEND MESSAGE] triggered');

    let subjectFormatted: string;
    switch (subject) {
      case 'bbscript':
        subjectFormatted = 'BlitzBasicScript';
        break;
      case 'website':
        subjectFormatted = 'Website';
        break;
      case 'bug-report':
        subjectFormatted = 'Bug';
        break;
      case 'feature-request':
        subjectFormatted = 'Feature-Vorschlag';
        break;
      case 'criticism':
        subjectFormatted = 'Kritik';
        break;
      case 'individual':
        subjectFormatted = 'Sonstiges';
        break;
    }

    const body = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('subject', subjectFormatted)
      .set('message', message);

    return this.http
      .post<ApiResponse<any>>(
        `${environment.apiServer}/contact/send-message`,
        body
      )
      .toPromise();
  }
}
