import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomeService } from 'src/app/core/services/home.service';
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
  providers: [HomeService],
  declarations: [HomePage]
})
export class HomePageModule {}
