import { Injectable } from '@angular/core';
import { Camera } from '@babylonjs/core';
import { BbScriptCamera } from '../../../classes/in-game/3d/camera';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { CameraType } from '../../../enums/camera/camera-type';
import { BbScriptCameraProjectionMode } from '../../../enums/in-game/3d/camera';
import { BbScriptFogMode } from '../../../enums/in-game/3d/fog';
import { BabylonJSService } from '../../babylonjs.service';

@Injectable()
export class CommandsGraphics3dCameraService {
  constructor(private babylonjs: BabylonJSService) {}

  /** PRIVATE **/
  private normalize(value: number): number {
    return value / Math.trunc(255);
  }

  /** PUBLIC **/
  async cameraClsColor(
    camera: BbScriptCamera,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    return this.babylonjs.setClearColor(
      this.normalize(red),
      this.normalize(green),
      this.normalize(blue)
    );
  }

  async cameraClsMode(
    camera: BbScriptCamera,
    deleteColorBuffer?: boolean,
    deleteZBuffer?: boolean
  ) {
    // TODO
  }

  async fogColor(red: number, green: number, blue: number): Promise<void> {
    return this.babylonjs.setFogColor(
      this.normalize(red),
      this.normalize(green),
      this.normalize(blue)
    );
  }

  async fogMode(mode: BbScriptFogMode): Promise<void> {
    // TODO
    /*switch (mode) {
      case BBScript.FOG.NONE:
        BBScript.game.scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
        break;
      case BBScript.FOG.LINEAR:
        BBScript.game.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        break;
      case BBScript.FOG.EXPONENTIAL:
        BBScript.game.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        break;
      case BBScript.FOG.EXPONENTIAL_ENHANCED:
        BBScript.game.scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        break;
    }*/
  }

  async fogRange(near: number, far: number): Promise<void> {
    /*if (BBScript.game.scene.fogMode === BABYLON.Scene.FOGMODE_LINEAR) {
      BBScript.game.scene.fogStart = near;
      BBScript.game.scene.fogEnd = far;
    } else {
      console.warn('[FogRange]: Invalid fog mode (must be linear)');
    }*/
  }

  async fogDensity(value: number): Promise<void> {
    /*if (BBScript.game.scene.fogMode === BABYLON.Scene.FOGMODE_EXP || BBScript.game.scene.fogMode === BABYLON.Scene.FOGMODE_EXP2) {
      BBScript.game.scene.fogDensity = value;
    } else {
      console.warn('[FogDensity]: Invalid fog mode (must be exponential)');
    }*/
  }

  async cameraProject(
    camera: BbScriptCamera,
    x: number,
    y: number,
    z: number
  ): Promise<void> {}

  async cameraProjMode(
    camera: BbScriptCamera,
    mode: BbScriptCameraProjectionMode
  ): Promise<void> {
    /*switch (mode) {
      case BBScript.CAMERA_PROJECTION.NONE:
        camera.setEnabled(false);
        break;
      case BBScript.CAMERA_PROJECTION.PERSPECTIVE:
        camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
        break;
      case BBScript.CAMERA_PROJECTION.ORTHOGRAPHIC:
        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        break;
    }*/
  }

  async cameraRange(
    camera: BbScriptCamera,
    near: number,
    far: number
  ): Promise<void> {
    camera.minZ = near;
    camera.maxZ = far;
  }

  async cameraViewport(
    camera: BbScriptCamera,
    x: number,
    y: number,
    width: number,
    height: number
  ): Promise<void> {}

  async cameraZoom(camera: BbScriptCamera, value: number): Promise<void> {
    // TODO fix (code below does not seem to work)
    // camera.zoomOnFactor = value;
  }

  async createCamera(
    type?: CameraType,
    parent?: BbScriptEntity
  ): Promise<BbScriptCamera> {
    return this.babylonjs
      .createCamera(type)
      .then((camera: Camera) => new BbScriptCamera(camera, parent));
  }

  async projectedX(): Promise<number> {
    return 0;
  }

  async projectedY(): Promise<number> {
    return 0;
  }

  async projectedZ(): Promise<boolean> {
    return false;
  }
}
