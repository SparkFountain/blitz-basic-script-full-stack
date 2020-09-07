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
        title: 'Stranded',
        description:
          'Stranded ist ein 3D Adventure, in dem man einen Schiffbrüchigen spielt und versuchen muss, möglichst lange zu überleben und von der Insel, auf der man gestrandet ist, zu fliehen.',
        license: 'CC0',
        author: 'DC',
        imageUrl: 'https://www.blitzforum.de/gallery/images/bc7d80ceb028.jpg',
      },
      {
        title: 'Stranded II',
        description:
          'Gestrandet - schon wieder! In Stranded II stellst du dich erneut dem Kampf ums Überleben. Dieses mal gibt es jedoch sehr viel mehr zu entdecken und zu erforschen als im Vorgänger.',
        license: 'CC0',
        author: 'DC',
        imageUrl: 'https://www.blitzforum.de/gallery/images/d7725424aac2.jpg',
      },
      {
        title: 'BlitzBoy',
        description:
          'Es handelt sich bei diesem Projekt um einen Gameboy Emulator, welcher komplett in BlitzBasic geschrieben wurde.',
        license: 'CC0',
        author: 'Jean',
        imageUrl: 'https://www.blitzforum.de/gallery/images/6540fb1f2fec.png',
      },
      {
        title: 'Twee World (Beta)',
        description:
          'Bei Twee World handelt es sich um ein 2D "MMO" welches in der Fantasy Welt Westland spielt. Die Welt ist frei erkundbar und bietet eine Vielzahl an zu entdeckenden Orten!',
        license: 'CC0',
        author: 'Myn',
        imageUrl: 'https://www.blitzforum.de/gallery/images/a67554a5a5d5.png',
      },
      {
        title: 'Silent Hill: a tale of silence',
        description:
          'Silent Hill: a tale of silence ist eine Huldigung an die guten alten Silent Hill Spiele (Teil 1-3) und kommt als Point-And-Click Adventure daher. Es hat zwar den charakteristischen Stil der Silent Hil Spiele, ist aber eher als lustige Parodie zu sehen.',
        license: 'CC0',
        author: 'Ratchet',
        imageUrl: 'https://www.blitzforum.de/gallery/images/b3cb45fdb34b.jpg',
      },
      {
        title: 'Unser Sonnensystem 2D',
        description:
          'Unser Sonnensystem 2D ist eine Simulation unseres Sonnensystems in 2D. Dabei sind die Sonne und ihre 8 Hauptplaneten vertreten und zusätzlich der Zwergplanet Pluto, welcher 2006 vom Planeten zum Zwergplaneten "degradiert" wurde.',
        license: 'CC0',
        author: 'Trust',
        imageUrl: 'https://www.blitzforum.de/gallery/images/9c1da048068f.jpg',
      },
      {
        title: 'Kenders Quest',
        description:
          "Es handelt sich hierbei um eine Demo-Version des Adventures Kender's Quest, welches ich aktuell am Programmieren bin. Das Spiel funktioniert in der Art der Lucasarts-Adventures à la Zak McKracken oder Monkey Island.",
        license: 'CC0',
        author: 'Xar',
        imageUrl: 'https://www.blitzforum.de/gallery/images/9eb28cdff693.png',
      },
      {
        title: 'Starfare',
        description:
          'Starfare ist ein echtzeit Strategiespiel, im Sci-Fi Gewand. In der fiktiven Zukunft des Spiels haben sich die Bewohner der Erde in vier Fraktionen aufgespalten, die aufgrund Streitigkeiten über Resourcen im Spielverlauf verfeindet werden.',
        license: 'CC0',
        author: 'ZaP',
        imageUrl: 'https://www.blitzforum.de/gallery/images/7f9478985f85.jpg',
      },
      {
        title: 'Chromatic',
        description:
          'In Chromatic muss der Spieler versuchen zufallsgenerierte Spielfelder per Mausklicks so zu manipulieren, dass nur noch eine grundlegende Farbe vorliegt (rot, blau, grün, gelb).',
        license: 'CC0',
        author: 'mDave',
        imageUrl: 'https://www.blitzforum.de/gallery/images/a63e4a770147.png',
      },
      {
        title: 'Mammoth Strike Six',
        description:
          'Tauche in das Universum von Mammoth Strike Six ein und erlebe effektreiche, rundenbasierte Weltraumschlachten mit bis zu drei menschlichen Mitspielern im Hot-Seat-Modus! Kontrolliere bildschirmfüllende Schlachtschiffe, gewaltige Minenleger, dunkle Kräfte aus den Tiefen schwarzer Löcher und andere mächtige, einzigartige Einheiten.',
        license: 'CC0',
        author: 'mDave',
        imageUrl: 'https://www.blitzforum.de/gallery/images/1c38a0903481.png',
      },
      {
        title: 'Runes of Myjal',
        description:
          'Runes of Myjal ist ein Towerdefense mit einer Welt die vom Spieler bereist und erkundet werden will. Der Orden der Runenwächter hat, als die Welt am Rande der Vernichtung stand, ein mächtiges Siegel erschaffen können, um die Schrecken die sie aus der Welt der Dämonen bedrohen für immer zu bannen, so dachten sie jedenfalls.',
        license: 'CC0',
        author: 'Ana',
        imageUrl: 'https://www.blitzforum.de/gallery/images/ab8f1f2ecaa2.jpg',
      },
      {
        title: 'logic4dude',
        description:
          'Bei logic4dude handelt es sich um ein Programm zum Simulieren logischer Schaltungen. Hierbei bedient man sich Bauteilen, welche mit Hilfe von Kabeln miteinander verbunden werden. Solche Bauteile können auf ankommende Signale reagieren, indem sie wiederum Signale ausgeben, welche schließlich an andere Bauteile gelangen können.',
        license: 'CC0',
        author: 'Lobby',
        imageUrl: 'https://www.blitzforum.de/gallery/images/6197e81cfe90.png',
      },
      {
        title: 'Plan Zero: The Bad Ops',
        description:
          '"Plan Zero: The Bad Ops" ist ein Top-Down Shooter, in dem es (mal wieder) um moderne Kriegsführung geht. Die glorreichen Operationen, die Bestandteil so vieler Computerspiele sind, sucht man hier allerdings vergeblich.',
        license: 'CC0',
        author: 'Jooohnie',
        imageUrl: 'https://www.blitzforum.de/gallery/images/e8b546a0f376.jpg',
      },
      {
        title: 'Carnage Contest',
        description:
          'Carnage Contest ist ein rundenbasiertes Multiplayerspiel in 2D. Gespielt wird aus der Seitenperspektive. Alle Spieler sind abwechselnd an der Reihe und verfügen über ein riesiges Waffenarsenal, mit dem sie ihre Gegner ausschalten können.',
        license: 'CC0',
        author: 'DC',
        imageUrl: 'https://www.blitzforum.de/gallery/images/7cbddf9c5907.jpg',
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
