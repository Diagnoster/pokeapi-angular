import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokeService {

  URL_BASE = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    const url =`${this.URL_BASE}/pokemon?limit=905&offset=0`;
    return this.http.get<any>(url);
  }

  getPokemonsLazy(offset: number, limit: number): Observable<any> {
    const url =`${this.URL_BASE}/pokemon?offset=${offset}&limit=${limit}`;
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

  getAbility(abilityUrl: string): Observable<any> {
    return this.http.get<any>(abilityUrl);
  }

  getAllMoves() : Observable<any> {
    const url = `${this.URL_BASE}/move?offset=0&limit=937`;
    return this.http.get<any>(url);
  }

  getItens(itemUrl: string) : Observable<any> {
    return this.http.get<any>(itemUrl);
  }

  getSelectOption(item: string) : Observable<any> {
    const url = `${this.URL_BASE}/${item}`;
    return this.http.get<any>(url);
  }

  getAbilities(): Observable<any> {
    const url = `${this.URL_BASE}/ability/?offset=0&limit=240`;
    return this.http.get<any>(url);
  }

  getNatures(): Observable<any> {
    const url = `${this.URL_BASE}/nature/?offset=0&limit=25`;
    return this.http.get<any>(url);
  }

  getNatureDetails(natureUrl: string): Observable<any> {
    return this.http.get<any>(natureUrl);
  }
  
}
