import { Injectable } from '@angular/core';
import { CommandsGraphics2DService } from '../graphics2d.service';

@Injectable()
export class CommandsGraphics3dScreenService {
  constructor(private graphics2D: CommandsGraphics2DService) {}

  async countGfxModes3d(): Promise<number> {
    return 1;
  }

  async gfxDriver3D(): Promise<boolean> {
    return BABYLON.Engine.isSupported();
  }

  async gfxDriverCaps3D(): Promise<number> {
    return 110;
  }

  async gfxMode3D(mode: number): Promise<boolean> {
    return true;
  }

  async gfxMode3DExists(width: number, height: number, depth: number): Promise<boolean> {
    return true;
  }

  async graphics3D(width: number, height: number, depth: number, mode: number): Promise<void> {
    return this.graphics2D.graphics(width, height, depth, mode);
  }

  async windowed3D(): Promise<boolean> {
    return true;
  }
}
