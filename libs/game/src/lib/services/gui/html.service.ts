import { Injectable } from '@angular/core';
import { HtmlView } from '../../classes/gui/html-view';
import { LoadingState } from '../../enums/gui/html-view/loading-state';

@Injectable()
export class CommandsGuiHtmlService {
  constructor() {}

  async createHtmlView(): Promise<HtmlView> {
    return null;
  }

  async htmlViewBack(htmlView: HtmlView): Promise<void> {}

  async htmlViewCurrentUrl(htmlView: HtmlView): Promise<string> {
    return '';
  }

  async htmlViewEventUrl(htmlView: HtmlView): Promise<string> {
    return '';
  }

  async htmlViewForward(htmlView: HtmlView): Promise<void> {}

  async htmlViewGo(htmlView: HtmlView, url: string): Promise<void> {}

  async htmlViewRun(htmlView: HtmlView, code: string[]): Promise<void> {}

  async htmlViewStatus(htmlView: HtmlView): Promise<LoadingState> {
    return null;
  }
}
