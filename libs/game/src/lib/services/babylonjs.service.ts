import { Injectable } from '@angular/core';

import { CameraType } from '../enums/camera/camera-type';
import { BbScriptAxis } from '../enums/3d/axis';
import { LightType } from '../enums/light/light-type';
import {
  Engine,
  Scene,
  FreeCamera,
  Light,
  StandardMaterial,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Camera,
  Mesh,
  DirectionalLight,
  PointLight,
  SpotLight,
  Color3,
  Color4,
  AssetsManager,
  Axis,
  Space,
} from '@babylonjs/core';
import { GameService } from './game.service';
import { Entity } from '../classes/3d/entity';

@Injectable({
  providedIn: 'root',
})
export class BabylonJSService {
  private screenWidth: number;
  private screenHeight: number;

  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _assetsManager: AssetsManager;

  //TODO remove camera and light later
  private _camera: FreeCamera;
  private _light: Light;

  private wireFrame: boolean;
  private antiAlias: boolean;

  constructor(private gameService: GameService) {
    this.screenWidth = 0;
    this.screenHeight = 0;

    this.wireFrame = false;
    this.antiAlias = true;
  }

  defaultMaterial(): StandardMaterial {
    let material: StandardMaterial = new StandardMaterial('1', this._scene);
    let white = new Color3(1, 1, 1);
    material.diffuseColor = Color3.Red();
    material.specularColor = white;
    material.emissiveColor = white;
    material.ambientColor = white;
    // if (this.gameState.wir) {
    //   material.wireframe = true;
    // }
    return material;
  }

  testScene(): void {
    // Create canvas3d and engine.
    this._canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    this._engine = new Engine(this._canvas, this.antiAlias);

    // Create a basic BJS Scene object.
    this._scene = new Scene(this._engine);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    this._camera = new FreeCamera(
      'camera1',
      new Vector3(0, 5, -10),
      this._scene
    );

    // Target the camera to scene origin.
    this._camera.setTarget(Vector3.Zero());

    // Attach the camera to the canvas3d.
    this._camera.attachControl(this._canvas, false);

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this._light = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this._scene
    );

    // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
    let sphere = MeshBuilder.CreateSphere(
      'sphere1',
      { segments: 16, diameter: 2 },
      this._scene
    );

    // Move the sphere upward 1/2 of its height.
    sphere.position.z = 10;
    sphere.position.y = 1;

    // Create a built-in "ground" shape.
    let ground = MeshBuilder.CreateGround(
      'ground1',
      { width: 6, height: 6, subdivisions: 2 },
      this._scene
    );

    this._engine.runRenderLoop(() => {
      this._scene.render();

      // TODO: execute all code blocks sequentially
    });
  }

  initEngine(canvas: HTMLElement): void {
    // Create canvas3d and engine.
    this._canvas = canvas as HTMLCanvasElement;
    this._engine = new Engine(this._canvas, true);
  }

  createScene(): void {
    // Create a basic BJS Scene object.
    this._scene = new Scene(this._engine);

    // Initialize assets manager to load content
    this._assetsManager = new AssetsManager(this._scene);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    // this._camera = new BABYLON.FreeCamera('camera1', new Vector3(0, 5, -10), this._scene);

    // Target the camera to scene origin.
    // this._camera.setTarget(Vector3.Zero());

    // Attach the camera to the canvas3d.
    // this._camera.attachControl(this._canvas, false);

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    // this._light = new BABYLON.HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);

    // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
    // let sphere = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, this._scene);

    // Move the sphere upward 1/2 of its height.
    // sphere.position.z = 10;
    // sphere.position.y = 1;

    // Create a built-in "ground" shape.
    // let ground = MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, this._scene);
  }

  async mainLoop(statements: any[]): Promise<void> {
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene.render();

      // TODO: execute all code blocks sequentially
    });
  }

  async initGraphics(width: number, height: number): Promise<void> {
    this.screenWidth = width;
    this.screenHeight = height;

    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';

    this._engine = new Engine(this._canvas, true);

    //this._canvas.style.width = '100%';
    //this._canvas.style.height = '100%';
  }

  async setClearColor(red: number, green: number, blue: number): Promise<void> {
    this._scene.clearColor = new Color4(red, green, blue, 1);
  }

  async setFogColor(red: number, green: number, blue: number): Promise<void> {
    this._scene.fogColor = new Color3(red, green, blue);
  }

  /* ASSETS */
  async loadAsset(which: any, url: string): Promise<any> {
    let task: any;

    switch (which) {
      case 'texture':
        task = this._assetsManager.addTextureTask('texLoad', url);
        break;
    }

    task.onSuccess = (task: any) => {
      console.info('[TASK DONE]', task);
      return task.texture;
    };

    this._assetsManager.loadAsync();
  }

  /* CAMERA */
  async createCamera(type: CameraType): Promise<Camera> {
    let camera: Camera;

    switch (type) {
      //TODO anaglyph needs another type in combination
      case CameraType.ANAGLYPH:
        break;
      case CameraType.ARC_ROTATE:
        //TODO add many more parameters
        //return new BABYLON.ArcRotateCamera(id('cam'), );
        break;
      case CameraType.FOLLOW:
        break;
      case CameraType.FREE:
        camera = new FreeCamera('1', new Vector3(0, 0, 0), this._scene, true);
        break;
      case CameraType.UNIVERSAL:
        break;
      case CameraType.WEB_VR:
        break;
      default:
        camera = new FreeCamera('1', new Vector3(0, 0, 0), this._scene, true);
        break;
    }

    return camera;
  }

  /* MESHES */
  async addMesh(source: Entity, target: Entity): Promise<void> {}

  async copyMesh() {}

  async createCone(segments?: number, hasFloor?: boolean): Promise<Mesh> {
    //TODO implement segments and hasFloor
    let cone: Mesh = MeshBuilder.CreateCylinder(
      '1',
      { diameterTop: 0, tessellation: 32 },
      this._scene
    );
    cone.material = this.defaultMaterial();

    return cone;
  }

  async createSphere(segments: number): Promise<Mesh> {
    let sphere: Mesh = MeshBuilder.CreateSphere('1', {}, this._scene);
    sphere.material = this.defaultMaterial();
    return sphere;
  }

  async createCube(): Promise<Mesh> {
    let cube: Mesh = MeshBuilder.CreateBox('1', {}, this._scene);
    cube.material = this.defaultMaterial();
    return cube;
  }

  async createCylinder(segments: number, hasFloor: boolean): Promise<Mesh> {
    let cylinder: Mesh = MeshBuilder.CreateCylinder(
      '1',
      { diameterTop: 1, diameterBottom: 1, tessellation: 32 },
      this._scene
    );
    cylinder.material = this.defaultMaterial();
    return cylinder;
  }

  async createPyramid(baseVertexNumber: number): Promise<Mesh> {
    let meshType;

    switch (baseVertexNumber) {
      case 3:
        meshType = 0;
        break;
      case 4:
        meshType = 8;
        break;
      case 5:
        meshType = 9;
        break;
      default:
        console.error(
          'The number of base vertices for a pyramid is not allowed:',
          baseVertexNumber
        );
        return;
    }

    let pyramid: Mesh = MeshBuilder.CreatePolyhedron(
      '1',
      { type: 1, size: 1 },
      this._scene
    );
    pyramid.material = this.defaultMaterial();
    return pyramid;
  }

  //TODO add parameter(s) how smooth the torus should be
  async createTorus(): Promise<Mesh> {
    let torus: Mesh = MeshBuilder.CreateTorus('1', {}, this._scene);
    torus.material = this.defaultMaterial();
    return torus;
  }

  async createTorusKnot(): Promise<Mesh> {
    let torusKnot: Mesh = MeshBuilder.CreateTorusKnot('tk', {}, this._scene);
    torusKnot.material = this.defaultMaterial();
    return torusKnot;
  }

  async fitMesh() {}

  async flipMesh(mesh) {
    console.info('flip mesh', mesh);
    //TODO negative scaling does not work, try to invert all normals / vertices
  }

  async loadAnimMesh() {}

  async loadMesh(filePath, parent) {
    //TODO find out if this method is still up to date and if so, how to use it exactly
    //BABYLON.SceneLoader.ImportMesh();
    let mesh;

    if (parent) {
      mesh.parent = parent;
    }
  }

  async meshCullBox() {}

  async meshDepth() {}

  async meshHeight() {}

  async meshWidth() {}

  async positionMesh(
    entity: Mesh | Camera,
    x: number,
    y: number,
    z: number,
    parentCoordinates?: boolean
  ): Promise<void> {
    console.info('Entity:', entity);

    //TODO regard parent coordinates
    entity.position = new Vector3(x, y, z);
    console.info('New position of entity:', x, y, z);
  }

  async scaleMesh(
    entity: Entity,
    x: number,
    y: number,
    z: number,
    parentScale?: boolean
  ): Promise<void> {
    entity.scaling = new Vector3(x, y, z);
  }

  /* ENTITIES */
  async moveEntity(
    entity: Entity,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    (entity.instance as Mesh).movePOV(-x, -y, -z);
  }

  async rotateEntity(
    entity: Mesh | Camera,
    pitch: number,
    yaw: number,
    roll: number,
    parentCoordinates?: boolean
  ): Promise<void> {
    //Pi = 180°
    //TODO regard parent coordinates
    if (entity instanceof Mesh) {
      entity.rotation = new Vector3(
        Math.PI * (pitch / 180),
        Math.PI * (yaw / 180),
        Math.PI * (roll / 180)
      );
    } else {
      //TODO
    }
  }

  async translateEntity(
    entity: Entity,
    x: number,
    y: number,
    z: number,
    parentAngle?: boolean
  ): Promise<void> {
    (entity.instance as Mesh).translate(Axis.X, x, Space.LOCAL);
    (entity.instance as Mesh).translate(Axis.Y, y, Space.LOCAL);
    (entity.instance as Mesh).translate(Axis.Z, z, Space.LOCAL);
  }

  async turnEntity(
    entity: Entity,
    pitch: number,
    yaw: number,
    roll: number,
    parentAngle?: boolean
  ): Promise<void> {
    //TODO implement global
    (entity.instance as Mesh).addRotation(pitch, yaw, roll);
  }

  async alignToVector(
    entity: Entity,
    x: number,
    y: number,
    z: number,
    axis: BbScriptAxis,
    tween: number
  ): Promise<void> {
    //TODO test if this is the correct behaviour
    //TODO in this implementation, tween would be deprecated
    let upDirection;
    switch (axis) {
      case 1: //x
        upDirection = new Vector3(1, 0, 0);
        break;
      case 2: //y
        upDirection = new Vector3(0, 1, 0);
        break;
      case 3: //z
        upDirection = new Vector3(0, 0, 1);
        break;
    }
    (entity.instance as Mesh).alignWithNormal(
      new Vector3(x, y, z),
      upDirection
    );
  }

  async pointEntity(
    sourceEntity: Entity,
    targetEntity: Entity,
    roll: number
  ): Promise<void> {
    //TODO: implementation
  }

  async colorMesh(
    mesh: Mesh,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    (mesh.material as StandardMaterial).ambientColor = new Color3(
      Math.trunc(red) / 255,
      Math.trunc(green) / 255,
      Math.trunc(blue) / 255
    );
  }

  /** LIGHT **/
  async ambientLight(red: number, green: number, blue: number): Promise<void> {
    //TODO implementation not working
    this._scene.ambientColor = new Color3(
      Math.trunc(red) / 255,
      Math.trunc(green) / 255,
      Math.trunc(blue) / 255
    );
  }

  async createLight(type: LightType): Promise<Light> {
    let light: Light;

    if (!type) {
      type = LightType.DIRECTIONAL;
    }

    switch (type) {
      case LightType.DIRECTIONAL:
        light = new DirectionalLight('1', new Vector3(0, 0, 0), this._scene);
        break;
      case LightType.POINT:
        light = new PointLight('1', new Vector3(0, 0, 0), this._scene);
        break;
      case LightType.SPOT:
        light = new SpotLight(
          '1',
          new Vector3(0, 0, 0),
          new Vector3(0, 0, 0),
          Math.PI / 3,
          2,
          this._scene
        );
        break;
      case LightType.HEMISPHERIC:
        light = new HemisphericLight('1', new Vector3(0, 0, 0), this._scene);
        break;
      default:
        console.error('Error in CreateLight: Invalid light type!');
        light = null;
    }

    return light;
  }

  async lightColor(
    light: Light,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    light.diffuse = new Color3(
      Math.trunc(red) / 255,
      Math.trunc(green) / 255,
      Math.trunc(blue) / 255
    );
  }

  async lightRange(light: Light, range: number): Promise<void> {
    if (light instanceof PointLight || light instanceof SpotLight) {
      light.range = range;
    } else {
      console.warn('Light range can only be applied to point or spot lights');
    }
  }
}
