import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';
import { FormsModule } from '@angular/forms';
import { KeywordsComponent } from './keywords/keywords.component';
import { ConstantsAndScancodesComponent } from './constants-and-scancodes/constants-and-scancodes.component';
import { DifferencesToBlitzBasicComponent } from './differences-to-blitz-basic/differences-to-blitz-basic.component';
import { CommandsComponent } from './commands/commands.component';
import { IdeModule } from '@blitz-basic-script/ide';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, DocumentationRoutingModule, FormsModule, IdeModule, TranslocoModule],
  declarations: [
    DocumentationComponent,
    KeywordsComponent,
    ConstantsAndScancodesComponent,
    DifferencesToBlitzBasicComponent,
    CommandsComponent,
  ],
})
export class DocumentationModule {}
