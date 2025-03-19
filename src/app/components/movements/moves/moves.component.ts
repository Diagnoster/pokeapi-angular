import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoveDetails } from '../../../models/move-details';
import { PokeService } from '../../../services/poke.service';
import { Pokemon } from '../../../models/pokemon';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-moves',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
],
  templateUrl: './moves.component.html',
  styleUrl: './moves.component.css'
})
export class MovesComponent implements OnInit{ 

  moves: MoveDetails[];
  dataSource = new MatTableDataSource<MoveDetails>();
  displayedColumns = ['name', 'type', 'power', 'accuracy'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() pokemon: Pokemon | undefined;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @Output() selectedMovesChange: EventEmitter<MoveDetails[]> = new EventEmitter<MoveDetails[]>();
  clickedRows = new Set<MoveDetails>();

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.moves = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.catchPokeMoves();
  }

  catchPokeMoves(): void {
    this.pokemon?.moves.forEach( pokeMove => {
      this.pokeService.getPokeMoves(pokeMove.move.url).subscribe((data: any) => {
        this.moves.push(data);  
        this.dataSource.data = this.moves;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTypeRetroImageUrl(type: string): string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }

  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

  clicked(row: MoveDetails) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else if (this.clickedRows.size >= 4) {
      this._snackBar.open('Maximum number of moves achieved!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4 * 1000,
      });
    } else {
      this.clickedRows.add(row);
    }
    this.selectedMovesChange.emit(Array.from(this.clickedRows));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
