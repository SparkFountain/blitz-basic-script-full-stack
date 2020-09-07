import { Injectable } from '@angular/core';
import { GameMovie } from '../../../interfaces/game/movie';
import { GeneralService } from '../../general.service';
import { CommandsSoundMusicSamplesService } from '../sound/music-samples.service';

@Injectable()
export class CommandsGraphics2dMoviesService {
  constructor(private generalService: GeneralService) {}

  async closeMovie(movie: GameMovie): Promise<void> {
    movie.name = null;
    movie.video = null;
    movie = null;
  }

  async drawMovie(movie: GameMovie, x: number, y: number, width: number, height: number): Promise<boolean> {
    let domVideo = movie.video;
    domVideo.style.marginTop = `${x}px`;
    domVideo.style.marginLeft = `${y}px`;
    domVideo.style.width = `${width}px !important`;
    domVideo.style.height = `${height}px !important`;

    if (movie.video.ended) {
      return false;
    } else {
      return true;
    }
  }

  async movieHeight(movie: GameMovie): Promise<number> {
    return movie.video.videoHeight;
  }

  async moviePlaying(movie: GameMovie): Promise<boolean> {
    return movie.video.ended ? false : true;
  }

  async movieWidth(movie: GameMovie): Promise<number> {
    return Promise.resolve(movie.video.videoWidth);
  }

  async openMovie(filePath: string): Promise<GameMovie> {
    return new Promise<GameMovie>((resolve: Function) => {
      let name = `movie:${this.generalService.createUuid()}`;
      let video = document.createElement('video');
      video.oncanplaythrough = () => {
        document.getElementById('bbscript-canvas-container').appendChild(video);
        resolve({
          name: name,
          video: video
        });
      };

      // TODO: automatically remove video after it has ended (not working yet)
      video.onended = () => {
        this.closeMovie({
          name: name,
          video: video
        });
      };

      video.id = name;
      video.src = filePath;
      video.autoplay = true;
    });
  }
}
