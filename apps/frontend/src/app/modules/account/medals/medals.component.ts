import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blitz-basic-script-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.scss'],
})
export class MedalsComponent implements OnInit {
  section: 'community' | 'learning' | 'coding';
  medals: {community: any[], learning: any[], coding: any[]};

  constructor() {}

  ngOnInit(): void {
    this.section = 'community';
    this.medals = {
      community: [],
      learning: [],
      coding: []
    }
  }
}
