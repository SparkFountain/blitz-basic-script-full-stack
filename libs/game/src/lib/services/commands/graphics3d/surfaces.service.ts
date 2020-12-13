import { Injectable } from '@angular/core';
import { BbScriptBrush } from '../../../classes/in-game/3d/brush';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { BbScriptSurface } from '../../../classes/in-game/3d/surface';

@Injectable()
export class CommandsGraphics3dSurfacesService {
  constructor() {}

  async addTriangle(
    surface: BbScriptSurface,
    v0: number,
    v1: number,
    v2: number
  ): Promise<number> {
    return null;
  }

  async addVertex(
    surface: BbScriptSurface,
    x: number,
    y: number,
    z: number,
    u?: number,
    v?: number,
    w?: number
  ): Promise<number> {
    return null;
  }

  async clearSurface(
    surface: BbScriptSurface,
    deleteVertices?: boolean,
    deleteTriangles?: boolean
  ): Promise<void> {}

  async countSurfaces(mesh: BbScriptEntity): Promise<number> {
    return 0;
  }

  async countTriangles(surface: BbScriptSurface): Promise<number> {
    return 0;
  }

  async countVertices(surface: BbScriptSurface): Promise<number> {
    return 0;
  }

  async createSurface(
    mesh: BbScriptEntity,
    brush: BbScriptBrush
  ): Promise<BbScriptSurface> {
    return null;
  }

  async findSurface(
    mesh: BbScriptEntity,
    brush: BbScriptBrush
  ): Promise<BbScriptSurface> {
    return null;
  }

  async getSurface(
    mesh: BbScriptEntity,
    index: number
  ): Promise<BbScriptSurface> {
    return null;
  }

  async triangleVertex(
    surface: BbScriptSurface,
    triangle: number,
    vertex: number
  ): Promise<number> {
    return 0;
  }

  async updateNormals(mesh: BbScriptEntity): Promise<void> {}

  async vertexAlpha(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexBlue(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexColor(
    surface: BbScriptSurface,
    vertex: number,
    red: number,
    green: number,
    blue: number,
    alpha?: number
  ): Promise<void> {}

  async vertexCoords(
    surface: BbScriptSurface,
    vertex: number,
    x: number,
    y: number,
    z: number
  ): Promise<void> {}

  async vertexGreen(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexNormal(
    surface: BbScriptSurface,
    vertex: number,
    x: number,
    y: number,
    z: number
  ): Promise<void> {}

  async vertexNX(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexNY(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexNZ(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexRed(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexTexCoords(
    surface: BbScriptSurface,
    vertex: number,
    u: number,
    v: number,
    w?: number,
    set?: boolean
  ): Promise<void> {}

  async vertexU(
    surface: BbScriptSurface,
    vertex: number,
    set?: boolean
  ): Promise<number> {
    return 0;
  }

  async vertexV(
    surface: BbScriptSurface,
    vertex: number,
    set?: boolean
  ): Promise<number> {
    return 0;
  }

  async vertexW(
    surface: BbScriptSurface,
    vertex: number,
    set?: boolean
  ): Promise<number> {
    return 0;
  }

  async vertexX(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexY(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }

  async vertexZ(surface: BbScriptSurface, vertex: number): Promise<number> {
    return 0;
  }
}
