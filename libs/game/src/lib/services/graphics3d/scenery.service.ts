import { Injectable } from '@angular/core';
import { GameStateService } from '../../game-state.service';

@Injectable()
export class CommandsGraphics3dSceneryService {
  constructor(private gameState: GameStateService) {}

  async antiAlias(enabled: boolean): Promise<void> {
    return this.gameState.setAntiAliasing(enabled);
  }

  async captureWorld(): Promise<void> {
    //TODO: implementation
  }

  async clearWorld(removeEntities?: boolean, removeBrushes?: boolean, removeTextures?: boolean): Promise<void> {
    //TODO: implementation
  }

  async renderWorld(animationStep: number): Promise<void> {
    //TODO: implementation
  }

  async updateWorld(updateSpeed?: number): Promise<void> {
    //TODO: implementation
  }

  async wireFrame(enabled: boolean): Promise<void> {
    return this.gameState.setWireFrame(enabled);
  }
}
