import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as IdeSelectors from './store/ide.selectors';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as ace from 'ace-builds';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

import * as BABYLON from '@babylonjs/core';
import { Asset } from './assets/asset/asset.interface';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'blitz-basic-script-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss'],
})
export class IdeComponent implements OnInit {
  @ViewChild('mainContainer') private mainContainer: ElementRef<HTMLDivElement>;
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild('canvas3d') private canvas3d: ElementRef<HTMLCanvasElement>;

  treeControl: FlatTreeControl<any>;
  treeFlattener;
  dataSource;

  // ASSETS
  breadcrumbs: Breadcrumb[];
  assets: Asset[];

  // BABYLON JS
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  camera: BABYLON.Camera;
  light: BABYLON.HemisphericLight;

  activeMainComponent$!: Observable<'ui' | '3d' | 'editor'>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      (node) => node.level,
      (node) => node.expandable
    );

    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node) => node.level,
      (node) => node.expandable,
      (node) => node.children
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.dataSource.data = TREE_DATA;

    this.breadcrumbs = [
      {
        label: 'Assets',
        url: '',
      },
      {
        label: '3D Objekte',
        url: '',
      },
      {
        label: 'Körper',
      },
    ];
    this.assets = [
      {
        icon: 'file-text-o',
        ref: null,
      },
      {
        icon: 'file-text-o',
        ref: null,
      },
      {
        icon: 'file-text-o',
        ref: null,
      },
      {
        icon: 'file-text-o',
        ref: null,
      },
    ];

    this.activeMainComponent$ = this.store
      .select(IdeSelectors.selectActiveMainComponent)
      .pipe(
        tap((activeMainComponent: 'ui' | '3d' | 'editor') => {
          switch (activeMainComponent) {
            case 'ui':
              break;
            case '3d':
              setTimeout(() => this.setupBabylonJs(), 0); // TODO: optimize
              break;
            case 'editor':
              setTimeout(() => this.setupAceEditor(), 0);
              break;
          }
        })
      );
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  setupAceEditor(): void {
    // setup ACE editor
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );

    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue('Graphics 640, 480, 32, 2');

    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.session.setMode('ace/mode/vbscript');
  }

  setupBabylonJs(): void {
    // setup 3D container with BabylonJS Engine
    console.log('[CANVAS 3D]', this.canvas3d);
    this.engine = new BABYLON.Engine(this.canvas3d.nativeElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    this.scene = new BABYLON.Scene(this.engine);
    this.camera = new BABYLON.FreeCamera(
      'ideCamera',
      new BABYLON.Vector3(0, 2, -10),
      this.scene
    );
    this.camera.attachControl(this.canvas3d.nativeElement, false);
    this.light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    const sphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere(
      'testSphere',
      16,
      2,
      this.scene,
      false,
      BABYLON.Mesh.FRONTSIDE
    );
    sphere.position.y = 1;
    const ground = BABYLON.Mesh.CreateGround(
      'testGround',
      6,
      6,
      2,
      this.scene,
      false
    );

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  getCanvasWidth(): number {
    if (this.mainContainer) {
      return this.mainContainer.nativeElement.clientWidth;
    } else {
      return 500;
    }
  }

  getCanvasHeight(): number {
    if (this.mainContainer) {
      return this.mainContainer.nativeElement.clientHeight;
    } else {
      return 500;
    }
  }

  handleDragOver($event: DragEvent): void {
    $event.preventDefault();
  }

  handleDrop($event: DragEvent): void {
    console.log('[HANDLE DROP]', $event);
  }
}
