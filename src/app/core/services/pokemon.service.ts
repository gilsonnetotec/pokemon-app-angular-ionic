import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { Pokemons } from '../models/pokemon.model';

@Injectable({providedIn: 'root'})
export class PokemonService {
  base_url: string = `https://pokeapi.co/api/v2/pokemon/`;
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

  getAll(payload: any): Observable<Pokemons[]>{
    return this.httpClient.get<Pokemons[]>(this.base_url, {
      params: this.prepareParams(payload)
    });
  }

  getPokemon(name: string): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(`${this.base_url}${name}`);
  }

}