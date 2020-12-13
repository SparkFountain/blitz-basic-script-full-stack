import { Injectable } from '@angular/core';
import { TextureMode } from '../../../enums/texture/texture-mode';
import { CubeMapFace } from '../../../enums/texture/cube-map-face';
import { CubeMapMode } from '../../../enums/texture/cube-map-mode';
import { TextureBlendMode } from '../../../enums/texture/texture-blend-mode';
import { BabylonJSService } from '../../babylonjs.service';
import { Texture } from '@babylonjs/core';
import { BbScriptTexture } from '../../../classes/in-game/3d/texture';

@Injectable()
export class CommandsGraphics3dTexturesService {
  constructor(private babylonjs: BabylonJSService) {}

  async activeTextures(): Promise<number> {
    //TODO implement
    return 0;
  }

  async clearTextureFilters(): Promise<void> {
    //TODO implement
    return null;
  }

  async createTexture(
    width: number,
    height: number,
    mode?: TextureMode,
    frames?: number
  ): Promise<BbScriptTexture> {
    //TODO implementation
    return null;
  }

  async freeTexture(texture: BbScriptTexture): Promise<void> {
    texture = null;
  }

  async loadAnimTexture(
    filePath: string,
    mode: TextureMode,
    width: number,
    height: number,
    startFrame: number,
    totalFrames: number
  ): Promise<BbScriptTexture> {
    //TODO implementation
    return null;
  }

  async loadTexture(
    filePath: string,
    mode: TextureMode
  ): Promise<BbScriptTexture> {
    return this.babylonjs
      .loadAsset('texture', filePath)
      .then((texture: Texture) => {
        return new BbScriptTexture(texture);
      });
  }

  async positionTexture(
    texture: BbScriptTexture,
    u: number,
    v: number
  ): Promise<void> {
    //TODO implementation
    return null;
  }

  async rotateTexture(texture: BbScriptTexture, angle: number): Promise<void> {
    //TODO implementation
    return null;
  }

  async scaleTexture(
    texture: BbScriptTexture,
    u: number,
    v: number
  ): Promise<void> {
    //TODO implementation
    return null;
  }

  async setCubeFace(
    texture: BbScriptTexture,
    face: CubeMapFace
  ): Promise<void> {
    //TODO implementation
    return null;
  }

  async setCubeMode(
    texture: BbScriptTexture,
    mode: CubeMapMode
  ): Promise<void> {
    //TODO implementation
    return null;
  }

  async textureBlend(
    texture: BbScriptTexture,
    mode: TextureBlendMode
  ): Promise<void> {
    //TODO implementation
    return null;
  }

  async textureCoords(
    texture: BbScriptTexture,
    coordinate: boolean
  ): Promise<void> {
    //TODO implementation
    return null;
  }

  async textureFilter(searchText: string, mode: TextureMode): Promise<void> {
    //TODO implementation
    return null;
  }

  async textureHeight(texture: BbScriptTexture): Promise<number> {
    return 0;
    // return texture.getBaseSize().height;
  }

  async textureName(texture: BbScriptTexture): Promise<string> {
    //TODO implementation
    return '';
  }

  async textureWidth(texture: BbScriptTexture): Promise<number> {
    return 0;
    // return texture.getBaseSize().width;
  }
}
