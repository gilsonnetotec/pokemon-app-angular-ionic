import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { take } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { Pokemons } from 'src/app/core/models/pokemon.model';
import { LocationArea } from 'src/app/core/models/location-area';
import { LocationAreaService } from 'src/app/core/services/location-area.service';
import { BasePageComponent } from 'src/app/core/utils/BasePageComponent';
import { Abilities } from 'src/app/core/models/abilities.model';
import { Forms } from 'src/app/core/models/forms.model';
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
  locationAreas: LocationArea [] = [];
  items: Pokemons[] = [];
  countItems: number = 0;
  abilities: Abilities[] = [];
  forms: Forms[] = [];

  constructor(private pokemonService: PokemonService, private locationService: LocationAreaService) {
    super()
  }

  loadPage(type: any) {
    this.prepareType(type);
    this.load('page');
  }

  ngOnInit(): void {
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
      .subscribe((resp: Pokemons | any) => {
        const count = Math.ceil(Number(resp["count"]) / this.params.limit);
        this.countItems = resp["count"];
        this.paginate.total = count;
        this.items = resp["results"];
        if (this.paginate.start == 0) {
          this.getPokemon(this.items[0].name);
        }
        this.isLoading = false;
      })

  }

  getPokemon(name: string) {
    this.pokemonService.getPokemon(name)
      .pipe(take(1))
      .subscribe((resp: Pokemon | any) => {
        this.item = resp;
        this.abilities = [];
        this.item?.abilities.forEach((e: Abilities) => {
          this.abilities.push(e);
        });
        this.forms = [];
        this.item?.forms.forEach((e: Forms | any) => {
          this.forms.push(e);
        });
        this.namePokemon = name;
        this.namePokemon = this.namePokemon.charAt(0).toUpperCase() + this.namePokemon.slice(1)
        this.logo = this.item?.sprites.other['official-artwork'].front_default;
        this.getArea(this.item?.location_area_encounters);
      })
  }

  getArea(url: any) {
    console.log(url)
    this.locationService.getArea(url)
    .pipe(take(1))
    .subscribe((resp: LocationArea | any)=>{
      this.locationAreas = resp;
    });
  }
}
