import { BbScriptBuffer } from '../../../classes/in-game/2d/buffer';

export interface BbScriptScreenProperties {
  // screen width in pixels
  width: number;

  // screen height in pixels
  height: number;

  // screen origin position in pixels (normally 0,0 - top left)
  origin: {
    x: number;
    y: number;
  };

  // foreground color (RGB) - used for drawing operations
  color: {
    red: number;
    green: number;
    blue: number;
  };

  // background color (RGB) - used for clear screen operations
  clsColor: {
    red: number;
    green: number;
    blue: number;
  };

  // viewport settings (rectangular on which the screen is rendered)
  viewport: {
    beginX: number;
    beginY: number;
    width: number;
    height: number;
  };

  // buffer that is used for rendering (can be either canvas or image)
  buffer: BbScriptBuffer;
}
