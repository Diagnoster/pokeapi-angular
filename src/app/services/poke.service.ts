import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Moves } from '../models/moves';
import { Nature } from '../models/nature';
import { BaseClass } from '../models/base/base-class';
import { ItemDetails } from '../models/item-details';
import { AbilitiesDetails } from '../models/abilities-details';
import { MoveDetails } from '../models/move-details';

@Injectable({
  providedIn: 'root'
})

export class PokeService {

  URL_BASE = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    const url =`${this.URL_BASE}/pokemon?limit=905&offset=0`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokemonsLazy(offset: number, limit: number): Observable<Pokemon[]> {
    const url =`${this.URL_BASE}/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<Pokemon[]>(url);
  }

  getPokeDetails(pokemonUrl: string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(pokemonUrl);
  }

  getPokemon(pokemon: string): Observable<Pokemon> {
    const url = `${this.URL_BASE}/pokemon/${pokemon}`;
    return this.http.get<Pokemon>(url);
  }

  getPokemonById(pokemon: number): Observable<Pokemon> {
    const url = `${this.URL_BASE}/pokemon/${pokemon}`;
    return this.http.get<Pokemon>(url);
  }

  getPokeMoves(moveUrl: string): Observable<MoveDetails> {
    return this.http.get<MoveDetails>(moveUrl);
  }

  getAbility(abilityUrl: string): Observable<AbilitiesDetails> {
    return this.http.get<AbilitiesDetails>(abilityUrl);
  }

  getAllMoves() : Observable<Moves[]> {
    const url = `${this.URL_BASE}/move?offset=0&limit=937`;
    return this.http.get<Moves[]>(url);
  }

  getItens(itemUrl: string) : Observable<ItemDetails> {
    return this.http.get<ItemDetails>(itemUrl);
  }

  getSelectOption(item: string) : Observable<any> {
    const url = `${this.URL_BASE}/${item}`;
    return this.http.get<any>(url);
  }

  getAbilities(): Observable<BaseClass[]> {
    const url = `${this.URL_BASE}/ability/?offset=0&limit=240`;
    return this.http.get<BaseClass[]>(url);
  }

  getNatures(): Observable<any> {
    const url = `${this.URL_BASE}/nature/?offset=0&limit=25`;
    return this.http.get<any>(url);
  }

  getNatureDetails(natureUrl: string): Observable<Nature> {
    return this.http.get<Nature>(natureUrl);
  }

  getSpecie(specieUrl: string): Observable<any> {
    return this.http.get<any>(specieUrl);
  }

  getEvolutionChain(evolutionUrl: string): Observable<any> {
    return this.http.get<any>(evolutionUrl);
  }

  getAllGenerations(): Observable<any> {
    const url =`${this.URL_BASE}/generation/`;
    return this.http.get<any>(url);
  }

  getAllLocations(): Observable<any> {
    const url = `${this.URL_BASE}/region`;
    return this.http.get<any>(url);
  }
  
}
