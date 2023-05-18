import { NavParams, NavController } from '@ionic/angular';
import { Pokemon } from './../../models/pokemon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
})
export class DetailPokemonPage implements OnInit {
  public pokemon: Pokemon;
  constructor(private navParams: NavParams, private navController: NavController) {
    this.pokemon = this.navParams.data['pokemon'];
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.navigateBack('');
  }
}
