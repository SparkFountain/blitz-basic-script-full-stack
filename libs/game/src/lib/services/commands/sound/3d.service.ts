import { Injectable } from '@angular/core';
import { BbScriptEntity } from '../../../classes/in-game/3d/entity';
import { BbScriptChannel } from '../../../classes/in-game/sound/channel';
import { BbScriptListener } from '../../../classes/in-game/sound/listener';
import { BbScriptSound } from '../../../classes/in-game/sound/sound';

@Injectable()
export class CommandsSound3DService {
  constructor() {}

  async createListener(
    parent: BbScriptEntity,
    rolloff?: number,
    doppler?: number,
    distance?: number
  ): Promise<BbScriptListener> {
    return null;
  }

  async emitSound(
    sound: BbScriptSound,
    entity: BbScriptEntity
  ): Promise<BbScriptChannel> {
    return null;
  }

  async load3DSound(filePath: string): Promise<BbScriptSound> {
    return null;
  }
}
