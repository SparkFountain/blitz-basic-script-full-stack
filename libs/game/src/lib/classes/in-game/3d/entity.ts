import { Camera, Light, Mesh, Vector3 } from '@babylonjs/core';
import { BbScriptInstance } from '../../../types/in-game/3d/instance';

export class BbScriptEntity {
  private _name: string;
  private _class: string;
  private _parent: BbScriptEntity;
  private _instance: BbScriptInstance;

  constructor(
    name: string,
    className: string,
    parent: BbScriptEntity,
    instance: Mesh | Camera | Light
  ) {
    this._name = name;
    this._class = className;
    this._parent = parent;
    this._instance = instance;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get class(): string {
    return this._class;
  }

  get parent(): BbScriptEntity {
    return this._parent;
  }

  get instance(): BbScriptInstance {
    return this._instance;
  }

  get position(): Vector3 {
    if (this._instance instanceof Light) {
      return new Vector3();
    } else {
      return this._instance.position;
    }
  }
  set position(position: Vector3) {
    if (this._instance instanceof Light) {
      // TODO: implement a solution
    } else {
      this._instance.position = position;
    }
  }

  get rotation(): Vector3 {
    if (this._instance instanceof Light || this._instance instanceof Camera) {
      return new Vector3();
    } else {
      return this._instance.rotation;
    }
  }
  set rotation(rotation: Vector3) {
    if (this._instance instanceof Light || this._instance instanceof Camera) {
      // TODO: implement a solution
    } else {
      this._instance.rotation = rotation;
    }
  }

  get scaling(): Vector3 {
    if (this._instance instanceof Light || this._instance instanceof Camera) {
      // TODO: implement a solution
      return new Vector3();
    } else {
      return this._instance.scaling;
    }
  }

  set scaling(scaling: Vector3) {
    if (this._instance instanceof Light || this._instance instanceof Camera) {
      // TODO: implement a solution
    } else {
      this._instance.scaling = scaling;
    }
  }
}
