import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blitz-basic-script-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  constructor() {}

  ngOnInit(): void {}
}
