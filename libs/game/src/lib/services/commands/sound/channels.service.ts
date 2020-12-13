import { Injectable } from '@angular/core';
import { BbScriptChannel } from '../../../classes/in-game/sound/channel';

@Injectable()
export class CommandsSoundChannelsService {
  constructor() {}

  async channelPan(channel: BbScriptChannel, balance: number): Promise<void> {}

  async channelPitch(
    channel: BbScriptChannel,
    frequency: number
  ): Promise<void> {}

  async channelPlaying(channel: BbScriptChannel): Promise<boolean> {
    return false;
  }

  async channelVolume(
    channel: BbScriptChannel,
    volume: number
  ): Promise<void> {}

  async pauseChannel(channel: BbScriptChannel): Promise<void> {}

  async resumeChannel(channel: BbScriptChannel): Promise<void> {}

  async stopChannel(channel: BbScriptChannel): Promise<void> {}
}
