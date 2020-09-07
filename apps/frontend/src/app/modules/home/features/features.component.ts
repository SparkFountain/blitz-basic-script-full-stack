import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Feature } from './feature';

@Component({
  selector: 'blitz-basic-script-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  language: string;
  languageSubscription: Subscription;

  features: Array<Feature[]>;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.languageSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.language = event.lang;
        this.updateFeatures();
      }
    );

    this.updateFeatures();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  updateFeatures(): void {
    this.features = [
      [
        {
          icon: 'gamepad',
          title: this.translateService.instant('FEATURES.1.TITLE'),
          message: this.translateService.instant('FEATURES.1.MESSAGE'),
        },
        {
          icon: 'television',
          title: this.translateService.instant('FEATURES.2.TITLE'),
          message: this.translateService.instant('FEATURES.2.MESSAGE'),
        },
        {
          icon: 'laptop',
          title: this.translateService.instant('FEATURES.3.TITLE'),
          message: this.translateService.instant('FEATURES.3.MESSAGE'),
        },
      ],
      [
        {
          icon: 'code',
          title: this.translateService.instant('FEATURES.4.TITLE'),
          message: this.translateService.instant('FEATURES.4.MESSAGE'),
        },
        {
          icon: 'cubes',
          title: this.translateService.instant('FEATURES.5.TITLE'),
          message: this.translateService.instant('FEATURES.5.MESSAGE'),
        },
        {
          icon: 'bolt',
          title: this.translateService.instant('FEATURES.6.TITLE'),
          message: this.translateService.instant('FEATURES.6.MESSAGE'),
        },
      ],
      [
        {
          icon: 'lightbulb-o',
          title: this.translateService.instant('FEATURES.7.TITLE'),
          message: this.translateService.instant('FEATURES.7.MESSAGE'),
        },
        {
          icon: 'code-fork',
          title: this.translateService.instant('FEATURES.8.TITLE'),
          message: this.translateService.instant('FEATURES.8.MESSAGE'),
        },
        {
          icon: 'info-circle',
          title: this.translateService.instant('FEATURES.9.TITLE'),
          message: this.translateService.instant('FEATURES.9.MESSAGE'),
        },
      ],
    ];
  }
}
