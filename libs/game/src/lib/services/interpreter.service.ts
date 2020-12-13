import { Injectable } from '@angular/core';
import { AbstractSyntax } from '@blitz-basic-script/game';
import { Assignment } from '../classes/assignment';
import { CommandStatement } from '../classes/command-statement';
import { IfBlock } from '../classes/conditions/if-block';
import { SelectBlock } from '../classes/conditions/select-block';
import { ArithmeticExpression } from '../classes/expressions/arithmetic-expression';
import { BooleanExpression } from '../classes/expressions/boolean-expression';
import { LogicalExpression } from '../classes/expressions/logical-expression';
import { NumericExpression } from '../classes/expressions/numerical-expression';
import { StringExpression } from '../classes/expressions/string-expression';
import { VariableExpression } from '../classes/expressions/variable-expression';
import { ForToLoop } from '../classes/loops/for-to-loop';
import { RepeatLoop } from '../classes/loops/repeat-loop';
import { WhileLoop } from '../classes/loops/while-loop';
import { CodeBlock } from '../interfaces/code/block';
import { Term } from '../types/arithmetic-term';
import { Expression } from '../types/expression';
import { CommandsBasicsService } from './commands/basics.service';
import { CommandsDataService } from './commands/data.service';
import { CommandsGraphics2DService } from './commands/graphics2d.service';
import { CommandsGraphics3DService } from './commands/graphics3d.service';
import { CommandsGUIService } from './commands/gui.service';
import { CommandsIOService } from './commands/io.service';
import { CommandsSoundService } from './commands/sound.service';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class InterpreterService {
  private abstractSyntax: AbstractSyntax;
  private codeBlockIndex: number;

  constructor(
    private basics: CommandsBasicsService,
    private data: CommandsDataService,
    private graphics2d: CommandsGraphics2DService,
    private graphics3d: CommandsGraphics3DService,
    private gui: CommandsGUIService,
    private io: CommandsIOService,
    private sound: CommandsSoundService,
    private gameState: GameStateService
  ) {
    this.codeBlockIndex = 0;
  }

  public initializeAbstractSyntax(abstractSyntax: AbstractSyntax): void {
    this.abstractSyntax = abstractSyntax;
    console.info('Abstract Syntax:', abstractSyntax);
  }

  public async run(): Promise<void> {
    for (let i = 0; i < this.abstractSyntax.codeBlocks.length; i++) {
      await this.interpreteCodeBlock(this.abstractSyntax.codeBlocks[i]);
    }
  }

  public async interpreteCodeBlock(codeBlock: CodeBlock): Promise<void> {
    console.info('Interpreting Code Block', codeBlock);

    switch (codeBlock.constructor.name) {
      case 'Assignment':
        await this.assign(codeBlock as Assignment);
        break;
      case 'CommandStatement':
        await this.executeCommand(codeBlock as CommandStatement);
        break;
      case 'ConstStatement':
        break;
      case 'ExpressionStatement':
        break;
      case 'IfThenElse':
        break;
      case 'SelectCase':
        break;
      case 'ForToNext':
        break;
      case 'WhileWend':
        this.whileLoop(codeBlock as WhileLoop);
        break;
      case 'RepeatUntil':
        break;
      case 'Include':
        break;
      case 'Include':
        break;
      case 'DataBlock':
        break;
    }
  }

  public async executeCommand(command: CommandStatement): Promise<any> {
    // console.info('EXECUTE COMMAND', command);

    const expressionsToEvaluate: Promise<any>[] = [];
    command.params.forEach((p: Expression) =>
      expressionsToEvaluate.push(this.evaluateExpression(p))
    );
    const evaluatedParams: any[] = await Promise.all(expressionsToEvaluate);
    // console.info('Evaluated Params:', evaluatedParams);

    const cmdLower: string = command.name.toLowerCase();
    switch (cmdLower) {
      // BASICS - DIVERSE
      case 'apptitle':
        return this.basics.appTitle(evaluatedParams[0]);
      case 'commandline':
        return this.basics.commandLine();
      case 'debuglog':
        return this.basics.debugLog(evaluatedParams[0]);
      case 'getenv':
        return this.basics.getEnv(evaluatedParams[0]);
      case 'runtimeerror':
        return this.basics.runtimeError(evaluatedParams[0]);
      case 'runtimestats':
        return this.basics.runtimeStats();
      case 'setenv':
        return this.basics.setEnv(evaluatedParams[0], evaluatedParams[1]);
      case 'systemproperty':
        return this.basics.systemProperty(evaluatedParams[0]);
      // BASICS - MATHS
      case 'abs':
        return this.basics.abs(evaluatedParams[0]);
      case 'acos':
        return this.basics.acos(evaluatedParams[0]);
      case 'asin':
        return this.basics.asin(evaluatedParams[0]);
      case 'atan':
        return this.basics.atan(evaluatedParams[0]);
      case 'atan2':
        return this.basics.atan2(evaluatedParams[0], evaluatedParams[1]);
      case 'bin':
        return this.basics.bin(evaluatedParams[0]);
      case 'ceil':
        return this.basics.ceil(evaluatedParams[0]);
      case 'cos':
        return this.basics.cos(evaluatedParams[0]);
      case 'exp':
        return this.basics.exp(evaluatedParams[0]);
      case 'float':
        return this.basics.float(evaluatedParams[0]);
      case 'floor':
        return this.basics.floor(evaluatedParams[0]);
      case 'hex':
        return this.basics.hex(evaluatedParams[0]);
      case 'int':
        return this.basics.int(evaluatedParams[0]);
      case 'log':
        return this.basics.log(evaluatedParams[0]);
      case 'log10':
        return this.basics.log10(evaluatedParams[0]);
      case 'pi':
        return this.basics.pi();
      case 'sgn':
        return this.basics.sgn(evaluatedParams[0]);
      case 'sin':
        return this.basics.sin(evaluatedParams[0]);
      case 'sqr':
        return this.basics.sqr(evaluatedParams[0]);
      case 'tan':
        return this.basics.tan(evaluatedParams[0]);
      // BASICS - STRINGS
      case 'asc':
        return this.basics.asc(evaluatedParams[0]);
      case 'chr':
        return this.basics.chr(evaluatedParams[0]);
      case 'instr':
        return this.basics.instr(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'left':
        return this.basics.left(evaluatedParams[0], evaluatedParams[1]);
      case 'len':
        return this.basics.len(evaluatedParams[0]);
      case 'lower':
        return this.basics.lower(evaluatedParams[0]);
      case 'lset':
        return this.basics.lset(evaluatedParams[0], evaluatedParams[1]);
      case 'mid':
        return this.basics.mid(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'replace':
        return this.basics.replace(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'right':
        return this.basics.right(evaluatedParams[0], evaluatedParams[1]);
      case 'rset':
        return this.basics.rset(evaluatedParams[0], evaluatedParams[1]);
      case 'str':
        return this.basics.str(evaluatedParams[0]);
      case 'string':
        return this.basics.string(evaluatedParams[0], evaluatedParams[1]);
      case 'trim':
        return this.basics.trim(evaluatedParams[0]);
      case 'upper':
        return this.basics.upper(evaluatedParams[0]);
      // BASICS - TIME AND RANDOM
      case 'createtimer':
        return this.basics.createTimer(evaluatedParams[0]);
      case 'currentdate':
        return this.basics.currentDate();
      case 'currenttime':
        return this.basics.currentTime();
      case 'delay':
        return this.basics.delay(evaluatedParams[0]);
      case 'freetimer':
        return this.basics.freeTimer(evaluatedParams[0]);
      case 'millisecs':
        return this.basics.milliSecs();
      case 'pausetimer':
        return this.basics.pauseTimer(evaluatedParams[0]);
      case 'rand':
        return this.basics.rand(evaluatedParams[0], evaluatedParams[1]);
      case 'resettimer':
        return this.basics.resetTimer(evaluatedParams[0]);
      case 'resumetimer':
        return this.basics.resumeTimer(evaluatedParams[0]);
      case 'rnd':
        return this.basics.rnd(evaluatedParams[0], evaluatedParams[1]);
      case 'rndseed':
        return this.basics.rndSeed();
      case 'seedrnd':
        return this.basics.seedRnd(evaluatedParams[0]);
      case 'timerticks':
        return this.basics.timerTicks();
      case 'waittimer':
        return this.basics.waitTimer(evaluatedParams[0]);
      // DATA - BANKS
      case 'banksize':
        return this.data.bankSize(evaluatedParams[0]);
      case 'copybank':
        return this.data.copyBank(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'createbank':
        return this.data.createBank(evaluatedParams[0]);
      case 'freebank':
        return this.data.freeBank(evaluatedParams[0]);
      case 'peekbyte':
        return this.data.peekByte(evaluatedParams[0], evaluatedParams[1]);
      case 'peekfloat':
        return this.data.peekFloat(evaluatedParams[0], evaluatedParams[1]);
      case 'peekint':
        return this.data.peekInt(evaluatedParams[0], evaluatedParams[1]);
      case 'peekshort':
        return this.data.peekShort(evaluatedParams[0], evaluatedParams[1]);
      case 'pokebyte':
        return this.data.pokeByte(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'pokefloat':
        return this.data.pokeFloat(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'pokeint':
        return this.data.pokeInt(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'pokeshort':
        return this.data.pokeShort(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'readbytes':
        return this.data.readBytes(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'resizebank':
        return this.data.resizeBank(evaluatedParams[0], evaluatedParams[1]);
      case 'writebytes':
        return this.data.writeBytes(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      // DATA - FILE SYSTEM
      case 'changedir':
        return this.data.changeDir(evaluatedParams[0]);
      case 'closedir':
        return this.data.closeDir(evaluatedParams[0]);
      case 'closefile':
        return this.data.closeFile(evaluatedParams[0]);
      case 'copyfile':
        return this.data.copyFile(evaluatedParams[0], evaluatedParams[1]);
      case 'createdir':
        return this.data.createDir(evaluatedParams[0]);
      case 'currentdir':
        return this.data.currentDir();
      case 'deletedir':
        return this.data.deleteDir(evaluatedParams[0]);
      case 'deletefile':
        return this.data.deleteFile(evaluatedParams[0]);
      case 'eof':
        return this.data.eof(evaluatedParams[0]);
      case 'filepos':
        return this.data.filePos(evaluatedParams[0]);
      case 'filesize':
        return this.data.fileSize(evaluatedParams[0]);
      case 'filetype':
        return this.data.fileType(evaluatedParams[0]);
      case 'morefiles':
        return this.data.moreFiles(evaluatedParams[0]);
      case 'nextfile':
        return this.data.nextFile(evaluatedParams[0]);
      case 'openfile':
        return this.data.openFile(evaluatedParams[0]);
      case 'readavail':
        return this.data.readAvail(evaluatedParams[0]);
      case 'readbyte':
        return this.data.readByte(evaluatedParams[0]);
      case 'readdir':
        return this.data.readDir(evaluatedParams[0]);
      case 'readfile':
        return this.data.readFile(evaluatedParams[0]);
      case 'readfloat':
        return this.data.readFloat(evaluatedParams[0]);
      case 'readint':
        return this.data.readInt(evaluatedParams[0]);
      case 'readline':
        return this.data.readLine(evaluatedParams[0]);
      case 'readshort':
        return this.data.readShort(evaluatedParams[0]);
      case 'readstring':
        return this.data.readString(evaluatedParams[0]);
      case 'seekfile':
        return this.data.seekFile(evaluatedParams[0], evaluatedParams[1]);
      case 'writebyte':
        return this.data.writeByte(evaluatedParams[0], evaluatedParams[1]);
      case 'writefile':
        return this.data.writeFile(evaluatedParams[0]);
      case 'writefloat':
        return this.data.writeFloat(evaluatedParams[0], evaluatedParams[1]);
      case 'writeint':
        return this.data.writeInt(evaluatedParams[0], evaluatedParams[1]);
      case 'writeline':
        return this.data.writeLine(evaluatedParams[0], evaluatedParams[1]);
      case 'writeshort':
        return this.data.writeShort(evaluatedParams[0], evaluatedParams[1]);
      case 'writestring':
        return this.data.writeString(evaluatedParams[0], evaluatedParams[1]);
      // GRAPHICS 2D - DISPLAY
      case 'countgfxdrivers':
        return this.graphics2d.countGfxDrivers();
      case 'countgfxmodes':
        return this.graphics2d.countGfxModes();
      case 'endgraphics':
        return this.graphics2d.endGraphics();
      case 'gfxDriverName':
        return this.graphics2d.gfxDriverName(evaluatedParams[0]);
      case 'gfxmodedepth':
        return this.graphics2d.gfxModeDepth(evaluatedParams[0]);
      case 'gfxmodeexists':
        return this.graphics2d.gfxModeExists(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'gfxmodeformat':
        return this.graphics2d.gfxModeFormat(evaluatedParams[0]);
      case 'gfxmodeheight':
        return this.graphics2d.gfxModeHeight(evaluatedParams[0]);
      case 'graphics':
        return this.graphics2d.graphics(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'graphicsbuffer':
        return this.graphics2d.graphicsBuffer();
      case 'graphicsdepth':
        return this.graphics2d.graphicsDepth();
      case 'graphicsformat':
        return this.graphics2d.graphicsFormat();
      case 'graphicsheight':
        return this.graphics2d.graphicsHeight();
      case 'graphicslost':
        return this.graphics2d.graphicsLost();
      case 'graphicswidth':
        return this.graphics2d.graphicsWidth();
      case 'setgfxdriver':
        return this.graphics2d.setGfxDriver(evaluatedParams[0]);
      // GRAPHICS 2D - GRAPHICS
      case 'availvidmem':
        return this.graphics2d.availVidMem();
      case 'backbuffer':
        return this.graphics2d.backBuffer();
      case 'cls':
        return this.graphics2d.cls();
      case 'clscolor':
        return this.graphics2d.clsColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'color':
        return this.graphics2d.color(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'copyrect':
        return this.graphics2d.copyRect(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'flip':
        return this.graphics2d.flip(evaluatedParams[0]);
      case 'frontbuffer':
        return this.graphics2d.frontBuffer();
      case 'line':
        return this.graphics2d.line(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'loadbuffer':
        return this.graphics2d.loadBuffer(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'origin':
        return this.graphics2d.origin(evaluatedParams[0], evaluatedParams[1]);
      case 'oval':
        return this.graphics2d.oval(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'rect':
        return this.graphics2d.rect(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'scanline':
        return this.graphics2d.scanLine();
      case 'savebuffer':
        return this.graphics2d.saveBuffer(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'setbuffer':
        return this.graphics2d.setBuffer(evaluatedParams[0]);
      case 'totalvidmem':
        return this.graphics2d.totalVidMem();
      case 'viewport':
        return this.graphics2d.viewport(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'vwait':
        return this.graphics2d.vWait(evaluatedParams[0]);
      // GRAPHICS 2D - IMAGES
      case 'automidhandle':
        return this.graphics2d.autoMidHandle(evaluatedParams[0]);
      case 'bufferdirty':
        return this.graphics2d.bufferDirty(evaluatedParams[0]);
      case 'copyimage':
        return this.graphics2d.copyImage(evaluatedParams[0]);
      case 'createimage':
        return this.graphics2d.createImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'drawblock':
        return this.graphics2d.drawBlock(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'drawblockrect':
        return this.graphics2d.drawBlockRect(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'drawimage':
        return this.graphics2d.drawImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'drawimagerect':
        return this.graphics2d.drawImageRect(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'freeimage':
        return this.graphics2d.freeImage(evaluatedParams[0]);
      case 'grabimage':
        return this.graphics2d.grabImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'handleimage':
        return this.graphics2d.handleImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'imageheight':
        return this.graphics2d.imageHeight(evaluatedParams[0]);
      case 'imagerectcollide':
        return this.graphics2d.imageRectCollide(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'imagerectoverlap':
        return this.graphics2d.imageRectOverlap(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6]
        );
      case 'imagescollide':
        return this.graphics2d.imagesCollide(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'imagesoverlap':
        return this.graphics2d.imagesOverlap(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'imagewidth':
        return this.graphics2d.imageWidth(evaluatedParams[0]);
      case 'imagexhandle':
        return this.graphics2d.imageXHandle(evaluatedParams[0]);
      case 'imageyhandle':
        return this.graphics2d.imageYHandle(evaluatedParams[0]);
      case 'loadanimimage':
        return this.graphics2d.loadAnimImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'loadimage':
        return this.graphics2d.loadImage(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'maskimage':
        return this.graphics2d.maskImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'midhandle':
        return this.graphics2d.midHandle(evaluatedParams[0]);
      case 'rectsoverlap':
        return this.graphics2d.rectsOverlap(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'resizeimage':
        return this.graphics2d.resizeImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'rotateimage':
        return this.graphics2d.rotateImage(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'saveimage':
        return this.graphics2d.saveImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'scaleimage':
        return this.graphics2d.scaleImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'tformfilter':
        return this.graphics2d.tFormFilter(evaluatedParams[0]);
      case 'tformimage':
        return this.graphics2d.tFormImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'tileblock':
        return this.graphics2d.tileBlock(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'tileimage':
        return this.graphics2d.tileImage(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      // GRAPHICS 2D - GAMMA
      case 'gammablue':
        return this.graphics2d.gammaBlue(evaluatedParams[0]);
      case 'gammagreen':
        return this.graphics2d.gammaGreen(evaluatedParams[0]);
      case 'gammared':
        return this.graphics2d.gammaRed(evaluatedParams[0]);
      case 'setgamma':
        return this.graphics2d.setGamma(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'updategamma':
        return this.graphics2d.updateGamma(evaluatedParams[0]);
      // GRAPHICS 2D - MOVIES
      case 'closemovie':
        return this.graphics2d.closeMovie(evaluatedParams[0]);
      case 'drawmovie':
        return this.graphics2d.drawMovie(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'movieheight':
        return this.graphics2d.movieHeight(evaluatedParams[0]);
      case 'movieplaying':
        return this.graphics2d.moviePlaying(evaluatedParams[0]);
      case 'moviewidth':
        return this.graphics2d.movieWidth(evaluatedParams[0]);
      case 'openmovie':
        return this.graphics2d.openMovie(evaluatedParams[0]);
      // GRAPHICS 2D - PIXEL
      case 'colorblue':
        return this.graphics2d.colorBlue();
      case 'colorgreen':
        return this.graphics2d.colorGreen();
      case 'colorRed':
        return this.graphics2d.colorRed();
      case 'plot':
        return this.graphics2d.plot(evaluatedParams[0], evaluatedParams[1]);
      case 'fontascent':
        return this.graphics2d.fontAscent(evaluatedParams[0]);
      case 'fontdescent':
        return this.graphics2d.fontDescent(evaluatedParams[0]);
      case 'fontheight':
        return this.graphics2d.fontHeight(evaluatedParams[0]);
      case 'fontname':
        return this.graphics2d.fontName(evaluatedParams[0]);
      case 'fontsize':
        return this.graphics2d.fontSize(evaluatedParams[0]);
      case 'fontstyle':
        return this.graphics2d.fontStyle(evaluatedParams[0]);
      case 'fontwidth':
        return this.graphics2d.fontWidth(evaluatedParams[0]);
      case 'freefont':
        return this.graphics2d.freeFont(evaluatedParams[0]);
      case 'loadfont':
        return this.graphics2d.loadFont(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'locate':
        return this.graphics2d.locate(evaluatedParams[0], evaluatedParams[1]);
      case 'print':
        return this.graphics2d.print(evaluatedParams[0]);
      case 'setfont':
        return this.graphics2d.setFont(evaluatedParams[0]);
      case 'stringheight':
        return this.graphics2d.stringHeight(evaluatedParams[0]);
      case 'stringwidth':
        return this.graphics2d.stringWidth(evaluatedParams[0]);
      case 'text':
        return this.graphics2d.text(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'write':
        return this.graphics2d.write(evaluatedParams[0]);
      // GRAPHICS 3D - ANIMATIONS
      case 'addanimseq':
        return this.graphics3d.addAnimSeq(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'animate':
        return this.graphics3d.animate(evaluatedParams[0], evaluatedParams[1]);
      case 'animating':
        return this.graphics3d.animating(evaluatedParams[0]);
      case 'animlength':
        return this.graphics3d.animLength(evaluatedParams[0]);
      case 'animseq':
        return this.graphics3d.animSeq(evaluatedParams[0]);
      case 'animtime':
        return this.graphics3d.animTime(evaluatedParams[0]);
      case 'extractanimseq':
        return this.graphics3d.extractAnimSeq(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'setanimkey':
        return this.graphics3d.setAnimKey(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'setanimtime':
        return this.graphics3d.setAnimTime(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      // GRAPHICS 3D - BRUSHES
      case 'brushalpha':
        return this.graphics3d.brushAlpha(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'brushblend':
        return this.graphics3d.brushBlend(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'brushcolor':
        return this.graphics3d.brushColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'brushfx':
        return this.graphics3d.brushFx(evaluatedParams[0], evaluatedParams[1]);
      case 'brushshininess':
        return this.graphics3d.brushShininess(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'brushtexture':
        return this.graphics3d.brushTexture(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'createbrush':
        return this.graphics3d.createBrush(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'freebrush':
        return this.graphics3d.freeBrush(evaluatedParams[0]);
      case 'freebrush':
        return this.graphics3d.getBrushTexture(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'getentitybrush':
        return this.graphics3d.getEntityBrush(evaluatedParams[0]);
      case 'getsurfacebrush':
        return this.graphics3d.getSurfaceBrush(evaluatedParams[0]);
      case 'loadbrush':
        return this.graphics3d.loadBrush(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'paintentity':
        return this.graphics3d.paintEntity(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'paintmesh':
        return this.graphics3d.paintMesh(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'paintsurface':
        return this.graphics3d.paintSurface(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      // GRAPHICS 3D - CAMERA
      case 'cameraclscolor':
        return this.graphics3d.cameraClsColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'cameraclsmode':
        return this.graphics3d.cameraClsMode(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'fogcolor':
        return this.graphics3d.fogColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'fogmode':
        return this.graphics3d.fogMode(evaluatedParams[0]);
      case 'fogrange':
        return this.graphics3d.fogRange(evaluatedParams[0], evaluatedParams[1]);
      case 'fogdensity':
        return this.graphics3d.fogDensity(evaluatedParams[0]);
      case 'cameraproject':
        return this.graphics3d.cameraProject(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'cameraprojmode':
        return this.graphics3d.cameraProjMode(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'camerarange':
        return this.graphics3d.cameraRange(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'cameraviewport':
        return this.graphics3d.cameraViewport(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'camerazoom':
        return this.graphics3d.cameraZoom(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'createcamera':
        return this.graphics3d.createCamera(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'projectedx':
        return this.graphics3d.projectedX();
      case 'projectedy':
        return this.graphics3d.projectedY();
      case 'projectedz':
        return this.graphics3d.projectedZ();
      // GRAPHICS 3D - COLLISIONS
      case 'clearcollisions':
        return this.graphics3d.clearCollisions();
      case 'collisionentity':
        return this.graphics3d.collisionEntity(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisionnx':
        return this.graphics3d.collisionNX(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisionny':
        return this.graphics3d.collisionNY(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisionnz':
        return this.graphics3d.collisionNZ(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisions':
        return this.graphics3d.collisions(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'collisionsurface':
        return this.graphics3d.collisionSurface(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisiontime':
        return this.graphics3d.collisionTime(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisiontriangle':
        return this.graphics3d.collisionTriangle(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisionx':
        return this.graphics3d.collisionX(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisiony':
        return this.graphics3d.collisionY(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'collisionz':
        return this.graphics3d.collisionZ(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'countcollisions':
        return this.graphics3d.countCollisions(evaluatedParams[0]);
      case 'entitybox':
        return this.graphics3d.entityBox(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6]
        );
      case 'entitycollided':
        return this.graphics3d.entityCollided(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityradius':
        return this.graphics3d.entityRadius(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'entitytype':
        return this.graphics3d.entityType(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'getentitytype':
        return this.graphics3d.getEntityType(evaluatedParams[0]);
      case 'meshesintersect':
        return this.graphics3d.meshesIntersect(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'resetentity':
        return this.graphics3d.resetEntity(evaluatedParams[0]);
      // GRAPHICS 3D - CONTROLS
      case 'copyentity':
        return this.graphics3d.copyEntity(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityalpha':
        return this.graphics3d.entityAlpha(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityautofade':
        return this.graphics3d.entityAutoFade(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'entityblend':
        return this.graphics3d.entityBlend(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entitycolor':
        return this.graphics3d.entityColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'entityfx':
        return this.graphics3d.entityFx(evaluatedParams[0], evaluatedParams[1]);
      case 'entityorder':
        return this.graphics3d.entityOrder(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityparent':
        return this.graphics3d.entityParent(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'entityshininess':
        return this.graphics3d.entityShininess(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entitytexture':
        return this.graphics3d.entityTexture(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'freeentity':
        return this.graphics3d.freeEntity(evaluatedParams[0]);
      case 'hideentity':
        return this.graphics3d.hideEntity(evaluatedParams[0]);
      case 'showentity':
        return this.graphics3d.showEntity(evaluatedParams[0]);
      case 'aligntovector':
        return this.graphics3d.alignToVector(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'moveentity':
        return this.graphics3d.moveEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'pointentity':
        return this.graphics3d.pointEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'positionentity':
        return this.graphics3d.positionEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'rotateentity':
        return this.graphics3d.rotateEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'scaleentity':
        return this.graphics3d.scaleEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'translateentity':
        return this.graphics3d.translateEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'turnentity':
        return this.graphics3d.turnEntity(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'tformedx':
        return this.graphics3d.tFormedX();
      case 'tformedy':
        return this.graphics3d.tFormedY();
      case 'tformedz':
        return this.graphics3d.tFormedZ();
      case 'tformnormal':
        return this.graphics3d.tFormNormal(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'tformpoint':
        return this.graphics3d.tFormPoint(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'tformvector':
        return this.graphics3d.tFormVector(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      // GRAPHICS 3D - DIVERSE
      case 'createmirror':
        return this.graphics3d.createMirror();
      case 'createpivot':
        return this.graphics3d.createPivot();
      case 'createplane':
        return this.graphics3d.createPlane();
      case 'getmatelement':
        return this.graphics3d.getMatElement(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'loadermatrix':
        return this.graphics3d.loaderMatrix(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7],
          evaluatedParams[8],
          evaluatedParams[9]
        );
      case 'trisrendered':
        return this.graphics3d.trisRendered();
      case 'vectorpitch':
        return this.graphics3d.vectorPitch(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'vectoryaw':
        return this.graphics3d.vectorYaw(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      // GRAPHICS 3D - LIGHT AND SHADOW
      case 'ambientlight':
        return this.graphics3d.ambientLight(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'createlight':
        return this.graphics3d.createLight(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'lightcolor':
        return this.graphics3d.lightColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'lightconeangles':
        return this.graphics3d.lightConeAngles();
      case 'lightmesh':
        return this.graphics3d.lightMesh();
      case 'lightrange':
        return this.graphics3d.lightRange(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'createshadowmap':
        return this.graphics3d.createShadowMap();
      case 'freeshadowmap':
        return this.graphics3d.freeShadowMap();
      case 'castshadow':
        return this.graphics3d.castShadow();
      case 'receiveshadows':
        return this.graphics3d.receiveShadows();
      case 'shadowdarkness':
        return this.graphics3d.shadowDarkness();
      // GRAPHICS 3D - MESHES
      case 'addmesh':
        return this.graphics3d.addMesh(evaluatedParams[0], evaluatedParams[1]);
      case 'copymesh':
        return this.graphics3d.copyMesh(evaluatedParams[0], evaluatedParams[1]);
      case 'createcone':
        return this.graphics3d.createCone(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'createsphere':
        return this.graphics3d.createSphere(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'createcube':
        return this.graphics3d.createCube(evaluatedParams[0]);
      case 'createcylinder':
        return this.graphics3d.createCylinder(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'createpyramid':
        return this.graphics3d.createPyramid(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'createtorus':
        return this.graphics3d.createTorus(evaluatedParams[0]);
      case 'createtorusknot':
        return this.graphics3d.createTorusKnot(evaluatedParams[0]);
      case 'fitmesh':
        return this.graphics3d.fitMesh(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6],
          evaluatedParams[7]
        );
      case 'flipmesh':
        return this.graphics3d.flipMesh(evaluatedParams[0]);
      case 'loadanimmesh':
        return this.graphics3d.loadAnimMesh(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'loadmesh':
        return this.graphics3d.loadMesh(evaluatedParams[0], evaluatedParams[1]);
      case 'meshcullbox':
        return this.graphics3d.meshCullBox(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6]
        );
      case 'meshdepth':
        return this.graphics3d.meshDepth(evaluatedParams[0]);
      case 'meshheight':
        return this.graphics3d.meshHeight(evaluatedParams[0]);
      case 'meshwidth':
        return this.graphics3d.meshWidth(evaluatedParams[0]);
      case 'positionmesh':
        return this.graphics3d.positionMesh(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'rotatemesh':
        return this.graphics3d.rotateMesh(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'scalemesh':
        return this.graphics3d.scaleMesh(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      // GRAPHICS 3D - PICKING
      case 'camerapick':
        return this.graphics3d.cameraPick(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'entitypick':
        return this.graphics3d.entityPick(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entitypickmode':
        return this.graphics3d.entityPickMode(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'linepick':
        return this.graphics3d.linePick(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'pickedentity':
        return this.graphics3d.pickedEntity();
      case 'pickednx':
        return this.graphics3d.pickedNX();
      case 'pickedny':
        return this.graphics3d.pickedNY();
      case 'pickednz':
        return this.graphics3d.pickedNZ();
      case 'pickedsurface':
        return this.graphics3d.pickedSurface();
      case 'pickedtime':
        return this.graphics3d.pickedTime();
      case 'pickedtriangle':
        return this.graphics3d.pickedTriangle();
      case 'pickedx':
        return this.graphics3d.pickedX();
      case 'pickedy':
        return this.graphics3d.pickedY();
      case 'pickedz':
        return this.graphics3d.pickedZ();
      // GRAPHICS 3D - SCENE
      case 'createskybox':
        return this.graphics3d.createSkyBox();
      case 'loadskybox':
        return this.graphics3d.loadSkyBox();
      case 'setgravity':
        return this.graphics3d.setGravity(evaluatedParams[0]);
      case 'setgravity':
        return this.graphics3d.setGravity(evaluatedParams[0]);
      // GRAPHICS 3D - SCENERY
      case 'antialias':
        return this.graphics3d.antiAlias(evaluatedParams[0]);
      case 'captureworld':
        return this.graphics3d.captureWorld();
      case 'clearworld':
        return this.graphics3d.clearWorld(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'renderworld':
        return this.graphics3d.renderWorld(evaluatedParams[0]);
      case 'updateworld':
        return this.graphics3d.updateWorld(evaluatedParams[0]);
      case 'wireframe':
        return this.graphics3d.wireFrame(evaluatedParams[0]);
      // GRAPHICS 3D - SCREEN
      case 'countgfxmodes3d':
        return this.graphics3d.countGfxModes3d();
      case 'gfxdriver3d':
        return this.graphics3d.gfxDriver3D();
      case 'gfxdrivercaps3d':
        return this.graphics3d.gfxDriverCaps3D();
      case 'gfxmode3d':
        return this.graphics3d.gfxMode3D(evaluatedParams[0]);
      case 'gfxmode3dexists':
        return this.graphics3d.gfxMode3DExists(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'windowed3d':
        return this.graphics3d.windowed3D();
      // GRAPHICS 3D - SPRITES
      case 'createSprite':
        return this.graphics3d.createSprite(evaluatedParams[0]);
      case 'handlesprite':
        return this.graphics3d.handleSprite(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'loadsprite':
        return this.graphics3d.loadSprite(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'rotatesprite':
        return this.graphics3d.rotateSprite(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'scalesprite':
        return this.graphics3d.scaleSprite(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'spriteviewmode':
        return this.graphics3d.spriteViewMode(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      // GRAPHICS 3D - STATUS
      case 'countchildren':
        return this.graphics3d.countChildren(evaluatedParams[0]);
      case 'deltapitch':
        return this.graphics3d.deltaPitch(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'deltayaw':
        return this.graphics3d.deltaYaw(evaluatedParams[0], evaluatedParams[1]);
      case 'entityclass':
        return this.graphics3d.entityClass(evaluatedParams[0]);
      case 'entitydistance':
        return this.graphics3d.entityDistance(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityinview':
        return this.graphics3d.entityInView(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityname':
        return this.graphics3d.entityName(evaluatedParams[0]);
      case 'entitypitch':
        return this.graphics3d.entityPitch(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityroll':
        return this.graphics3d.entityRoll(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityvisible':
        return this.graphics3d.entityVisible(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityx':
        return this.graphics3d.entityX(evaluatedParams[0], evaluatedParams[1]);
      case 'entityy':
        return this.graphics3d.entityY(evaluatedParams[0], evaluatedParams[1]);
      case 'entityyaw':
        return this.graphics3d.entityYaw(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'entityz':
        return this.graphics3d.entityZ(evaluatedParams[0], evaluatedParams[1]);
      case 'findchild':
        return this.graphics3d.findChild(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'getchild':
        return this.graphics3d.getChild(evaluatedParams[0], evaluatedParams[1]);
      case 'getparent':
        return this.graphics3d.getParent(evaluatedParams[0]);
      case 'nameentity':
        return this.graphics3d.nameEntity(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      // GRAPHICS 3D - SURFACES
      case 'addtriangle':
        return this.graphics3d.addTriangle(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'addvertex':
        return this.graphics3d.addVertex(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6]
        );
      case 'clearsurface':
        return this.graphics3d.clearSurface(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'countsurfaces':
        return this.graphics3d.countSurfaces(evaluatedParams[0]);
      case 'counttriangles':
        return this.graphics3d.countTriangles(evaluatedParams[0]);
      case 'countvertices':
        return this.graphics3d.countVertices(evaluatedParams[0]);
      case 'createsurface':
        return this.graphics3d.createSurface(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'findsurface':
        return this.graphics3d.findSurface(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'getsurface':
        return this.graphics3d.getSurface(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'trianglevertex':
        return this.graphics3d.triangleVertex(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'updatenormals':
        return this.graphics3d.updateNormals(evaluatedParams[0]);
      case 'vertexalpha':
        return this.graphics3d.vertexAlpha(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'vertexblue':
        return this.graphics3d.vertexBlue(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'vertexcolor':
        return this.graphics3d.vertexColor(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'vertexcoords':
        return this.graphics3d.vertexCoords(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'vertexgreen':
        return this.graphics3d.vertexGreen(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'vertexnormal':
        return this.graphics3d.vertexNormal(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'vertexnx':
        return this.graphics3d.vertexNX(evaluatedParams[0], evaluatedParams[1]);
      case 'vertexny':
        return this.graphics3d.vertexNY(evaluatedParams[0], evaluatedParams[1]);
      case 'vertexnz':
        return this.graphics3d.vertexNZ(evaluatedParams[0], evaluatedParams[1]);
      case 'vertexred':
        return this.graphics3d.vertexRed(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'vertextexcoords':
        return this.graphics3d.vertexTexCoords(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'vertexu':
        return this.graphics3d.vertexU(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'vertexv':
        return this.graphics3d.vertexV(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'vertexw':
        return this.graphics3d.vertexW(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'vertexx':
        return this.graphics3d.vertexX(evaluatedParams[0], evaluatedParams[1]);
      case 'vertexy':
        return this.graphics3d.vertexY(evaluatedParams[0], evaluatedParams[1]);
      case 'vertexz':
        return this.graphics3d.vertexZ(evaluatedParams[0], evaluatedParams[1]);
      // GRAPHICS 3D - TERRAIN
      case 'createterrain':
        return this.graphics3d.createTerrain(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'loadterrain':
        return this.graphics3d.loadTerrain(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'modifyterrain':
        return this.graphics3d.modifyTerrain(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4]
        );
      case 'terraindetail':
        return this.graphics3d.terrainDetail(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'terrainheight':
        return this.graphics3d.terrainHeight(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'terrainshading':
        return this.graphics3d.terrainShading(evaluatedParams[0]);
      case 'terrainsize':
        return this.graphics3d.terrainSize(evaluatedParams[0]);
      case 'terrainx':
        return this.graphics3d.terrainX(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'terrainy':
        return this.graphics3d.terrainY(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'terrainz':
        return this.graphics3d.terrainZ(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      // GRAPHICS 3D - TEXTURES
      case 'activetextures':
        return this.graphics3d.activeTextures();
      case 'cleartexturefilters':
        return this.graphics3d.clearTextureFilters();
      case 'createtexture':
        return this.graphics3d.createTexture(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'freetexture':
        return this.graphics3d.freeTexture(evaluatedParams[0]);
      case 'loadanimtexture':
        return this.graphics3d.loadAnimTexture(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'loadtexture':
        return this.graphics3d.loadTexture(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'positiontexture':
        return this.graphics3d.positionTexture(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'rotatetexture':
        return this.graphics3d.rotateTexture(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'scaletexture':
        return this.graphics3d.scaleTexture(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'setcubeface':
        return this.graphics3d.setCubeFace(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'setcubemode':
        return this.graphics3d.setCubeMode(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'textureblend':
        return this.graphics3d.textureBlend(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'texturecoords':
        return this.graphics3d.textureCoords(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'texturefilter':
        return this.graphics3d.textureFilter(
          evaluatedParams[0],
          evaluatedParams[1]
        );
      case 'textureheight':
        return this.graphics3d.textureHeight(evaluatedParams[0]);
      case 'texturename':
        return this.graphics3d.textureName(evaluatedParams[0]);
      case 'texturewidth':
        return this.graphics3d.textureWidth(evaluatedParams[0]);
      // GUI - BUTTON
      case 'buttonstate':
        return this.gui.buttonState(evaluatedParams[0]);
      case 'createbutton':
        return this.gui.createButton(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5],
          evaluatedParams[6]
        );
      case 'setbuttonstate':
        return this.gui.setButtonState(evaluatedParams[0], evaluatedParams[1]);
      // GUI - CANVAS
      case 'createcanvas':
        return this.gui.createCanvas(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3],
          evaluatedParams[4],
          evaluatedParams[5]
        );
      case 'flipcanvas':
        return this.gui.flipCanvas(evaluatedParams[0], evaluatedParams[1]);
      // GUI - DESKTOP
      case 'desktop':
        return this.gui.desktop();
      // GUI - DIVERSE
      case 'activeobjects':
        return this.gui.activeObjects();
      case 'autosuspend':
        return this.gui.autoSuspend();
      case 'createprocess':
        return this.gui.createProcess();
      case 'debugobjects':
        return this.gui.debugObjects();
      // GUI - EVENT
      case 'eventdata':
        return this.gui.eventData();
      case 'eventid':
        return this.gui.eventId();
      case 'eventsource':
        return this.gui.eventSource();
      case 'eventx':
        return this.gui.eventX();
      case 'eventy':
        return this.gui.eventY();
      case 'eventz':
        return this.gui.eventZ();
      case 'flushevents':
        return this.gui.flushEvents();
      case 'hotkeyevent':
        return this.gui.hotKeyEvent();
      case 'peekevent':
        return this.gui.peekEvent();
      case 'waitevent':
        return this.gui.waitEvent();
      case 'activategadget':
        return this.gui.activateGadget();
      case 'clientheight':
        return this.gui.clientHeight();
      case 'clientwidth':
        return this.gui.clientWidth();
      case 'disablegadget':
        return this.gui.disableGadget();
      case 'enablegadget':
        return this.gui.enableGadget();
      case 'freegadget':
        return this.gui.freeGadget();
      case 'gadgetfont':
        return this.gui.gadgetFont();
      case 'gadgetgroup':
        return this.gui.gadgetGroup();
      case 'gadgetheight':
        return this.gui.gadgetHeight();
      case 'gadgettext':
        return this.gui.gadgetText();
      case 'gadgetwidth':
        return this.gui.gadgetWidth();
      case 'gadgetx':
        return this.gui.gadgetX();
      case 'gadgety':
        return this.gui.gadgetY();
      case 'hidegadget':
        return this.gui.hideGadget();
      case 'queryobject':
        return this.gui.queryObject();
      case 'setgadgetfont':
        return this.gui.setGadgetFont();
      case 'setgadgetlayout':
        return this.gui.setGadgetLayout();
      case 'setgadgetshape':
        return this.gui.setGadgetShape();
      case 'setgadgettext':
        return this.gui.setGadgetText();
      case 'showgadget':
        return this.gui.showGadget();
      // GUI - HTML
      case 'createhtmlview':
        return this.gui.createHtmlView();
      case 'htmlviewback':
        return this.gui.htmlViewBack(evaluatedParams[0]);
      case 'htmlviewcurrenturl':
        return this.gui.htmlViewCurrentUrl(evaluatedParams[0]);
      case 'htmlvieweventurl':
        return this.gui.htmlViewEventUrl(evaluatedParams[0]);
      case 'htmlviewforward':
        return this.gui.htmlViewForward(evaluatedParams[0]);
      case 'htmlviewgo':
        return this.gui.htmlViewGo(evaluatedParams[0], evaluatedParams[1]);
      case 'htmlviewrun':
        return this.gui.htmlViewRun(evaluatedParams[0], evaluatedParams[1]);
      case 'htmlviewstatus':
        return this.gui.htmlViewStatus(evaluatedParams[0]);
      // GUI - ICON STRIP
      case 'freeiconstrip':
        return this.gui.freeIconStrip();
      case 'loadiconstrip':
        return this.gui.loadIconStrip();
      case 'setgadgeticonstrip':
        return this.gui.setGadgetIconStrip();
      // GUI - LIST TABBER
      case 'addgadgetitem':
        return this.gui.addGadgetItem();
      case 'cleargadgetitems':
        return this.gui.clearGadgetItems();
      case 'countgadgetitems':
        return this.gui.countGadgetItems();
      case 'createcombobox':
        return this.gui.createComboBox();
      case 'createlistbox':
        return this.gui.createListBox();
      case 'createtabber':
        return this.gui.createTabber();
      case 'gadgetitemtext':
        return this.gui.gadgetItemText();
      case 'insertgadgetitem':
        return this.gui.insertGadgetItem();
      case 'modifygadgetitem':
        return this.gui.modifyGadgetItem();
      case 'removegadgetitem':
        return this.gui.removeGadgetItem();
      case 'selectedgadgetitem':
        return this.gui.selectedGadgetItem();
      case 'selectgadgetitem':
        return this.gui.selectGadgetItem();
      // GUI - MENU
      case 'checkmenu':
        return this.gui.checkMenu();
      case 'createmenu':
        return this.gui.createMenu();
      case 'disablemenu':
        return this.gui.disableMenu();
      case 'enablemenu':
        return this.gui.enableMenu();
      case 'menuchecked':
        return this.gui.menuChecked();
      case 'menuenabled':
        return this.gui.menuEnabled();
      case 'menutext':
        return this.gui.menuText();
      case 'setmenutext':
        return this.gui.setMenuText();
      case 'uncheckmenu':
        return this.gui.uncheckMenu();
      case 'updatewindowmenu':
        return this.gui.updateWindowMenu();
      case 'windowmenu':
        return this.gui.windowMenu();
      // GUI - PANEL
      case 'createpanel':
        return this.gui.createPanel();
      case 'setpanelcolor':
        return this.gui.setPanelColor();
      case 'setpanelimage':
        return this.gui.setPanelImage();
      // GUI - PROGRESS BAR
      case 'createprogbar':
        return this.gui.createProgBar();
      case 'updateprogbar':
        return this.gui.updateProgBar();
      // GUI - REQUEST SERVICE
      case 'confirm':
        return this.gui.confirm();
      case 'notify':
        return this.gui.notify();
      case 'proceed':
        return this.gui.proceed();
      case 'requestcolor':
        return this.gui.requestColor();
      case 'requestdir':
        return this.gui.requestDir();
      case 'requestedblue':
        return this.gui.requestedBlue();
      case 'requestedgreen':
        return this.gui.requestedGreen();
      case 'requestedred':
        return this.gui.requestedRed();
      case 'requestfile':
        return this.gui.requestFile();
      case 'requestfont':
        return this.gui.requestFont();
      // GUI - SLIDER
      case 'createslider':
        return this.gui.createSlider();
      case 'setsliderrange':
        return this.gui.setSliderRange();
      case 'setslidervalue':
        return this.gui.setSliderValue();
      case 'slidervalue':
        return this.gui.sliderValue();
      // GUI - TEXT AREA
      case 'addtextareatext':
        return this.gui.addTextAreaText();
      case 'createtextarea':
        return this.gui.createTextArea();
      case 'formattextareatext':
        return this.gui.formatTextAreaText();
      case 'locktextarea':
        return this.gui.lockTextArea();
      case 'settextareacolor':
        return this.gui.setTextAreaColor();
      case 'settextareafont':
        return this.gui.setTextAreaFont();
      case 'settextareatabs':
        return this.gui.setTextAreaTabs();
      case 'settextareatext':
        return this.gui.setTextAreaText();
      case 'textareachar':
        return this.gui.textAreaChar();
      case 'textareacursor':
        return this.gui.textAreaCursor();
      case 'textarealen':
        return this.gui.textAreaLen();
      case 'textarealine':
        return this.gui.textAreaLine();
      case 'textarealinelen':
        return this.gui.textAreaLineLen();
      case 'textareasellen':
        return this.gui.textAreaSelLen();
      case 'textareatext':
        return this.gui.textAreaText();
      case 'unlocktextarea':
        return this.gui.unlockTextArea();
      // GUI - TEXT FIELD
      case 'createlabel':
        return this.gui.createLabel();
      case 'createtextfield':
        return this.gui.createTextField();
      case 'textfieldtext':
        return this.gui.textFieldText();
      // GUI - TOOLBAR
      case 'createtoolbar':
        return this.gui.createToolBar();
      case 'disabletoolbaritem':
        return this.gui.disableToolBarItem();
      case 'enabletoolbaritem':
        return this.gui.enableToolBarItem();
      case 'settoolbartips':
        return this.gui.setToolBarTips();
      // GUI - TREE VIEW
      case 'addtreeviewnode':
        return this.gui.addTreeViewNode();
      case 'collapsetreeviewnode':
        return this.gui.collapseTreeViewNode();
      case 'counttreeviewnodes':
        return this.gui.countTreeViewNodes();
      case 'createtreeview':
        return this.gui.createTreeView();
      case 'expandtreeviewnode':
        return this.gui.expandTreeViewNode();
      case 'freetreeviewnode':
        return this.gui.freeTreeViewNode();
      case 'inserttreeviewnode':
        return this.gui.insertTreeViewNode();
      case 'modifytreeviewnode':
        return this.gui.modifyTreeViewNode();
      case 'selectedtreeviewnode':
        return this.gui.selectedTreeViewNode();
      case 'selecttreeviewnode':
        return this.gui.selectTreeViewNode();
      case 'treeviewnodetext':
        return this.gui.treeViewNodeText();
      case 'treeviewroot':
        return this.gui.treeViewRoot();
      // GUI - WINDOW
      case 'activatewindow':
        return this.gui.activateWindow();
      case 'activewindow':
        return this.gui.activeWindow();
      case 'createwindow':
        return this.gui.createWindow();
      case 'maximizewindow':
        return this.gui.maximizeWindow();
      case 'minimizewindow':
        return this.gui.minimizeWindow();
      case 'restorewindow':
        return this.gui.restoreWindow();
      case 'setminwindowsize':
        return this.gui.setMinWindowSize();
      case 'setstatustext':
        return this.gui.setStatusText();
      case 'windowmaximized':
        return this.gui.windowMaximized();
      case 'windowminimized':
        return this.gui.windowMinimized();
      // IO - GAMEPAD
      case 'flushjoy':
        return this.io.flushJoy();
      case 'getjoy':
        return this.io.getJoy();
      case 'joydown':
        return this.io.joyDown(evaluatedParams[0], evaluatedParams[1]);
      case 'joyhat':
        return this.io.joyHat();
      case 'joyhit':
        return this.io.joyHit(evaluatedParams[0], evaluatedParams[1]);
      case 'joypitch':
        return this.io.joyPitch();
      case 'joyroll':
        return this.io.joyRoll();
      case 'joytype':
        return this.io.joyType();
      case 'joyu':
        return this.io.joyU();
      case 'joyudir':
        return this.io.joyUDir();
      case 'joyv':
        return this.io.joyV();
      case 'joyvdir':
        return this.io.joyVDir();
      case 'joywait':
        return this.io.joyWait();
      case 'joyx':
        return this.io.joyX();
      case 'joyxdir':
        return this.io.joyXDir();
      case 'joyy':
        return this.io.joyY();
      case 'joyyaw':
        return this.io.joyYaw();
      case 'joyydir':
        return this.io.joyYDir();
      case 'joyz':
        return this.io.joyZ();
      case 'joyzdir':
        return this.io.joyZDir();
      case 'waitjoy':
        return this.io.waitJoy();
      // IO - KEYBOARD
      case 'flushkeys':
        return this.io.flushKeys();
      case 'getkey':
        return this.io.getKey();
      case 'input':
        return this.io.input(evaluatedParams[0]);
      case 'keydown':
        return this.io.keyDown(evaluatedParams[0]);
      case 'keyhit':
        return this.io.keyHit(evaluatedParams[0]);
      case 'keywait':
        return this.io.keyWait();
      case 'waitKey':
        return this.io.waitKey();
      // IO - MOUSE
      case 'flushmouse':
        return this.io.flushMouse();
      case 'getmouse':
        return this.io.getMouse();
      case 'hidepointer':
        return this.io.hidePointer();
      case 'mousedown':
        return this.io.mouseDown(evaluatedParams[0]);
      case 'mousehit':
        return this.io.mouseHit(evaluatedParams[0]);
      case 'mousewait':
        return this.io.mouseWait();
      case 'mousex':
        return this.io.mouseX();
      case 'mousexspeed':
        return this.io.mouseXSpeed();
      case 'mousey':
        return this.io.mouseY();
      case 'mouseyspeed':
        return this.io.mouseYSpeed();
      case 'mousez':
        return this.io.mouseZ();
      case 'mousezspeed':
        return this.io.mouseZSpeed();
      case 'movemouse':
        return this.io.moveMouse(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2]
        );
      case 'showpointer':
        return this.io.showPointer();
      case 'waitmouse':
        return this.io.waitMouse();
      // SOUND - 3D
      case 'createlistener':
        return this.sound.createListener(
          evaluatedParams[0],
          evaluatedParams[1],
          evaluatedParams[2],
          evaluatedParams[3]
        );
      case 'emitsound':
        return this.sound.emitSound(evaluatedParams[0], evaluatedParams[1]);
      case 'load3dsound':
        return this.sound.load3DSound(evaluatedParams[0]);
      // SOUND - CHANNELS
      case 'channelpan':
        return this.sound.channelPan(evaluatedParams[0], evaluatedParams[1]);
      case 'channelpitch':
        return this.sound.channelPitch(evaluatedParams[0], evaluatedParams[1]);
      case 'channelplaying':
        return this.sound.channelPlaying(evaluatedParams[0]);
      case 'channelvolume':
        return this.sound.channelVolume(evaluatedParams[0], evaluatedParams[1]);
      case 'pausechannel':
        return this.sound.pauseChannel(evaluatedParams[0]);
      case 'resumechannel':
        return this.sound.resumeChannel(evaluatedParams[0]);
      case 'stopchannel':
        return this.sound.stopChannel(evaluatedParams[0]);
      // SOUND - MUSIC SAMPLES
      case 'playcdtrack':
        return this.sound.playCDTrack(evaluatedParams[0], evaluatedParams[1]);
      case 'playmusic':
        return this.sound.playMusic(evaluatedParams[0], evaluatedParams[1]);
      // SOUND - SAMPLES
      case 'freesound':
        return this.sound.freeSound(evaluatedParams[0]);
      case 'loadsound':
        return this.sound.loadSound(evaluatedParams[0]);
      case 'loopsound':
        return this.sound.loopSound(evaluatedParams[0]);
      case 'playsound':
        return this.sound.playSound(evaluatedParams[0]);
      case 'soundpan':
        return this.sound.soundPan(evaluatedParams[0], evaluatedParams[1]);
      case 'soundpitch':
        return this.sound.soundPitch(evaluatedParams[0], evaluatedParams[1]);
      case 'soundvolume':
        return this.sound.soundVolume(evaluatedParams[0], evaluatedParams[1]);
    }

    return null;
  }

  public async evaluateExpression(expression: Expression): Promise<any> {
    const termsToEvaluate: Promise<string>[] = [];
    let evaluatedTerms: any[];
    let result = '';
    // console.info('Expression', expression);

    switch (expression.constructor.name) {
      case 'NumericExpression':
        return (expression as NumericExpression).value;
      case 'BooleanExpression':
        return (expression as BooleanExpression).value;
      case 'StringExpression':
        return (expression as StringExpression).value;
      case 'VariableExpression':
        const varExpr: VariableExpression = expression as VariableExpression;
        switch (varExpr.scope) {
          case 'const':
          case 'global':
            return this.gameState.getGlobal(varExpr.id);
        }
      case 'CommandStatement':
        return this.executeCommand(expression as CommandStatement);
      case 'ArithmeticExpression':
        const arithExpr: ArithmeticExpression = expression as ArithmeticExpression;

        arithExpr.terms.forEach((term: Term) =>
          termsToEvaluate.push(this.evaluateExpression(term))
        );
        evaluatedTerms = await Promise.all(termsToEvaluate);

        evaluatedTerms.forEach((term: string, index: number) => {
          result += term;
          if (index < arithExpr.terms.length - 1) {
            result += arithExpr.operators[index];
          }
        });
        return eval(result);
      case 'LogicalExpression':
        const logicExpr: LogicalExpression = expression as LogicalExpression;

        logicExpr.terms.forEach((term: Term) =>
          termsToEvaluate.push(this.evaluateExpression(term))
        );
        evaluatedTerms = await Promise.all(termsToEvaluate);

        evaluatedTerms.forEach((term: string, index: number) => {
          result += term;
          if (index < logicExpr.terms.length - 1) {
            result += logicExpr.operators[index];
          }
        });
        return eval(result);
    }

    console.warn('Expression could not be evaluated:', expression);
    return null;
  }

  public async assign(assignment: Assignment): Promise<void> {
    const evaluatedExpression: any = await this.evaluateExpression(
      assignment.value
    );
    // console.info('evaluatedExpression:', evaluatedExpression);

    switch (assignment.scope) {
      case 'const':
      case 'global':
        this.gameState.setGlobal(assignment.id, evaluatedExpression);
    }
  }

  public async ifBlock(ifBlock: IfBlock): Promise<void> {
    const expressionsToEvaluate: Promise<any>[] = [];
    ifBlock.conditions.forEach((condition: LogicalExpression) =>
      expressionsToEvaluate.push(this.evaluateExpression(condition))
    );
    const evaluatedConditions: any[] = await Promise.all(expressionsToEvaluate);
    // console.info('Evaluated Conditions:', evaluatedConditions);
  }

  public async selectBlock(selectBlock: SelectBlock): Promise<void> {}

  public async forToLoop(forToLoop: ForToLoop): Promise<void> {}

  public async repeatLoop(repeatLoop: RepeatLoop): Promise<void> {}

  public async whileLoop(whileLoop: WhileLoop): Promise<void> {
    this.evaluateExpression(whileLoop.condition).then((condition: boolean) => {
      if (condition === true) {
      } else {
        return null;
      }
    });
  }
}
