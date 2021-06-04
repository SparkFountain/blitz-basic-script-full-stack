import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDividerModule } from '@angular/material/divider';
import { InspectorComponent } from './inspector.component';
import { SoundComponent } from './sound/sound.component';
import { MeshComponent } from './mesh/mesh.component';
import { TextureComponent } from './texture/texture.component';
import { ScriptComponent } from './script/script.component';
import { LightComponent } from './light/light.component';
import { CameraComponent } from './camera/camera.component';
import { TerrainComponent } from './terrain/terrain.component';

@NgModule({
  declarations: [ImageComponent, InspectorComponent, SoundComponent, MeshComponent, TextureComponent, ScriptComponent, LightComponent, CameraComponent, TerrainComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ],
  exports: [ImageComponent, InspectorComponent],
})
export class InspectorModule {}
