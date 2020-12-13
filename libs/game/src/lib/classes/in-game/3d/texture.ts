import { Texture } from '@babylonjs/core';

export class BbScriptTexture {
  private texture: Texture;

  constructor(texture: Texture) {
    this.texture = texture;
  }

  public getTexture(): Texture {
    return this.texture;
  }
}
