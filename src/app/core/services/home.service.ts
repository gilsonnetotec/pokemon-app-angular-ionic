import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({providedIn: 'root'})
export class HomeService {
  base_url: string = `https://pokeapi.co/api/v2/`;
  constructor(private httpClient: HttpClient) { }

  prepareParams(paramsObj: any): HttpParams {
      let searchParams = new HttpParams();
      for(let key in paramsObj){
          if(paramsObj.hasOwnProperty(key)){
              searchParams = searchParams.append(key, paramsObj[key]);
          }
      }
      return searchParams;
  }

  /*getPokemon(name: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.base_url}pokemon/${name}`);
  }*/
  getPokemon(name: string): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(`${this.base_url}pokemon/${name}`);
  }

}