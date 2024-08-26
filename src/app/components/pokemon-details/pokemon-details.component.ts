import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokeService } from '../../services/poke.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonType } from '../../models/enums/pokemon-type';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoveDetails } from '../../models/move-details';
import { MatInputModule } from '@angular/material/input';
import { AbilitiesDetailsComponent } from '../abilities-details/abilities-details.component';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MovesComponent } from '../moves/moves.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MovesComponent,
    MatSnackBarModule
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})

export class PokemonDetailsComponent implements OnInit {

  pokemon!: Pokemon;
  total!: number;
  moves: MoveDetails[];
  displayedColumns = ['name', 'type', 'power', 'accuracy'];
  dataSource = new MatTableDataSource<MoveDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private pokeService: PokeService, private pokeHelperService: PokeHelperService, private snackBar: MatSnackBar) {
    this.pokemon = data.pokemon;
    this.moves = [];
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.calculateTotalStats();
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }
  
  getTypeDetailImageUrl(type: string): string {
    return this.pokeHelperService.getTypeDetailImageUrl(type);
  }
  
  calculateTotalStats(): void {    
    this.total = 0;
    this.pokemon.stats.forEach(stat => {
      this.total = this.total + stat.base_stat;
    });
  }

  abilitiesModal(abilities: any): void {
    this.dialog.open(AbilitiesDetailsComponent, {
      data: { 
        abilities,
        pokemon: this.pokemon  
      },
    });
  }

  nextPokemon(pokemonID: number, foreign: boolean) {
    if (foreign && pokemonID === 1) {
      this.snackBar.open('It is not possible to return from the first Pokémon', 'Close', {
        duration: 3000,
      });
      return;
    }
    if (foreign) {
      pokemonID -= 1;
    } else {
      pokemonID += 1;
    }
    this.pokeService.getPokemonById(pokemonID).subscribe((data: any) => {
      this.pokemon = data;
    });
  }
  
  
}
