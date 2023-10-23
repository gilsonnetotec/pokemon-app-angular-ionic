import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home/pages/home/home.page';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { LocationAreaService } from '../core/services/location-area.service';
import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  providers: [PokemonService, LocationAreaService],
  declarations: [HomePage]
})
export class HomePageModule { }
