import { Injectable } from '@angular/core';
import { BabylonJSService } from '../../babylon-js.service';
import { BbScriptAxis } from '../../../enums/axis';
import { Mesh, Camera } from 'babylonjs';
import { BbScriptEntity } from 'bbscript/src/classes/in-game/3d/entity';

@Injectable()
export class CommandsGraphics3dCoordinatesService {
  constructor(private babylonjs: BabylonJSService) {}

  async alignToVector(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    axis: BbScriptAxis,
    tween: number
  ): Promise<void> {
    return this.babylonjs.alignToVector(entity, x, y, z, axis, tween);
  }

  async moveEntity(entity: BbScriptEntity, x: number, y: number, z: number): Promise<void> {
    return this.babylonjs.moveEntity(entity, x, y, z);
  }

  async pointEntity(sourceEntity: BbScriptEntity, targetEntity: BbScriptEntity, roll: number): Promise<void> {
    return this.babylonjs.pointEntity(sourceEntity, targetEntity, roll);
  }

  async positionEntity(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    parentCoordinates?: boolean
  ): Promise<void> {
    return this.babylonjs.positionMesh(entity.instance as Mesh, x, y, z, parentCoordinates);
  }

  async rotateEntity(entity: BbScriptEntity, pitch: number, yaw: number, roll: number, parentCoordinates?: boolean) {
    return this.babylonjs.rotateEntity(entity.instance as Mesh, pitch, yaw, roll, parentCoordinates);
  }

  async scaleEntity(entity: BbScriptEntity, x: number, y: number, z: number, parentScale?: boolean): Promise<void> {
    return this.babylonjs.scaleMesh(entity, x, y, z, parentScale);
  }

  async translateEntity(entity: BbScriptEntity, x: number, y: number, z: number, parentAngle?: boolean): Promise<void> {
    return this.babylonjs.translateEntity(entity, x, y, z, parentAngle);
  }

  async turnEntity(
    entity: BbScriptEntity,
    pitch: number,
    yaw: number,
    roll: number,
    parentAngle?: boolean
  ): Promise<void> {
    return this.babylonjs.turnEntity(entity, pitch, yaw, roll, parentAngle);
  }

  async tFormedX(): Promise<number> {
    return 0;
  }

  async tFormedY(): Promise<number> {
    return 0;
  }

  async tFormedZ(): Promise<number> {
    return 0;
  }

  async tFormNormal(x: number, y: number, z: number, source: BbScriptEntity, target: BbScriptEntity): Promise<void> {}

  async tFormPoint(x: number, y: number, z: number, source: BbScriptEntity, target: BbScriptEntity): Promise<void> {}

  async tFormVector(x: number, y: number, z: number, source: BbScriptEntity, target: BbScriptEntity): Promise<void> {}
}
