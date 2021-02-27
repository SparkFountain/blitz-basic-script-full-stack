import { NavigationLink } from './../../core/navigation/navigation-link';
import { NavigationElement } from './../../core/navigation/navigation-element';
import { NavigationMenu } from './../../core/navigation/navigation-menu';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'blitz-basic-script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private routerEventSubscription!: Subscription;

  public navigationElements!: {
    left: NavigationMenu[];
    right: NavigationMenu[];
  };

  public mobileMenuOpen!: boolean;
  // public MobileMenuContext: any = MobileMenuContext;
  public Language = Language;

  constructor(
    public router: Router,
    public authService: AuthenticationService,
    private transloco: TranslocoService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.transloco.setDefaultLang('en');

    const browserLang = getBrowserLang();

    // initialize navigation
    this.navigationElements = {
      left: [
        new NavigationMenu('fa-home', 'HOME', ['OVERVIEW', 'BLOG', 'FEATURES']),
        new NavigationMenu('fa-dashboard', 'LETS_CODE', [
          'EMPTY_PROJECT',
          'TEMPLATES',
        ]),
        new NavigationMenu('fa-cubes', 'PROJECTS', [
          'DEMOS',
          'MY_PROJECTS',
          'COMMUNITY',
        ]),
        new NavigationMenu('fa-graduation-cap', 'TUTORIALS', [
          'BASICS',
          'GRAPHICS',
          'IO',
          'SOUND',
          'GUI',
          'PARTICLES',
          '3D',
        ]),
        new NavigationMenu('fa-book', 'DOCUMENTATION', [
          'KEYWORDS',
          'COMMANDS',
          'CONSTANTS_AND_SCANCODES',
          'DIFFERENCES_TO_BLITZ_BASIC',
          'MIGRATION_GUIDE',
        ]),
      ],
      right: [],
    };

    // mobile menu is closed at the beginning
    this.mobileMenuOpen = false;
  }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

  isNavLink(
    navigationElement: NavigationElement
  ): navigationElement is NavigationLink {
    return (navigationElement as NavigationLink).path !== undefined;
  }

  isNavMenu(
    navigationElement: NavigationElement
  ): navigationElement is NavigationMenu {
    return (navigationElement as NavigationMenu).submenus !== undefined;
  }

  changeLanguage(language: string): void {
    this.transloco.setActiveLang(language);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}

export const Language = {
  GERMAN: 'de',
  ENGLISH: 'en',
};
