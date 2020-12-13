import { Injectable } from '@angular/core';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { BbScriptSurface } from '../../../classes/in-game/3d/surface';

@Injectable()
export class CommandsGraphics3dCollisionsService {
  constructor() {}

  async clearCollisions(): Promise<void> {}

  async collisionEntity(entity: any, index: number): Promise<BbScriptEntity> {
    return null;
  }

  async collisionNX(entity: any, index: number): Promise<number> {
    return 0;
  }

  async collisionNY(entity: any, index: number): Promise<number> {
    return 0;
  }

  async collisionNZ(entity: any, index: number): Promise<number> {
    return 0;
  }

  async collisions(
    sourceEntity: any,
    targetEntity: any,
    method: number,
    reaction: number
  ): Promise<void> {}

  async collisionSurface(
    entity: BbScriptEntity,
    index: number
  ): Promise<BbScriptSurface> {
    return null;
  }

  async collisionTime(entity: BbScriptEntity, index: number): Promise<number> {
    return 0;
  }

  async collisionTriangle(
    entity: BbScriptEntity,
    index: number
  ): Promise<number> {
    return 0;
  }

  async collisionX(entity: BbScriptEntity, index: number): Promise<number> {
    return 0;
  }

  async collisionY(entity: BbScriptEntity, index: number): Promise<number> {
    return 0;
  }

  async collisionZ(entity: BbScriptEntity, index: number): Promise<number> {
    return 0;
  }

  async countCollisions(entity: BbScriptEntity): Promise<number> {
    return 0;
  }

  async entityBox(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number
  ): Promise<void> {}

  async entityCollided(
    entity: BbScriptEntity,
    collisionType: number
  ): Promise<boolean> {
    return false;
  }

  async entityRadius(
    entity: BbScriptEntity,
    radiusX: number,
    radiusY?: number
  ): Promise<void> {}

  async entityType(
    entity: BbScriptEntity,
    collisionType: number,
    recursively?: boolean
  ): Promise<void> {}

  async getEntityType(entity: BbScriptEntity): Promise<number> {
    return 0;
  }

  async meshesIntersect(
    source: BbScriptEntity,
    target: BbScriptEntity
  ): Promise<boolean> {
    return false;
  }

  async resetEntity(entity: BbScriptEntity): Promise<void> {}
}
