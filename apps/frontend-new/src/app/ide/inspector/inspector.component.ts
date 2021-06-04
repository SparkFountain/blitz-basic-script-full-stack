import { Component, Input, OnInit } from '@angular/core';
import { Asset } from './asset.enum';

@Component({
  selector: 'blitz-basic-script-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent implements OnInit {
  @Input() asset: string;

  Asset = Asset;

  constructor() {}

  ngOnInit(): void {}
}
