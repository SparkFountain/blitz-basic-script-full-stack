import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WhileLoop } from './classes/loops/while-loop';
import { KeyCode } from './enums/events/key-codes';
import { MouseCode } from './enums/events/mouse-codes';
import { BbScriptScreenProperties } from './interfaces/game/state/screen';
import { BabylonJSService } from './services/babylonjs.service';
import { GameStateService } from './services/game-state.service';
import { GeneralService } from './services/general.service';
import { GuiService } from './services/gui.service';
import { InterpreterService } from './services/interpreter.service';
import { Render2dService } from './services/render2d.service';
import { ParserService } from '@blitz-basic-script/script-language';
import { AbstractSyntax } from 'libs/script-language/src/lib/parser/interfaces/abstract-syntax';

@Component({
  selector: 'blitz-basic-script-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @Input('icon') iconPath?: string;
  @Input() code: string[];
  @Input() debugMode?: boolean;
  @Input() title?: string;

  @Input()
  set action(name: 'idle' | 'play' | 'debug' | 'stop' | 'fake') {
    switch (name) {
      case 'play':
        console.warn(
          'Playing is currently very limited due to work in progress on parser and interpreter.'
        );
        setTimeout(() => this.play(), 0); // use delay to avoid playing before canvas viewchildren are rendered
        break;
      case 'debug':
        console.warn('Debugging currently uses hard-coded statements.');
        this.debug();
      case 'stop':
        this.stop();
    }
  }

  @ViewChild('canvas2d') canvas2d: ElementRef;
  @ViewChild('canvas3d') canvas3d: ElementRef;
  public canvasFocused: boolean;
  public screen: BbScriptScreenProperties;

  public playing: boolean;

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    // console.info('[KEY DOWN]', event);
    this.gameState.setKeyDown(
      KeyCode[this.general.formatUpper(event.code)],
      true
    );
    this.gameState.setKeyAsciiCode(event.key.charCodeAt(0));
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.gameState.incrementKeyHit(KeyCode[event.code]);
  }

  @HostListener('window:mousedown', ['$event'])
  mouseDownEvent(event: MouseEvent) {
    // console.info('[MOUSE DOWN]', event);
    switch (event.which) {
      case 1:
        this.gameState.setMouseDown(MouseCode.LEFT, true);
        break;
      case 2:
        this.gameState.setMouseDown(MouseCode.MIDDLE, true);
        break;
      case 3:
        this.gameState.setMouseDown(MouseCode.RIGHT, true);
        break;
    }
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUpEvent(event: MouseEvent) {
    // this.gameState.incrementMouseHit(MouseCode[event.button]);
  }

  constructor(
    private parser: ParserService,
    private gameState: GameStateService,
    private babylonjs: BabylonJSService,
    private render2d: Render2dService,
    private gui: GuiService,
    private interpreter: InterpreterService,
    private general: GeneralService
  ) {
    this.canvasFocused = false;
    this.playing = false;

    this.screen = this.gameState.screen; // TODO: event mechanism to reflect changes
  }

  ngOnInit(): void {
    if (this.title === undefined) {
      this.title = 'BlitzBasicScript Game';
    }
  }

  ngAfterViewInit(): void {}

  async play(): Promise<void> {
    console.info('[PLAAAAAAAY]');

    this.playing = true;

    // initialize BabylonJS Engine
    this.babylonjs.initEngine(this.canvas3d.nativeElement);

    // create the scene
    this.babylonjs.createScene();

    // initialize 2D Service
    this.render2d.initCanvas(this.canvas2d.nativeElement);
    console.info('initCanvas executed');

    // TODO: only if this would be necessary
    // initialize GUI Service
    // this.gui.initCanvas(this.canvas3d.nativeElement);

    // parse and initialize abstract syntax
    this.parser
      .createAbstractSyntax(this.code)
      .then((abstractSyntax: AbstractSyntax) => {
        this.interpreter.initializeAbstractSyntax(abstractSyntax);
        this.interpreter.runStatic();
      });
  }

  debug(): void {
    this.playing = true;

    // Initialize BabylonJS Engine
    this.babylonjs.initEngine(this.canvas3d.nativeElement);

    // Create the Scene
    this.babylonjs.createScene();

    // Initialize 2D Service
    this.render2d.initCanvas(this.canvas2d.nativeElement);

    // load and execute pre-defined program
    // this.interpreter.initializeAbstractSyntax(syntax);
    // this.interpreter.run();

    // TODO: call render loop from interpreter
    // this.babylonjs.mainLoop([]);
  }

  stop(): void {
    this.playing = false;
  }
}
