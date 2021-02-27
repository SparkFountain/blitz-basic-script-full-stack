import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent implements OnInit, OnDestroy {
  language: string;
  languageSubscription: Subscription;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.language = this.translocoService.getActiveLang();
    this.languageSubscription = this.translocoService.langChanges$.subscribe(
      (language: string) => {
        this.language = language;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
