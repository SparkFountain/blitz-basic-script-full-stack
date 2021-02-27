import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { BlogEntry } from '@blitz-basic-script/blog';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(
    private translocoService: TranslocoService,
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
          language: this.translocoService.getActiveLang(),
        },
      })
      .toPromise()
      .then((response: ApiResponse<BlogEntry[]>) => response.data);
  }
}
