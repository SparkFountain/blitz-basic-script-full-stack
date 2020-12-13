import { Injectable } from '@angular/core';
import { Light } from '@babylonjs/core';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { BbScriptLight } from '../../../classes/in-game/3d/light';
import { LightType } from '../../../enums/light/light-type';
import { BabylonJSService } from '../../babylonjs.service';

@Injectable()
export class CommandsGraphics3dLightShadowService {
  constructor(private babylonjs: BabylonJSService) {}

  async ambientLight(red: number, green: number, blue: number): Promise<void> {
    return this.babylonjs.ambientLight(red, green, blue);
  }

  async createLight(
    type?: LightType,
    parent?: BbScriptEntity
  ): Promise<BbScriptLight> {
    return this.babylonjs
      .createLight(type)
      .then(
        (light: Light) => new BbScriptEntity('light', 'Light', parent, light)
      );
  }

  async lightColor(
    light: Light,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    return this.babylonjs.lightColor(light, red, green, blue);
  }

  async lightConeAngles() {}

  async lightMesh() {}

  async lightRange(light: Light, range: number): Promise<void> {
    return this.babylonjs.lightRange(light, range);
  }

  async createShadowMap() {}

  async freeShadowMap() {}

  async castShadow() {}

  async receiveShadows() {}

  async shadowDarkness() {}
}
