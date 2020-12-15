import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { FileOrFolder, FileType } from '@blitz-basic-script/ide';
import { LetsCodeService } from '../../services/lets-code.service';

import { Project } from '@blitz-basic-script/project';

export interface IdeSettings {
  theme: string;
  indentationSpaces: number;
  autoSave: boolean;
  syntaxHighlighting: boolean;
  autoComplete: boolean;
}

@Component({
  selector: 'blitz-basic-script-lets-code',
  templateUrl: './lets-code.component.html',
  styleUrls: ['./lets-code.component.scss'],
})
export class LetsCodeComponent implements OnInit {
  public code: string;

  public project: Project;
  public searchTerm: string;

  public path: string;
  public breadcrumbs: string[];

  public icons = {
    image: 'file-image-o',
    sound: 'file-audio-o',
    folder: 'folder-open-o',
    bbscript: 'file-text-o',
    other: 'file-o',
  };

  public filesAndFolders: FileOrFolder[];
  public showFiles: boolean;

  public playing: boolean;
  public action: 'idle' | 'play' | 'debug' | 'stop';

  public buttons: string[];

  public settingsOpen: boolean;
  public settings: IdeSettings;

  constructor(
    private letsCodeService: LetsCodeService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buttons = [
      'play',
      'debug',
      'undo',
      'redo',
      'guide',
      'codeCleanUp',
      'toggleSettings',
    ];

    this.project = {
      title: 'Snake',
      author: 'Spark Fountain',
      description: 'A simple game to eat apples and avoid stone collisions',
      license: 'CC0',
      imageUrl: '',
    };

    this.path = '';

    this.settingsOpen = false;
    this.settings = {
      theme: '',
      indentationSpaces: 4,
      autoSave: true,
      syntaxHighlighting: true,
      autoComplete: true,
    };

    this.breadcrumbs = [this.project.title];
    this.filesAndFolders = [];

    this.showFiles = true;

    this.getFiles();
  }

  createFile(): void {
    console.warn('[CREATE FILE] Not implemented yet');
  }

  openProject(): void {}

  toggleFiles(): void {
    this.showFiles = !this.showFiles;
  }

  getFiles(): void {
    this.letsCodeService
      .getFiles(this.path)
      .then((filesAndFolders: string[]) => {
        this.filesAndFolders = filesAndFolders.map((fileOrFolder: string) => {
          let type: FileType;

          if (fileOrFolder.indexOf('.') === -1) {
            // directory
            type = 'folder';
          } else {
            // file
            const fileEnding = fileOrFolder.substr(
              fileOrFolder.indexOf('.') + 1
            );
            switch (fileEnding.toLowerCase()) {
              case 'bb':
                type = 'bbscript';
                break;
              case 'mid':
              case 'mp3':
                type = 'sound';
                break;
              case 'bmp':
              case 'png':
              case 'jpg':
              case 'jpeg':
                type = 'image';
                break;
              default:
                type = 'other';
            }
          }

          return {
            type,
            name: fileOrFolder,
          } as FileOrFolder;
        });
      });
  }

  openFolder(folderIndex: number): void {
    const folder: FileOrFolder = this.filesAndFolders[folderIndex];

    this.path = `${this.path}/${folder.name}`;
    this.breadcrumbs.push(folder.name);
    this.getFiles();
  }

  openFile(fileIndex: number): void {
    // TODO: implement
    console.info('[OPENING FILE]', this.filesAndFolders[fileIndex].name);
  }

  handleContextMenu($event: MouseEvent): void {
    $event.preventDefault();
  }

  play(): void {
    this.playing = true;
    this.action = 'play';
  }

  debug(): void {
    this.playing = true;
    setTimeout(() => {
      this.action = 'debug';
      this.changeDetection.markForCheck();
    }, 0);
  }

  stop(): void {
    this.playing = false;
  }

  undo(): void {
    console.warn('[UNDO] Unfinished implementation');

    // if (this.undoRedoStack.length > 0) {
    //   const lastAction: UndoRedoAction = this.undoRedoStack.pop();
    //   // this.code.plain[lastAction.caret.begin.y] = '';
    // }
  }

  redo(): void {
    console.warn('[UNDO] Unfinished implementation');

    // if (this.undoRedoStack.length > 0) {
    //   const lastAction: UndoRedoAction = this.undoRedoStack.pop();
    //   // this.code.plain[lastAction.caret.begin.y] = '';
    // }
  }

  guide(): void {
    console.warn('[CODING GUIDE] Not implemented yet');
  }

  /**
   * Cleanup Rules:
   * - correct indentation
   * - no unnecessary spaces
   * - no unnecessary new lines
   * - surround all commands with brackets (later and only optional)
   */
  codeCleanUp(): void {
    // correct indentation
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }
}
