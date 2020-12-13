import { Injectable } from '@angular/core';
import { BbScriptTimer } from '../../classes/in-game/time-and-date/timer';
import { CommandsBasicsDiverseService } from './basics/diverse.service';
import { CommandsBasicsMathsService } from './basics/maths.service';
import { CommandsBasicsStringsService } from './basics/strings.service';
import { CommandsBasicsTimeRandomService } from './basics/time-random.service';

@Injectable()
export class CommandsBasicsService {
  constructor(
    private diverse: CommandsBasicsDiverseService,
    private maths: CommandsBasicsMathsService,
    private strings: CommandsBasicsStringsService,
    private timeRandom: CommandsBasicsTimeRandomService
  ) {}

  // DIVERSE
  async appTitle(title: string, onEndMessage?: string): Promise<void> {
    return this.diverse.appTitle(title, onEndMessage);
  }

  async commandLine(): Promise<void> {
    return this.diverse.commandLine();
  }

  async debugLog(message: string): Promise<void> {
    return this.diverse.debugLog(message);
  }

  async getEnv(variable: string): Promise<any> {
    return this.diverse.getEnv(variable);
  }

  async runtimeError(message: string): Promise<void> {
    return this.diverse.runtimeError(message);
  }

  async runtimeStats(): Promise<void> {
    return this.diverse.runtimeStats();
  }

  async setEnv(variable: string, value: string): Promise<void> {
    return this.diverse.setEnv(variable, value);
  }

  async systemProperty(property: string): Promise<void> {
    return this.diverse.systemProperty(property);
  }

  // MATHS
  async abs(value: number): Promise<number> {
    return this.maths.abs(value);
  }

  async acos(value: number): Promise<number> {
    return this.maths.acos(value);
  }

  async asin(value: number): Promise<number> {
    return this.maths.asin(value);
  }

  async atan(value: number): Promise<number> {
    return this.maths.atan(value);
  }

  async atan2(y: number, x: number): Promise<number> {
    return this.maths.atan2(y, x);
  }

  async bin(value: number): Promise<string> {
    return this.maths.bin(value);
  }

  async ceil(value: number): Promise<number> {
    return this.maths.ceil(value);
  }

  async cos(value: number): Promise<number> {
    return this.maths.cos(value);
  }

  async exp(value: number): Promise<number> {
    return this.maths.exp(value);
  }

  async float(value: number | string): Promise<number> {
    return this.maths.float(value);
  }

  async floor(value: number): Promise<number> {
    return this.maths.floor(value);
  }

  async hex(value: number | string): Promise<string> {
    return this.maths.hex(value);
  }

  async int(value: number | string): Promise<number> {
    return this.maths.int(value);
  }

  async log(value: number): Promise<number> {
    return this.maths.log(value);
  }

  async log10(value: number): Promise<number> {
    return this.maths.log10(value);
  }

  async pi(): Promise<number> {
    return this.maths.pi();
  }

  async sgn(value: number): Promise<number> {
    return this.maths.sgn(value);
  }

  async sin(value: number): Promise<number> {
    return this.maths.sin(value);
  }

  async sqr(value: number): Promise<number> {
    return this.maths.sqr(value);
  }

  async tan(value: number): Promise<number> {
    return this.maths.tan(value);
  }

  // STRINGS
  async asc(string: string): Promise<number> {
    return this.strings.asc(string);
  }

  async chr(value: number): Promise<string> {
    return this.strings.chr(value);
  }

  async instr(text: string, search: string, start: number): Promise<number> {
    return this.strings.instr(text, search, start);
  }

  async left(text: string, count: number): Promise<string> {
    return this.strings.left(text, count);
  }

  async len(text: string): Promise<number> {
    return this.strings.len(text);
  }

  async lower(text: string): Promise<string> {
    return this.strings.lower(text);
  }

  async lset(text: string, count: number): Promise<string> {
    return this.strings.lset(text, count);
  }

  async mid(text: string, start: number, count: number): Promise<string> {
    return this.strings.mid(text, start, count);
  }

  async replace(
    text: string,
    search: string,
    replace: string
  ): Promise<string> {
    return this.strings.replace(text, search, replace);
  }

  async right(text: string, count: number): Promise<string> {
    return this.strings.right(text, count);
  }

  async rset(text: string, count: number): Promise<string> {
    return this.strings.rset(text, count);
  }

  async str(value: number): Promise<string> {
    return this.strings.str(value);
  }

  async string(text: string, count: number): Promise<string> {
    return this.strings.string(text, count);
  }

  async trim(text: string): Promise<string> {
    return this.strings.trim(text);
  }

  async upper(text: string): Promise<string> {
    return this.strings.upper(text);
  }

  // TIME AND RANDOM
  async createTimer(frequency: number): Promise<any> {
    return this.timeRandom.createTimer(frequency);
  }

  async currentDate(): Promise<string> {
    return this.timeRandom.currentDate();
  }

  async currentTime(): Promise<string> {
    return this.timeRandom.currentTime();
  }

  async delay(milliSeconds: number): Promise<void> {
    return this.timeRandom.delay(milliSeconds);
  }

  async freeTimer(timer: BbScriptTimer): Promise<void> {
    return this.timeRandom.freeTimer(timer);
  }

  async milliSecs(): Promise<number> {
    return this.timeRandom.milliSecs();
  }

  async pauseTimer(timer: BbScriptTimer): Promise<void> {
    return this.timeRandom.pauseTimer(timer);
  }

  async rand(minOrMax: number, max?: number): Promise<number> {
    return this.timeRandom.rand(minOrMax, max);
  }

  async resetTimer(timer: BbScriptTimer): Promise<void> {
    return this.timeRandom.resetTimer(timer);
  }

  async resumeTimer(timer: BbScriptTimer): Promise<void> {
    return this.timeRandom.resumeTimer(timer);
  }

  async rnd(minOrMax: number, max: number): Promise<number> {
    return this.timeRandom.rnd(minOrMax, max);
  }

  async rndSeed(): Promise<number> {
    return this.timeRandom.rndSeed();
  }

  async seedRnd(value: string): Promise<void> {
    return this.timeRandom.seedRnd(value);
  }

  async timerTicks(): Promise<number> {
    return this.timeRandom.timerTicks();
  }

  async waitTimer(timer: any): Promise<void> {
    return this.timeRandom.waitTimer(timer);
  }
}
