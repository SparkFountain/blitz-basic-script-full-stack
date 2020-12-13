import { Camera } from '@babylonjs/core';
import { BbScriptEntity } from './entity';

export class BbScriptCamera extends BbScriptEntity {
  minZ: number;
  maxZ: number;

  constructor(camera: Camera, parent?: BbScriptEntity) {
    super('camera', 'camera', parent, camera);
  }
}
