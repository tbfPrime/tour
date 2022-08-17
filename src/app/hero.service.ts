import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock_heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    //const heroes = of(HEROES);
    // this.log(`fetched heroes`);
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    //return heroes;
  }
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id);
    // this.log(`fetched hero id=${id}`);
    // return of(hero);

    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any) : Observable <T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
