import { Injectable } from "@angular/core";
import { PickGeometry } from "../../../enums/pick/geometry";
import { BbScriptEntity } from "bbscript/src/classes/in-game/3d/entity";

@Injectable()
export class CommandsGraphics3dPickingService {
  constructor() {}

  async cameraPick(
    camera: BbScriptEntity,
    x: number,
    y: number
  ): Promise<BbScriptEntity> {
    return null;
  }

  async entityPick(
    entity: BbScriptEntity,
    distance: number
  ): Promise<BbScriptEntity> {
    return null;
  }

  async entityPickMode(
    entity: BbScriptEntity,
    geometry: PickGeometry,
    coverOtherObjects?: boolean
  ): Promise<void> {}

  async linePick(
    x: number,
    y: number,
    z: number,
    dx: number,
    dy: number,
    dz: number,
    radius?: number
  ): Promise<BbScriptEntity> {
    return null;
  }

  async pickedEntity(): Promise<BbScriptEntity> {
    return null;
  }

  async pickedNX(): Promise<number> {
    return 0;
  }

  async pickedNY(): Promise<number> {
    return 0;
  }

  async pickedNZ(): Promise<number> {
    return 0;
  }

  async pickedSurface() {}

  async pickedTime() {}

  async pickedTriangle() {}

  async pickedX(): Promise<number> {
    return 0;
  }

  async pickedY(): Promise<number> {
    return 0;
  }

  async pickedZ(): Promise<number> {
    return 0;
  }
}
