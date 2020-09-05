import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Template } from '@blitz-basic-script/coding';
import { environment } from '../../environments/environment';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class LetsCodeService {
  constructor(
    private http: HttpClient,
    private translateService: TranslateService
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
        params: { language: this.translateService.currentLang },
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
