import { Component, OnInit, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { DocumentationService } from '../../../services/documentation.service';

export interface CommandCategoryDoc {
  headline: string;
  description: string;
}

export interface CommandDoc {
  name: string;
  params: CommandParamDoc[];
  description: string;
  return: {
    name: string;
    description: string;
  };
  infos: string;
  code: string;
}

export interface CommandParamDoc {
  name: string;
  description: string;
  optional: boolean;
}

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  @Input() category: string;
  @Input() subCategory: string;
  @Input() command: string;

  headline: string;
  description: string;
  infos: string;
  codeExample: string;
  activeTab: 'description' | 'infos' | 'codeExample';

  constructor(
    private translocoService: TranslocoService,
    private docsService: DocumentationService
  ) {}

  ngOnInit(): void {
    this.activeTab = 'description';
    this.description = '';
    this.infos = '';
    this.codeExample = '';

    if (!this.category) {
      this.headline = this.translocoService.translate('DOC.COMMANDS.HEADLINE');
      this.description = this.translocoService.translate(
        'DOC.COMMANDS.SUBTITLE'
      );
    } else if (this.category && !this.subCategory) {
      this.docsService
        .get('commands', {
          category: this.category,
          language: this.translocoService.getActiveLang(),
        })
        .then((data: CommandCategoryDoc) => {
          this.headline = data.headline;
          this.description = data.description;
        });
    } else if (this.category && this.subCategory && !this.command) {
      this.docsService
        .get('commands', {
          category: this.category,
          subCategory: this.subCategory,
          language: this.translocoService.getActiveLang(),
        })
        .then((data: CommandCategoryDoc) => {
          this.headline = data.headline;
          this.description = data.description;
        });
    } else {
      this.docsService
        .get('commands', {
          category: this.category,
          subCategory: this.subCategory,
          command: this.command,
          language: this.translocoService.getActiveLang(),
        })
        .then((data: CommandDoc) => {
          // console.info('[DATA]', data);

          let renderedParams = '';
          data.params.forEach((param: CommandParamDoc, index: number) => {
            if (index === 0) {
              if (param.optional) {
                renderedParams += `[${param.name}]`;
              } else {
                renderedParams += `${param.name}`;
              }
            } else {
              if (param.optional) {
                renderedParams += ` [, ${param.name}]`;
              } else {
                renderedParams += `, ${param.name}`;
              }
            }
          });

          this.headline = `<span><b>${data.name}</b> ${renderedParams}</span>`;
          this.description = data.description;
          this.infos = data.infos;
          this.codeExample = data.code;
        });
    }
  }

  select(tab: 'description' | 'infos' | 'codeExample') {
    this.activeTab = tab;
  }
}
