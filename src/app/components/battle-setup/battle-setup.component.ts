import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { PokeService } from '../../services/poke.service';
import { Pokemon } from '../../models/pokemon';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovesComponent } from '../moves/moves.component';

@Component({
  selector: 'app-battle-setup',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MovesComponent
  ],
  templateUrl: './battle-setup.component.html',
  styleUrl: './battle-setup.component.css'
})
export class BattleSetupComponent implements OnInit {
  allPokemonListPlayer: Pokemon[];
  allPokemonListEnemy: Pokemon[];
  selectedPokemonPlayer: string = '';
  selectedPokemonEnemy: string = '';
  playerPokemon: any;
  enemyPokemon: any;
  total!: number;

  constructor(private pokeService: PokeService, private pokeHelper: PokeHelperService) {
    this.allPokemonListPlayer = [];
    this.allPokemonListEnemy= [];
    this.playerPokemon = undefined;
  }

  ngOnInit(): void {
    this.loadAllPokemons();
    console.log(this.playerPokemon);
  }

  loadAllPokemons() : void {
    this.pokeService.getPokemons().subscribe((pokemons: any) => {
      this.allPokemonListPlayer = pokemons.results;
      this.allPokemonListEnemy = pokemons.results;
    })
  }

  onEnemyOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedPokemonName = event.option.viewValue;
    this.pokeService.getPokemon(selectedPokemonName).subscribe((pokemonDetails) => {
      this.enemyPokemon = pokemonDetails;
    });
  }

  onPlayerOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedPokemonName = event.option.viewValue;
    this.pokeService.getPokemon(selectedPokemonName).subscribe((pokemonDetails) => {
      this.playerPokemon = pokemonDetails;
    });
  }

  getTypeDetailImageUrl(type: string): string {
    return this.pokeHelper.getTypeDetailImageUrl(type);
  }
  
  clearInput(string: string) {
    if (string === 'player') {
      this.selectedPokemonPlayer = "";
    } else if (string === 'enemy') {
        this.selectedPokemonEnemy = "";
    }
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelper.upperFirstLetter(word);
  }
  
  
}
