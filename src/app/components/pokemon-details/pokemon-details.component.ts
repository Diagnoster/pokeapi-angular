import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokeServiceService } from '../../services/poke-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonType } from '../../models/pokemon-type';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoveDetails } from '../../models/move-details';
import { MatInputModule } from '@angular/material/input';
import { AbilitiesDetailsComponent } from '../abilities-details/abilities-details.component';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    MatPaginatorModule
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private pokeService: PokeServiceService, private pokeHelperService: PokeHelperService) {
    this.pokemon = data.pokemon;
    this.moves = [];
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.calculateTotalStats();
    this.catchPokeMoves();
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

  getTypeRetroImageUrl(type: string): string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }
  
  calculateTotalStats(): void {    
    this.total = 0;
    this.pokemon.stats.forEach(stat => {
      this.total = this.total + stat.base_stat;
    });
  }

  catchPokeMoves(): void {
    this.pokemon.moves.forEach( pokeMove => {
      this.pokeService.getPokeMoves(pokeMove.move.url).subscribe((data: any) => {
        this.moves.push(data);  
        this.dataSource.data = this.moves;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abilitiesModal(abilities: any): void {
    console.log(abilities);
    this.dialog.open(AbilitiesDetailsComponent, {
      data: { abilities },
    });
  }
}
