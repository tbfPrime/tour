import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb() {
    const heroes = [
      { id: 12, name: 'Hero 12' },
      { id: 13, name: 'Hero 13' },
      { id: 14, name: 'Hero 14' },
      { id: 15, name: 'Hero 15' },
      { id: 16, name: 'Hero 16' },
      { id: 17, name: 'Hero 17' },
      { id: 18, name: 'Hero 18' },
      { id: 19, name: 'Hero 19' }
    ];

    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
