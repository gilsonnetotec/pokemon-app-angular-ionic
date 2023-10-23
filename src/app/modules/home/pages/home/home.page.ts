import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { take } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { Pokemons } from 'src/app/core/models/pokemon.model';
import { BasePageComponent } from 'src/app/core/utils/BasePageComponent';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePageComponent implements OnInit {

  isLoading: boolean = true;
  isSearch: boolean = false;
  logo: any;
  namePokemon: string = ""; //ditto
  item: Pokemon | undefined;
  params: any = {
    limit: 10,
    offset: 0,
  }
  items: Pokemons[] = [];
  countItems: number = 0;

  constructor(private pokemonService: PokemonService) {
    super()
  }

  loadPage(type: any) {
    this.prepareType(type);
    this.load('page');
  }

  ngOnInit(): void {
    this.namePokemon = this.namePokemon.charAt(0).toUpperCase() + this.namePokemon.slice(1)
    this.load(true);
  }

  load(isSearch: any) {
    this.isSearch = isSearch;
    if (isSearch == true || isSearch == 'page') {
      if (isSearch == true) {
        this.paginate.start = 0;
      }
    }
    this.params.offset = this.paginate.start;
    this.pokemonService.getAll(this.params)
      .pipe(take(1))
      .subscribe((resp: any) => {
        const count = Math.ceil(Number(resp["count"]) / this.params.limit);
        this.countItems = resp["count"];
        this.paginate.total = count;
        this.items = resp["results"];
        this.isLoading = false;
      })

  }

  getPokemon(name: string) {
    this.pokemonService.getPokemon(name)
      .pipe(take(1))
      .subscribe((resp: any) => {
        this.item = resp;
        this.namePokemon = name;
        this.logo = this.item?.sprites.other['official-artwork'].front_default;
        this.isLoading = false;
      })
  }
}
