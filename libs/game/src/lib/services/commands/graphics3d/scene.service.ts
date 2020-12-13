import { Injectable } from '@angular/core';
import { BbScriptSkyBox } from '../../../classes/in-game/3d/skybox';

@Injectable()
export class CommandsGraphics3dSceneService {
  constructor() {}

  createSkyBox(): Promise<BbScriptSkyBox> {
    return null;
  }

  loadSkyBox(): Promise<BbScriptSkyBox> {
    return null;
  }

  setGravity(gravity: number): Promise<void> {
    return;
  }
}
