import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blitz-basic-script-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {
  @Input() image?: HTMLImageElement;
  @Input() icon?: string;
  @Input() ref: any; // TODO: type definition

  constructor() {}

  ngOnInit(): void {}
}
