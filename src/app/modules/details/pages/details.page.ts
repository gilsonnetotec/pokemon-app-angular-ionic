import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { take } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { Pokemons } from 'src/app/core/models/pokemon.model';
import { LocationArea } from 'src/app/core/models/location-area';
import { LocationAreaService } from 'src/app/core/services/location-area.service';
import { BasePageComponent } from 'src/app/core/utils/BasePageComponent';
import { Abilities } from 'src/app/core/models/abilities.model';
import { Forms } from 'src/app/core/models/forms.model';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-details',
    templateUrl: 'details.page.html',
    styleUrls: ['details.page.scss'],
})
export class DetailsPage implements OnInit {

    isLoading: boolean = true;
    logo: any;
    namePokemon: string = ""; //ditto
    item: Pokemon | undefined;
    locationAreas: LocationArea[] = [];
    countItems: number = 0;
    abilities: Abilities[] = [];
    forms: Forms[] = [];

    constructor(private pokemonService: PokemonService, private locationService: LocationAreaService, private route: ActivatedRoute) {
    }


    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.getPokemon(params['name']);
        });
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
        this.locationService.getArea(url)
            .pipe(take(1))
            .subscribe((resp: LocationArea | any) => {
                this.locationAreas = resp;
            });
    }

    getReturn() {
        window.history.back();
    }
}