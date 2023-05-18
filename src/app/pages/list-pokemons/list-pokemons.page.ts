import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {
  pokemons: Pokemon[] = [];
  constructor(
    private pokemonService: PokemonService, 
    private loadingController: LoadingController,
    private navController: NavController,
    private navParams: NavParams
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

   getPokemons(event: any = null) {
    this.pokemonService.getPokemons().subscribe(async (resp: Pokemon[]) => {
      this.pokemons.push(...resp);
      const loading = await this.loadingController.create({
        message: 'Cargando...',
        duration: 3000,
      });
      
      if (event) {
        event.target.complete();
        loading.dismiss();
      } else {
        loading.present();
      }
    });
  }

  handleDetail(pokemon: Pokemon) {
    this.navParams.data['pokemon'] = pokemon;
    this.navController.navigateForward('/detail-pokemon');
  }
}
