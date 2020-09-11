import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LanguageService {
  public keywords: object;
  public deprecatedKeywords: object;
  public commands: object;
  public deprecatedCommands: object;

  constructor(private http: HttpClient) {
    this.initialize();
  }

  public async initialize(): Promise<void> {
    console.info('Initializing Language Service...');

    this.keywords = {};
    this.deprecatedKeywords = {};
    this.commands = {};
    this.deprecatedCommands = {};

    // TODO: implement
    return Promise.resolve();

    // return this.http
    //   .get('/assets/keywords.json')
    //   .toPromise()
    //   .then((keywords: object) => {
    //     this.keywords = keywords;

    //     this.http
    //       .get('/assets/commands.json')
    //       .toPromise()
    //       .then((commands: object) => {
    //         this.commands = commands;

    //         // if (responses[1].status === 'success') {
    //         //     responses[1].data.forEach((apiKeyword: ApiKeyword) => {
    //         //         this.deprecatedKeywords[apiKeyword.name.toLowerCase()] = true;
    //         //     });
    //         // }

    //         // if (responses[3].status === 'success') {
    //         //     responses[3].data.forEach((apiCommand: ApiCommand) => {
    //         //         this.deprecatedCommands[apiCommand.name.toLowerCase()] = apiCommand;
    //         //     });
    //         // }

    //         console.info('Done');
    //       });
    //   });
  }
}
