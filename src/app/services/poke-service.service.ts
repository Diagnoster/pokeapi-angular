import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { MoveDetails } from '../models/move-details';

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

  getPokemon(pokemon: string): Observable<any> {
    const url = `${this.URL_BASE}/pokemon/${pokemon}`;
    return this.http.get<any>(url);
  }

  getDamageRelations(typeUrl: string): Observable<any> {
    const url = `${typeUrl}`;
    return this.http.get<any>(url);
  }

  getPokeMoves(moveUrl: string): Observable<any> {
    return this.http.get<any>(moveUrl);
  }
  
}
