import { Component, OnInit } from '@angular/core';
import { Project } from '@blitz-basic-script/project';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects = [];

    this.projectService.getDemoProjects().then((projects: Project[]) => {
      for (let i = 0; i < projects.length; i++) {
        const rowIndex = Math.floor(i / 3);
        const project: Project = projects[i];

        if (this.projects.length - 1 < rowIndex) {
          this.projects.push([]);
        }

        this.projects[rowIndex].push(project);
      }
    });
  }
}
