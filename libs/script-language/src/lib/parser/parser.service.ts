import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractSyntax } from './interfaces/abstract-syntax';
import { CodeBlock } from './interfaces/code/code-block';
import { ApiCommand, ApiResponse } from '@blitz-basic-script/api-interfaces';
import { CommandStatement } from './classes/command-statement';
import { Assignment } from './classes/assignment';
import { VariableExpression } from './classes/expressions/variable-expression';
import { Noop } from './classes/noop';
import { Function, Parameter } from './classes/function';
import { Type } from './classes/type';
import { ForToNext } from './classes/loops/for-to-next';
import { RepeatUntil } from './classes/loops/repeat-until';
import { WhileWend } from './classes/loops/while-wend';
import { Field } from './classes/field';
import { ParserError } from './classes/error';
import { IfThenElse } from './interfaces/code/conditions/if-then-else';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  commands: string[]; // TODO: add parameter information
  keywords: string[]; // TODO: add additional information?

  globals: string[];
  stack: (ForToNext | WhileWend | RepeatUntil | IfThenElse)[];

  isMainLoop!: boolean;
  currentFunction!: string;
  currentType!: string;
  isSelect!: boolean;

  constructor(private http: HttpClient) {
    this.globals = [];

    this.isMainLoop = false;
    this.currentFunction = '';
    this.currentType = '';
    this.isSelect = false;

    // TODO: put ALL COMMANDS WITH THE SAME PREFIX in first place (e.g. "graphics3d" before "graphics")
    this.commands = [
      'CountGfxDrivers',
      'CountGfxModes',
      'EndGraphics',
      'GfxDriverName',
      'GfxModeDepth',
      'GfxModeExists',
      'GfxModeFormat',
      'GfxModeHeight',
      'GfxModeWidth',
      'GraphicsBuffer',
      'GraphicsDepth',
      'GraphicsFormat',
      'GraphicsHeight',
      'GraphicsLost',
      'GraphicsWidth',
      'SetGfxDriver',
      'AutoMidHandle',
      'BufferDirty',
      'CopyImage',
      'CreateImage',
      'DrawBlock',
      'DrawBlockRect',
      'DrawImage',
      'DrawImageRect',
      'FreeImage',
      'GrabImage',
      'HandleImage',
      'ImageBuffer',
      'ImageHeight',
      'ImageRectCollide',
      'ImageRectOverlap',
      'ImagesCollide',
      'ImagesOverlap',
      'ImageWidth',
      'ImageXHandle',
      'ImageYHandle',
      'LoadAnimImage',
      'LoadImage',
      'MaskImage',
      'MidHandle',
      'RectsOverlap',
      'ResizeImage',
      'RotateImage',
      'SaveImage',
      'ScaleImage',
      'TFormFilter',
      'TFormImage',
      'TileBlock',
      'TileImage',
      'GammaBlue',
      'GammaGreen',
      'GammaRed',
      'SetGamma',
      'UpdateGamma',
      'AvailVidMem',
      'BackBuffer',
      'ClsColor',
      'Cls',
      'ColorBlue',
      'ColorGreen',
      'ColorRed',
      'Color',
      'CopyRect',
      'Flip',
      'FrontBuffer',
      'Line',
      'LoadBuffer',
      'Origin',
      'Oval',
      'Rect',
      'SaveBuffer',
      'ScanLine',
      'SetBuffer',
      'TotalVidMem',
      'Viewport',
      'VWait',
      'CopyPixel',
      'CopyPixelFast',
      'GetColor',
      'LockBuffer',
      'LockedFormat',
      'LockedPitch',
      'LockedPixels',
      'Plot',
      'ReadPixel',
      'ReadPixelFast',
      'UnlockBuffer',
      'WritePixel',
      'WritePixelFast',
      'FontAscent',
      'FontDescent',
      'FontHeight',
      'FontName',
      'FontSize',
      'FontStyle',
      'FontWidth',
      'FreeFont',
      'LoadFont',
      'Locate',
      'Print',
      'SetFont',
      'StringHeight',
      'StringWidth',
      'Text',
      'Write',
      'CloseMovie',
      'DrawMovie',
      'MovieHeight',
      'MoviePlaying',
      'MovieWidth',
      'OpenMovie',
      'AddAnimSeq',
      'Animate',
      'Animating',
      'AnimLength',
      'AnimSeq',
      'AnimTime',
      'ExtractAnimSeq',
      'LoadAnimSeq',
      'SetAnimKey',
      'SetAnimTime',
      'AlignToVector',
      'MoveEntity',
      'PointEntity',
      'PositionEntity',
      'RotateEntity',
      'ScaleEntity',
      'TranslateEntity',
      'TurnEntity',
      'BrushAlpha',
      'BrushBlend',
      'BrushColor',
      'BrushFX',
      'BrushShininess',
      'BrushTexture',
      'CreateBrush',
      'FreeBrush',
      'GetBrushTexture',
      'GetEntityBrush',
      'GetSurfaceBrush',
      'LoadBrush',
      'PaintEntity',
      'PaintMesh',
      'PaintSurface',
      'BSPAmbientLight',
      'BSPLighting',
      'LoadBSP',
      'CreateMirror',
      'CreatePivot',
      'CreatePlane',
      'GetMatElement',
      'LoaderMatrix',
      'Stats3D',
      'TrisRendered',
      'VectorPitch',
      'VectorYaw',
      'AntiAlias',
      'CaptureWorld',
      'ClearWorld',
      'Dither',
      'HWMultiTex',
      'HWTexUnits',
      'RenderWorld',
      'UpdateWorld',
      'WBuffer',
      'WireFrame',
      'CameraClsColor',
      'CameraClsMode',
      'CameraFogColor',
      'CameraFogMode',
      'CameraFogRange',
      'CameraProject',
      'CameraProjMode',
      'CameraRange',
      'CameraViewport',
      'CameraZoom',
      'CreateCamera',
      'ProjectedX',
      'ProjectedY',
      'ProjectedZ',
      'ClearCollisions',
      'CollisionEntity',
      'CollisionNX',
      'CollisionNY',
      'CollisionNZ',
      'Collisions',
      'CollisionSurface',
      'CollisionTime',
      'CollisionTriangle',
      'CollisionX',
      'CollisionY',
      'CollisionZ',
      'CountCollisions',
      'EntityBox',
      'EntityCollided',
      'EntityRadius',
      'EntityType',
      'GetEntityType',
      'MeshesIntersect',
      'ResetEntity',
      'CopyEntity',
      'EntityAlpha',
      'EntityAutoFade',
      'EntityBlend',
      'EntityColor',
      'EntityFX',
      'EntityOrder',
      'EntityParent',
      'EntityShininess',
      'EntityTexture',
      'FreeEntity',
      'HideEntity',
      'ShowEntity',
      'AmbientLight',
      'CreateLight',
      'LightColor',
      'LightConeAngles',
      'LightMesh',
      'LightRange',
      'AnimateMD2',
      'LoadMD2',
      'MD2Animating',
      'MD2AnimLength',
      'MD2AnimTime',
      'AddMesh',
      'CopyMesh',
      'CreateCone',
      'CreateCube',
      'CreateCylinder',
      'CreateMesh',
      'CreateSphere',
      'FitMesh',
      'FlipMesh',
      'LoadAnimMesh',
      'LoadMesh',
      'MeshCullBox',
      'MeshDepth',
      'MeshHeight',
      'MeshWidth',
      'PositionMesh',
      'RotateMesh',
      'ScaleMesh',
      'CameraPick',
      'EntityPick',
      'EntityPickMode',
      'LinePick',
      'PickedEntity',
      'PickedNX',
      'PickedNY',
      'PickedNZ',
      'PickedSurface',
      'PickedTime',
      'PickedTriangle',
      'PickedX',
      'PickedY',
      'PickedZ',
      'CountGfxModes3D',
      'GfxDriver3D',
      'GfxDriverCaps3D',
      'GfxMode3D',
      'GfxMode3DExists',
      'Graphics3D',
      'Graphics',
      'Windowed3D',
      'CreateSprite',
      'HandleSprite',
      'LoadSprite',
      'RotateSprite',
      'ScaleSprite',
      'SpriteViewMode',
      'CountChildren',
      'DeltaPitch',
      'DeltaYaw',
      'EntityClass',
      'EntityDistance',
      'EntityInView',
      'EntityName',
      'EntityPitch',
      'EntityRoll',
      'EntityVisible',
      'EntityX',
      'EntityY',
      'EntityYaw',
      'EntityZ',
      'FindChild',
      'GetChild',
      'GetParent',
      'NameEntity',
      'AddTriangle',
      'AddVertex',
      'ClearSurface',
      'CountSurfaces',
      'CountTriangles',
      'CountVertices',
      'CreateSurface',
      'FindSurface',
      'GetSurface',
      'TriangleVertex',
      'UpdateNormals',
      'VertexAlpha',
      'VertexBlue',
      'VertexColor',
      'VertexCoords',
      'VertexGreen',
      'VertexNormal',
      'VertexNX',
      'VertexNY',
      'VertexNZ',
      'VertexRed',
      'VertexTexCoords',
      'VertexU',
      'VertexV',
      'VertexW',
      'VertexX',
      'VertexY',
      'VertexZ',
      'CreateTerrain',
      'LoadTerrain',
      'ModifyTerrain',
      'TerrainDetail',
      'TerrainHeight',
      'TerrainShading',
      'TerrainSize',
      'TerrainX',
      'TerrainY',
      'TerrainZ',
      'ActiveTextures',
      'ClearTextureFilters',
      'CreateTexture',
      'FreeTexture',
      'LoadAnimTexture',
      'LoadTexture',
      'PositionTexture',
      'RotateTexture',
      'ScaleTexture',
      'SetCubeFace',
      'SetCubeMode',
      'TextureBlend',
      'TextureBuffer',
      'TextureCoords',
      'TextureFilter',
      'TextureHeight',
      'TextureName',
      'TextureWidth',
      'TFormedX',
      'TFormedY',
      'TFormedZ',
      'TFormNormal',
      'TFormPoint',
      'TFormVector',
      'ChangeDir',
      'CloseDir',
      'CloseFile',
      'CopyFile',
      'CreateDir',
      'CurrentDir',
      'DeleteDir',
      'DeleteFile',
      'Eof',
      'ExecFile',
      'FilePos',
      'FileSize',
      'FileType',
      'MoreFiles',
      'NextFile',
      'OpenFile',
      'ReadAvail',
      'ReadByte',
      'ReadDir',
      'ReadFile',
      'ReadFloat',
      'ReadInt',
      'ReadLine',
      'ReadShort',
      'ReadString',
      'SeekFile',
      'WriteByte',
      'WriteFile',
      'WriteFloat',
      'WriteInt',
      'WriteLine',
      'WriteShort',
      'WriteString',
      'GetJoy',
      'FlushJoy',
      'BankSize',
      'CopyBank',
      'CreateBank',
      'FreeBank',
      'PeekByte',
      'PeekFloat',
      'PeekInt',
      'PeekShort',
      'PokeByte',
      'PokeFloat',
      'PokeInt',
      'PokeShort',
      'ReadBytes',
      'ResizeBank',
      'WriteBytes',
      'JoyDown',
      'JoyHat',
      'JoyHit',
      'JoyPitch',
      'JoyRoll',
      'JoyType',
      'JoyU',
      'JoyUDir',
      'JoyV',
      'JoyVDir',
      'JoyWait',
      'JoyX',
      'JoyXDir',
      'JoyY',
      'JoyYaw',
      'JoyYDir',
      'JoyZ',
      'JoyZDir',
      'WaitJoy',
      'FlushMouse',
      'GetMouse',
      'HidePointer',
      'MouseDown',
      'MouseHit',
      'MouseWait',
      'MouseX',
      'MouseXSpeed',
      'MouseY',
      'MouseYSpeed',
      'MouseZ',
      'MouseZSpeed',
      'MoveMouse',
      'ShowPointer',
      'WaitMouse',
      'FlushKeys',
      'GetKey',
      'Input',
      'KeyDown',
      'KeyHit',
      'KeyWait',
      'WaitKey',
      'Abs',
      'ACos',
      'ASin',
      'ATan',
      'ATan2',
      'Bin',
      'Ceil',
      'Cos',
      'Exp',
      'Float',
      'Floor',
      'Hex',
      'Int',
      'Log',
      'Log10',
      'Sgn',
      'Sin',
      'Sqr',
      'Tan',
      'AppTitle',
      'CommandLine',
      'DebugLog',
      'GetEnv',
      'RuntimeError',
      'RuntimeStats',
      'SetEnv',
      'SystemProperty',
      'Asc',
      'Chr',
      'Instr',
      'Left',
      'Len',
      'Lower',
      'LSet',
      'Mid',
      'Replace',
      'Right',
      'RSet',
      'Str',
      'String',
      'Trim',
      'Upper',
      'CreateTimer',
      'CurrentDate',
      'CurrentTime',
      'Delay',
      'FreeTimer',
      'MilliSecs',
      'PauseTimer',
      'Rand',
      'ResetTimer',
      'ResumeTimer',
      'Rnd',
      'RndSeed',
      'SeedRnd',
      'TimerTicks',
      'WaitTimer',
      'ButtonState',
      'CreateButton',
      'SetButtonState',
      'CanvasBuffer',
      'CreateCanvas',
      'FlipCanvas',
      'Desktop',
      'DesktopBuffer',
      'ActiveObjects',
      'AutoSuspend',
      'CreateProcess',
      'DebugObjects',
      'EventData',
      'EventID',
      'EventSource',
      'EventX',
      'EventY',
      'EventZ',
      'FlushEvents',
      'HotKeyEvent',
      'PeekEvent',
      'WaitEvent',
      'ActivateGadget',
      'ClientHeight',
      'ClientWidth',
      'DisableGadget',
      'EnableGadget',
      'FreeGadget',
      'GadgetFont',
      'GadgetGroup',
      'GadgetHeight',
      'GadgetText',
      'GadgetWidth',
      'GadgetX',
      'GadgetY',
      'HideGadget',
      'QueryObject',
      'SetGadgetFont',
      'SetGadgetLayout',
      'SetGadgetShape',
      'SetGadgetText',
      'ShowGadget',
      'CreateHtmlView',
      'HtmlViewBack',
      'HtmlViewCurrentURL',
      'HtmlViewEventURL',
      'HtmlViewForward',
      'HtmlViewGo',
      'HtmlViewRun',
      'HtmlViewStatus',
      'FreeIconStrip',
      'LoadIconStrip',
      'SetGadgetIconStrip',
      'AddGadgetItem',
      'ClearGadgetItems',
      'CountGadgetItems',
      'CreateComboBox',
      'CreateListBox',
      'CreateTabber',
      'GadgetItemText',
      'InsertGadgetItem',
      'ModifyGadgetItem',
      'RemoveGadgetItem',
      'SelectedGadgetItem',
      'SelectGadgetItem',
      'CheckMenu',
      'CreateMenu',
      'DisableMenu',
      'EnableMenu',
      'MenuChecked',
      'MenuEnabled',
      'MenuText',
      'SetMenuText',
      'UncheckMenu',
      'UpdateWindowMenu',
      'WindowMenu',
      'CreatePanel',
      'SetPanelColor',
      'SetPanelImage',
      'CreateProgBar',
      'UpdateProgBar',
      'Confirm',
      'Notify',
      'Proceed',
      'RequestColor',
      'RequestDir',
      'RequestedBlue',
      'RequestedGreen',
      'RequestedRed',
      'RequestFile',
      'RequestFont',
      'CreateSlider',
      'SetSliderRange',
      'SetSliderValue',
      'SliderValue',
      'AddTextAreaText',
      'CreateTextArea',
      'FormatTextAreaText',
      'LockTextArea',
      'SetTextAreaColor',
      'SetTextAreaFont',
      'SetTextAreaTabs',
      'SetTextAreaText',
      'TextAreaChar',
      'TextAreaCursor',
      'TextAreaLen',
      'TextAreaLine',
      'TextAreaLineLen',
      'TextAreaSelLen',
      'TextAreaText',
      'UnlockTextArea',
      'CreateLabel',
      'CreateTextField',
      'TextFieldText',
      'CreateToolBar',
      'DisableToolBarItem',
      'EnableToolBarItem',
      'SetToolBarTips',
      'AddTreeViewNode',
      'CollapseTreeViewNode',
      'CountTreeViewNodes',
      'CreateTreeView',
      'ExpandTreeViewNode',
      'FreeTreeViewNode',
      'InsertTreeViewNode',
      'ModifyTreeViewNode',
      'SelectedTreeViewNode',
      'SelectTreeViewNode',
      'TreeViewNodeText',
      'TreeViewRoot',
      'ActivateWindow',
      'ActiveWindow',
      'CreateWindow',
      'MaximizeWindow',
      'MinimizeWindow',
      'RestoreWindow',
      'SetMinWindowSize',
      'SetStatusText',
      'WindowMaximized',
      'WindowMinimized',
      'CopyStream',
      'CountHostIPs',
      'DottedIP',
      'HostIP',
      'CreateNetPlayer',
      'DeleteNetPlayer',
      'HostNetGame',
      'JoinNetGame',
      'NetMsgData',
      'NetMsgFrom',
      'NetMsgTo',
      'NetMsgType',
      'NetPlayerLocal',
      'NetPlayerName',
      'RecvNetMsg',
      'SendNetMsg',
      'StartNetGame',
      'StopNetGame',
      'AcceptTCPStream',
      'CloseTCPServer',
      'CloseTCPStream',
      'CreateTCPServer',
      'OpenTCPStream',
      'TCPStreamIP',
      'TCPStreamPort',
      'TCPTimeouts',
      'CloseUDPStream',
      'CreateUDPStream',
      'RecvUDPMsg',
      'SendUDPMsg',
      'UDPMsgIP',
      'UDPMsgPort',
      'UDPStreamIP',
      'UDPStreamPort',
      'UDPTimeouts',
      'CreateListener',
      'EmitSound',
      'Load3DSound',
      'ChannelPan',
      'ChannelPitch',
      'ChannelPlaying',
      'ChannelVolume',
      'PauseChannel',
      'ResumeChannel',
      'StopChannel',
      'PlayCDTrack',
      'PlayMusic',
      'FreeSound',
      'LoadSound',
      'LoopSound',
      'PlaySound',
      'SoundPan',
      'SoundPitch',
      'SoundVolume',
    ];

    this.keywords = [
      'Case',
      'Default',
      'Else',
      'ElseIf',
      'EndIf',
      'If',
      'Select',
      'Then',
      'After',
      'Before',
      'Delete',
      'First',
      'Insert',
      'Last',
      'New',
      'Null',
      'Object',
      'Type',
      'Field',
      'End',
      'Include',
      'Stop',
      'Data',
      'Dim',
      'Global',
      'Local',
      'Each',
      'Const',
      'MainLoop',
      'Return',
      'Exit',
      'For',
      'Forever',
      'Next',
      'Repeat',
      'Step',
      'To',
      'Until',
      'Wend',
      'While',
      'Mod',
      'Not',
      'And',
      'Or',
      'Xor',
      'Function',
      'False',
      'True',
      'Restore',
      'Read',
      'Handle',
      'Pi',
      'Sar',
      'Shl',
      'Shr',
    ];
  }

  async createAbstractSyntax(code: string[]): Promise<AbstractSyntax> {
    this.globals = [];

    console.info('[CREATE ABSTRACT SYNTAX]');

    let result: AbstractSyntax = {
      codeBlocks: [],
      mainLoop: [],
      functions: [],
      types: [],
    };

    // PREPROCESS CODE:
    // remove unnecessary space characters; ignore comments and empty code lines
    let codeFormatted: string[] = [];
    code.forEach((line: string) => {
      line = line.trim();
      if (line.length > 0 && !line.startsWith(';')) {
        codeFormatted.push(line.replace(/\s\s+/g, ' '));
      }
    });

    // PARSE ALL LINES SEQUENTIALLY
    for (const line of codeFormatted) {
      const parserResult:
        | CodeBlock
        | Assignment
        | Function = await this.parseLine(line);
      console.info('[PARSER RESULT]', parserResult);

      switch (parserResult.constructor.name) {
        case 'CodeBlock':
        case 'CommandStatement':
        case 'Assignment':
        case 'ForToNext':
          if (this.isMainLoop) {
            result.mainLoop.push(parserResult);
          } else {
            result.codeBlocks.push(parserResult);
          }
          break;
        case 'Function':
          result.functions.push(parserResult as Function);
        case 'Noop':
          // do nothing and neither show a warning
          break;
        default:
          console.warn(
            "Parser doesn't know what to do with that:",
            parserResult
          );
      }
    }

    return result;
  }

  // TODO: add more return types
  async parseLine(line: string): Promise<CodeBlock | Assignment | Function> {
    const regex = {
      dim: new RegExp('^dim\\s(.+)$', 'i'),
      global: new RegExp('^global\\s(.+)$', 'i'),
      local: new RegExp('^local\\s(.+)$', 'i'),
      const: new RegExp('^const\\s(.+)$', 'i'),
      assignment: new RegExp('^w+\\s?=\\s?.+$', 'i'),
      command: new RegExp(
        `^(${this.commands
          .map((command) => command.toLowerCase())
          .join('|')})(.*)$`,
        'i'
      ),
      function: new RegExp('^function\\s(w+)((.*))$', 'i'),
      return: new RegExp('^return\\s?(w+)', 'i'),
      type: new RegExp('^type\\s(w+)$', 'i'),
      field: new RegExp('^field\\s(w+)$', 'i'),
      if: new RegExp('^if\\s(.+)$', 'i'),
      elseif: new RegExp('^elseif\\s$', 'i'),
      else: new RegExp('^else$', 'i'),
      endif: new RegExp('^endif$', 'i'),
      select: new RegExp('^select\\s(w+)$', 'i'),
      case: new RegExp('^case\\s(w+)$', 'i'),
      default: new RegExp('^default$', 'i'),
      forTo: new RegExp(
        '^for\\s(w+)\\s*=\\s*(w+)\\sto\\s(w+)(\\sstep\\s(w+))?$',
        'i'
      ),
      forEach: new RegExp('^for\\s(w+)\\s*=\\s*each\\s(w+)$', 'i'),
      next: new RegExp('^next$', 'i'),
      while: new RegExp('^while(w+)$', 'i'),
      wend: new RegExp('^wend$', 'i'),
      repeat: new RegExp('^repeat$', 'i'),
      until: new RegExp('^until(w+)$', 'i'),
      forever: new RegExp('^forever$', 'i'),
      mainLoop: new RegExp('^mainloop$', 'i'),
      label: new RegExp('^.w+$', 'i'),
      delete: new RegExp('^delete\\s(w+)$', 'i'),
      insert: new RegExp('^insert\\s(w+)$', 'i'),
      end: new RegExp('^end$', 'i'),
      include: new RegExp('^include$', 'i'),
      stop: new RegExp('^stop$', 'i'),
      data: new RegExp('^data$', 'i'),
      exit: new RegExp('^exit$', 'i'),
      restore: new RegExp('^restore\\s(w+)$', 'i'),
      read: new RegExp('^read\\s(w+)', 'i'),
    };
    let match: RegExpMatchArray;

    // dim (array)
    match = line.match(regex.dim);
    if (match) {
      const arrayName: string = match[1];
      return new Assignment('dim', arrayName, null);
    }

    // global
    match = line.match(regex.global);
    if (match) {
      // TODO: initial assignment value; support multiple assignments in one line
      const delimiterIndex: number = match[1].indexOf('=');
      const globalName: string = match[1].substr(0, delimiterIndex - 1).trim();
      const globalValue: any = match[1].substr(delimiterIndex + 1).trim();

      this.globals.push(globalName);
      return new Assignment('global', globalName, globalValue);
    }

    // local
    match = line.match(regex.local);
    if (match) {
      // TODO: initial assignment value; support multiple assignments in one line
      const localName: string = match[1];
      return new Assignment('local', localName, null);
    }

    // const
    match = line.match(regex.const);
    if (match) {
      // TODO: initial assignment value; support multiple assignments in one line
      const constName: string = match[1];
      return new Assignment('const', constName, null);
    }

    // function
    match = line.match(regex.function);
    if (match) {
      let functionName: string = match[1];
      let fullParams = match[2].split(',');
      let formattedParams: Parameter[] = [];
      fullParams.forEach((fullParam: string) => {
        let paramSplit = fullParam.split('=');

        let param: Parameter = {
          name: paramSplit[0].trim(),
          defaultValue:
            paramSplit.length > 1 ? paramSplit[1].trim() : undefined,
        };
        formattedParams.push(param);
      });

      this.currentFunction = functionName;
      return new Function(functionName, formattedParams, []);
    }

    // return
    match = line.match(regex.return);
    if (match) {
      let returnValue: string;
      if (match[1]) {
        returnValue = match[1];
      } else {
        returnValue = null;
      }

      return null; // TODO: introduce return statement
    }

    // type
    match = line.match(regex.type);
    if (match) {
      const typeName: string = match[1];

      this.currentType = typeName;
      return new Type(typeName, []);
    }

    // field
    match = line.match(regex.field);
    if (match) {
      if (this.currentType === '') {
        return new ParserError('Field declaration without Type', -1, -1); // TODO: line and offset
      }

      const fieldName: string = match[1];
      return new Field(fieldName);
    }

    // if block / statement
    match = line.match(regex.if);
    if (match) {
      console.info('[IF BLOCK / STATEMENT FOUND]', line);
      return null;
    }

    // else if
    match = line.match(regex.elseif);
    if (match) {
      console.info('[ELSEIF FOUND]', line);
      return null;
    }

    // else
    match = line.match(regex.else);
    if (match) {
      console.info('[ELSE FOUND]', line);
      return null;
    }

    // endif
    match = line.match(regex.endif);
    if (match) {
      console.info('[ENDIF FOUND]', line);
      return null;
    }

    // select
    match = line.match(regex.select);
    if (match) {
      console.info('[SELECT FOUND]', line);

      this.isSelect = true;
      return null;
    }

    // case
    match = line.match(regex.case);
    if (match) {
      if (!this.isSelect) {
        return new ParserError('Case without Select', -1, -1); // TODO: line and offset
      }

      console.info('[CASE FOUND]', line);
      return null;
    }

    // default
    match = line.match(regex.default);
    if (match) {
      if (!this.isSelect) {
        return new ParserError('Default without Select', -1, -1); // TODO: line and offset
      }

      console.info('[DEFAULT FOUND]', line);
      return null;
    }

    // main loop
    if (line.toLowerCase() === 'mainloop') {
      this.isMainLoop = true;
      return new Noop();
    }

    // end of main loop
    const allTerms: string[] = line.split(/\s+/);
    if (
      allTerms[0].toLowerCase() === 'end' &&
      allTerms[1].toLowerCase() === 'mainloop'
    ) {
      this.isMainLoop = false;
      return new Noop();
    }

    // for to next loop
    match = line.match(regex.forTo);
    if (match) {
      console.info('[FOR TO LOOP FOUND]', match);

      const loopVariable: string = match[1];
      const initialValue: number = Number(match[2]);
      const limitValue: number = Number(match[3]);
      let stepValue: number;
      if (match.hasOwnProperty('5')) {
        stepValue = Number(match[5]);
      } else {
        stepValue = 1;
      }

      return new ForToNext(
        new Assignment('local', loopVariable, initialValue),
        limitValue,
        stepValue,
        []
      );
    }

    // for each loop
    match = line.match(regex.forEach);
    if (match) {
      console.info('[FOR TO LOOP FOUND]', match);

      const loopVariable: string = match[1];
      const loopVarType: string = match[2];

      return new Noop(); // TODO: implement
    }

    // next
    match = line.match(regex.next);
    if (match) {
      // TODO: implement stack for loops

      console.info('[NEXT FOUND]', match);
      return new Noop(); // TODO: implement
    }

    // while wend loop
    match = line.match(regex.while);
    if (match) {
      console.info('[WHILE LOOP FOUND]', match);
      return new WhileWend(null, []);
    }

    // repeat loop
    match = line.match(regex.repeat);
    if (match) {
      console.info('[REPEAT LOOP FOUND]', match);
      return new RepeatUntil(null, []);
    }

    // label
    if (line.match(regex.label)) {
      console.info('[LABEL FOUND]', line);
      return null;
    }

    // command
    if (line.match(regex.command)) {
      const match = line.match(regex.command);
      // console.info('[LINE MATCH]', match);

      const command: string = match[1];
      // console.info('[COMMAND FOUND]', command);

      // parse parameters
      const params: string[] = match[2].split(',');
      // console.info('[PARAMS]', params);

      // generate code block entry in abstract syntax
      return new CommandStatement(command, [
        ...params.map((param) => {
          param = param.trim();

          if (this.globals.indexOf(param.toLowerCase()) > -1) {
            return new VariableExpression('global', param.toLowerCase());
          } else {
            return param;
          }
        }),
      ]);
    }

    // assignment
    if (line.match(regex.assignment)) {
      console.info('[ASSIGNMENT FOUND]', line);

      // global variable
      if (new RegExp('^global', 'i').test(line)) {
        const params: string[] = line
          .substr(7)
          .split(/\s|=/)
          .filter((e) => e !== '');
        // console.info('[GLOBAL ASSIGNMENT PARAMETERS]', params);

        params[0] = params[0].toLowerCase();
        this.globals.push(params[0]);
        return new Assignment('global', params[0], params[1]);
      }
    }

    // invalid code line
    return `Invalid code line: ${line}`;
  }
}
