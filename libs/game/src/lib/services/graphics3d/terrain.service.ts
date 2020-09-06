import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BbScriptTerrain } from "bbscript/src/classes/in-game/3d/terrain";
import { BbScriptEntity } from "bbscript/src/classes/in-game/3d/entity";

@Injectable()
export class CommandsGraphics3dTerrainService {
  constructor() {}

  async createTerrain(
    segments: number,
    parent?: BbScriptEntity
  ): Promise<BbScriptTerrain> {
    //TODO: implementation
    return null;
  }

  async loadTerrain(
    filePath: string,
    parent?: BbScriptEntity
  ): Promise<BbScriptTerrain> {
    //TODO: implementation, see https://www.babylonjs-playground.com/#E6OZX#7
    return null;
  }

  async modifyTerrain(
    terrain: BbScriptTerrain,
    x: number,
    z: number,
    height: number,
    realTimeUpdate?: boolean
  ): Promise<void> {
    //TODO: implementation
  }

  async terrainDetail(
    terrain: BbScriptTerrain,
    detailLevel: number,
    enableMorphing: boolean
  ): Promise<void> {
    //TODO: implementation
  }

  async terrainHeight(
    terrain: BbScriptTerrain,
    x: number,
    z: number
  ): Promise<number> {
    //TODO: implementation
    return 0;
  }

  async terrainShading(enableShading: boolean): Promise<void> {
    //TODO: implementation
  }

  async terrainSize(terrain: BbScriptTerrain): Promise<number> {
    //TODO: implementation
    return 0;
  }

  async terrainX(
    terrain: BbScriptTerrain,
    x: number,
    y: number,
    z: number
  ): Promise<number> {
    //TODO: implementation
    return 0;
  }

  async terrainY(
    terrain: BbScriptTerrain,
    x: number,
    y: number,
    z: number
  ): Promise<number> {
    //TODO: implementation
    return 0;
  }

  async terrainZ(
    terrain: BbScriptTerrain,
    x: number,
    y: number,
    z: number
  ): Promise<number> {
    //TODO: implementation
    return 0;
  }
}
