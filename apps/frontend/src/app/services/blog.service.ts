import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { BlogEntry } from '@blitz-basic-script/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(
    private translateService: TranslateService,
    private http: HttpClient
  ) {}

  getTotalPages(): Promise<number> {
    return this.http
      .get(`${environment.apiServer}/blog/total-pages`)
      .toPromise()
      .then((response: ApiResponse<number>) => response.data);
  }

  get(page: number): Promise<BlogEntry[]> {
    return this.http
      .get(`${environment.apiServer}/blog`, {
        params: {
          page: page.toString(),
          language: this.translateService.currentLang,
        },
      })
      .toPromise()
      .then((response: ApiResponse<BlogEntry[]>) => response.data);
  }
}
