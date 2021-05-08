import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'blitz-basic-script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions!: Subscription[];

  enableIdeNavigation!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscriptions = [];
    this.subscriptions.push(
      this.router.events.subscribe(() => {
        this.enableIdeNavigation = this.router.url === '/game-development';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
