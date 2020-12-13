import { Injectable } from '@angular/core';
import { Desktop } from '../../../interfaces/gui/desktop';

@Injectable()
export class CommandsGuiDesktopService {
  constructor() {}

  async desktop(): Promise<Desktop> {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}
