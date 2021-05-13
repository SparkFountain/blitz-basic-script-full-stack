import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { GameEntity } from './game-entity.interface';
import { FlatNode } from './flat-node.interface';
import { Store } from '@ngrx/store';

import * as IdeActions from '../../store/ide.actions';
import * as IdeSelectors from '../../store/ide.selectors';
import { Subscription } from 'rxjs';

const TREE_DATA: GameEntity[] = [
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

@Component({
  selector: 'blitz-basic-script-scene-tree',
  templateUrl: './scene-tree.component.html',
  styleUrls: ['./scene-tree.component.scss'],
})
export class SceneTreeComponent implements OnInit {
  subscriptions!: Subscription[];

  treeControl: FlatTreeControl<any>;
  treeFlattener: MatTreeFlattener<any, any>;
  dataSource: MatTreeFlatDataSource<any, any>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<FlatNode>(
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
    this.dataSource.data = TREE_DATA; // TODO: replace by empty data later

    this.subscriptions = [];
    this.subscriptions.push(
      this.store
        .select(IdeSelectors.selectSceneTree)
        .subscribe((sceneTree: GameEntity[]) => {
          this.dataSource.data = sceneTree;
        })
    );
  }

  private _transformer = (node: GameEntity, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
