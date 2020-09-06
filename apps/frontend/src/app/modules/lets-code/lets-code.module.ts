import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetsCodeComponent } from './lets-code.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LetsCodeRoutingModule } from './lets-code-routing.module';
import { EmptyProjectComponent } from './empty-project/empty-project.component';
import { TemplatesComponent } from './templates/templates.component';

import { IdeModule } from '@blitz-basic-script/ide';
import {
  LexerService,
  LanguageService,
} from '@blitz-basic-script/script-language';

import { GameModule } from '@blitz-basic-script/game';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    LetsCodeRoutingModule,
    IdeModule,
    GameModule,
  ],
  declarations: [LetsCodeComponent, EmptyProjectComponent, TemplatesComponent],
  providers: [LexerService, LanguageService],
})
export class LetsCodeModule {}
