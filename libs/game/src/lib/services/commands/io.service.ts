import { Injectable } from "@angular/core";
import { CommandsIOGamepadService } from "./io/gamepad.service";
import { CommandsIOKeyboardService } from "./io/keyboard.service";
import { CommandsIOMouseService } from "./io/mouse.service";

@Injectable()
export class CommandsIOService {
  constructor(
    private gamepadService: CommandsIOGamepadService,
    private keyboardService: CommandsIOKeyboardService,
    private mouseService: CommandsIOMouseService
  ) {}

  // GAMEPAD
  async flushJoy(): Promise<void> {
    return this.gamepadService.flushJoy();
  }

  async getJoy(port?: number): Promise<number> {
    return this.gamepadService.getJoy(port);
  }

  async joyDown(button: any, port?: number): Promise<boolean> {
    return this.gamepadService.joyDown(button, port);
  }

  async joyHat(port?: number): Promise<number> {
    return this.gamepadService.joyHat(port);
  }

  async joyHit(button: any, port?: number): Promise<number> {
    return this.gamepadService.joyHit(button, port);
  }

  async joyPitch(port?: number): Promise<number> {
    return this.gamepadService.joyPitch(port);
  }

  async joyRoll(port?: number): Promise<number> {
    return this.gamepadService.joyRoll(port);
  }

  async joyType(port?: number): Promise<0 | 1 | 2> {
    return this.gamepadService.joyType(port);
  }

  async joyU(port?: number): Promise<number> {
    return this.gamepadService.joyU(port);
  }

  async joyUDir(port?: number): Promise<number> {
    return this.gamepadService.joyUDir(port);
  }

  async joyV(port?: number): Promise<number> {
    return this.gamepadService.joyV(port);
  }

  async joyVDir(port?: number): Promise<number> {
    return this.gamepadService.joyVDir(port);
  }

  async joyWait(port?: number): Promise<number> {
    return this.gamepadService.joyWait(port);
  }

  async joyX(port?: number): Promise<number> {
    return this.gamepadService.joyX(port);
  }

  async joyXDir(port?: number): Promise<number> {
    return this.gamepadService.joyXDir(port);
  }

  async joyY(port?: number): Promise<number> {
    return this.gamepadService.joyY(port);
  }

  async joyYaw(port?: number): Promise<any> {
    return this.gamepadService.joyYaw(port);
  }

  async joyYDir(port?: number): Promise<number> {
    return this.gamepadService.joyYDir(port);
  }

  async joyZ(port?: number): Promise<number> {
    return this.gamepadService.joyZ(port);
  }

  async joyZDir(port?: number): Promise<number> {
    return this.gamepadService.joyZDir(port);
  }

  async waitJoy(port?: number): Promise<number> {
    return this.gamepadService.waitJoy(port);
  }

  // KEYBOARD
  async flushKeys(): Promise<void> {
    return this.keyboardService.flushKeys();
  }

  async getKey(): Promise<number> {
    return this.keyboardService.getKey();
  }

  async input(message?: string): Promise<string> {
    return this.keyboardService.input(message);
  }

  async keyDown(code: number): Promise<boolean> {
    return this.keyboardService.keyDown(code);
  }

  async keyHit(code: number): Promise<number> {
    return this.keyboardService.keyHit(code);
  }

  async keyWait(): Promise<number> {
    return this.keyboardService.keyWait();
  }

  async waitKey(): Promise<number> {
    return this.keyboardService.waitKey();
  }

  // MOUSE
  async flushMouse(): Promise<void> {
    return this.mouseService.flushMouse();
  }

  async getMouse(): Promise<number> {
    return this.mouseService.getMouse();
  }

  async hidePointer(canvas?: any): Promise<void> {
    return this.mouseService.hidePointer(canvas);
  }

  async mouseDown(code: number): Promise<boolean> {
    return this.mouseService.mouseDown(code);
  }

  async mouseHit(code: number): Promise<number> {
    return this.mouseService.mouseHit(code);
  }

  async mouseWait(): Promise<number> {
    return this.mouseService.mouseWait();
  }

  async mouseX(canvas?: any): Promise<number> {
    return this.mouseService.mouseX(canvas);
  }

  async mouseXSpeed(canvas?: any): Promise<number> {
    return this.mouseService.mouseXSpeed(canvas);
  }

  async mouseY(canvas?: any): Promise<number> {
    return this.mouseService.mouseY(canvas);
  }

  async mouseYSpeed(canvas?: any): Promise<number> {
    return this.mouseService.mouseYSpeed(canvas);
  }

  async mouseZ(): Promise<number> {
    return this.mouseService.mouseZ();
  }

  async mouseZSpeed(): Promise<number> {
    return this.mouseService.mouseZSpeed();
  }

  async moveMouse(x: number, y: number, canvas?: any): Promise<void> {
    return this.mouseService.moveMouse(x, y, canvas);
  }

  async showPointer(canvas?: any): Promise<void> {
    return this.mouseService.showPointer(canvas);
  }

  async waitMouse(): Promise<number> {
    return this.mouseService.waitMouse();
  }
}
