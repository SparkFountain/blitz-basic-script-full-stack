import { Injectable } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { GuiButtonStyle } from '../../../enums/gui/buttons/button-style';

@Injectable()
export class CommandsGuiButtonService {
  constructor() {}

  async buttonState(button: ButtonComponent): Promise<boolean> {
    //TODO
    return false;
  }

  async createButton(
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    group: any,
    style?: GuiButtonStyle
  ): Promise<ButtonComponent> {
    //TODO
    return null;
  }

  async setButtonState(
    button: ButtonComponent,
    active: boolean
  ): Promise<void> {}
}
