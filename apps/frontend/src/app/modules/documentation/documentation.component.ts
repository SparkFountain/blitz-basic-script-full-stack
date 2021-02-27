import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { environment } from '../../../environments/environment';
import { DocumentationService } from '../../services/documentation.service';
import { NavigationElement } from '@blitz-basic-script/documentation';
import { TranslocoService } from '@ngneat/transloco';

export interface DocCategory {
  title: string;
  elements: any;
}

export interface Category {
  title: string;
  icon: string;
  path: string;
}

export interface Breadcrumb {
  title: string;
  path: string;
}

export interface NavParams {
  language: string;
  level1?: string;
  level2?: string;
  level3?: string;
  level4?: string;
}

@Component({
  selector: 'blitz-basic-script-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];
  public navElements: NavigationElement[];
  public searchTerm: string;
  public level1: string;
  public level2: string;
  public level3: string;
  public level4: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private translocoService: TranslocoService,
    private documentationService: DocumentationService
  ) {
    this.breadcrumbs = [];
    this.navElements = [];
    this.searchTerm = '';

    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    // console.info('[SNAPSHOT ROUTE]', snapshot);

    const navParams: NavParams = {
      language: this.translocoService.getActiveLang(),
    };
    for (let i = 0; i <= 3; i++) {
      if (snapshot.url[i]) {
        navParams[`level${i + 1}`] = snapshot.url[i].path;

        switch (i) {
          case 0:
            this.level1 = snapshot.url[i].path;
            break;
          case 1:
            this.level2 = snapshot.url[i].path;
            break;
          case 2:
            this.level3 = snapshot.url[i].path;
            break;
          case 3:
            this.level4 = snapshot.url[i].path;
            break;
        }
      }
    }

    // console.info('[NAV PARAMS]', navParams);

    this.documentationService
      .getBreadcrumbs(navParams)
      .then((breadcrumbs: Breadcrumb[]) => (this.breadcrumbs = breadcrumbs));
    this.documentationService
      .getNavigation(navParams)
      .then((navElements: NavigationElement[]) => {
        console.info('[NAV ELEMENTS]', navElements);
        this.navElements = navElements;
      });
  }

  ngOnInit(): void {}

  navigateTo(path: string): void {
    // TODO: i18n url path
    this.router.navigateByUrl(`/dokumentation/${path}`);
  }

  search(): void {
    // TODO: move to documentation service
    this.http
      .get(`${environment.apiServer}/docs/search`, {
        params: { term: this.searchTerm },
      })
      .toPromise()
      .then((response: ApiResponse<any[]>) => {
        // console.info('[SEARCH RESPONSE]', response);
      });
  }

  isSection(section: string): boolean {
    if (section === '') {
      return !this.route?.snapshot?.url[0];
    } else {
      return this.route?.snapshot?.url[0]?.path === section;
    }
  }
}
