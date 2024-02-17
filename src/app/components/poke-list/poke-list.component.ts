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
import { Observable, forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';


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
    MatProgressBarModule
  ],
  providers: [PokeServiceService],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent implements OnInit {

  pokeList: Pokemon[];
  pokemonList: Pokemon[] = [];
  selectedValue: string;
  selectedPokemon: Pokemon | undefined;
  loading: boolean = true;

  constructor(
    private pokeService: PokeServiceService, 
    private pokeHelperService: PokeHelperService,
    private router: Router,
    public dialog: MatDialog) {
    this.pokeList = [];
    this.pokemonList = [];
    this.selectedValue = "";
  }

  ngOnInit(): void {
    this.loadPokemonList();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pokemonList = this.pokemonList.filter(poke => 
      poke.name.toLowerCase().indexOf(filterValue) >= 0 );

  }
  
  
}
