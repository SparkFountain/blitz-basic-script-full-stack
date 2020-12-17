import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractSyntax } from '..';
import { Assignment } from './classes/assignment';
import { CommandStatement } from './classes/command-statement';
import { LogicalExpression } from './classes/expressions/logical-expression';
import { NumericExpression } from './classes/expressions/numerical-expression';
import { StringExpression } from './classes/expressions/string-expression';
import { VariableExpression } from './classes/expressions/variable-expression';
import { WhileLoop } from './classes/loops/while-loop';
import { CameraType } from './enums/camera/camera-type';
import { KeyCode } from './enums/events/key-codes';
import { MouseCode } from './enums/events/mouse-codes';
import { CodeBlock } from './interfaces/code/block';
import { BbScriptScreenProperties } from './interfaces/game/state/screen';
import { BabylonJSService } from './services/babylonjs.service';
import { GameStateService } from './services/game-state.service';
import { GeneralService } from './services/general.service';
import { GuiService } from './services/gui.service';
import { InterpreterService } from './services/interpreter.service';
import { Render2dService } from './services/render2d.service';
import { ParserService } from '@blitz-basic-script/script-language';

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
          'Playing is currently impossible due to work in progress on parser and interpreter.'
        );
        setTimeout(() => this.play(), 500); // use delay to avoid playing before canvas viewchildren are rendered
        break;
      case 'debug':
        console.warn('Debugging currently uses hard-coded statements.');
        this.debug();
      case 'fake':
        this.playFake();
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

  testInterpreter(): void {
    this.playing = true;

    // initialize BabylonJS Engine
    this.babylonjs.initEngine(this.canvas3d.nativeElement);

    // create the scene
    this.babylonjs.createScene();

    // initialize 2D Service
    this.render2d.initCanvas(this.canvas2d.nativeElement);

    const codeBlocks: CodeBlock[] = [
      new WhileLoop(new LogicalExpression([], []), []),

      // new Assignment('global', 'cone', new CommandStatement('CreateCone', []))
      // new Assignment(
      //   'global',
      //   'result',
      //   new ArithmeticExpression(
      //     [
      //       new NumericExpression(13),
      //       new NumericExpression(15),
      //       new NumericExpression(Math.PI),
      //       new NumericExpression(8)
      //     ],
      //     ['+', '-', '/']
      //   )
      // ),
      // new Assignment('global', 'answerOnEverything', new NumericExpression(42)),
      // new CommandStatement('DebugLog', [new VariableExpression('global', 'answerOnEverything')]),
      // new Assignment(
      //   'global',
      //   'image',
      //   new CommandStatement('LoadImage', [new StringExpression('/assets/gfx/blitz.png')])
      // ),
      // new CommandStatement('DrawImage', [
      //   new VariableExpression('global', 'image'),
      //   new NumericExpression(50),
      //   new NumericExpression(50)
      // ]),
      // new CommandStatement('Color', [
      //   new NumericExpression(255),
      //   new NumericExpression(255),
      //   new NumericExpression(255)
      // ]),
      // new CommandStatement('Rect', [
      //   new NumericExpression(75),
      //   new NumericExpression(75),
      //   new NumericExpression(150),
      //   new NumericExpression(150)
      // ])
    ];

    this.interpreter.initializeAbstractSyntax({
      globals: {},
      codeBlocks: codeBlocks,
      mainLoop: [],
      functions: [],
      types: {},
    });
    this.interpreter.run();
  }

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
        this.interpreter.run();
      });
  }

  playFake(): void {
    let codeBlocks: CodeBlock[] = [];

    switch (this.code[0]) {
      case '; Draw a background image of a city':
        codeBlocks = [
          new CommandStatement('Graphics', [
            new NumericExpression(800),
            new NumericExpression(600),
          ]),
          new Assignment(
            'global',
            'image',
            new CommandStatement('LoadImage', [
              new StringExpression('assets/gfx/background/city-1.jpg'),
            ])
          ),
          new CommandStatement('DrawImage', [
            new VariableExpression('global', 'image'),
            new NumericExpression(0),
            new NumericExpression(0),
          ]),
        ];
        break;
      case '; Load and play a sound sample':
        codeBlocks = [
          new CommandStatement('Graphics', [
            new NumericExpression(800),
            new NumericExpression(600),
          ]),
          new Assignment(
            'global',
            'sound',
            new CommandStatement('LoadSound', [
              new StringExpression('assets/sfx/sounds/tada.mp3'),
            ])
          ),
          new CommandStatement('PlaySound', [
            new VariableExpression('global', 'sound'),
          ]),
        ];
        break;
      case '; Some math examples':
        codeBlocks = [
          new CommandStatement('Graphics', [
            new NumericExpression(800),
            new NumericExpression(600),
          ]),
          new CommandStatement('Color', [
            new NumericExpression(255),
            new NumericExpression(255),
            new NumericExpression(255),
          ]),
          new Assignment(
            'global',
            'root',
            new CommandStatement('Sqr', [new NumericExpression(25)])
          ),
          new CommandStatement('Text', [
            new NumericExpression(20),
            new NumericExpression(20),
            new StringExpression('5 x 5 = 25'),
          ]),
          new Assignment(
            'global',
            'sinValue',
            new CommandStatement('Sin', [new NumericExpression(45)])
          ),
          new CommandStatement('Text', [
            new NumericExpression(20),
            new NumericExpression(40),
            new StringExpression('Sin(45) = 0.8509035245341184'),
          ]),
          new Assignment(
            'global',
            'logValue',
            new CommandStatement('Log', [new NumericExpression(42)])
          ),
          new CommandStatement('Text', [
            new NumericExpression(20),
            new NumericExpression(60),
            new StringExpression('Log(42) = 3.7376696182833684'),
          ]),
          new CommandStatement('Text', [
            new NumericExpression(20),
            new NumericExpression(80),
            new StringExpression('Pi = 3.141592653589793'),
          ]),
        ];
        break;
      case '; Draw some lines, rectangles and ovals':
        codeBlocks = [
          new CommandStatement('Graphics', [
            new NumericExpression(800),
            new NumericExpression(600),
          ]),
          new CommandStatement('ClsColor', [
            new NumericExpression(50),
            new NumericExpression(152),
            new NumericExpression(220),
          ]),
          new CommandStatement('Cls', []),
          new CommandStatement('Color', [
            new NumericExpression(92),
            new NumericExpression(184),
            new NumericExpression(92),
          ]),
          new CommandStatement('Rect', [
            new NumericExpression(0),
            new NumericExpression(250),
            new NumericExpression(800),
            new NumericExpression(350),
          ]),
          new CommandStatement('Color', [
            new NumericExpression(217),
            new NumericExpression(83),
            new NumericExpression(79),
          ]),
          new CommandStatement('Rect', [
            new NumericExpression(50),
            new NumericExpression(150),
            new NumericExpression(200),
            new NumericExpression(200),
          ]),
          new CommandStatement('Line', [
            new NumericExpression(50),
            new NumericExpression(150),
            new NumericExpression(150),
            new NumericExpression(50),
          ]),
          new CommandStatement('Line', [
            new NumericExpression(150),
            new NumericExpression(50),
            new NumericExpression(250),
            new NumericExpression(150),
          ]),
          new CommandStatement('Color', [
            new NumericExpression(134),
            new NumericExpression(148),
            new NumericExpression(164),
          ]),
          new CommandStatement('Rect', [
            new NumericExpression(130),
            new NumericExpression(270),
            new NumericExpression(40),
            new NumericExpression(80),
          ]),
          new CommandStatement('Color', [
            new NumericExpression(43),
            new NumericExpression(62),
            new NumericExpression(80),
          ]),
          new CommandStatement('Rect', [
            new NumericExpression(65),
            new NumericExpression(190),
            new NumericExpression(50),
            new NumericExpression(50),
          ]),
          new CommandStatement('Color', [
            new NumericExpression(240),
            new NumericExpression(240),
            new NumericExpression(240),
          ]),
          new CommandStatement('Oval', [
            new NumericExpression(20),
            new NumericExpression(10),
            new NumericExpression(60),
            new NumericExpression(20),
          ]),
          new CommandStatement('Oval', [
            new NumericExpression(330),
            new NumericExpression(40),
            new NumericExpression(120),
            new NumericExpression(50),
          ]),
          new CommandStatement('Oval', [
            new NumericExpression(380),
            new NumericExpression(75),
            new NumericExpression(90),
            new NumericExpression(30),
          ]),
          new CommandStatement('Oval', [
            new NumericExpression(500),
            new NumericExpression(140),
            new NumericExpression(140),
            new NumericExpression(40),
          ]),
          new CommandStatement('Color', [
            new NumericExpression(240),
            new NumericExpression(173),
            new NumericExpression(78),
          ]),
          new CommandStatement('Oval', [
            new NumericExpression(600),
            new NumericExpression(10),
            new NumericExpression(60),
            new NumericExpression(60),
          ]),
        ];
        break;
      case '; Create and position some primitive 3D object meshes':
        codeBlocks = [
          new Assignment(
            'global',
            'camera',
            new CommandStatement('CreateCamera', [])
          ),
          new CommandStatement('CameraClsColor', [
            new VariableExpression('global', 'camera'),
            new NumericExpression(50),
            new NumericExpression(152),
            new NumericExpression(220),
          ]),
          new CommandStatement('PositionEntity', [
            new VariableExpression('global', 'camera'),
            new NumericExpression(0),
            new NumericExpression(8),
            new NumericExpression(-25),
          ]),
          new Assignment(
            'global',
            'light',
            new CommandStatement('CreateLight', [])
          ),
          new CommandStatement('RotateEntity', [
            new VariableExpression('global', 'light'),
            new NumericExpression(90),
            new NumericExpression(0),
            new NumericExpression(0),
          ]),
          new Assignment(
            'global',
            'cube',
            new CommandStatement('CreateCube', [])
          ),
          new CommandStatement('PositionEntity', [
            new VariableExpression('global', 'cube'),
            new NumericExpression(-8),
            new NumericExpression(0),
            new NumericExpression(0),
          ]),
          new Assignment(
            'global',
            'sphere',
            new CommandStatement('CreateSphere', [])
          ),
          new CommandStatement('PositionEntity', [
            new VariableExpression('global', 'sphere'),
            new NumericExpression(-3),
            new NumericExpression(0),
            new NumericExpression(0),
          ]),
          new Assignment(
            'global',
            'cone',
            new CommandStatement('CreateCone', [])
          ),
          new CommandStatement('PositionEntity', [
            new VariableExpression('global', 'cone'),
            new NumericExpression(3),
            new NumericExpression(0),
            new NumericExpression(0),
          ]),
          new Assignment(
            'global',
            'cylinder',
            new CommandStatement('CreateCylinder', [])
          ),
          new CommandStatement('PositionEntity', [
            new VariableExpression('global', 'cylinder'),
            new NumericExpression(8),
            new NumericExpression(0),
            new NumericExpression(0),
          ]),
        ];
        break;
      default:
        console.warn('[PLAY FAKE] Code could not be faked');
    }

    this.playing = true;

    // Initialize BabylonJS Engine
    this.babylonjs.initEngine(this.canvas3d.nativeElement);

    // Create the Scene
    this.babylonjs.createScene();

    // Initialize 2D Service
    this.render2d.initCanvas(this.canvas2d.nativeElement);

    // Define Commands
    const syntax: AbstractSyntax = {
      globals: {},
      codeBlocks,
      mainLoop: [],
      functions: [],
      types: {},
    };

    // load and execute pre-defined program
    this.interpreter.initializeAbstractSyntax(syntax);
    this.interpreter.run();

    // TODO: call render loop from interpreter
    this.babylonjs.mainLoop([]);
  }

  debug(): void {
    this.playing = true;

    // Initialize BabylonJS Engine
    this.babylonjs.initEngine(this.canvas3d.nativeElement);

    // Create the Scene
    this.babylonjs.createScene();

    // Initialize 2D Service
    this.render2d.initCanvas(this.canvas2d.nativeElement);

    // Define Commands
    const syntax: AbstractSyntax = {
      globals: {},
      codeBlocks: [
        new CommandStatement('Graphics', [
          new NumericExpression(800),
          new NumericExpression(600),
        ]),
        // new Assignment(
        //   'global',
        //   'sound',
        //   new CommandStatement('LoadSound', [new StringExpression('/assets/sfx/tada.mp3')])
        // ),
        // new CommandStatement('SoundPitch', [new VariableExpression('global', 'sound'), new NumericExpression(28000)]),
        // new CommandStatement('PlaySound', [new VariableExpression('global', 'sound')]),
        new Assignment(
          'global',
          'stream',
          new CommandStatement('WriteFile', [
            new StringExpression('/spark-fountain/temp.txt'),
          ])
        ),
        new CommandStatement('DebugLog', [
          new VariableExpression('global', 'stream'),
        ]),
      ],
      mainLoop: [],
      functions: [],
      types: {},
    };

    // load and execute pre-defined program
    this.interpreter.initializeAbstractSyntax(syntax);
    this.interpreter.run();

    // TODO: call render loop from interpreter
    // this.babylonjs.mainLoop([]);
  }

  testCommands1(): CodeBlock[] {
    return [
      new CommandStatement('Graphics', [
        new NumericExpression(640),
        new NumericExpression(480),
      ]),
      new Assignment(
        'global',
        'camera',
        new CommandStatement('CreateCamera', [
          new NumericExpression(CameraType.FREE),
        ])
      ),
      new Assignment(
        'global',
        'light',
        new CommandStatement('CreateLight', [])
      ),
      new Assignment('global', 'cube', new CommandStatement('CreateCube', [])),
      new CommandStatement('PositionEntity', [
        new VariableExpression('global', 'cube'),
        new NumericExpression(0),
        new NumericExpression(-3),
        new NumericExpression(10),
      ]),
      new Assignment(
        'global',
        'cubeMaterial',
        new CommandStatement('LoadTexture', [
          new StringExpression('http://localhost:4200/assets/gfx/face.png'),
        ])
      ),
      new CommandStatement('EntityTexture', [
        new VariableExpression('global', 'cube'),
        new VariableExpression('global', 'cubeMaterial'),
      ]),
      new CommandStatement('EntityColor', [
        new VariableExpression('global', 'cube'),
        new NumericExpression(255),
        new NumericExpression(0),
        new NumericExpression(0),
      ]),
      new CommandStatement('DebugLog', [
        new StringExpression('Hello New BbScript Approach!'),
      ]),
      new CommandStatement('color', [
        new NumericExpression(255),
        new NumericExpression(120),
        new NumericExpression(30),
      ]),
      new CommandStatement('rect', [
        new NumericExpression(10),
        new NumericExpression(20),
        new NumericExpression(40),
        new NumericExpression(15),
      ]),
    ];
  }

  stop(): void {
    this.playing = false;
  }
}
