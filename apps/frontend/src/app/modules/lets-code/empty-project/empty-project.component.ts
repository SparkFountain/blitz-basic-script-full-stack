import { Component, OnInit } from '@angular/core';
import { Project } from '@blitz-basic-script/project';

@Component({
  selector: 'blitz-basic-script-empty-project',
  templateUrl: './empty-project.component.html',
  styleUrls: ['./empty-project.component.scss'],
})
export class EmptyProjectComponent implements OnInit {
  project: Project;
  uploadImageFile: any[];

  constructor() {}

  ngOnInit(): void {
    this.project = {
      title: '',
      author: '',
      description: '',
      license: 'CC0',
      imageUrl: '',
    };
  }

  onFileChange(event: any) {
    this.uploadImageFile = event.target.files;
    console.log('[Upload Image File]', event);
  }
}
