import { Component, OnInit } from '@angular/core';
import { Template } from '@blitz-basic-script/coding';
import { LetsCodeService } from '../../../services/lets-code.service';

@Component({
  selector: 'blitz-basic-script-empty-project',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templates: Template[];

  constructor(private letsCodeService: LetsCodeService) {}

  ngOnInit(): void {
    this.letsCodeService.getTemplates().then((templates: Template[]) => {
      this.templates = templates;
      console.info('[TEMPLATES]', this.templates);
    });
  }
}
