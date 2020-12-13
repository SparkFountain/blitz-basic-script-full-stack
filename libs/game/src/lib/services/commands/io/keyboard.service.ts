import { Injectable } from '@angular/core';
import { GameStateService } from '../../game-state.service';

@Injectable()
export class CommandsIOKeyboardService {
  constructor(private gameState: GameStateService) {}

  async flushKeys(): Promise<void> {
    return this.gameState.flushKeys();
  }

  async getKey(): Promise<number> {
    return this.gameState.getKeyAsciiCode();
  }

  async input(message?: string): Promise<string> {
    //TODO implement:
    // -get location of x, y from gameState
    // -print message at that position, followed by a blinking cursor
    // -insert / delete characters until Enter is hit
    // -return the input value
    return '';
  }

  async keyDown(code: number): Promise<boolean> {
    return this.gameState.isKeyDown(code);
  }

  async keyHit(code: number): Promise<number> {
    return this.gameState.getKeyHits(code);
  }

  async keyWait(): Promise<number> {
    return this.waitKey();
  }

  async waitKey(): Promise<number> {
    //TODO implement
    return 0;
  }
}
