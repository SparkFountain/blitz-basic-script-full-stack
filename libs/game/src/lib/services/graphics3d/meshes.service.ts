import { Injectable } from '@angular/core';
import { BabylonJSService } from '../../babylon-js.service';
import { Mesh, Vector3 } from 'babylonjs';
import { BbScriptEntity } from 'bbscript/src/classes/in-game/3d/entity';

@Injectable()
export class CommandsGraphics3dMeshesService {
  constructor(private babylonjs: BabylonJSService) {}

  async addMesh(source: BbScriptEntity, target: BbScriptEntity): Promise<void> {}

  async copyMesh(mesh: BbScriptEntity, parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return null;
  }

  async createCone(segments?: number, hasFloor?: boolean, parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.babylonjs.createCone(segments, hasFloor).then((coneMesh: Mesh) => {
      return new BbScriptEntity('TODO', 'Mesh', parent, coneMesh);
    });
  }

  async createSphere(segments?: number, parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.babylonjs.createSphere(segments).then((sphereMesh: Mesh) => {
      return new BbScriptEntity('TODO', 'Mesh', parent, sphereMesh);
    });
  }

  async createCube(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.babylonjs.createCube().then((cubeMesh: Mesh) => new BbScriptEntity('cube', 'Mesh', parent, cubeMesh));
  }

  async createCylinder(segments?: number, hasFloor?: boolean, parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.babylonjs.createCylinder(segments, hasFloor).then((cylinderMesh: Mesh) => {
      return new BbScriptEntity('TODO', 'Mesh', parent, cylinderMesh);
    });
  }

  async createPyramid(baseVertexNumber?: number, parent?: any): Promise<BbScriptEntity> {
    return this.babylonjs.createPyramid(baseVertexNumber).then((pyramidMesh: Mesh) => {
      return new BbScriptEntity('TODO', 'Mesh', parent, pyramidMesh);
    });
  }

  async createTorus(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.babylonjs.createTorus().then((torusMesh: Mesh) => {
      return new BbScriptEntity('TODO', 'Mesh', parent, torusMesh);
    });
  }

  async createTorusKnot(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.babylonjs.createTorusKnot().then((torusKnotMesh: Mesh) => {
      return new BbScriptEntity('TODO', 'Mesh', parent, torusKnotMesh);
    });
  }

  async fitMesh(
    mesh: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    uniform: boolean
  ): Promise<void> {}

  async flipMesh(mesh: BbScriptEntity): Promise<void> {
    (mesh.instance as Mesh).flipFaces();
  }

  async loadAnimMesh(filePath: string, parent?: any): Promise<BbScriptEntity> {
    return null;
  }

  async loadMesh(filePath: string, parent?: any): Promise<BbScriptEntity> {
    return null;
  }

  async meshCullBox(
    mesh: any,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number
  ): Promise<void> {}

  async meshDepth(mesh: BbScriptEntity): Promise<number> {
    const vectorsWorld = (mesh.instance as Mesh).getBoundingInfo().boundingBox.vectorsWorld;
    return Number(vectorsWorld[1].z - vectorsWorld[0].z);
  }

  async meshHeight(mesh: BbScriptEntity): Promise<number> {
    const vectorsWorld = (mesh.instance as Mesh).getBoundingInfo().boundingBox.vectorsWorld;
    return Number(vectorsWorld[1].y - vectorsWorld[0].y);
  }

  async meshWidth(mesh: BbScriptEntity): Promise<number> {
    const vectorsWorld = (mesh.instance as Mesh).getBoundingInfo().boundingBox.vectorsWorld;
    return Number(vectorsWorld[1].x - vectorsWorld[0].x);
  }

  async positionMesh(mesh: BbScriptEntity, x: number, y: number, z: number): Promise<void> {
    mesh.position = new Vector3(x, y, z);
  }

  async rotateMesh(mesh: BbScriptEntity, pitch: number, yaw: number, roll: number): Promise<void> {
    mesh.rotation = new Vector3(pitch, yaw, roll);
  }

  async scaleMesh(mesh: BbScriptEntity, scaleX: number, scaleY: number, scaleZ: number): Promise<void> {
    (mesh.instance as Mesh).scaling = new Vector3(scaleX, scaleY, scaleZ);
  }
}
