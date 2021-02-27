import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Template } from '@blitz-basic-script/coding';
import { environment } from '../../environments/environment';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LetsCodeService {
  constructor(
    private http: HttpClient,
    private translocoService: TranslocoService
  ) {}

  getKeywords(): Promise<string[]> {
    return this.http
      .get(`${environment.apiServer}/keywords`)
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }

  getCommands(): Promise<string[]> {
    return this.http
      .get(`${environment.apiServer}/commands`)
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }

  getTemplates(): Promise<Template[]> {
    return this.http
      .get(`${environment.apiServer}/coding/templates`, {
        params: { language: this.translocoService.getActiveLang() },
      })
      .toPromise()
      .then((response: ApiResponse<Template[]>) => response.data);
  }

  getFiles(path: string): Promise<any> {
    return this.http
      .get(`${environment.apiServer}/files`, { params: { path } })
      .toPromise()
      .then((response: ApiResponse<string[]>) => response.data);
  }
}
