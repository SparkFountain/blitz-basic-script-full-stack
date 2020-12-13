import { Injectable } from "@angular/core";
import { GameStateService } from "../../game-state.service";

@Injectable()
export class CommandsIOMouseService {
  constructor(private gameState: GameStateService) {}

  async flushMouse(): Promise<void> {
    return this.gameState.flushMouse();
  }

  async getMouse(): Promise<number> {
    return 0;
  }

  async hidePointer(canvas?: any): Promise<void> {
    //TODO set CSS class on canvas
  }

  async mouseDown(code: number): Promise<boolean> {
    return this.gameState.isMouseDown(code);
  }

  async mouseHit(code: number): Promise<number> {
    return this.gameState.getMouseHits(code);
  }

  async mouseWait(): Promise<number> {
    return 0;
  }

  async mouseX(canvas?: any): Promise<number> {
    return 0;
  }

  async mouseXSpeed(canvas?: any): Promise<number> {
    return 0;
  }

  async mouseY(canvas?: any): Promise<number> {
    return 0;
  }

  async mouseYSpeed(canvas?: any): Promise<number> {
    return 0;
  }

  async mouseZ(): Promise<number> {
    return 0;
  }

  async mouseZSpeed(): Promise<number> {
    return 0;
  }

  async moveMouse(x: number, y: number, canvas?: any): Promise<void> {}

  async showPointer(canvas?: any): Promise<void> {}

  async waitMouse(): Promise<number> {
    return await this.mouseWait();
  }
}
