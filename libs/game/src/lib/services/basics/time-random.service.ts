import { Injectable } from '@angular/core';
import { BbScriptTimer } from 'bbscript/src/classes/in-game/time-and-date/timer';
import { GameStateService } from '../../game-state.service';

@Injectable()
export class CommandsBasicsTimeRandomService {
  constructor(private gameState: GameStateService) {}

  async createTimer(frequency: number): Promise<BbScriptTimer> {
    return new BbScriptTimer(frequency);
  }

  async currentDate(): Promise<string> {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Promise.resolve(`${day} ${monthNames[date.getMonth()]} ${date.getFullYear()}`);
  }

  async currentTime(): Promise<string> {
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Promise.resolve(`${hours}:${minutes}:${seconds}`);
  }

  async delay(milliSeconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliSeconds));
  }

  async freeTimer(timer: BbScriptTimer): Promise<void> {
    timer = null;
  }

  async milliSecs(): Promise<number> {
    return this.gameState.getMilliSecs();
  }

  async pauseTimer(timer: BbScriptTimer): Promise<void> {
    return null;
  }

  async rand(minOrMax: number, max?: number): Promise<number> {
    if (max) {
      return Promise.resolve(Math.trunc(Math.random() * (max - minOrMax) + minOrMax));
    } else {
      return Promise.resolve(Math.trunc(Math.random() * minOrMax));
    }
  }

  async resetTimer(timer: BbScriptTimer): Promise<void> {
    return null;
  }

  async resumeTimer(timer: BbScriptTimer): Promise<void> {
    return null;
  }

  async rnd(minOrMax: number, max: number): Promise<number> {
    if (max) {
      return Promise.resolve(Math.random() * (max - minOrMax) + minOrMax);
    } else {
      return Promise.resolve(Math.random() * minOrMax);
    }
  }

  async rndSeed(): Promise<number> {
    return null;
  }

  async seedRnd(value: string): Promise<void> {
    // TODO: implementation, see https://stackoverflow.com/a/19303725
    // const x = Math.sin(seed++) * 10000;
    // return x - Math.floor(x);
  }

  async timerTicks(): Promise<number> {
    return null;
  }

  async waitTimer(timer: any): Promise<void> {
    return null;
  }
}
