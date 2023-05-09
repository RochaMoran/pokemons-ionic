import { Pokemon } from './../models/pokemon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _nextUrl: string;

  constructor(private http: HttpClient) {
    this._nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
  }

  public get nextUrl(): string {
    return this._nextUrl;
  }
  public set nextUrl(value: string) {
    this._nextUrl = value;
  }

  getPokemons(): any {
    const url = this.nextUrl;

    if (url) {
      const options = {
        url,
        headers: {},
        params: {},
      };

      return this.http.get<any>(options.url, {}).pipe(
        //Transforma la respuesta en un observable
        mergeMap((response: any) => {
          //Almacenara los observables de getPokemon
          const pokemons: Observable<Pokemon>[] = [];
          this.nextUrl = response.next;

          response.results.map((pokemon: any) => {
            pokemons.push(this.getPokemon(pokemon));
          });

          //Espera y fusiona los resultados de los observables en un solo observable
          return forkJoin(pokemons);
        })
      );
    }
  }

  getPokemon(pokemon: any): any {
    return this.http.get<any>(pokemon.url, {}).pipe(
      map((response) => {
        return new Pokemon(response);
      })
    );
  }
}
