import { Injectable } from '@angular/core';
import { BlitzBasicScriptCanvasComponent } from '../../../components/canvas/canvas.component';

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
  ): Promise<BlitzBasicScriptCanvasComponent> {
    return null;
  }

  //TODO implement or deprecated?
  async flipCanvas(canvas: BlitzBasicScriptCanvasComponent, flip: boolean) {}
}
