import { Injectable } from '@angular/core';
import { BbScriptBuffer } from '../../../classes/in-game/2d/buffer';
import { BabylonJSService } from '../../babylonjs.service';
import { GameStateService } from '../../game-state.service';
import { Render2dService } from '../../render2d.service';

@Injectable()
export class CommandsGraphics2dDisplayService {
  constructor(
    private babylonjs: BabylonJSService,
    private graphics2d: Render2dService,
    private gameState: GameStateService
  ) {}

  private getDefaultResolutions(platform: string): string[] {
    // list based on https://stackoverflow.com/a/19883965
    switch (platform) {
      case 'Macintosh':
      case 'MacIntel':
      case 'MacPPC':
      case 'Mac68K':
      case 'FreeBSD':
      case 'FreeBSD i386':
      case 'FreeBSD amd64':
      case 'Linux':
      case 'Linux aarch64':
      case 'Linux armv5tejl':
      case 'Linux armv6l':
      case 'Linux armv7l':
      case 'Linux i686':
      case 'Linux i686 on x86_64':
      case 'Linux i686 X11':
      case 'Linux MSM8960_v3.2.1.1_N_R069_Rev:18':
      case 'Linux ppc64':
      case 'Linux x86_64':
      case 'Linux x86_64 X11':
      case 'Windows':
      case 'Win16':
      case 'Win32':
      case 'Win32':
      case 'OpenBSD amd64':
      case 'SunOS':
      case 'SunOS i86pc':
      case 'SunOS sun4u':
      case 'HP-UX':
        // desktop
        return [
          '640 x 480',
          '800 x 600',
          '1024 x 768',
          '1280 x 720',
          '1280 x 800',
          '1280 x 1024',
          '1360 x 768',
          '1366 x 768',
          '1440 x 900',
          '1600 x 900',
          '1680 x 1050',
          '1920 x 1080',
          '1920 x 1200',
        ];
      case 'Android':
      case 'iPhone':
      case 'iPod':
      case 'iPhone Simulator':
      case 'iPod Simulator':
      case 'Pike v7.6 release 92':
      case 'Pike v7.8 release 517':
        // smartphone
        return [
          '480 × 800',
          '640 × 1136',
          '720 × 1280',
          '750 × 1334',
          '1080 × 1920',
          '1440 × 2560',
        ];
      case 'iPad':
      case 'iPad Simulator':
        // iPad
        return ['768 x 1024', '1024 x 1366', '1112 x 834'];
      default:
        // no usable information on device or OS
        return ['400 x 300'];
    }
  }

  async countGfxDrivers(): Promise<number> {
    return 1;
  }

  async countGfxModes(): Promise<number> {
    return this.getDefaultResolutions(window.navigator.platform).length;
  }

  async endGraphics(): Promise<void> {
    return this.graphics(400, 300, 32, 2);
  }

  async gfxDriverName(driverIndex: number): Promise<string> {
    if (driverIndex === 1) {
      return 'Default GPU Driver';
    } else {
      return 'Invalid Driver';
    }
  }

  async gfxModeDepth(mode: number): Promise<number> {
    return 32;
  }

  async gfxModeExists(
    width: number,
    height: number,
    depth: number
  ): Promise<boolean> {
    const resolutions: string[] = this.getDefaultResolutions(
      window.navigator.platform
    );
    return resolutions.indexOf(`${width} x ${height}`) > -1;
  }

  async gfxModeFormat(mode: number): Promise<number> {
    return 4;
  }

  async gfxModeHeight(mode: number): Promise<number> {
    const resolutions: string[] = this.getDefaultResolutions(
      window.navigator.platform
    );

    if (resolutions.length < mode) {
      return 0;
    }

    return Number(
      resolutions[mode - 1].substr(resolutions[mode].indexOf('x') + 2)
    );
  }

  async gfxModeWidth(mode: number): Promise<number> {
    const resolutions: string[] = this.getDefaultResolutions(
      window.navigator.platform
    );

    if (resolutions.length < mode) {
      return 0;
    }

    return Number(
      resolutions[mode - 1].substr(0, resolutions[mode].indexOf('x') - 2)
    );
  }

  async graphics(
    width: number,
    height: number,
    depth?: number,
    mode?: number
  ): Promise<void> {
    this.gameState.setScreenWidth(width);
    this.gameState.setScreenHeight(height);
    this.gameState.setScreenViewport({
      beginX: 0,
      beginY: 0,
      width: width,
      height: height,
    });

    return this.babylonjs.initGraphics(width, height).then(() => {
      this.graphics2d.initGraphics(width, height);
    });
  }

  async graphicsBuffer(): Promise<BbScriptBuffer> {
    // TODO: implementation
    return null;
  }

  async graphicsDepth(): Promise<number> {
    return 32;
  }

  async graphicsFormat(): Promise<number> {
    return 4;
  }

  async graphicsHeight(): Promise<number> {
    return this.gameState.screen.height;
  }

  async graphicsLost(): Promise<boolean> {
    return false;
  }

  async graphicsWidth(): Promise<number> {
    return this.gameState.screen.width;
  }

  async setGfxDriver(driverIndex: number): Promise<void> {
    console.warn(
      '[SetGfxDriver] Currently the graphics driver cannot be set manually in BlitzBasicScript.'
    );
  }
}
