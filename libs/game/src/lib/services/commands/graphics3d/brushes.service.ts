import { Injectable } from '@angular/core';

@Injectable()
export class CommandsGraphics3dBrushesService {
  constructor() {}

  async brushAlpha(brush: any, alpha: number): Promise<void> {}

  async brushBlend(brush: any, mode: number): Promise<void> {}

  async brushColor(brush: any, red: number, green: number, blue: number): Promise<void> {}

  async brushFx(brush: any, effects: number): Promise<void> {}

  async brushShininess(brush: any, shininess: number): Promise<void> {}

  async brushTexture(brush: any, texture: any, frame: number, index: number): Promise<void> {}

  async createBrush(red?: number, green?: number, blue?: number): Promise<any> {
    //a brush is an invisible object with texture / color information
    //which can be applied to any entity / vertex / surface
  }

  async freeBrush(brush: any): Promise<void> {
    brush.dispose();
  }

  async getBrushTexture(brush: any, index: number): Promise<any> {}

  async getEntityBrush(entity: any): Promise<any> {}

  async getSurfaceBrush(surface: any): Promise<any> {}

  async loadBrush(filePath: string, modes?: number, scaleU?: number, scaleV?: number) {}

  async paintEntity(entity: any, brush: any): Promise<void> {}

  async paintMesh(mesh: any, brush: any): Promise<void> {}

  async paintSurface(surface: any, brush: any): Promise<void> {}
}
