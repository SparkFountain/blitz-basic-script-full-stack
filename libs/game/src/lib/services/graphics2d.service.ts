import { Injectable } from '@angular/core';
import { CommandsGraphics2dDisplayService } from './graphics2d/display.service';
import { CommandsGraphics2dGraphicsService } from './graphics2d/graphics.service';
import { CommandsGraphics2dImagesService } from './graphics2d/images.service';
import { CommandsGraphics2dMoviesService } from './graphics2d/movies.service';
import { CommandsGraphics2dPixelService } from './graphics2d/pixel.service';
import { CommandsGraphics2dTextService } from './graphics2d/text.service';
import { CommandsGraphics2dGammaService } from './graphics2d/gamma.service';
import { GameMovie } from '../interfaces/game/movie';

@Injectable()
export class CommandsGraphics2DService {
  constructor(
    private display: CommandsGraphics2dDisplayService,
    private graphicsService: CommandsGraphics2dGraphicsService,
    private imagesService: CommandsGraphics2dImagesService,
    private gammaService: CommandsGraphics2dGammaService,
    private moviesService: CommandsGraphics2dMoviesService,
    private pixelService: CommandsGraphics2dPixelService,
    private textService: CommandsGraphics2dTextService
  ) {}

  // DISPLAY
  async countGfxDrivers(): Promise<number> {
    return this.display.countGfxDrivers();
  }

  async countGfxModes(): Promise<number> {
    return this.display.countGfxModes();
  }

  async endGraphics(): Promise<void> {
    return this.display.endGraphics();
  }

  async gfxDriverName(driverIndex: number): Promise<string> {
    return this.display.gfxDriverName(driverIndex);
  }

  async gfxModeDepth(mode: number): Promise<number> {
    return this.display.gfxModeDepth(mode);
  }

  async gfxModeExists(width: number, height: number, depth: number): Promise<boolean> {
    return this.display.gfxModeExists(width, height, depth);
  }

  async gfxModeFormat(mode: number): Promise<number> {
    return this.display.gfxModeFormat(mode);
  }

  async gfxModeHeight(mode: number): Promise<number> {
    return this.display.gfxModeHeight(mode);
  }

  async gfxModeWidth(mode: number): Promise<number> {
    return this.display.gfxModeWidth(mode);
  }

  async graphics(width: number, height: number, depth: number, mode: number): Promise<void> {
    return this.display.graphics(width, height, depth, mode);
  }

  async graphicsBuffer(): Promise<BbScriptBuffer> {
    return this.display.graphicsBuffer();
  }

  async graphicsDepth(): Promise<number> {
    return this.display.graphicsDepth();
  }

  async graphicsFormat(): Promise<number> {
    return this.display.graphicsFormat();
  }

  async graphicsHeight(): Promise<number> {
    return this.display.graphicsHeight();
  }

  async graphicsLost(): Promise<boolean> {
    return this.display.graphicsLost();
  }

  async graphicsWidth(): Promise<number> {
    return this.display.graphicsWidth();
  }

  async setGfxDriver(driverIndex: number): Promise<void> {
    return this.display.setGfxDriver(driverIndex);
  }

  // GRAPHICS
  async availVidMem(): Promise<number> {
    return this.graphicsService.availVidMem();
  }

  async backBuffer(): Promise<BbScriptBuffer> {
    return this.graphicsService.backBuffer();
  }

  async cls(): Promise<void> {
    return this.graphicsService.cls();
  }

  async clsColor(red: number, green: number, blue: number): Promise<void> {
    console.info('ClsColor command called');
    return this.graphicsService.clsColor(red, green, blue);
  }

  async color(red: number, green: number, blue: number): Promise<void> {
    return this.graphicsService.color(red, green, blue);
  }

  async copyRect(
    x1: number,
    y1: number,
    width: number,
    height: number,
    x2: number,
    y2: number,
    sourceBuffer?: BbScriptBuffer,
    targetBuffer?: BbScriptBuffer
  ): Promise<void> {
    return this.graphicsService.copyRect(x1, y1, width, height, x2, y2, sourceBuffer, targetBuffer);
  }

  async flip(vSync: boolean): Promise<void> {
    return this.graphicsService.flip(vSync);
  }

  async frontBuffer(): Promise<BbScriptBuffer> {
    return this.graphicsService.frontBuffer();
  }

  async line(beginX: number, beginY: number, endX: number, endY: number): Promise<void> {
    return this.graphicsService.line(beginX, beginY, endX, endY);
  }

  async loadBuffer(buffer: BbScriptBuffer, filePath: string): Promise<boolean> {
    return this.graphicsService.loadBuffer(buffer, filePath);
  }

  async origin(x: number, y: number): Promise<void> {
    return this.graphicsService.origin(x, y);
  }

  async oval(x: number, y: number, width: number, height: number, filled: boolean): Promise<void> {
    return this.graphicsService.oval(x, y, width, height, filled);
  }

  async rect(x: number, y: number, width: number, height: number, filled?: boolean): Promise<void> {
    return this.graphicsService.rect(x, y, width, height, filled);
  }

  async scanLine(): Promise<number> {
    return this.graphicsService.scanLine();
  }

  async saveBuffer(buffer: BbScriptBuffer, filePath: string): Promise<boolean> {
    return this.graphicsService.saveBuffer(buffer, filePath);
  }

  async setBuffer(buffer: BbScriptBuffer): Promise<BbScriptBuffer> {
    return this.graphicsService.setBuffer(buffer);
  }

  async totalVidMem(): Promise<number> {
    return this.graphicsService.totalVidMem();
  }

  async viewport(beginX: number, beginY: number, width: number, height: number): Promise<void> {
    return this.graphicsService.viewport(beginX, beginY, width, height);
  }

  async vWait(frames: number): Promise<void> {
    return this.graphicsService.vWait(frames);
  }

  // IMAGES
  async autoMidHandle(active: boolean): Promise<void> {
    return this.imagesService.autoMidHandle(active);
  }

  async bufferDirty(buffer: BbScriptBuffer): Promise<void> {
    return this.imagesService.bufferDirty(buffer);
  }

  async copyImage(image: BbScriptImage): Promise<BbScriptImage> {
    return this.imagesService.copyImage(image);
  }

  async createImage(width: number, height: number, frames?: number, mode?: BbScriptImageMode): Promise<BbScriptImage> {
    return this.imagesService.createImage(width, height, frames, mode);
  }

  async drawBlock(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    return this.imagesService.drawBlock(image, x, y, frame);
  }

  async drawBlockRect(
    image: BbScriptImage,
    x: number,
    y: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number,
    frame?: number
  ): Promise<void> {
    return this.imagesService.drawBlockRect(image, x, y, beginX, beginY, width, height, frame);
  }

  async drawImage(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    return this.imagesService.drawImage(image, x, y, frame);
  }

  async drawImageRect(
    image: BbScriptImage,
    x: number,
    y: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number,
    frame?: number
  ): Promise<void> {
    return this.imagesService.drawImageRect(image, x, y, beginX, beginY, width, height, frame);
  }

  async freeImage(image: BbScriptImage): Promise<void> {
    return this.imagesService.freeImage(image);
  }

  async grabImage(image: BbScriptImage, x: number, y: number, frame?: number): Promise<void> {
    return this.imagesService.grabImage(image, x, y, frame);
  }

  async handleImage(image: BbScriptImage, x: number, y: number): Promise<void> {
    return this.imagesService.handleImage(image, x, y);
  }

  async imageHeight(image: BbScriptImage): Promise<number> {
    return this.imagesService.imageHeight(image);
  }

  async imageRectCollide(
    image: BbScriptImage,
    x: number,
    y: number,
    frame: number,
    beginX: number,
    beginY: number,
    width: number,
    height: number
  ): Promise<boolean> {
    return this.imagesService.imageRectCollide(image, x, y, frame, beginX, beginY, width, height);
  }

  async imageRectOverlap(
    image: BbScriptImage,
    imageX: number,
    imageY: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ): Promise<boolean> {
    return this.imagesService.imageRectOverlap(image, imageX, imageY, rectX, rectY, rectWidth, rectHeight);
  }

  async imagesCollide(
    image1: BbScriptImage,
    x1: number,
    y1: number,
    frame1: number,
    image2: BbScriptImage,
    x2: number,
    y2: number,
    frame2: number
  ): Promise<boolean> {
    return this.imagesService.imagesCollide(image1, x1, y1, frame1, image2, x2, y2, frame2);
  }

  async imagesOverlap(
    image1: BbScriptImage,
    x1: number,
    y1: number,
    image2: BbScriptImage,
    x2: number,
    y2: number
  ): Promise<boolean> {
    return this.imagesService.imagesOverlap(image1, x1, y1, image2, x2, y2);
  }

  async imageWidth(image: BbScriptImage): Promise<number> {
    return this.imagesService.imageWidth(image);
  }

  async imageXHandle(image: BbScriptImage): Promise<number> {
    return this.imagesService.imageXHandle(image);
  }

  async imageYHandle(image: BbScriptImage): Promise<number> {
    return this.imagesService.imageYHandle(image);
  }

  async loadAnimImage(
    filePath: string,
    width: number,
    height: number,
    startFrameIndex: number,
    totalFrames: number,
    mode: BbScriptImageMode
  ): Promise<any> {
    return this.imagesService.loadImage(filePath, width, height, startFrameIndex, totalFrames, mode);
  }

  async loadImage(filePath: string, mode: BbScriptImageMode): Promise<BbScriptImage> {
    return this.imagesService.loadImage(filePath, -1, -1, -1, -1, mode);
  }

  async maskImage(image: BbScriptImage, red: number, green: number, blue: number): Promise<void> {
    return this.imagesService.maskImage(image, red, green, blue);
  }

  async midHandle(image: BbScriptImage): Promise<void> {
    return this.imagesService.midHandle(image);
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
    return this.imagesService.rectsOverlap(x1, y1, width1, height1, x2, y2, width2, height2);
  }

  async resizeImage(image: BbScriptImage, width: number, height: number): Promise<void> {
    return this.imagesService.resizeImage(image, width, height);
  }

  async rotateImage(image: BbScriptImage, angle: number): Promise<void> {
    return this.imagesService.rotateImage(image, angle);
  }

  async saveImage(image: BbScriptImage, filePath: string, frame?: number): Promise<boolean> {
    return this.imagesService.saveImage(image, filePath, frame);
  }

  async scaleImage(image: BbScriptImage, zoomX: number, zoomY: number): Promise<void> {
    return this.imagesService.scaleImage(image, zoomX, zoomY);
  }

  async tFormFilter(enabled: boolean): Promise<void> {
    return this.imagesService.tFormFilter(enabled);
  }

  async tFormImage(image: BbScriptImage, scaleX: number, skewY: number, skewX: number, scaleY: number): Promise<void> {
    return this.imagesService.tFormImage(image, scaleX, skewY, skewX, scaleY);
  }

  async tileBlock(image: BbScriptImage, offsetX: number, offsetY: number, frame?: number): Promise<void> {
    return this.imagesService.tileBlock(image, offsetX, offsetY, frame);
  }

  async tileImage(image: BbScriptImage, offsetX: number, offsetY: number, frame?: number): Promise<void> {
    return this.imagesService.tileImage(image, offsetX, offsetY, frame);
  }

  // GAMMA
  async gammaBlue(index: number): Promise<number> {
    return this.gammaService.gammaBlue(index);
  }

  async gammaGreen(index: number): Promise<number> {
    return this.gammaService.gammaGreen(index);
  }

  async gammaRed(index: number): Promise<number> {
    return this.gammaService.gammaRed(index);
  }

  async setGamma(
    indexRed: number,
    indexGreen: number,
    indexBlue: number,
    gammaRed: number,
    gammaGreen: number,
    gammaBlue: number
  ): Promise<void> {
    return this.gammaService.setGamma(indexRed, indexGreen, indexBlue, gammaRed, gammaGreen, gammaBlue);
  }

  async updateGamma(calibration: boolean): Promise<void> {
    return this.gammaService.updateGamma(calibration);
  }

  // MOVIES
  async closeMovie(movie: GameMovie): Promise<void> {
    return this.moviesService.closeMovie(movie);
  }

  async drawMovie(movie: GameMovie, x: number, y: number, width: number, height: number): Promise<boolean> {
    return this.moviesService.drawMovie(movie, x, y, width, height);
  }

  async movieHeight(movie: GameMovie): Promise<number> {
    return this.moviesService.movieHeight(movie);
  }

  async moviePlaying(movie: GameMovie): Promise<boolean> {
    return this.moviesService.moviePlaying(movie);
  }

  async movieWidth(movie: GameMovie): Promise<number> {
    return this.moviesService.movieWidth(movie);
  }

  async openMovie(filePath: string): Promise<GameMovie> {
    return this.moviesService.openMovie(filePath);
  }

  // PIXEL
  async colorBlue(): Promise<number> {
    return this.pixelService.colorBlue();
  }

  async colorGreen(): Promise<number> {
    return this.pixelService.colorGreen();
  }

  async colorRed(): Promise<number> {
    return this.pixelService.colorRed();
  }

  async plot(x: number, y: number): Promise<void> {
    return this.pixelService.plot(x, y);
  }

  // TEXT
  async fontAscent(font: GameFont): Promise<number> {
    return this.textService.fontAscent(font);
  }

  async fontDescent(font: GameFont): Promise<number> {
    return this.textService.fontDescent(font);
  }

  async fontHeight(font: GameFont): Promise<number> {
    return this.textService.fontHeight(font);
  }

  async fontName(font: GameFont): Promise<string> {
    return this.textService.fontName(font);
  }

  async fontSize(font: GameFont): Promise<number> {
    return this.textService.fontSize(font);
  }

  async fontStyle(font: GameFont): Promise<number> {
    return this.textService.fontStyle(font);
  }

  async fontWidth(font: GameFont): Promise<number> {
    return this.textService.fontWidth(font);
  }

  async freeFont(font: GameFont): Promise<void> {
    return this.textService.freeFont(font);
  }

  async loadFont(
    fontName: string,
    size: number,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean
  ): Promise<GameFont> {
    return this.textService.loadFont(fontName, size, bold, italic, underline);
  }

  async locate(x: number, y: number): Promise<void> {
    return this.textService.locate(x, y);
  }

  async print(text: string): Promise<void> {
    return this.textService.print(text);
  }

  async setFont(font: GameFont): Promise<void> {
    return this.textService.setFont(font);
  }

  async stringHeight(text: string): Promise<number> {
    return this.textService.stringHeight(text);
  }

  async stringWidth(text: string): Promise<number> {
    return this.textService.stringWidth(text);
  }

  async text(x: number, y: number, text: string, centerX?: boolean, centerY?: boolean): Promise<void> {
    return this.textService.text(x, y, text, centerX, centerY);
  }

  async write(text: string): Promise<void> {
    return this.textService.write(text);
  }
}
