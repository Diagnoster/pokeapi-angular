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
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatCardModule,
    MatButtonModule
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
  selectedValue: string;
  selectedPokemon: Pokemon | undefined;


  constructor(
    private pokeService: PokeServiceService, 
    private pokeHelperService: PokeHelperService,
    private router: Router,
    public dialog: MatDialog) {
    this.pokeList = [];
    this.pokemonList = [];
    this.totalPokemons = [];
    this.selectedValue = "";
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
    const observables: Observable<any>[] = [];
  
    for (let i = startIndex; i < endIndex; i++) {
      const pokemon = this.pokeList[i];
      if (pokemon) {
        observables.push(this.pokeService.getPokeDetails(pokemon.url));
      }
    }

    forkJoin(observables).subscribe((results: any[]) => {
      this.pokemonList = results;
    });
  }

  onPokemonSelectionChange(): void {
    if (this.selectedValue) {
      this.pokemonList = []; // clean pokemon list
      this.pokeService.getPokemon(this.selectedValue).pipe().subscribe((data: any) => {
        this.pokemonList.push(data); 
      });
    }
  }

  reloadPokemonList(): void {
    this.pokemonList = [];
    this.selectedValue = '';
    this.selectedPokemon = undefined;
    this.loadPokemonList();
  }

  upperFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

  getTypeRetroImageUrl(type: string) : string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }

  pokeModal(pokemon: any): void {
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
