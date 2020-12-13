import { Injectable } from '@angular/core';
import { BbScriptHtmlView } from '../../../classes/in-game/gui/html-view';
import { BbScriptHtmlViewLoadingState } from '../../../enums/gui/html-view/loading-state';

@Injectable()
export class CommandsGuiHtmlService {
  constructor() {}

  async createHtmlView(): Promise<BbScriptHtmlView> {
    return null;
  }

  async htmlViewBack(htmlView: BbScriptHtmlView): Promise<void> {}

  async htmlViewCurrentUrl(htmlView: BbScriptHtmlView): Promise<string> {
    return '';
  }

  async htmlViewEventUrl(htmlView: BbScriptHtmlView): Promise<string> {
    return '';
  }

  async htmlViewForward(htmlView: BbScriptHtmlView): Promise<void> {}

  async htmlViewGo(htmlView: BbScriptHtmlView, url: string): Promise<void> {}

  async htmlViewRun(
    htmlView: BbScriptHtmlView,
    code: string[]
  ): Promise<void> {}

  async htmlViewStatus(
    htmlView: BbScriptHtmlView
  ): Promise<BbScriptHtmlViewLoadingState> {
    return null;
  }
}
