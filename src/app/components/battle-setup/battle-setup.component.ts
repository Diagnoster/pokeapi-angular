import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { MoveDetails } from '../../models/move-details';
import { PokemonType } from '../../models/enums/pokemon-type';
import { BattleFightComponent } from '../battle-fight/battle-fight.component';
import { MatTabsModule } from '@angular/material/tabs';

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
    MovesComponent,
    MatTabsModule
  ],
  templateUrl: './battle-setup.component.html',
  styleUrl: './battle-setup.component.css'
})
export class BattleSetupComponent implements OnInit {
  allPokemonListPlayer: Pokemon[];
  allPokemonListEnemy: Pokemon[];
  selectedPokemonPlayer: string = '';
  selectedPokemonEnemy: string = '';
  playerPokemon!: Pokemon | undefined;
  enemyPokemon!: Pokemon | undefined;
  total!: number;
  playerSelectedMoves: MoveDetails[] = [];
  enemySelectedMoves: MoveDetails[] = [];

  constructor(private pokeService: PokeService, private pokeHelper: PokeHelperService, public dialog: MatDialog) {
    this.allPokemonListPlayer = [];
    this.allPokemonListEnemy = [];
  }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.pokeService.getPokemons().subscribe((pokemons: any) => {
      this.allPokemonListPlayer = pokemons.results;
      this.allPokemonListEnemy = pokemons.results;
    })
  }

  getTypeDetailImageUrl(type: string): string {
    return this.pokeHelper.getTypeDetailImageUrl(type);
  }

  clearInput(string: string) {
    if (string === 'player') {
      this.selectedPokemonPlayer = "";
      this.playerSelectedMoves = [];
      this.playerPokemon = undefined;
    } else if (string === 'enemy') {
      this.selectedPokemonEnemy = "";
      this.enemySelectedMoves = [];
      this.enemyPokemon = undefined;
    }
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelper.upperFirstLetter(word);
  }

  onSelectedMovesChange(pokemon: Pokemon, moves: MoveDetails[]) {
    if (pokemon === this.playerPokemon) {
      this.playerSelectedMoves = moves;
    } else if (pokemon === this.enemyPokemon) {
      this.enemySelectedMoves = moves;
    }
  }

  onEnemyOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedPokemonName = event.option.viewValue;
    this.pokeService.getPokemon(selectedPokemonName).subscribe((pokemonDetails) => {
      this.enemyPokemon = pokemonDetails;
      this.enemySelectedMoves = [];
      if(this.enemyPokemon) {
        this.calculateTotalStats(this.enemyPokemon);
      }
    });
  }

  onPlayerOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedPokemonName = event.option.viewValue;
    this.pokeService.getPokemon(selectedPokemonName).subscribe((pokemonDetails) => {
      this.playerPokemon = pokemonDetails;
      this.playerSelectedMoves = [];
      if (this.playerPokemon) {
        this.calculateTotalStats(this.playerPokemon);
      }
    });
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

  fightModal(): void {
    this.dialog.open(BattleFightComponent, {
      data: {
        playerPokemon: this.playerPokemon,
        playerSelectedMoves: this.playerSelectedMoves,
        enemySelectedMoves: this.enemySelectedMoves,
        enemyPokemon: this.enemyPokemon,
      },
    });
  }

  calculateTotalStats(pokemon: Pokemon): void {
    this.total = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  }

}
