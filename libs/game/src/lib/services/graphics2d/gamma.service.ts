import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandsGraphics2dGammaService {
  constructor() {}

  async gammaBlue(index: number): Promise<number> {
    // TODO: implement
    return Promise.resolve(0);
  }

  async gammaGreen(index: number): Promise<number> {
    // TODO: implement
    return Promise.resolve(0);
  }

  async gammaRed(index: number): Promise<number> {
    // TODO: implement
    return Promise.resolve(0);
  }

  async setGamma(
    indexRed: number,
    indexGreen: number,
    indexBlue: number,
    gammaRed: number,
    gammaGreen: number,
    gammaBlue: number
  ): Promise<void> {
    // TODO: implement
  }

  async updateGamma(calibration: boolean): Promise<void> {
    // TODO: implement
  }
}
