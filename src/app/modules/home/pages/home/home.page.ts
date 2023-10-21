import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../core/services/home.service';
import { take } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading:boolean = true;
  logo: any;
  namePokemon:string =  "ditto";
  items: Pokemon | undefined;

  constructor(private homeService: HomeService) { 

  }

  ngOnInit(): void {
    this.namePokemon = this.namePokemon.charAt(0).toUpperCase() + this.namePokemon.slice(1)
    this.load();
  }

  load() {
    this.homeService.getPokemon("ditto")
      .pipe(take(1))
      .subscribe((resp: any) => {
        this.items = resp;
        this.logo = this.items?.sprites.other['official-artwork'].front_default;
        this.isLoading = false;
      })
  }
}
