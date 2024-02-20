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
import { PokemonType } from '../../models/enums/pokemon-type';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatAutocompleteModule
  ],
  providers: [PokeServiceService],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent implements OnInit {

  pokeList: Pokemon[];
  allPokemonList: Pokemon[]; // for use in matAutocomplete
  pokemonList: Pokemon[];
  filteredPokemonList: Pokemon[]; 
  selectedPokemon: string = '';
  loading: boolean = true;
  loadingMore: boolean = false;
  pageSize = 30;
  currentPage = 1;

  constructor(
    private pokeService: PokeServiceService, 
    private pokeHelperService: PokeHelperService,
    private router: Router,
    public dialog: MatDialog) {
    this.pokeList = [];
    this.allPokemonList = [];
    this.filteredPokemonList = [];
    this.pokemonList = [];
  }

  ngOnInit(): void {
    this.loadAllPokemons();
    this.loadInitialPokemon();
  }

  loadAllPokemons() : void {
    this.pokeService.getPokemons().subscribe((data: any) => {
      this.allPokemonList = data.results;
    })
  }

  loadInitialPokemon(): void {
    this.loading = true;
    this.pokeService.getPokemonsLazy(0, this.pageSize) // first pokemon loading
      .subscribe((data: any) => {
        this.pokeList = data.results;
        this.loadPokemonDetails(this.pokeList);
        this.loading = false;
        console.log(data.results);
      });
  }
  
  onScroll(): void {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
  
    if (scrollPercentage > 90 && !this.loading && !this.loadingMore) {
      this.loadingMore = true;
      this.loading = true;
      this.currentPage++;
      this.loadMorePokemon();
    }
  }
  
  loadMorePokemon(): void {
    console.log('Loading more Pokemon...' + this.currentPage);
    this.pokeService.getPokemonsLazy((this.currentPage - 1) * this.pageSize, this.pageSize)
      .subscribe((data: any) => {
        this.pokeList = data.results;
        this.loadPokemonDetails(this.pokeList);
        console.log('Updated pokeList:', this.pokeList);
        this.loading = false;
        this.loadingMore = false;
      });
  }
  
  loadPokemonList(): void {
    this.pokeService.getPokemons()
      .subscribe((data: any) => {
        this.pokeList = data.results;
        this.loadPokemonDetails(this.pokeList);
      });
  }

  loadPokemonDetails(pokeList: Pokemon[]): void {
    this.loading = true;
    const requests = pokeList.map(pokemon => this.pokeService.getPokeDetails(pokemon.url));
  
    forkJoin(requests).subscribe((responses: any[]) => {
      responses.forEach(data => {
        this.pokemonList.push(data);
      });
      this.loading = false;
    });
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

  filterPokemonList() {
    this.filteredPokemonList = this.pokemonList.filter(pokemon => 
      pokemon && pokemon.name && pokemon.name.toLowerCase().includes(this.selectedPokemon.toLowerCase())
    );
  }
  
  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.filteredPokemonList = [];
    const selectedPokemonName = event.option.viewValue;
    this.pokeService.getPokemon(selectedPokemonName).subscribe((pokemonDetails) => {
      this.filteredPokemonList.push(pokemonDetails);
    });
  }

  pokeModal(pokemon: any): void {
    this.dialog.open(PokemonDetailsComponent, {
      width: '750px',
      data: { pokemon },
    });
  }
}
