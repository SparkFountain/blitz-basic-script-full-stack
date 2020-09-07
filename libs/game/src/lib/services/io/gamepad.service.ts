import { Injectable } from "@angular/core";

@Injectable()
export class CommandsIOGamepadService {
  constructor() {}

  async flushJoy(): Promise<void> {}

  async getJoy(port?: number): Promise<number> {
    return 0;
  }

  async joyDown(button: any, port?: number): Promise<boolean> {
    return false;
  }

  async joyHat(port?: number): Promise<number> {
    return 0;
  }

  async joyHit(button: any, port?: number): Promise<number> {
    return 0;
  }

  async joyPitch(port?: number): Promise<number> {
    return 0;
  }

  async joyRoll(port?: number): Promise<number> {
    return 0;
  }

  async joyType(port?: number): Promise<0 | 1 | 2> {
    return 0;
  }

  async joyU(port?: number): Promise<number> {
    return 0;
  }

  async joyUDir(port?: number): Promise<number> {
    return 0;
  }

  async joyV(port?: number): Promise<number> {
    return 0;
  }

  async joyVDir(port?: number): Promise<number> {
    return 0;
  }

  async joyWait(port?: number): Promise<number> {
    return 0;
  }

  async joyX(port?: number): Promise<number> {
    return 0;
  }

  async joyXDir(port?: number): Promise<number> {
    return 0;
  }

  async joyY(port?: number): Promise<number> {
    return 0;
  }

  async joyYaw(port?: number): Promise<number> {
    return 0;
  }

  async joyYDir(port?: number): Promise<number> {
    return 0;
  }

  async joyZ(port?: number): Promise<number> {
    return 0;
  }

  async joyZDir(port?: number): Promise<number> {
    return 0;
  }

  async waitJoy(port?: number): Promise<number> {
    return await this.joyWait(port);
  }
}
