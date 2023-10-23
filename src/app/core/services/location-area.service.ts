import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationArea } from '../models/location-area';

@Injectable({ providedIn: 'root' })
export class LocationAreaService {
    base_url: string = `https://pokeapi.co/api/v2/pokemon/1/encounters`;
    constructor(private httpClient: HttpClient) { }

    prepareParams(paramsObj: any): HttpParams {
        let searchParams = new HttpParams();
        for (let key in paramsObj) {
            if (paramsObj.hasOwnProperty(key)) {
                searchParams = searchParams.append(key, paramsObj[key]);
            }
        }
        return searchParams;
    }

    getArea(url: string): Observable<LocationArea[]> {
        if (url !== '' || url !== undefined) {
            this.base_url = url;
        }
        return this.httpClient.get<LocationArea[]>(`${this.base_url}`);
    }

}