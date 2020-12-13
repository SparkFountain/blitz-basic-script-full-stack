import { Injectable } from '@angular/core';

@Injectable()
export class CommandsGraphics3dAnimationsService {
  constructor() {}

  async addAnimSeq(entity: any, duration: number): Promise<number> {
    return 0;
  }

  async animate(entity: any, mode?: number, speed?: number, sequenceId?: number, transition?: number): Promise<void> {}

  async animating(entity: any): Promise<boolean> {
    return false;
  }

  async animLength(entity: any): Promise<number> {
    return 0;
  }

  async animSeq(entity: any): Promise<number> {
    return 0;
  }

  async animTime(entity: any): Promise<number> {
    return 0;
  }

  async extractAnimSeq(entity: any, start: number, end: number, animSeq?: number): Promise<number> {
    return 0;
  }

  async loadAnimSeq(entity: any, filePath: string): Promise<number> {
    return 0;
  }

  async setAnimKey(
    entity: any,
    frame: number,
    translation?: boolean,
    rotation?: boolean,
    scaling?: boolean
  ): Promise<void> {}

  async setAnimTime(entity: any, time: number, sequenceId?: number): Promise<void> {}
}
