import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokeServiceService {

  URL_BASE = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    const url =`${this.URL_BASE}/pokemon?limit=150&offset=0`;
    return this.http.get<any>(url);
  }

  getPokeDetails(pokemonUrl: string) : Observable<any> {
    return this.http.get<any>(pokemonUrl);
  }
  
}
