import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { GameFont } from '../interfaces/game/font';
import { BbScriptImage } from '../classes/in-game/2d/image';
import { BbScriptBuffer } from '../classes/in-game/2d/buffer';

@Injectable({
  providedIn: 'root'
})
export class Render2dService {
  private _canvas: HTMLCanvasElement;

  constructor(private gameState: GameStateService) {}

  initCanvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = 800;
    this._canvas.height = 600;
    this.gameState.screen.buffer = new BbScriptBuffer(this._canvas);
  }

  initGraphics(width: number, height: number): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      this._canvas.width = width;
      this._canvas.height = height;

      this._canvas.style.width = width + 'px';
      this._canvas.style.height = height + 'px';

      //this._canvas.style.width = '100%';
      //this._canvas.style.height = '100%';

      resolve();
    });
  }

  private loadActiveColor(): void {
    const activeColor = this.gameState.screen.color;
    const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;
    context.strokeStyle = `rgba(${activeColor.red}, ${activeColor.green}, ${activeColor.blue}, 1)`;
    context.fillStyle = `rgba(${activeColor.red}, ${activeColor.green}, ${activeColor.blue}, 1)`;
  }

  private loadActiveClsColor(): void {
    const activeClsColor = this.gameState.screen.clsColor;
    const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;
    context.fillStyle = `rgba(${activeClsColor.red}, ${activeClsColor.green}, ${activeClsColor.blue}, 1)`;
  }

  private getOrigin(): { x: number; y: number } {
    return {
      x: this.gameState.screen.origin.x,
      y: this.gameState.screen.origin.y
    };
  }

  private getActiveViewport(): {
    beginX: number;
    beginY: number;
    width: number;
    height: number;
  } {
    return this.gameState.screen.viewport;
  }

  async setImageSmoothing(enabled: boolean): Promise<void> {
    // TODO: visually there seems to be no difference, has to be checked again
    return new Promise<void>((resolve: Function, reject: Function) => {
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      context.imageSmoothingEnabled = enabled;
      context['webkitImageSmoothingEnabled'] = enabled;
      context['mozImageSmoothingEnabled'] = enabled;
      context.msImageSmoothingEnabled = enabled;
      context['oImageSmoothingEnabled'] = enabled;
      resolve();
    });
  }

  async cls(): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      this.loadActiveClsColor();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      const screen = {
        width: this.gameState.screen.width,
        height: this.gameState.screen.height
      };
      context.fillRect(0, 0, screen.width, screen.height);

      resolve();
    });
  }

  async line(beginX: number, beginY: number, endX: number, endY: number): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      this.loadActiveColor();
      const origin = this.getOrigin();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      context.beginPath();
      context.moveTo(beginX + origin.x, beginY + origin.y);
      context.lineTo(endX + origin.x, endY + origin.y);
      context.stroke();

      resolve();
    });
  }

  async rect(x: number, y: number, width: number, height: number, filled: boolean): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      if (filled === undefined) {
        filled = true;
      }

      this.loadActiveColor();
      let origin = this.getOrigin();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      if (filled) {
        context.fillRect(x + origin.x, y + origin.y, width + origin.x, height + origin.y);
      } else {
        context.strokeRect(x + origin.x, y + origin.y, width + origin.x, height + origin.y);
      }

      resolve();
    });
  }

  async oval(x: number, y: number, width: number, height: number, filled?: boolean): Promise<void> {
    //TODO refactor with respect to origin
    return new Promise<void>((resolve: Function, reject: Function) => {
      if (filled === undefined) {
        filled = true;
      }

      this.loadActiveColor();
      let origin = this.getOrigin();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      context.beginPath();
      context.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);

      if (filled) {
        context.fill();
      } else {
        context.stroke();
      }

      resolve();
    });
  }

  async plot(x: number, y: number): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      this.loadActiveColor();
      let origin = this.getOrigin();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      context.fillRect(x + origin.x, y + origin.y, 1, 1);

      resolve();
    });
  }

  async maskImage(image: BbScriptImage, maskRed: number, maskGreen: number, maskBlue: number): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      let processedImages = 0;

      const width = image.width;
      const height = image.height;
      const elements: HTMLImageElement[] = image.elements;

      elements.forEach((e: HTMLImageElement) => {
        e.onload = () => {
          processedImages++;
          if (processedImages === elements.length) {
            resolve();
          }
        };

        const maskCanvas: HTMLCanvasElement = document.createElement('canvas');
        maskCanvas.width = width;
        maskCanvas.height = height;
        const ctx = maskCanvas.getContext('2d');
        ctx.drawImage(e, 0, 0);
        let canvasImage: ImageData = ctx.getImageData(0, 0, width, height);
        let length = canvasImage.data.length;
        for (let i = 0; i < length; i += 4) {
          let red = canvasImage.data[i];
          let green = canvasImage.data[i + 1];
          let blue = canvasImage.data[i + 2];
          if (red === maskRed && green === maskGreen && blue === maskBlue) {
            canvasImage.data[i + 3] = 0;
          }
        }
        ctx.putImageData(canvasImage, 0, 0);
        e.src = maskCanvas.toDataURL();
      });
    });
  }

  async tileImage(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      if (!frame) {
        frame = 0;
      }

      const origin = this.getOrigin();
      const activeViewport = this.getActiveViewport();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      for (
        let currentX: number = x, currentY: number = y;
        currentX < activeViewport.width && currentY < activeViewport.height;

      ) {
        context.drawImage(image.getElement(frame), currentX + origin.x, currentY + origin.y);

        currentX += image.width;

        if (currentX >= activeViewport.width) {
          currentX = 0;
          currentY += image.height;
        }
        if (currentY >= activeViewport.height) {
          break;
        }
      }

      resolve();
    });
  }

  async drawImage(
    image: BbScriptImage,
    x: number,
    y: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number,
    frame?: number,
    context?: CanvasRenderingContext2D
  ): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      if (!frame) {
        frame = 0;
      }

      if (!context) {
        context = this.gameState.screen.buffer.context;
      }

      const origin = this.getOrigin();
      const element = image.getElement(frame);
      const originalWidth = element.width;
      const realWidth = image.width;
      const originalHeight = element.height;
      const realHeight = image.height;
      const handle = image.handle;
      const rotation = image.rotation;

      // TODO: rotation handle must be fixed
      let rotationRadians = rotation / (180 / Math.PI);
      let handleVector = {
        length: Math.sqrt(Math.pow(handle.x, 2) + Math.pow(handle.y, 2)),
        dx: 0,
        dy: 0
      };
      handleVector.dx = -Math.sin(handleVector.length);
      handleVector.dy = Math.cos(handleVector.length);

      // TODO: scaling / resizing with values < 1 crops the image
      let scaleX = realWidth / originalWidth;
      let scaleY = realHeight / originalHeight;
      let toX = -handle.x;
      let toY = -handle.y;
      let sin = Math.sin(rotationRadians);
      let cos = Math.cos(rotationRadians);

      console.info('[IMAGE TRANSFORMATIONS]', scaleX, scaleY, toX, toY, sin, cos);

      context.setTransform(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        x + toX + origin.x,
        y + toY + origin.y
      );

      context.drawImage(element, beginX, beginY, width, height, x, y, width, height);

      // reset horizontal and vertical scaling for future events
      context.setTransform(1, 0, 0, 1, 0, 0);

      resolve();
    });
  }

  text(x: number, y: number, text: string, centerX?: boolean, centerY?: boolean): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      this.loadActiveColor();
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;
      context.fillText(text, x, y);
      resolve();
    });
  }

  setFont(font: GameFont): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;

      let fontString: string = '';
      if (font.italic) {
        fontString += 'italic ';
      }
      if (font.bold) {
        fontString += 'bold ';
      }
      fontString += font.size + 'px ';
      fontString += font.name + ', monospace';

      context.font = fontString;

      resolve();
    });
  }

  fontAscent(font: GameFont): Promise<number> {
    return Promise.resolve(0);
  }

  fontDescent(font: GameFont): Promise<number> {
    return Promise.resolve(0);
  }

  fontWidth(font: GameFont): Promise<number> {
    const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;
    return Promise.resolve(context.measureText('M').width);
  }

  stringWidth(text: string): Promise<number> {
    const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;
    return Promise.resolve(context.measureText(text).width);
  }

  stringHeight(): Promise<number> {
    return new Promise<number>((resolve: Function, reject: Function) => {
      const context: CanvasRenderingContext2D = this.gameState.screen.buffer.context;
      resolve(Number(context.font.match(/([0-9]+)px/)[1]));
    });
  }
}
