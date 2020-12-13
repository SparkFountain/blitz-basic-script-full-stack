import { Injectable } from '@angular/core';
import { GameStateService } from '../../game-state.service';
import { HttpClient } from '@angular/common/http';
import { Render2dService } from '../../render2d.service';
import { BbScriptBuffer } from '../../../classes/in-game/2d/buffer';
import { BbScriptImage } from '../../../classes/in-game/2d/image';
import { BbScriptImageMode } from '../../../enums/in-game/2d/image';
import { environment } from '../../../environment-deprecated/environment';
import { ApiResponse } from '../../../interfaces/api/api-response';

@Injectable()
export class CommandsGraphics2dImagesService {
  constructor(
    private gameState: GameStateService,
    private render2d: Render2dService,
    private http: HttpClient
  ) {}

  private autoMidHandleActive(): boolean {
    return this.gameState.getImagesProperties().autoMidHandle;
  }

  async autoMidHandle(active: boolean): Promise<void> {
    this.gameState.setImagesAutoMidHandle(active);
  }

  async bufferDirty(buffer: BbScriptBuffer): Promise<void> {
    // TODO: implement logic if necessary
    buffer.dirty = true;
  }

  async copyImage(image: BbScriptImage): Promise<BbScriptImage> {
    let originalElements: HTMLImageElement[] = image.elements;
    let newElements: HTMLImageElement[] = [];
    for (let i = 0; i < originalElements.length; i++) {
      let originalImage: HTMLImageElement = originalElements[i];
      let htmlImage: HTMLImageElement = document.createElement('img') as HTMLImageElement;
      htmlImage.width = originalImage.width;
      htmlImage.height = originalImage.height;
      htmlImage.src = originalImage.src;
      newElements.push(htmlImage);
    }

    return new BbScriptImage(
      image.width,
      image.height,
      `${image.name}-copy`,
      newElements,
      JSON.parse(JSON.stringify(image.handle))
    );
  }

  async createImage(width: number, height: number, frames?: number, mode?: BbScriptImageMode): Promise<BbScriptImage> {
    let handle: { x: number; y: number };
    if (this.autoMidHandleActive()) {
      handle = { x: width / 2, y: height / 2 };
    } else {
      handle = { x: 0, y: 0 };
    }

    let elements: HTMLImageElement[] = [];
    if (!frames) {
      frames = 1;
    }
    for (let i = 0; i < frames; i++) {
      let htmlImage: HTMLImageElement = document.createElement('img') as HTMLImageElement;
      htmlImage.width = width;
      htmlImage.height = height;
      elements.push(htmlImage);
    }

    return new BbScriptImage(width, height, 'image', elements, handle);
  }

  async drawBlock(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    const width = image.width;
    const height = image.height;
    return this.render2d.drawImage(image, x, y, 0, 0, width, height, frame);
  }

  public async drawBlockRect(
    image: any,
    x: number,
    y: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number,
    frame?: number
  ): Promise<void> {
    return this.render2d.drawImage(image, x, y, beginX, beginY, width, height, frame);
  }

  public async drawImage(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    const width = image.width;
    const height = image.height;
    return this.render2d.drawImage(image, x, y, 0, 0, width, height, frame);
  }

  public async drawImageRect(
    image: any,
    x: number,
    y: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number,
    frame?: number
  ): Promise<void> {
    return this.render2d.drawImage(image, x, y, beginX, beginY, width, height, frame);
  }

  public async freeImage(image: BbScriptImage): Promise<void> {
    image = null;
  }

  public async grabImage(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    // TODO: implement
    return null;
  }

  public async handleImage(image: BbScriptImage, x: number, y: number): Promise<void> {
    image.handle = { x, y };
  }

  public async imageHeight(image: BbScriptImage): Promise<number> {
    return image.height;
  }

  public async imageRectCollide(
    image: BbScriptImage,
    x: number,
    y: number,
    frame: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number
  ): Promise<boolean> {
    return null;
  }

  public async imageRectOverlap(
    image: BbScriptImage,
    imageX: number,
    imageY: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ): Promise<boolean> {
    return this.rectsOverlap(imageX, imageY, image.width, image.height, rectX, rectY, rectWidth, rectHeight);
  }

  public async imagesCollide(
    image1: BbScriptImage,
    x1: number,
    y1: number,
    frame1: number,
    image2: BbScriptImage,
    x2: number,
    y2: number,
    frame2: number
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async imagesOverlap(
    image1: BbScriptImage,
    x1: number,
    y1: number,
    image2: BbScriptImage,
    x2: number,
    y2: number
  ): Promise<boolean> {
    return this.rectsOverlap(x1, y1, image1.width, image1.height, x2, y2, image2.width, image2.height);
  }

  public async imageWidth(image: BbScriptImage): Promise<number> {
    return Promise.resolve(image.width);
  }

  public async imageXHandle(image: BbScriptImage): Promise<number> {
    return Promise.resolve(image.handle.x);
  }

  public async imageYHandle(image: BbScriptImage): Promise<number> {
    return Promise.resolve(image.handle.y);
  }

  public async loadImage(
    filePath: string,
    width: number,
    height: number,
    startFrameIndex: number,
    totalFrames: number,
    mode: BbScriptImageMode
  ): Promise<any> {
    return new Promise<BbScriptImage>((resolve: Function, reject: Function) => {
      this.http
        .get(`${environment.apiServer}/files/get-content`, {
          params: { path: filePath }
        })
        .toPromise()
        .then((response: ApiResponse<string>) => {
          const imageBase64 = response.data;

          let originalImage: HTMLImageElement = document.createElement('img') as HTMLImageElement;
          originalImage.onload = () => {
            let autoMidHandleActive = this.autoMidHandleActive();

            if (width === -1 && height === -1) {
              // single image
              resolve(
                new BbScriptImage(originalImage.width, originalImage.height, 'image', [originalImage], {
                  x: autoMidHandleActive ? originalImage.width / 2 : 0,
                  y: autoMidHandleActive ? originalImage.height / 2 : 0
                })
              );
            } else {
              // animated image
              let processedImages: number = 0;
              const helperCanvas: HTMLCanvasElement = document.createElement('canvas');
              helperCanvas.width = width;
              helperCanvas.height = height;
              const ctx: CanvasRenderingContext2D = helperCanvas.getContext('2d');

              let images: HTMLImageElement[] = [];
              let offset = { x: 0, y: 0 };
              for (let i = 0; i < totalFrames; i++) {
                if (i > 0) {
                  offset.x += width;
                  if (offset.x >= originalImage.width) {
                    offset.x = 0;
                    offset.y += height;
                  }
                }

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(originalImage, offset.x, offset.y, width, height, 0, 0, width, height);
                const currentImage: HTMLImageElement = document.createElement('img');
                currentImage.onload = () => {
                  images.push(currentImage);
                  processedImages++;
                  if (processedImages === totalFrames) {
                    resolve(
                      new BbScriptImage(width, height, 'image', images, {
                        x: autoMidHandleActive ? width / 2 : 0,
                        y: autoMidHandleActive ? height / 2 : 0
                      })
                    );
                  }
                };
                currentImage.src = helperCanvas.toDataURL();
              }
            }
          };
          originalImage.src = `data:image/*;base64,${imageBase64}`;
        });
    });
  }

  async maskImage(image: BbScriptImage, red: number, green: number, blue: number): Promise<void> {
    return this.render2d.maskImage(image, red, green, blue);
  }

  async midHandle(image: BbScriptImage): Promise<void> {
    image.handle.x = image.width / 2;
    image.handle.y = image.height / 2;
  }

  async rectsOverlap(
    x1: number,
    y1: number,
    width1: number,
    height1: number,
    x2: number,
    y2: number,
    width2: number,
    height2: number
  ): Promise<boolean> {
    return Promise.resolve(x1 < x2 + width2 && x1 + width1 > x2 && y1 < y2 + height2 && y1 + height1 > y2);
  }

  async resizeImage(image: BbScriptImage, width: number, height: number): Promise<void> {
    image.width = width;
    image.height = height;

    if (this.autoMidHandleActive()) {
      image.handle.x = width / 2;
      image.handle.y = height / 2;
    } else {
      image.handle.x = 0;
      image.handle.y = 0;
    }
  }

  async rotateImage(image: BbScriptImage, angle: number): Promise<void> {
    image.rotation = angle;
  }

  async saveImage(image: BbScriptImage, filePath: string, frame?: number): Promise<boolean> {
    let helperCanvas: HTMLCanvasElement = document.createElement('canvas');
    helperCanvas.width = image.width;
    helperCanvas.height = image.height;
    let helperCtx: CanvasRenderingContext2D = helperCanvas.getContext('2d');
    await this.render2d.drawImage(image, 0, 0, 0, 0, helperCanvas.width, helperCanvas.height, frame, helperCtx);

    // TODO: replace temporary download code by backend implementation
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'),
      e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filePath;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = helperCanvas.toDataURL('image/png;base64');

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

      lnk.dispatchEvent(e);
    } else if ((lnk as any).fireEvent) {
      (lnk as any).fireEvent('onclick');
    }

    return false;
  }

  async scaleImage(image: BbScriptImage, zoomX: number, zoomY: number): Promise<void> {
    image.width = Math.trunc(image.width * zoomX);
    image.height = Math.trunc(image.height * zoomY);
  }

  async tFormFilter(enabled: boolean): Promise<void> {
    return this.render2d.setImageSmoothing(enabled);
  }

  async tFormImage(image: BbScriptImage, scaleX: number, skewY: number, skewX: number, scaleY: number): Promise<void> {
    // TODO: implement such that it doesn't collide with "RotateImage", "ResizeImage" and "ScaleImage"
  }

  async tileBlock(image: BbScriptImage, offsetX: number, offsetY: number, frame?: number): Promise<void> {
    return this.render2d.tileImage(image, offsetX, offsetY, frame);
  }

  async tileImage(image: BbScriptImage, offsetX: number, offsetY: number, frame?: number): Promise<void> {
    return this.render2d.tileImage(image, offsetX, offsetY, frame);
  }
}
