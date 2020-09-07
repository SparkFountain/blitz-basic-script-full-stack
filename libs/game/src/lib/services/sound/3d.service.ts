import { Injectable } from "@angular/core";
import { BbScriptListener } from "bbscript/src/classes/in-game/sound/listener";
import { BbScriptEntity } from "bbscript/src/classes/in-game/3d/entity";
import { BbScriptSound } from "bbscript/src/classes/in-game/sound/sound";
import { BbScriptChannel } from "bbscript/src/classes/in-game/sound/channel";

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
