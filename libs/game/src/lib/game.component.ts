import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';

import { Screen } from './interfaces/screen';
import { GameService } from './services/game.service';
import { GeneralService } from './services/general.service';
import { KeyCode } from './enums/io/key-codes';
import { MouseCode } from './enums/io/mouse-codes';
import { BabylonJSService } from './services/babylonjs.service';
import { Render2dService } from './services/render2d.service';
import { GuiService } from './services/gui.service';
import {
  InterpreterService,
  ParserService,
  ParseResult,
} from '@blitz-basic-script/script-language';

@Component({
  selector: 'blitz-basic-script-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @Input() code: string[];
  @Input() debugMode?: boolean;

  // TODO: remove action and start program execution immediately?
  @Input()
  set action(name: 'idle' | 'play' | 'debug' | 'stop' | 'fake') {
    switch (name) {
      case 'play':
        console.warn(
          'Playing is currently impossible due to work in progress on parser and interpreter.'
        );
        this.play();
        break;
      case 'debug':
        console.warn('Debugging currently uses hard-coded statements.');
        this.debug();
        break;
      case 'stop':
        this.stop();
    }
  }

  @ViewChild('canvas2d') canvas2d: ElementRef;
  @ViewChild('canvas3d') canvas3d: ElementRef;
  public canvasFocused: boolean;
  public screen: Screen;

  public playing: boolean;

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    // console.info('[KEY DOWN]', event);
    this.gameService.setKeyDown(
      KeyCode[this.generalService.formatUpper(event.code)],
      true
    );
    this.gameService.setKeyAsciiCode(event.key.charCodeAt(0));
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.gameService.incrementKeyHit(KeyCode[event.code]);
  }

  @HostListener('window:mousedown', ['$event'])
  mouseDownEvent(event: MouseEvent) {
    // console.info('[MOUSE DOWN]', event);
    switch (event.which) {
      case 1:
        this.gameService.setMouseDown(MouseCode.LEFT, true);
        break;
      case 2:
        this.gameService.setMouseDown(MouseCode.MIDDLE, true);
        break;
      case 3:
        this.gameService.setMouseDown(MouseCode.RIGHT, true);
        break;
    }
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUpEvent(event: MouseEvent) {
    // this.gameService.incrementMouseHit(MouseCode[event.button]);
  }

  constructor(
    private gameService: GameService,
    private generalService: GeneralService,
    private babylonJSService: BabylonJSService,
    private render2dService: Render2dService,
    // private guiService: GuiService,
    private parserService: ParserService,
    private interpreterService: InterpreterService
  ) {
    this.canvasFocused = false;
    this.playing = false;

    this.screen = this.gameService.screen; // TODO: event mechanism to reflect changes
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.play();
  }

  play(): void {
    // Activate Play Mode
    this.playing = true;

    // Initialize BabylonJS Engine
    this.babylonJSService.initEngine(this.canvas3d.nativeElement);

    // Create the Scene
    this.babylonJSService.createScene();

    // Initialize 2D Service
    this.render2dService.initCanvas(this.canvas2d.nativeElement);
    console.info('initCanvas executed');

    // parse code
    const parseResult: ParseResult = this.parserService.parse(['4 * 8']);
    console.info('[PARSE RESULT]', parseResult);

    // const ast = this.interpreterService.initializeAbstractSyntax(
    //   abstractSyntax
    // );
    // this.interpreterService.run();
  }

  debug(): void {
    // TODO: implement
  }

  stop(): void {
    this.playing = false;
  }
}
