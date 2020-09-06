import { Injectable } from '@angular/core';
import { CanvasComponent } from '../../components/canvas/canvas.component';

@Injectable()
export class CommandsGuiCanvasService {
  constructor() {}

  async createCanvas(
    x: number,
    y: number,
    width: number,
    height: number,
    group: any,
    style?: any
  ): Promise<CanvasComponent> {
    return null;
  }

  //TODO implement or deprecated?
  async flipCanvas(canvas: CanvasComponent, flip: boolean) {}
}
