import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {
  pokemons: Pokemon[] = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(event: any = null): any {
    this.pokemonService.getPokemons().subscribe((resp: Pokemon[]) => {
      this.pokemons.push(...resp);
      if (event) {
        event.target.complete();
      }
    });
  }
}
