import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blitz-basic-script-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  videos!: string[];
  videoIndex!: number;

  constructor() {}

  ngOnInit(): void {
    this.videos = [
      'Fire Wallpaper.mp4',
      'Nerdy Background.mp4',
      'Nerdy Earth.mp4',
      'Sunset.mp4',
    ];
    this.videoIndex = 0;
  }
}
