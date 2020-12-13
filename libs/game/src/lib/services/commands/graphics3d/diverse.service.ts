import { Injectable } from '@angular/core';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { BbScriptMirror } from '../../../classes/in-game/3d/mirror';
import { BbScriptPivot } from '../../../classes/in-game/3d/pivot';
import { BbScriptPlane } from '../../../classes/in-game/3d/plane';
import { BbScriptMeshType } from '../../../enums/in-game/3d/mesh-type';

@Injectable()
export class CommandsGraphics3dDiverseService {
  constructor() {}

  async createMirror(parent?: BbScriptEntity): Promise<BbScriptMirror> {
    return null;
  }

  async createPivot(parent?: BbScriptEntity): Promise<BbScriptPivot> {
    // TODO: use vector with rotation and translation?
    return null;
  }

  async createPlane(
    segments?: number,
    parent?: BbScriptEntity
  ): Promise<BbScriptPlane> {
    return null;
  }

  async getMatElement(
    entity: BbScriptEntity,
    row: number,
    column: number
  ): Promise<number> {
    return null;
  }

  async loaderMatrix(
    meshType: BbScriptMeshType,
    xx: number,
    xy: number,
    xz: number,
    yx: number,
    yy: number,
    yz: number,
    zx: number,
    zy: number,
    zz: number
  ): Promise<void> {}

  async trisRendered(): Promise<number> {
    return 0;
  }

  async vectorPitch(x: number, y: number, z: number): Promise<number> {
    return 0;
  }

  async vectorYaw(x: number, y: number, z: number): Promise<number> {
    return 0;
  }
}
