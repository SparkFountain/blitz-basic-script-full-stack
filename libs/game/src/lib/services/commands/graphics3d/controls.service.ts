import { Injectable } from '@angular/core';
import { Mesh, StandardMaterial } from '@babylonjs/core';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { BbScriptTexture } from '../../../classes/in-game/3d/texture';
import { BlendMode } from '../../../enums/entity/blend-mode';
import { BabylonJSService } from '../../babylonjs.service';

@Injectable()
export class CommandsGraphics3dControlsService {
  constructor(private babylonjs: BabylonJSService) {}

  async copyEntity(
    entity: BbScriptEntity,
    parent?: BbScriptEntity
  ): Promise<BbScriptEntity> {
    return null;
  }

  async entityAlpha(entity: BbScriptEntity, alpha: number): Promise<void> {
    (entity.instance as Mesh).material.alpha = alpha;
  }

  async entityAutoFade(
    entity: BbScriptEntity,
    near: number,
    far: number
  ): Promise<void> {}

  async entityBlend(entity: BbScriptEntity, mode: BlendMode): Promise<void> {}

  async entityColor(
    entity: BbScriptEntity,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    if (entity.class === 'Mesh') {
      this.babylonjs.colorMesh(entity.instance as Mesh, red, green, blue);
    } else {
      console.error(
        `Cannot assign "EntityColor()" to entity of type ${entity.class}`
      );
    }
  }

  async entityFx(entity: BbScriptEntity, effect: number): Promise<void> {}

  async entityOrder(entity: BbScriptEntity, index: number): Promise<void> {}

  async entityParent(
    entity: BbScriptEntity,
    parent: BbScriptEntity,
    global?: boolean
  ): Promise<void> {}

  async entityShininess(
    entity: BbScriptEntity,
    shininess: number
  ): Promise<void> {}

  async entityTexture(
    entity: BbScriptEntity,
    texture: BbScriptTexture,
    frame?: number,
    layer?: number
  ): Promise<void> {
    let material: StandardMaterial = (entity.instance as Mesh)
      .material as StandardMaterial;
    material.diffuseTexture = texture.getTexture();
  }

  async freeEntity(entity: BbScriptEntity): Promise<void> {
    entity = null;
  }

  async hideEntity(entity: BbScriptEntity): Promise<void> {
    (entity.instance as Mesh).setEnabled(false);
  }

  async showEntity(entity: BbScriptEntity): Promise<void> {
    (entity.instance as Mesh).setEnabled(true);
  }
}
