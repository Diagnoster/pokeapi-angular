import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeServiceService } from '../service/poke-service.service';
import { Pokemon } from '../models/pokemon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [PokeServiceService],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent implements OnInit {

  pokeList: Pokemon[];
  pokemonList: any[] = [];

  constructor(private pokeService: PokeServiceService , private router: Router) {
    this.pokeList = [];
    this.pokemonList = [];
  }

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.pokeService.getPokemons()
      .subscribe((data) => {
        this.pokeList = data.results;
        this.loadPokemonDetails(this.pokeList);
      });
  }
  
  loadPokemonDetails(pokeList: Pokemon[]): void {
    pokeList.forEach(pokemon => {
      this.pokeService.getPokeDetails(pokemon.url).subscribe((data) => {
        this.pokemonList.push(data);
      });
    });
  }

  getColorForType(type: string): string {
    switch (type) {
      case 'fire':
        return '#FF7F7F';
      case 'water':
        return '#51A8FF';
      case 'grass':
        return '#8BD36E';
      case 'poison':
        return '#A95498'
      case 'bug':
        return '#AABB22';
      case 'fairy':
          return '#EE99EE';
      case 'ground':
          return '#DDBB55';
      case 'steel':
          return '#AAAABB';
      case 'fighting':
          return '#BB5544';
      default:
        return '#AAAA99';
    }
  }
  

}
