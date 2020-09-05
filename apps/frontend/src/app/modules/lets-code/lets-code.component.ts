import { Component, OnInit } from '@angular/core';

import { FileOrFolder, FileType } from '@blitz-basic-script/ide';
import { LetsCodeService } from '../../services/lets-code.service';

import { Project } from '@blitz-basic-script/project';

@Component({
  selector: 'blitz-basic-script-lets-code',
  templateUrl: './lets-code.component.html',
  styleUrls: ['./lets-code.component.scss'],
})
export class LetsCodeComponent implements OnInit {
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

  constructor(private letsCodeService: LetsCodeService) {}

  ngOnInit(): void {
    this.project = {
      title: 'Snake',
      author: 'Spark Fountain',
      description: 'A simple game to eat apples and avoid stone collisions',
      license: 'CC0',
      imageUrl: '',
    };

    this.path = '';

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
}
