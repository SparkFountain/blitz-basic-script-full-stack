import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
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

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.language = this.translocoService.getActiveLang();
    this.languageSubscription = this.translocoService.langChanges$.subscribe(
      (event: any) => {
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
          title: this.translocoService.translate('FEATURES.1.TITLE'),
          message: this.translocoService.translate('FEATURES.1.MESSAGE'),
        },
        {
          icon: 'television',
          title: this.translocoService.translate('FEATURES.2.TITLE'),
          message: this.translocoService.translate('FEATURES.2.MESSAGE'),
        },
        {
          icon: 'laptop',
          title: this.translocoService.translate('FEATURES.3.TITLE'),
          message: this.translocoService.translate('FEATURES.3.MESSAGE'),
        },
      ],
      [
        {
          icon: 'code',
          title: this.translocoService.translate('FEATURES.4.TITLE'),
          message: this.translocoService.translate('FEATURES.4.MESSAGE'),
        },
        {
          icon: 'cubes',
          title: this.translocoService.translate('FEATURES.5.TITLE'),
          message: this.translocoService.translate('FEATURES.5.MESSAGE'),
        },
        {
          icon: 'bolt',
          title: this.translocoService.translate('FEATURES.6.TITLE'),
          message: this.translocoService.translate('FEATURES.6.MESSAGE'),
        },
      ],
      [
        {
          icon: 'lightbulb-o',
          title: this.translocoService.translate('FEATURES.7.TITLE'),
          message: this.translocoService.translate('FEATURES.7.MESSAGE'),
        },
        {
          icon: 'code-fork',
          title: this.translocoService.translate('FEATURES.8.TITLE'),
          message: this.translocoService.translate('FEATURES.8.MESSAGE'),
        },
        {
          icon: 'info-circle',
          title: this.translocoService.translate('FEATURES.9.TITLE'),
          message: this.translocoService.translate('FEATURES.9.MESSAGE'),
        },
      ],
    ];
  }
}
