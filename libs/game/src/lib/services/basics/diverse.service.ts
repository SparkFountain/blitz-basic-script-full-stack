import { Injectable } from '@angular/core';

@Injectable()
export class CommandsBasicsDiverseService {
  constructor(/*private gameState: GameStateService*/) {}

  async appTitle(title: string, onEndMessage?: string): Promise<void> {
    return Promise.resolve(null /*this.gameState.setAppTitle(title)*/);
  }

  async commandLine(): Promise<void> {
    return null;
  }

  async debugLog(message: string): Promise<void> {
    console.log(message);
  }

  async getEnv(variable: string): Promise<any> {}

  async runtimeError(message: string): Promise<void> {}

  async runtimeStats(): Promise<void> {}

  async setEnv(variable: string, value: string): Promise<void> {}

  async systemProperty(property: string): Promise<void> {}
}
