import { Injectable } from '@angular/core';
import { BbScriptHtmlView } from '../../classes/in-game/gui/html-view';
import { ButtonComponent } from '../../components/button/button.component';
import { BlitzBasicScriptCanvasComponent } from '../../components/canvas/canvas.component';
import { GuiButtonStyle } from '../../enums/gui/buttons/button-style';
import { BbScriptHtmlViewLoadingState } from '../../enums/gui/html-view/loading-state';
import { Desktop } from '../../interfaces/gui/desktop';
import { CommandsGuiButtonService } from './gui/button.service';
import { CommandsGuiCanvasService } from './gui/canvas.service';
import { CommandsGuiDesktopService } from './gui/desktop.service';
import { CommandsGuiDiverseService } from './gui/diverse.service';
import { CommandsGuiEventService } from './gui/event.service';
import { CommandsGuiGadgetService } from './gui/gadget.service';
import { CommandsGuiHtmlService } from './gui/html.service';
import { CommandsGuiIconStripService } from './gui/icon-strip.service';
import { CommandsGuiListTabberService } from './gui/list-tabber.service';
import { CommandsGuiMenuService } from './gui/menu.service';
import { CommandsGuiPanelService } from './gui/panel.service';
import { CommandsGuiProgressBarService } from './gui/progress-bar.service';
import { CommandsGuiRequestService } from './gui/request.service';
import { CommandsGuiSliderService } from './gui/slider.service';
import { CommandsGuiTextAreaService } from './gui/text-area.service';
import { CommandsGuiTextFieldService } from './gui/text-field.service';
import { CommandsGuiToolbarService } from './gui/toolbar.service';
import { CommandsGuiTreeViewService } from './gui/tree-view.service';
import { CommandsGuiWindowService } from './gui/window.service';

@Injectable()
export class CommandsGUIService {
  constructor(
    private buttonService: CommandsGuiButtonService,
    private canvasService: CommandsGuiCanvasService,
    private desktopService: CommandsGuiDesktopService,
    private diverseService: CommandsGuiDiverseService,
    private eventService: CommandsGuiEventService,
    private gadgetService: CommandsGuiGadgetService,
    private htmlService: CommandsGuiHtmlService,
    private iconStripService: CommandsGuiIconStripService,
    private listTabberService: CommandsGuiListTabberService,
    private menuService: CommandsGuiMenuService,
    private panelService: CommandsGuiPanelService,
    private progressBarService: CommandsGuiProgressBarService,
    private requestService: CommandsGuiRequestService,
    private sliderService: CommandsGuiSliderService,
    private textAreaService: CommandsGuiTextAreaService,
    private textFieldService: CommandsGuiTextFieldService,
    private toolbarService: CommandsGuiToolbarService,
    private treeViewService: CommandsGuiTreeViewService,
    private windowService: CommandsGuiWindowService
  ) {}

  // BUTTON
  async buttonState(button: ButtonComponent): Promise<boolean> {
    return this.buttonService.buttonState(button);
  }

  async createButton(
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    group: any,
    style?: GuiButtonStyle
  ): Promise<ButtonComponent> {
    return this.buttonService.createButton(
      text,
      x,
      y,
      width,
      height,
      group,
      style
    );
  }

  async setButtonState(
    button: ButtonComponent,
    active: boolean
  ): Promise<void> {
    return this.buttonService.setButtonState(button, active);
  }

  // CANVAS
  async createCanvas(
    x: number,
    y: number,
    width: number,
    height: number,
    group: any,
    style?: any
  ): Promise<BlitzBasicScriptCanvasComponent> {
    return this.canvasService.createCanvas(x, y, width, height, group, style);
  }

  async flipCanvas(canvas: BlitzBasicScriptCanvasComponent, flip: boolean) {
    return this.canvasService.flipCanvas(canvas, flip);
  }

  // DESKTOP
  async desktop(): Promise<Desktop> {
    return this.desktopService.desktop();
  }

  // DIVERSE
  async activeObjects(): Promise<any> {
    return this.diverseService.activeObjects();
  }

  async autoSuspend(): Promise<any> {
    return this.diverseService.autoSuspend();
  }

  async createProcess(): Promise<any> {
    return this.diverseService.createProcess();
  }

  async debugObjects(): Promise<any> {
    return this.diverseService.debugObjects();
  }

  // EVENT
  async eventData(): Promise<any> {
    return this.eventService.eventData();
  }

  async eventId(): Promise<any> {
    return this.eventService.eventId();
  }

  async eventSource(): Promise<any> {
    return this.eventService.eventSource();
  }

  async eventX(): Promise<any> {
    return this.eventService.eventX();
  }

  async eventY(): Promise<any> {
    return this.eventService.eventY();
  }

  async eventZ(): Promise<any> {
    return this.eventService.eventZ();
  }

  async flushEvents(): Promise<any> {
    return this.eventService.flushEvents();
  }

  async hotKeyEvent(): Promise<any> {
    return this.eventService.hotKeyEvent();
  }

  async peekEvent(): Promise<any> {
    return this.eventService.peekEvent();
  }

  async waitEvent(): Promise<any> {
    return this.eventService.waitEvent();
  }

  // GADGET
  async activateGadget(): Promise<any> {
    return this.gadgetService.activateGadget();
  }

  async clientHeight(): Promise<any> {
    return this.gadgetService.clientHeight();
  }

  async clientWidth(): Promise<any> {
    return this.gadgetService.clientWidth();
  }

  async disableGadget(): Promise<any> {
    return this.gadgetService.disableGadget();
  }

  async enableGadget(): Promise<any> {
    return this.gadgetService.enableGadget();
  }

  async freeGadget(): Promise<any> {
    return this.gadgetService.freeGadget();
  }

  async gadgetFont(): Promise<any> {
    return this.gadgetService.gadgetFont();
  }

  async gadgetGroup(): Promise<any> {
    return this.gadgetService.gadgetGroup();
  }

  async gadgetHeight(): Promise<any> {
    return this.gadgetService.gadgetHeight();
  }

  async gadgetText(): Promise<any> {
    return this.gadgetService.gadgetText();
  }

  async gadgetWidth(): Promise<any> {
    return this.gadgetService.gadgetWidth();
  }

  async gadgetX(): Promise<any> {
    return this.gadgetService.gadgetX();
  }

  async gadgetY(): Promise<any> {
    return this.gadgetService.gadgetY();
  }

  async hideGadget(): Promise<any> {
    return this.gadgetService.hideGadget();
  }

  async queryObject(): Promise<any> {
    return this.gadgetService.queryObject();
  }

  async setGadgetFont(): Promise<any> {
    return this.gadgetService.setGadgetFont();
  }

  async setGadgetLayout(): Promise<any> {
    return this.gadgetService.setGadgetLayout();
  }

  async setGadgetShape(): Promise<any> {
    return this.gadgetService.setGadgetShape();
  }

  async setGadgetText(): Promise<any> {
    return this.gadgetService.setGadgetText();
  }

  async showGadget(): Promise<any> {
    return this.gadgetService.showGadget();
  }

  // HTML
  async createHtmlView(): Promise<any> {
    return this.htmlService.createHtmlView();
  }

  async htmlViewBack(htmlView: BbScriptHtmlView): Promise<void> {
    return this.htmlService.htmlViewBack(htmlView);
  }

  async htmlViewCurrentUrl(htmlView: BbScriptHtmlView): Promise<string> {
    return this.htmlService.htmlViewCurrentUrl(htmlView);
  }

  async htmlViewEventUrl(htmlView: BbScriptHtmlView): Promise<string> {
    return this.htmlService.htmlViewEventUrl(htmlView);
  }

  async htmlViewForward(htmlView: BbScriptHtmlView): Promise<void> {
    return this.htmlService.htmlViewForward(htmlView);
  }

  async htmlViewGo(htmlView: BbScriptHtmlView, url: string): Promise<void> {
    return this.htmlService.htmlViewGo(htmlView, url);
  }

  async htmlViewRun(htmlView: BbScriptHtmlView, code: string[]): Promise<void> {
    return this.htmlService.htmlViewRun(htmlView, code);
  }

  async htmlViewStatus(
    htmlView: BbScriptHtmlView
  ): Promise<BbScriptHtmlViewLoadingState> {
    return this.htmlService.htmlViewStatus(htmlView);
  }

  // ICON STRIP
  async freeIconStrip(): Promise<any> {
    return this.iconStripService.freeIconStrip();
  }

  async loadIconStrip(): Promise<any> {
    return this.iconStripService.loadIconStrip();
  }

  async setGadgetIconStrip(): Promise<any> {
    return this.iconStripService.setGadgetIconStrip();
  }

  // LIST TABBER
  async addGadgetItem(): Promise<any> {
    return this.listTabberService.addGadgetItem();
  }

  async clearGadgetItems(): Promise<any> {
    return this.listTabberService.clearGadgetItems();
  }

  async countGadgetItems(): Promise<any> {
    return this.listTabberService.countGadgetItems();
  }

  async createComboBox(): Promise<any> {
    return this.listTabberService.createComboBox();
  }

  async createListBox(): Promise<any> {
    return this.listTabberService.createListBox();
  }

  async createTabber(): Promise<any> {
    return this.listTabberService.createTabber();
  }

  async gadgetItemText(): Promise<any> {
    return this.listTabberService.gadgetItemText();
  }

  async insertGadgetItem(): Promise<any> {
    return this.listTabberService.insertGadgetItem();
  }

  async modifyGadgetItem(): Promise<any> {
    return this.listTabberService.modifyGadgetItem();
  }

  async removeGadgetItem(): Promise<any> {
    return this.listTabberService.removeGadgetItem();
  }

  async selectedGadgetItem(): Promise<any> {
    return this.listTabberService.selectedGadgetItem();
  }

  async selectGadgetItem(): Promise<any> {
    return this.listTabberService.selectGadgetItem();
  }

  // MENU
  async checkMenu(): Promise<any> {
    return this.menuService.checkMenu();
  }

  async createMenu(): Promise<any> {
    return this.menuService.createMenu();
  }

  async disableMenu(): Promise<any> {
    return this.menuService.disableMenu();
  }

  async enableMenu(): Promise<any> {
    return this.menuService.enableMenu();
  }

  async menuChecked(): Promise<any> {
    return this.menuService.menuChecked();
  }

  async menuEnabled(): Promise<any> {
    return this.menuService.menuEnabled();
  }

  async menuText(): Promise<any> {
    return this.menuService.menuText();
  }

  async setMenuText(): Promise<any> {
    return this.menuService.setMenuText();
  }

  async uncheckMenu(): Promise<any> {
    return this.menuService.uncheckMenu();
  }

  async updateWindowMenu(): Promise<any> {
    return this.menuService.updateWindowMenu();
  }

  async windowMenu(): Promise<any> {
    return this.menuService.windowMenu();
  }

  // PANEL
  async createPanel(): Promise<any> {
    return this.panelService.createPanel();
  }

  async setPanelColor(): Promise<any> {
    return this.panelService.setPanelColor();
  }

  async setPanelImage(): Promise<any> {
    return this.panelService.setPanelImage();
  }

  // PROGRESS BAR
  async createProgBar(): Promise<any> {
    return this.progressBarService.createProgBar();
  }

  async updateProgBar(): Promise<any> {
    return this.progressBarService.updateProgBar();
  }

  // REQUEST SERVICE
  async confirm(): Promise<any> {
    return this.requestService.confirm();
  }

  async notify(): Promise<any> {
    return this.requestService.notify();
  }

  async proceed(): Promise<any> {
    return this.requestService.proceed();
  }

  async requestColor(): Promise<any> {
    return this.requestService.requestColor();
  }

  async requestDir(): Promise<any> {
    return this.requestService.requestDir();
  }

  async requestedBlue(): Promise<any> {
    return this.requestService.requestedBlue();
  }

  async requestedGreen(): Promise<any> {
    return this.requestService.requestedGreen();
  }

  async requestedRed(): Promise<any> {
    return this.requestService.requestedRed();
  }

  async requestFile(): Promise<any> {
    return this.requestService.requestFile();
  }

  async requestFont(): Promise<any> {
    return this.requestService.requestFont();
  }

  // SLIDER
  async createSlider(): Promise<any> {
    return this.sliderService.createSlider();
  }

  async setSliderRange(): Promise<any> {
    return this.sliderService.setSliderRange();
  }

  async setSliderValue(): Promise<any> {
    return this.sliderService.setSliderValue();
  }

  async sliderValue(): Promise<any> {
    return this.sliderService.sliderValue();
  }

  // TEXT AREA
  async addTextAreaText(): Promise<any> {
    return this.textAreaService.addTextAreaText();
  }

  async createTextArea(): Promise<any> {
    return this.textAreaService.createTextArea();
  }

  async formatTextAreaText(): Promise<any> {
    return this.textAreaService.formatTextAreaText();
  }

  async lockTextArea(): Promise<any> {
    return this.textAreaService.lockTextArea();
  }

  async setTextAreaColor(): Promise<any> {
    return this.textAreaService.setTextAreaColor();
  }

  async setTextAreaFont(): Promise<any> {
    return this.textAreaService.setTextAreaFont();
  }

  async setTextAreaTabs(): Promise<any> {
    return this.textAreaService.setTextAreaTabs();
  }

  async setTextAreaText(): Promise<any> {
    return this.textAreaService.setTextAreaText();
  }

  async textAreaChar(): Promise<any> {
    return this.textAreaService.textAreaChar();
  }

  async textAreaCursor(): Promise<any> {
    return this.textAreaService.textAreaCursor();
  }

  async textAreaLen(): Promise<any> {
    return this.textAreaService.textAreaLen();
  }

  async textAreaLine(): Promise<any> {
    return this.textAreaService.textAreaLine();
  }

  async textAreaLineLen(): Promise<any> {
    return this.textAreaService.textAreaLineLen();
  }

  async textAreaSelLen(): Promise<any> {
    return this.textAreaService.textAreaSelLen();
  }

  async textAreaText(): Promise<any> {
    return this.textAreaService.textAreaText();
  }

  async unlockTextArea(): Promise<any> {
    return this.textAreaService.unlockTextArea();
  }

  // TEXT FIELD
  async createLabel(): Promise<any> {
    return this.textFieldService.createLabel();
  }

  async createTextField(): Promise<any> {
    return this.textFieldService.createTextField();
  }

  async textFieldText(): Promise<any> {
    return this.textFieldService.textFieldText();
  }

  // TOOLBAR
  async createToolBar(): Promise<any> {
    return this.toolbarService.createToolBar();
  }

  async disableToolBarItem(): Promise<any> {
    return this.toolbarService.disableToolBarItem;
  }

  async enableToolBarItem(): Promise<any> {
    return this.toolbarService.enableToolBarItem();
  }

  async setToolBarTips(): Promise<any> {
    return this.toolbarService.setToolBarTips();
  }

  // TREE VIEW
  async addTreeViewNode(): Promise<any> {
    return this.treeViewService.addTreeViewNode();
  }

  async collapseTreeViewNode(): Promise<any> {
    return this.treeViewService.collapseTreeViewNode();
  }

  async countTreeViewNodes(): Promise<any> {
    return this.treeViewService.countTreeViewNodes();
  }

  async createTreeView(): Promise<any> {
    return this.treeViewService.createTreeView();
  }

  async expandTreeViewNode(): Promise<any> {
    return this.treeViewService.expandTreeViewNode();
  }

  async freeTreeViewNode(): Promise<any> {
    return this.treeViewService.freeTreeViewNode();
  }

  async insertTreeViewNode(): Promise<any> {
    return this.treeViewService.insertTreeViewNode();
  }

  async modifyTreeViewNode(): Promise<any> {
    return this.treeViewService.modifyTreeViewNode();
  }

  async selectedTreeViewNode(): Promise<any> {
    return this.treeViewService.selectedTreeViewNode();
  }

  async selectTreeViewNode(): Promise<any> {
    return this.treeViewService.selectTreeViewNode();
  }

  async treeViewNodeText(): Promise<any> {
    return this.treeViewService.treeViewNodeText();
  }

  async treeViewRoot(): Promise<any> {
    return this.treeViewService.treeViewRoot();
  }

  // WINDOW
  async activateWindow(): Promise<any> {
    return this.windowService.activateWindow();
  }

  async activeWindow(): Promise<any> {
    return this.windowService.activeWindow();
  }

  async createWindow(): Promise<any> {
    return this.windowService.createWindow();
  }

  async maximizeWindow(): Promise<any> {
    return this.windowService.maximizeWindow();
  }

  async minimizeWindow(): Promise<any> {
    return this.windowService.minimizeWindow();
  }

  async restoreWindow(): Promise<any> {
    return this.windowService.restoreWindow();
  }

  async setMinWindowSize(): Promise<any> {
    return this.windowService.setMinWindowSize();
  }

  async setStatusText(): Promise<any> {
    return this.windowService.setStatusText();
  }

  async windowMaximized(): Promise<any> {
    return this.windowService.windowMaximized();
  }

  async windowMinimized(): Promise<any> {
    return this.windowService.windowMinimized();
  }
}
