import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit, OnDestroy {
  language: string;
  languageSubscription: Subscription;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.language = this.translocoService.getActiveLang();
    this.languageSubscription = this.translocoService.langChanges$.subscribe(
      (event: any) => {
        this.language = event.lang;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
