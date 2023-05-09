import { Pokemon } from './../models/pokemon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
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
 
  getPokemons() {
    const url = this.nextUrl;
    const pokemons: Pokemon[] = [];

    if (url) {
      const options = {
        url,
        headers: {},
        params: {},
      };

      this.http.get<any>(options.url, {})
        .subscribe(
          response => {
          this.nextUrl = response.next;
          
          response.results.forEach((pokemon: any) => {
            this.http.get<any>(pokemon.url, {})
              .subscribe(
                response => {
                  const pokemonObject = new Pokemon(response);
                  pokemons.push(pokemonObject);
                },
                error => {
                  console.error(error);
                });
          });
        },
        error => {
          console.error(error);
        });
    }

    return pokemons;
  }
}
