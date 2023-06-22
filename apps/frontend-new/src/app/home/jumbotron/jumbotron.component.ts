import { Component, OnInit } from '@angular/core';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'blitz-basic-script-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  // font awesome
  fa = {
    circle: faCircle,
    dotCircleO: faDotCircle,
  };

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
