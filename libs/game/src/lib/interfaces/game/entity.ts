import {EntityClass} from '../../enums/entity/entity-class';
import { Camera, Mesh, Sprite, Light } from 'babylonjs';

export interface GameEntity {
    name: string;
    class: EntityClass;
    parent: GameEntity | null;
    mesh?: Mesh;
    camera?: Camera;
    sprite?: Sprite;
    light?: Light;
}
