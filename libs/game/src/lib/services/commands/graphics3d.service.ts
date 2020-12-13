import { Injectable } from '@angular/core';
import { Light } from '@babylonjs/core';
import { BbScriptBrush } from '../../classes/in-game/3d/brush';
import { BbScriptEntity } from '../../classes/in-game/3d/entity';
import { BbScriptSurface } from '../../classes/in-game/3d/surface';
import { BbScriptTerrain } from '../../classes/in-game/3d/terrain';
import { BbScriptTexture } from '../../classes/in-game/3d/texture';
import { BbScriptAxis } from '../../enums/axis';
import { CameraType } from '../../enums/camera/camera-type';
import { BlendMode } from '../../enums/entity/blend-mode';
import { BbScriptMeshType } from '../../enums/in-game/3d/mesh-type';
import { LightType } from '../../enums/light/light-type';
import { PickGeometry } from '../../enums/pick/geometry';
import { SpriteViewMode } from '../../enums/sprite/sprite-view-mode';
import { CubeMapFace } from '../../enums/texture/cube-map-face';
import { CubeMapMode } from '../../enums/texture/cube-map-mode';
import { TextureBlendMode } from '../../enums/texture/texture-blend-mode';
import { TextureMode } from '../../enums/texture/texture-mode';
import { CommandsGraphics3dAnimationsService } from './graphics3d/animations.service';
import { CommandsGraphics3dBrushesService } from './graphics3d/brushes.service';
import { CommandsGraphics3dCameraService } from './graphics3d/camera.service';
import { CommandsGraphics3dCollisionsService } from './graphics3d/collisions.service';
import { CommandsGraphics3dControlsService } from './graphics3d/controls.service';
import { CommandsGraphics3dCoordinatesService } from './graphics3d/coordinates.service';
import { CommandsGraphics3dDiverseService } from './graphics3d/diverse.service';
import { CommandsGraphics3dLightShadowService } from './graphics3d/light-shadow.service';
import { CommandsGraphics3dMeshesService } from './graphics3d/meshes.service';
import { CommandsGraphics3dPickingService } from './graphics3d/picking.service';
import { CommandsGraphics3dSceneService } from './graphics3d/scene.service';
import { CommandsGraphics3dSceneryService } from './graphics3d/scenery.service';
import { CommandsGraphics3dScreenService } from './graphics3d/screen.service';
import { CommandsGraphics3dSpritesService } from './graphics3d/sprites.service';
import { CommandsGraphics3dStatusService } from './graphics3d/status.service';
import { CommandsGraphics3dSurfacesService } from './graphics3d/surfaces.service';
import { CommandsGraphics3dTerrainService } from './graphics3d/terrain.service';
import { CommandsGraphics3dTexturesService } from './graphics3d/textures.service';

@Injectable()
export class CommandsGraphics3DService {
  constructor(
    private animationsService: CommandsGraphics3dAnimationsService,
    private brushesService: CommandsGraphics3dBrushesService,
    private cameraService: CommandsGraphics3dCameraService,
    private collisionsService: CommandsGraphics3dCollisionsService,
    private controlsService: CommandsGraphics3dControlsService,
    private coordinatesService: CommandsGraphics3dCoordinatesService,
    private diverseService: CommandsGraphics3dDiverseService,
    private lightShadowService: CommandsGraphics3dLightShadowService,
    private meshesService: CommandsGraphics3dMeshesService,
    private pickingService: CommandsGraphics3dPickingService,
    private sceneService: CommandsGraphics3dSceneService,
    private sceneryService: CommandsGraphics3dSceneryService,
    private screenService: CommandsGraphics3dScreenService,
    private spritesService: CommandsGraphics3dSpritesService,
    private statusService: CommandsGraphics3dStatusService,
    private surfacesService: CommandsGraphics3dSurfacesService,
    private terrainService: CommandsGraphics3dTerrainService,
    private texturesService: CommandsGraphics3dTexturesService
  ) {}

  // ANIMATIONS
  async addAnimSeq(entity: BbScriptEntity, duration: number): Promise<number> {
    return this.animationsService.addAnimSeq(entity, duration);
  }

  async animate(
    entity: BbScriptEntity,
    mode?: number,
    speed?: number,
    sequenceId?: number,
    transition?: number
  ): Promise<void> {
    return this.animationsService.animate(
      entity,
      mode,
      speed,
      sequenceId,
      transition
    );
  }

  async animating(entity: BbScriptEntity): Promise<boolean> {
    return this.animationsService.animating(entity);
  }

  async animLength(entity: BbScriptEntity): Promise<number> {
    return this.animationsService.animLength(entity);
  }

  async animSeq(entity: BbScriptEntity): Promise<number> {
    return this.animationsService.animSeq(entity);
  }

  async animTime(entity: BbScriptEntity): Promise<number> {
    return this.animationsService.animTime(entity);
  }

  async extractAnimSeq(
    entity: BbScriptEntity,
    start: number,
    end: number,
    animSeq?: number
  ): Promise<number> {
    return this.animationsService.extractAnimSeq(entity, start, end, animSeq);
  }

  async loadAnimSeq(entity: BbScriptEntity, filePath: string): Promise<number> {
    return this.animationsService.loadAnimSeq(entity, filePath);
  }

  async setAnimKey(
    entity: BbScriptEntity,
    frame: number,
    translation?: boolean,
    rotation?: boolean,
    scaling?: boolean
  ): Promise<void> {
    return this.animationsService.setAnimKey(
      entity,
      frame,
      translation,
      rotation,
      scaling
    );
  }

  async setAnimTime(
    entity: BbScriptEntity,
    time: number,
    sequenceId?: number
  ): Promise<void> {
    return this.animationsService.setAnimTime(entity, time, sequenceId);
  }

  // BRUSHES
  async brushAlpha(brush: any, alpha: number): Promise<void> {
    return this.brushesService.brushAlpha(brush, alpha);
  }

  async brushBlend(brush: any, mode: number): Promise<void> {
    return this.brushesService.brushBlend(brush, mode);
  }

  async brushColor(
    brush: any,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    return this.brushesService.brushColor(brush, red, green, blue);
  }

  async brushFx(brush: any, effects: number): Promise<void> {
    return this.brushesService.brushFx(brush, effects);
  }

  async brushShininess(brush: any, shininess: number): Promise<void> {
    return this.brushesService.brushShininess(brush, shininess);
  }

  async brushTexture(
    brush: any,
    texture: any,
    frame: number,
    index: number
  ): Promise<void> {
    return this.brushesService.brushTexture(brush, texture, frame, index);
  }

  async createBrush(red?: number, green?: number, blue?: number): Promise<any> {
    return this.brushesService.createBrush(red, green, blue);
  }

  async freeBrush(brush: any): Promise<void> {
    return this.brushesService.freeBrush(brush);
  }

  async getBrushTexture(brush: any, index: number): Promise<any> {
    return this.brushesService.getBrushTexture(brush, index);
  }

  async getEntityBrush(entity: BbScriptEntity): Promise<any> {
    return this.brushesService.getEntityBrush(entity);
  }

  async getSurfaceBrush(surface: any): Promise<any> {
    return this.brushesService.getSurfaceBrush(surface);
  }

  async loadBrush(
    filePath: string,
    modes?: number,
    scaleU?: number,
    scaleV?: number
  ): Promise<any> {
    return this.brushesService.loadBrush(filePath, modes, scaleU, scaleV);
  }

  async paintEntity(entity: BbScriptEntity, brush: any): Promise<void> {
    return this.brushesService.paintEntity(entity, brush);
  }

  async paintMesh(mesh: any, brush: any): Promise<void> {
    return this.brushesService.paintMesh(mesh, brush);
  }

  async paintSurface(surface: any, brush: any): Promise<void> {
    return this.brushesService.paintSurface(surface, brush);
  }

  // CAMERA
  async cameraClsColor(
    camera: any,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    return this.cameraService.cameraClsColor(camera, red, green, blue);
  }

  async cameraClsMode(
    camera: any,
    deleteColorBuffer?: boolean,
    deleteZBuffer?: boolean
  ) {
    // TODO
  }

  async fogColor(red: number, green: number, blue: number): Promise<void> {
    return this.cameraService.fogColor(red, green, blue);
  }

  async fogMode(mode: any): Promise<void> {
    return this.cameraService.fogMode(mode);
  }

  async fogRange(near: number, far: number): Promise<void> {
    return this.cameraService.fogRange(near, far);
  }

  async fogDensity(value: number): Promise<void> {
    return this.cameraService.fogDensity(value);
  }

  async cameraProject(
    camera: any,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    return this.cameraService.cameraProject(camera, x, y, z);
  }

  async cameraProjMode(camera: any, mode: number): Promise<void> {
    return this.cameraService.cameraProjMode(camera, mode);
  }

  async cameraRange(camera: any, near: number, far: number): Promise<void> {
    return this.cameraService.cameraRange(camera, near, far);
  }

  async cameraViewport(
    camera: any,
    x: number,
    y: number,
    width: number,
    height: number
  ): Promise<void> {
    return this.cameraService.cameraViewport(camera, x, y, width, height);
  }

  async cameraZoom(camera: any, value: number): Promise<void> {
    return this.cameraService.cameraZoom(camera, value);
  }

  async createCamera(
    type?: CameraType,
    parent?: BbScriptEntity
  ): Promise<BbScriptEntity> {
    return this.cameraService.createCamera(type, parent);
  }

  async projectedX(): Promise<number> {
    return this.cameraService.projectedX();
  }

  async projectedY(): Promise<number> {
    return this.cameraService.projectedY();
  }

  async projectedZ(): Promise<boolean> {
    return this.cameraService.projectedZ();
  }

  // COLLISIONS
  async clearCollisions(): Promise<void> {
    return this.collisionsService.clearCollisions();
  }

  async collisionEntity(entity: BbScriptEntity, index: number): Promise<any> {
    return this.collisionsService.collisionEntity(entity, index);
  }

  async collisionNX(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionNX(entity, index);
  }

  async collisionNY(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionNY(entity, index);
  }

  async collisionNZ(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionNZ(entity, index);
  }

  async collisions(
    sourceEntity: any,
    targetEntity: any,
    method: number,
    reaction: number
  ): Promise<void> {
    return this.collisionsService.collisions(
      sourceEntity,
      targetEntity,
      method,
      reaction
    );
  }

  async collisionSurface(entity: BbScriptEntity, index: number): Promise<any> {
    return this.collisionsService.collisionSurface(entity, index);
  }

  async collisionTime(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionTime(entity, index);
  }

  async collisionTriangle(
    entity: BbScriptEntity,
    index: number
  ): Promise<number> {
    return this.collisionsService.collisionTriangle(entity, index);
  }

  async collisionX(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionX(entity, index);
  }

  async collisionY(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionY(entity, index);
  }

  async collisionZ(entity: BbScriptEntity, index: number): Promise<number> {
    return this.collisionsService.collisionZ(entity, index);
  }

  async countCollisions(entity: BbScriptEntity): Promise<number> {
    return this.collisionsService.countCollisions(entity);
  }

  async entityBox(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number
  ): Promise<void> {
    return this.collisionsService.entityBox(
      entity,
      x,
      y,
      z,
      width,
      height,
      depth
    );
  }

  async entityCollided(
    entity: BbScriptEntity,
    collisionType: number
  ): Promise<boolean> {
    return this.collisionsService.entityCollided(entity, collisionType);
  }

  async entityRadius(
    entity: BbScriptEntity,
    radiusX: number,
    radiusY?: number
  ): Promise<void> {
    return this.collisionsService.entityRadius(entity, radiusX, radiusY);
  }

  async entityType(
    entity: BbScriptEntity,
    collisionType: number,
    recursively?: boolean
  ): Promise<void> {
    return this.collisionsService.entityType(
      entity,
      collisionType,
      recursively
    );
  }

  async getEntityType(entity: BbScriptEntity): Promise<number> {
    return this.collisionsService.getEntityType(entity);
  }

  async meshesIntersect(
    source: BbScriptEntity,
    target: BbScriptEntity
  ): Promise<boolean> {
    return this.collisionsService.meshesIntersect(source, target);
  }

  async resetEntity(entity: BbScriptEntity): Promise<void> {
    return this.collisionsService.resetEntity(entity);
  }

  // CONTROLS
  async copyEntity(
    entity: BbScriptEntity,
    parent?: BbScriptEntity
  ): Promise<BbScriptEntity> {
    return this.controlsService.copyEntity(entity, parent);
  }

  async entityAlpha(entity: BbScriptEntity, alpha: number): Promise<void> {
    return this.controlsService.entityAlpha(entity, alpha);
  }

  async entityAutoFade(
    entity: BbScriptEntity,
    near: number,
    far: number
  ): Promise<void> {
    return this.controlsService.entityAutoFade(entity, near, far);
  }

  async entityBlend(entity: BbScriptEntity, mode: BlendMode): Promise<void> {
    return this.controlsService.entityBlend(entity, mode);
  }

  async entityColor(
    entity: BbScriptEntity,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    return this.controlsService.entityColor(entity, red, green, blue);
  }

  async entityFx(entity: BbScriptEntity, effect: number): Promise<void> {
    return this.controlsService.entityFx(entity, effect);
  }

  async entityOrder(entity: BbScriptEntity, effect: number): Promise<void> {
    return this.controlsService.entityOrder(entity, effect);
  }

  async entityParent(
    entity: BbScriptEntity,
    parent: BbScriptEntity,
    global?: boolean
  ): Promise<void> {
    return this.controlsService.entityParent(entity, parent, global);
  }

  async entityShininess(
    entity: BbScriptEntity,
    shininess: number
  ): Promise<void> {
    return this.controlsService.entityShininess(entity, shininess);
  }

  async entityTexture(
    entity: BbScriptEntity,
    texture: BbScriptTexture,
    frame?: number,
    layer?: number
  ): Promise<void> {
    return this.controlsService.entityTexture(entity, texture, frame, layer);
  }

  async freeEntity(entity: BbScriptEntity): Promise<void> {
    return this.controlsService.freeEntity(entity);
  }

  async hideEntity(entity: BbScriptEntity): Promise<void> {
    return this.controlsService.hideEntity(entity);
  }

  async showEntity(entity: BbScriptEntity): Promise<void> {
    return this.controlsService.showEntity(entity);
  }

  // COORDINATES
  async alignToVector(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    axis: BbScriptAxis,
    tween: number
  ): Promise<void> {
    return this.coordinatesService.alignToVector(entity, x, y, z, axis, tween);
  }

  async moveEntity(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    return this.coordinatesService.moveEntity(entity, x, y, z);
  }

  async pointEntity(
    sourceEntity: BbScriptEntity,
    targetEntity: BbScriptEntity,
    roll: number
  ): Promise<void> {
    return this.coordinatesService.pointEntity(
      sourceEntity,
      targetEntity,
      roll
    );
  }

  async positionEntity(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    parentCoordinates?: boolean
  ): Promise<void> {
    return this.coordinatesService.positionEntity(
      entity,
      x,
      y,
      z,
      parentCoordinates
    );
  }

  async rotateEntity(
    entity: BbScriptEntity,
    pitch: number,
    yaw: number,
    roll: number,
    parentCoordinates?: boolean
  ) {
    return this.coordinatesService.rotateEntity(
      entity,
      pitch,
      yaw,
      roll,
      parentCoordinates
    );
  }

  async scaleEntity(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    parentScale?: boolean
  ): Promise<void> {
    return this.coordinatesService.scaleEntity(entity, x, y, z, parentScale);
  }

  async translateEntity(
    entity: BbScriptEntity,
    x: number,
    y: number,
    z: number,
    parentAngle?: boolean
  ): Promise<void> {
    return this.coordinatesService.translateEntity(
      entity,
      x,
      y,
      z,
      parentAngle
    );
  }

  async turnEntity(
    entity: BbScriptEntity,
    pitch: number,
    yaw: number,
    roll: number,
    parentAngle?: boolean
  ): Promise<void> {
    return this.coordinatesService.turnEntity(
      entity,
      pitch,
      yaw,
      roll,
      parentAngle
    );
  }

  async tFormedX(): Promise<number> {
    return this.coordinatesService.tFormedX();
  }

  async tFormedY(): Promise<number> {
    return this.coordinatesService.tFormedY();
  }

  async tFormedZ(): Promise<number> {
    return this.coordinatesService.tFormedZ();
  }

  async tFormNormal(
    x: number,
    y: number,
    z: number,
    source: BbScriptEntity,
    target: BbScriptEntity
  ): Promise<void> {
    return this.coordinatesService.tFormNormal(x, y, z, source, target);
  }

  async tFormPoint(
    x: number,
    y: number,
    z: number,
    source: BbScriptEntity,
    target: BbScriptEntity
  ): Promise<void> {
    return this.coordinatesService.tFormPoint(x, y, z, source, target);
  }

  async tFormVector(
    x: number,
    y: number,
    z: number,
    source: BbScriptEntity,
    target: BbScriptEntity
  ): Promise<void> {
    return this.coordinatesService.tFormVector(x, y, z, source, target);
  }

  // DIVERSE
  async createMirror() {
    return this.diverseService.createMirror();
  }

  async createPivot() {
    return this.diverseService.createPivot();
  }

  async createPlane() {
    return this.diverseService.createPlane();
  }

  async getMatElement(
    entity: BbScriptEntity,
    row: number,
    column: number
  ): Promise<number> {
    return this.diverseService.getMatElement(entity, row, column);
  }

  async loaderMatrix(
    meshType: BbScriptMeshType,
    xx: number,
    xy: number,
    xz: number,
    yx: number,
    yy: number,
    yz: number,
    zx: number,
    zy: number,
    zz: number
  ): Promise<void> {
    return this.diverseService.loaderMatrix(
      meshType,
      xx,
      xy,
      xz,
      yx,
      yy,
      yz,
      zx,
      zy,
      zz
    );
  }

  async trisRendered() {
    return this.diverseService.trisRendered();
  }

  async vectorPitch(x: number, y: number, z: number): Promise<number> {
    return this.diverseService.vectorPitch(x, y, z);
  }

  async vectorYaw(x: number, y: number, z: number): Promise<number> {
    return this.diverseService.vectorYaw(x, y, z);
  }

  // LIGHT AND SHADOW
  async ambientLight(red: number, green: number, blue: number): Promise<void> {
    return this.lightShadowService.ambientLight(red, green, blue);
  }

  async createLight(type?: LightType, parent?: any): Promise<any> {
    return this.lightShadowService.createLight(type, parent);
  }

  async lightColor(
    light: Light,
    red: number,
    green: number,
    blue: number
  ): Promise<void> {
    return this.lightShadowService.lightColor(light, red, green, blue);
  }

  async lightConeAngles() {
    return this.lightShadowService.lightConeAngles();
  }

  async lightMesh() {
    return this.lightShadowService.lightMesh();
  }

  async lightRange(light: Light, range: number): Promise<void> {
    return this.lightShadowService.lightRange(light, range);
  }

  async createShadowMap() {
    return this.lightShadowService.createShadowMap();
  }

  async freeShadowMap() {
    return this.lightShadowService.freeShadowMap();
  }

  async castShadow() {
    return this.lightShadowService.castShadow();
  }

  async receiveShadows() {
    return this.lightShadowService.receiveShadows();
  }

  async shadowDarkness() {
    return this.lightShadowService.shadowDarkness();
  }

  // MESHES
  async addMesh(source: any, target: any): Promise<any> {
    return this.meshesService.addMesh(source, target);
  }

  async copyMesh(mesh: any, parent?: any): Promise<any> {
    return this.meshesService.copyMesh(mesh, parent);
  }

  async createCone(
    segments?: number,
    hasFloor?: boolean,
    parent?: BbScriptEntity
  ): Promise<BbScriptEntity> {
    return this.meshesService.createCone(segments, hasFloor, parent);
  }

  async createSphere(
    segments?: number,
    parent?: BbScriptEntity
  ): Promise<BbScriptEntity> {
    return this.meshesService.createSphere(segments, parent);
  }

  async createCube(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.meshesService.createCube(parent);
  }

  async createCylinder(
    segments?: number,
    hasFloor?: boolean,
    parent?: BbScriptEntity
  ): Promise<BbScriptEntity> {
    return this.meshesService.createCylinder(segments, hasFloor, parent);
  }

  async createPyramid(
    baseVertexNumber?: number,
    parent?: any
  ): Promise<BbScriptEntity> {
    return this.meshesService.createPyramid(baseVertexNumber, parent);
  }

  async createTorus(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.meshesService.createTorus(parent);
  }

  async createTorusKnot(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.meshesService.createTorusKnot(parent);
  }

  async fitMesh(
    mesh: any,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number,
    uniform: boolean
  ): Promise<void> {
    return this.meshesService.fitMesh(
      mesh,
      x,
      y,
      z,
      width,
      height,
      depth,
      uniform
    );
  }

  async flipMesh(mesh): Promise<void> {
    return this.meshesService.flipMesh(mesh);
  }

  async loadAnimMesh(filePath: string, parent?: any): Promise<any> {
    return this.meshesService.loadAnimMesh(filePath, parent);
  }

  async loadMesh(filePath: string, parent?: any): Promise<any> {
    return this.meshesService.loadMesh(filePath, parent);
  }

  async meshCullBox(
    mesh: any,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number
  ): Promise<void> {
    return this.meshesService.meshCullBox(mesh, x, y, z, width, height, depth);
  }

  async meshDepth(mesh: any): Promise<number> {
    return this.meshesService.meshDepth(mesh);
  }

  async meshHeight(mesh: any): Promise<number> {
    return this.meshesService.meshHeight(mesh);
  }

  async meshWidth(mesh: any): Promise<number> {
    return this.meshesService.meshWidth(mesh);
  }

  async positionMesh(
    mesh: BbScriptEntity,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    return this.meshesService.positionMesh(mesh, x, y, z);
  }

  async rotateMesh(
    mesh: BbScriptEntity,
    pitch: number,
    yaw: number,
    roll: number
  ): Promise<void> {
    return this.meshesService.rotateMesh(mesh, pitch, yaw, roll);
  }

  async scaleMesh(
    mesh: BbScriptEntity,
    scaleX: number,
    scaleY: number,
    scaleZ: number
  ): Promise<void> {
    return this.meshesService.scaleMesh(mesh, scaleX, scaleY, scaleZ);
  }

  // PICKING
  async cameraPick(
    camera: BbScriptEntity,
    x: number,
    y: number
  ): Promise<BbScriptEntity> {
    return this.pickingService.cameraPick(camera, x, y);
  }

  async entityPick(
    entity: BbScriptEntity,
    distance: number
  ): Promise<BbScriptEntity> {
    return this.pickingService.entityPick(entity, distance);
  }

  async entityPickMode(
    entity: BbScriptEntity,
    geometry: PickGeometry,
    coverOtherObjects?: boolean
  ): Promise<void> {
    return this.pickingService.entityPickMode(entity, geometry);
  }

  async linePick(
    x: number,
    y: number,
    z: number,
    dx: number,
    dy: number,
    dz: number,
    radius?: number
  ): Promise<BbScriptEntity> {
    return this.pickingService.linePick(x, y, z, dx, dy, dz, radius);
  }

  async pickedEntity(): Promise<BbScriptEntity> {
    return this.pickingService.pickedEntity();
  }

  async pickedNX(): Promise<number> {
    return this.pickingService.pickedNX();
  }

  async pickedNY(): Promise<number> {
    return this.pickingService.pickedNY();
  }

  async pickedNZ(): Promise<number> {
    return this.pickingService.pickedNZ();
  }

  async pickedSurface() {
    return this.pickingService.pickedSurface();
  }

  async pickedTime() {
    return this.pickingService.pickedTime();
  }

  async pickedTriangle() {
    return this.pickingService.pickedTriangle();
  }

  async pickedX(): Promise<number> {
    return this.pickingService.pickedX();
  }

  async pickedY(): Promise<number> {
    return this.pickingService.pickedY();
  }

  async pickedZ(): Promise<number> {
    return this.pickingService.pickedZ();
  }

  // SCENE
  async createSkyBox() {
    return this.sceneService.createSkyBox();
  }

  async loadSkyBox() {
    return this.sceneService.loadSkyBox();
  }

  async setGravity(gravity: number): Promise<void> {
    return this.sceneService.setGravity(gravity);
  }

  // SCENERY
  async antiAlias(enabled: boolean): Promise<void> {
    return this.sceneryService.antiAlias(enabled);
  }

  async captureWorld(): Promise<void> {
    return this.sceneryService.captureWorld();
  }

  async clearWorld(
    removeEntities?: boolean,
    removeBrushes?: boolean,
    removeTextures?: boolean
  ): Promise<void> {
    return this.sceneryService.clearWorld(
      removeEntities,
      removeBrushes,
      removeTextures
    );
  }

  async renderWorld(animationStep: number): Promise<void> {
    return this.sceneryService.renderWorld(animationStep);
  }

  async updateWorld(updateSpeed?: number): Promise<void> {
    return this.sceneryService.updateWorld(updateSpeed);
  }

  async wireFrame(enabled: boolean): Promise<void> {
    return this.sceneryService.wireFrame(enabled);
  }

  // SCREEN
  async countGfxModes3d(): Promise<number> {
    return this.screenService.countGfxModes3d();
  }

  async gfxDriver3D(): Promise<boolean> {
    return this.screenService.gfxDriver3D();
  }

  async gfxDriverCaps3D(): Promise<number> {
    return this.screenService.gfxDriverCaps3D();
  }

  async gfxMode3D(mode: number): Promise<boolean> {
    return this.screenService.gfxMode3D(mode);
  }

  async gfxMode3DExists(
    width: number,
    height: number,
    depth: number
  ): Promise<boolean> {
    return this.screenService.gfxMode3DExists(width, height, depth);
  }

  async windowed3D(): Promise<boolean> {
    return this.screenService.windowed3D();
  }

  // SPRITES
  async createSprite(parent?: BbScriptEntity): Promise<BbScriptEntity> {
    return this.spritesService.createSprite(parent);
  }

  async handleSprite(
    sprite: BbScriptEntity,
    x: number,
    y: number
  ): Promise<void> {
    return this.spritesService.handleSprite(sprite, x, y);
  }

  async loadSprite(
    filePath: string,
    mode: TextureMode,
    parent?: any
  ): Promise<BbScriptEntity> {
    return this.spritesService.loadSprite(filePath, mode, parent);
  }

  async rotateSprite(sprite: BbScriptEntity, angle: number): Promise<void> {
    return this.spritesService.rotateSprite(sprite, angle);
  }

  async scaleSprite(
    sprite: BbScriptEntity,
    x: number,
    y: number
  ): Promise<void> {
    return this.spritesService.scaleSprite(sprite, x, y);
  }

  async spriteViewMode(
    sprite: BbScriptEntity,
    mode: SpriteViewMode
  ): Promise<void> {
    return this.spritesService.spriteViewMode(sprite, mode);
  }

  // STATUS
  async countChildren(entity: BbScriptEntity): Promise<number> {
    return this.statusService.countChildren(entity);
  }

  async deltaPitch(
    sourceEntity: BbScriptEntity,
    targetEntity: BbScriptEntity
  ): Promise<number> {
    return this.statusService.deltaPitch(sourceEntity, targetEntity);
  }

  async deltaYaw(
    sourceEntity: BbScriptEntity,
    targetEntity: BbScriptEntity
  ): Promise<number> {
    return this.statusService.deltaYaw(sourceEntity, targetEntity);
  }

  async entityClass(entity: BbScriptEntity): Promise<string> {
    return this.statusService.entityClass(entity);
  }

  async entityDistance(
    entity1: BbScriptEntity,
    entity2: BbScriptEntity
  ): Promise<number> {
    return this.statusService.entityDistance(entity1, entity2);
  }

  async entityInView(
    entity: BbScriptEntity,
    camera: BbScriptEntity
  ): Promise<boolean> {
    return this.statusService.entityInView(entity, camera);
  }

  async entityName(entity: BbScriptEntity): Promise<string> {
    return this.statusService.entityName(entity);
  }

  async entityPitch(entity: BbScriptEntity, global?: boolean): Promise<number> {
    return this.statusService.entityPitch(entity, global);
  }

  async entityRoll(entity: BbScriptEntity, global?: boolean): Promise<number> {
    return this.statusService.entityRoll(entity, global);
  }

  async entityVisible(
    entity1: BbScriptEntity,
    entity2: BbScriptEntity
  ): Promise<boolean> {
    return this.statusService.entityVisible(entity1, entity2);
  }

  async entityX(entity: BbScriptEntity, global?: boolean): Promise<number> {
    return this.statusService.entityX(entity, global);
  }

  async entityY(entity: BbScriptEntity, global?: boolean): Promise<number> {
    return this.statusService.entityY(entity, global);
  }

  async entityYaw(entity: BbScriptEntity, global?: boolean): Promise<number> {
    return this.statusService.entityYaw(entity, global);
  }

  async entityZ(entity: BbScriptEntity, global?: boolean): Promise<number> {
    return this.statusService.entityZ(entity, global);
  }

  async findChild(
    entity: BbScriptEntity,
    childName: string
  ): Promise<BbScriptEntity | null> {
    return this.statusService.findChild(entity, childName);
  }

  async getChild(
    entity: BbScriptEntity,
    index: number
  ): Promise<BbScriptEntity | null> {
    return this.statusService.getChild(entity, index);
  }

  async getParent(entity: BbScriptEntity): Promise<BbScriptEntity> {
    return this.statusService.getParent(entity);
  }

  async nameEntity(entity: BbScriptEntity, name: string): Promise<void> {
    return this.statusService.nameEntity(entity, name);
  }

  // SURFACES
  async addTriangle(
    surface: BbScriptSurface,
    v0: number,
    v1: number,
    v2: number
  ): Promise<number> {
    return this.surfacesService.addTriangle(surface, v0, v1, v2);
  }

  async addVertex(
    surface: BbScriptSurface,
    x: number,
    y: number,
    z: number,
    u?: number,
    v?: number,
    w?: number
  ): Promise<number> {
    return this.surfacesService.addVertex(surface, x, y, z, u, v, w);
  }

  async clearSurface(
    surface: BbScriptSurface,
    deleteVertices?: boolean,
    deleteTriangles?: boolean
  ): Promise<void> {
    return this.surfacesService.clearSurface(
      surface,
      deleteVertices,
      deleteTriangles
    );
  }

  async countSurfaces(mesh: BbScriptEntity): Promise<number> {
    return this.surfacesService.countSurfaces(mesh);
  }

  async countTriangles(surface: BbScriptSurface): Promise<number> {
    return this.surfacesService.countTriangles(surface);
  }

  async countVertices(surface: BbScriptSurface): Promise<number> {
    return this.surfacesService.countVertices(surface);
  }

  async createSurface(
    mesh: BbScriptEntity,
    brush: BbScriptBrush
  ): Promise<BbScriptSurface> {
    return this.surfacesService.createSurface(mesh, brush);
  }

  async findSurface(
    mesh: BbScriptEntity,
    brush: BbScriptBrush
  ): Promise<BbScriptSurface> {
    return this.surfacesService.findSurface(mesh, brush);
  }

  async getSurface(
    mesh: BbScriptEntity,
    index: number
  ): Promise<BbScriptSurface> {
    return this.surfacesService.getSurface(mesh, index);
  }

  async triangleVertex(
    surface: BbScriptSurface,
    triangle: number,
    vertex: number
  ): Promise<number> {
    return this.surfacesService.triangleVertex(surface, triangle, vertex);
  }

  async updateNormals(mesh: BbScriptEntity): Promise<void> {
    return this.surfacesService.updateNormals(mesh);
  }

  async vertexAlpha(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexAlpha(surface, vertex);
  }

  async vertexBlue(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexBlue(surface, vertex);
  }

  async vertexColor(
    surface: BbScriptSurface,
    vertex: number,
    red: number,
    green: number,
    blue: number,
    alpha?: number
  ): Promise<void> {
    return this.surfacesService.vertexColor(
      surface,
      vertex,
      red,
      green,
      blue,
      alpha
    );
  }

  async vertexCoords(
    surface: BbScriptSurface,
    vertex: number,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    return this.surfacesService.vertexCoords(surface, vertex, x, y, z);
  }

  async vertexGreen(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexGreen(surface, vertex);
  }

  async vertexNormal(
    surface: BbScriptSurface,
    vertex: number,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    return this.surfacesService.vertexNormal(surface, vertex, x, y, z);
  }

  async vertexNX(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexNX(surface, vertex);
  }

  async vertexNY(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexNY(surface, vertex);
  }

  async vertexNZ(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexNZ(surface, vertex);
  }

  async vertexRed(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexRed(surface, vertex);
  }

  async vertexTexCoords(
    surface: BbScriptSurface,
    vertex: number,
    u: number,
    v: number,
    w?: number,
    set?: boolean
  ): Promise<void> {
    return this.surfacesService.vertexTexCoords(surface, vertex, u, v, w, set);
  }

  async vertexU(
    surface: BbScriptSurface,
    vertex: number,
    set?: boolean
  ): Promise<number> {
    return this.surfacesService.vertexU(surface, vertex, set);
  }

  async vertexV(
    surface: BbScriptSurface,
    vertex: number,
    set?: boolean
  ): Promise<number> {
    return this.surfacesService.vertexV(surface, vertex, set);
  }

  async vertexW(
    surface: BbScriptSurface,
    vertex: number,
    set?: boolean
  ): Promise<number> {
    return this.surfacesService.vertexW(surface, vertex, set);
  }

  async vertexX(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexX(surface, vertex);
  }

  async vertexY(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexY(surface, vertex);
  }

  async vertexZ(surface: BbScriptSurface, vertex: number): Promise<number> {
    return this.surfacesService.vertexZ(surface, vertex);
  }

  // TERRAIN
  async createTerrain(
    segments: number,
    parent?: BbScriptEntity
  ): Promise<BbScriptTerrain> {
    return this.terrainService.createTerrain(segments, parent);
  }

  async loadTerrain(filePath: string, parent?: any): Promise<BbScriptTerrain> {
    return this.terrainService.loadTerrain(filePath, parent);
  }

  async modifyTerrain(
    terrain: BbScriptEntity,
    x: number,
    z: number,
    height: number,
    realTimeUpdate?: boolean
  ): Promise<void> {
    return this.terrainService.modifyTerrain(
      terrain,
      x,
      z,
      height,
      realTimeUpdate
    );
  }

  async terrainDetail(
    terrain: BbScriptEntity,
    detailLevel: number,
    enableMorphing: boolean
  ): Promise<void> {
    return this.terrainService.terrainDetail(
      terrain,
      detailLevel,
      enableMorphing
    );
  }

  async terrainHeight(
    terrain: BbScriptEntity,
    x: number,
    z: number
  ): Promise<number> {
    return this.terrainService.terrainHeight(terrain, x, z);
  }

  async terrainShading(enableShading: boolean): Promise<void> {
    return this.terrainService.terrainShading(enableShading);
  }

  async terrainSize(terrain: BbScriptEntity): Promise<number> {
    return this.terrainService.terrainSize(terrain);
  }

  async terrainX(
    terrain: BbScriptEntity,
    x: number,
    y: number,
    z: number
  ): Promise<number> {
    return this.terrainService.terrainX(terrain, x, y, z);
  }

  async terrainY(
    terrain: BbScriptEntity,
    x: number,
    y: number,
    z: number
  ): Promise<number> {
    return this.terrainService.terrainY(terrain, x, y, z);
  }

  async terrainZ(
    terrain: BbScriptEntity,
    x: number,
    y: number,
    z: number
  ): Promise<number> {
    return this.terrainService.terrainZ(terrain, x, y, z);
  }

  // TEXTURES
  async activeTextures(): Promise<number> {
    return this.texturesService.activeTextures();
  }

  async clearTextureFilters(): Promise<void> {
    return this.texturesService.clearTextureFilters();
  }

  async createTexture(
    width: number,
    height: number,
    mode?: TextureMode,
    frames?: number
  ): Promise<BbScriptTexture> {
    return this.texturesService.createTexture(width, height, mode, frames);
  }

  async freeTexture(texture: BbScriptTexture): Promise<void> {
    return this.texturesService.freeTexture(texture);
  }

  async loadAnimTexture(
    filePath: string,
    mode: TextureMode,
    width: number,
    height: number,
    startFrame: number,
    totalFrames: number
  ): Promise<BbScriptTexture> {
    return this.texturesService.loadAnimTexture(
      filePath,
      mode,
      width,
      height,
      startFrame,
      totalFrames
    );
  }

  async loadTexture(
    filePath: string,
    mode: TextureMode
  ): Promise<BbScriptTexture> {
    return this.texturesService.loadTexture(filePath, mode);
  }

  async positionTexture(
    texture: BbScriptTexture,
    u: number,
    v: number
  ): Promise<void> {
    return this.texturesService.positionTexture(texture, u, v);
  }

  async rotateTexture(texture: BbScriptTexture, angle: number): Promise<void> {
    return this.texturesService.rotateTexture(texture, angle);
  }

  async scaleTexture(
    texture: BbScriptTexture,
    u: number,
    v: number
  ): Promise<void> {
    return this.texturesService.scaleTexture(texture, u, v);
  }

  async setCubeFace(
    texture: BbScriptTexture,
    face: CubeMapFace
  ): Promise<void> {
    return this.texturesService.setCubeFace(texture, face);
  }

  async setCubeMode(
    texture: BbScriptTexture,
    mode: CubeMapMode
  ): Promise<void> {
    return this.texturesService.setCubeMode(texture, mode);
  }

  async textureBlend(
    texture: BbScriptTexture,
    mode: TextureBlendMode
  ): Promise<void> {
    return this.texturesService.textureBlend(texture, mode);
  }

  async textureCoords(
    texture: BbScriptTexture,
    coordinate: boolean
  ): Promise<void> {
    return this.texturesService.textureCoords(texture, coordinate);
  }

  async textureFilter(searchText: string, mode: TextureMode): Promise<void> {
    return this.texturesService.textureFilter(searchText, mode);
  }

  async textureHeight(texture: BbScriptTexture): Promise<number> {
    return this.texturesService.textureHeight(texture);
  }

  async textureName(texture: BbScriptTexture): Promise<string> {
    return this.texturesService.textureName(texture);
  }

  async textureWidth(texture: BbScriptTexture): Promise<number> {
    return this.texturesService.textureWidth(texture);
  }
}
