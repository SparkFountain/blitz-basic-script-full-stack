import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { environment } from '../../environments/environment';

import { Breadcrumb, DocCache, NavigationElement } from '@blitz-basic-script/documentation';
import { NavParams } from '../modules/documentation/documentation.component';

@Injectable({
  providedIn: 'root',
})
export class DocumentationService {
  cache: DocCache[];

  constructor(private http: HttpClient) {
    this.cache = [];
  }

  get(route: string, params?: object): Promise<any> {
    const docCache: DocCache = this.cache.find(
      (obj) =>
        obj.route === route &&
        JSON.stringify(obj.params) === JSON.stringify(params)
    );

    if (docCache) {
      return Promise.resolve(docCache.data);
    } else {
      return this.http
        .get(`${environment.apiServer}/docs/${route}`, {
          params: { ...params },
        })
        .toPromise()
        .then((response: ApiResponse<any>) => {
          console.info('[API RESPONSE]', response);
          this.cache.push({
            route,
            params,
            data: response.data,
          });
          return response.data;
        });
    }
  }

  async getBreadcrumbs(navParams: NavParams): Promise<Breadcrumb[]> {
    const response: ApiResponse<Breadcrumb[]> = await this.http
      .get<ApiResponse<Breadcrumb[]>>(`${environment.apiServer}/docs/breadcrumbs`, { params: { ...navParams } })
      .toPromise();
    return response.data;
  }

  async getNavigation(navParams: NavParams): Promise<NavigationElement[]> {
    const response: ApiResponse<NavigationElement[]> = await this.http
      .get<ApiResponse<NavigationElement[]>>(`${environment.apiServer}/docs/navigation`, {
        params: { ...navParams },
      })
      .toPromise();
    return response.data;
  }
}
