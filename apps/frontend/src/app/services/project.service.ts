import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '@blitz-basic-script/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // TODO: remove this test variable when implementation is done
  testProjects: Project[];

  constructor(private http: HttpClient) {
    this.testProjects = [
      {
        title: 'Capitalism',
        description:
          'I moan oiwei gscheit Hemad a bissal Watschnbaam Baamwach, Spezi schnacksln des hi wos. Singan i daad aba des muas ma hoid kenna a ganze glei Guglhupf Blosmusi i hob di narrisch gean Maibam Brezn. Sog i nia need Maßkruag Heimatland spernzaln pfenningguat hoggd Schdarmbeaga See Trachtnhuat auf der Oim, da gibt’s koa Sünd hea.',
        license: 'CC0',
        author: 'Karl Marx',
        imageUrl: '/assets/gfx/projects/capitalism.jpg',
      },
      {
        title: 'Chess',
        description:
          'Namidog i moan scho aa Schuabladdla mogsd a Bussal sowos. I bin a woschechta Bayer jo mei gwiss, gelbe Rüam Fünferl o’ha. Jo leck mi an is des wiad a Mordsgaudi Baamwach Oachkatzlschwoaf Meidromml Oachkatzlschwoaf hoid umma a ganze Hoiwe. Glacht Bradwurschtsemmal blärrd Fünferl. Schaugn amoi woaß fei.',
        license: 'CC0',
        author: 'Michaela Bußmann',
        imageUrl: '/assets/gfx/projects/chess.jpg',
      },
      {
        title: "Don't Get Angry",
        description:
          'Kaiwe etza a geh vasteh Edlweiss kummd Almrausch, oans. Und sei wia Fünferl kimmt Schaung kost nix Ohrwaschl Zwedschgndadschi scheans i moan scho aa?',
        license: 'CC0',
        author: 'Martin Walczyk',
        imageUrl: '/assets/gfx/projects/dont-get-angry.jpg',
      },
      {
        title: 'Mario',
        description:
          'Schnacksln Auffisteign Radi san! Schdeckalfisch Goaßmaß Brezn großherzig samma Reiwadatschi Diandldrahn fei oba Radler: Hetschapfah back mas sei Haferl Weibaleid du dadst ma scho daugn, nia need fensdaln Ramasuri a bissal.',
        license: 'CC0',
        author: 'Lisa Schenker',
        imageUrl: '/assets/gfx/projects/mario.jpg',
      },
      {
        title: 'Puzzles',
        description:
          'Brezn glacht wolln am acht’n Tag schuf Gott des Bia midanand Schuabladdla wia amoi allerweil mei. I naa an hob hoam hallelujah sog i, luja a fescha Bua, kummd. Des is hoid aso a middn Auffisteign Fünferl, fei!',
        license: 'CC0',
        author: 'Lasse Pietsch',
        imageUrl: '/assets/gfx/projects/puzzles.jpg',
      },
      {
        title: 'Soccer',
        description:
          'Pfundig schnacksln Biaschlegl Milli und Deandlgwand, sodala Guglhupf a Prosit der Gmiadlichkeit. Auszutzeln mechad hob i an Suri i daad schaugn gscheckate da da Kini soi Baamwach! Mamalad gwihss Blosmusi, zwoa sei! Geh do Obazda hoid geh Habedehre schaugn, Hemad.',
        license: 'CC0',
        author: 'Franz Xaver Schaffrath',
        imageUrl: '/assets/gfx/projects/soccer.jpg',
      },
      {
        title: 'Ugly Monsters',
        description:
          'Griasd eich midnand wo hi jedza mehra Zwedschgndadschi soi moand Enzian! Großherzig Bladl soi is kloan pfundig, Semmlkneedl. Kneedl mechad Kirwa nix Gwiass woass ma ned zwoa und sei Biakriagal helfgod i hab an!',
        license: 'CC0',
        author: 'Jonas Ebner',
        imageUrl: '/assets/gfx/projects/ugly-monsters.jpg',
      },
    ];
  }

  public getDemoProjects(): Promise<any> {
    return Promise.resolve(this.testProjects);
  }

  public getMyProjects(): Promise<any> {
    return null;
  }

  public getCommunityProjects(): Promise<any> {
    return null;
  }
}
