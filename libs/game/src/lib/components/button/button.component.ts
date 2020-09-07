import { Component, Input } from '@angular/core';
import { ButtonStyle } from '../../enums/gui/buttons/button-style';

@Component({
  selector: 'blitz-basic-script-button',
  templateUrl: 'button.html',
  //styleUrls: ['blitz-basic-script.scss']
})
export class ButtonComponent {
  @Input('text') text: string;
  @Input('x') x: number;
  @Input('y') y: number;
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('style') style: ButtonStyle;

  public GuiButtonStyle: any = ButtonStyle;

  constructor() {}
}
