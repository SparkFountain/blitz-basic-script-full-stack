import { Injectable } from '@angular/core';
import { TextureMode } from '../../../enums/texture/texture-mode';
import { SpriteViewMode } from '../../../enums/sprite/sprite-view-mode';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';

@Injectable()
export class CommandsGraphics3dSpritesService {
  constructor() {}

  async createSprite(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    //TODO implementation
    return null;
  }

  async handleSprite(
    sprite: BbScriptEntity,
    x: number,
    y: number
  ): Promise<void> {
    //TODO implementation
  }

  async loadSprite(
    filePath: string,
    mode: TextureMode,
    parent?: any
  ): Promise<BbScriptEntity> {
    //TODO implementation
    return null;
  }

  async rotateSprite(sprite: BbScriptEntity, angle: number): Promise<void> {
    //TODO implementation
  }

  async scaleSprite(
    sprite: BbScriptEntity,
    x: number,
    y: number
  ): Promise<void> {
    //TODO implementation
  }

  async spriteViewMode(
    sprite: BbScriptEntity,
    mode: SpriteViewMode
  ): Promise<void> {
    //TODO implementation
  }
}
