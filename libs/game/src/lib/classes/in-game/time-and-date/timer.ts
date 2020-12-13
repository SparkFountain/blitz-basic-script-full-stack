export class BbScriptTimer {
  instance: any;

  constructor(frequency: number) {
    this.instance = setInterval(() => {}, 1000 / frequency);
  }
}
