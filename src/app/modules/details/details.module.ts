import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { LocationAreaService } from 'src/app/core/services/location-area.service';
import { DetailsRoutingModule } from './details.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailsPage } from './pages/details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    DetailsRoutingModule
  ],
  providers: [PokemonService, LocationAreaService],
  declarations: [DetailsPage]
})
export class DetailsPageModule { }