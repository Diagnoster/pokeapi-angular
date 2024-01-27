import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokeServiceService } from '../../services/poke-service.service';
import { PokemonType } from '../../models/pokemon-type';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [PokeServiceService],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent implements OnInit {

  pokeList: Pokemon[];
  pokemonList: Pokemon[] = [];
  pageSize: number = 30;
  page: number = 1; 
  totalPokemons: Pokemon [];

  constructor(
    private pokeService: PokeServiceService, 
    private router: Router,
    public dialog: MatDialog) {
    this.pokeList = [];
    this.pokemonList = [];
    this.totalPokemons = [];
  }

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.pokeService.getPokemons()
      .subscribe((data: any) => {
        this.pokeList = data.results;
        if(this.totalPokemons != null){
          this.totalPokemons = data.results;
        }
        this.loadPokemonDetails(0, 30);
      });
  }
  
  loadPokemonDetails(startIndex: number, endIndex: number): void {
    for (let i = startIndex; i < endIndex; i++) {
      const pokemon = this.pokeList[i];
      this.pokeService.getPokeDetails(pokemon.url).subscribe((data: any) => {
        this.pokemonList.push(data);
      });
    }
  }

  upperFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

  getTypeImageUrl(type: string): string {
    const imagePath = `assets/retro-icons/${type.toLowerCase()}.png`;
    return imagePath;
  }

  pokeModal(pokemon: any): void {
    console.log(pokemon);
    this.dialog.open(PokemonDetailsComponent, {
      width: '750px',
      data: { pokemon },
    });
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pokemonList = []; // clean list
    this.loadPokemonDetails(startIndex, endIndex);
  }
  
  
}
