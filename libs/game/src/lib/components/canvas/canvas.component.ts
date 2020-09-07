import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'blitz-basic-script-canvas',
  templateUrl: 'canvas.html',
  styleUrls: ['canvas.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('scene', { static: true }) scene: ElementRef<HTMLCanvasElement>;
  @ViewChild('gui', { static: true }) gui: ElementRef<HTMLCanvasElement>;

  sceneCtx: WebGLRenderingContext;
  guiCtx: CanvasRenderingContext2D;

  private _code: string[];
  @Input()
  set code(code: string[]) {
    this._code = code;
  }

  constructor() {
    console.info('[CANVAS COMPONENT] Initialized');
  }

  ngOnInit(): void {
    console.info('Initialized Canvas Component');
  }

  ngAfterViewInit(): void {
    this.sceneCtx = this.scene.nativeElement.getContext('webgl');
    this.guiCtx = this.gui.nativeElement.getContext('2d');
  }
}
