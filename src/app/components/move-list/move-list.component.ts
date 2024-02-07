import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { PokeServiceService } from '../../services/poke-service.service';
import { Move } from '../../models/move';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MoveDetails } from '../../models/move-details';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListComponent implements OnInit {

  moves: Move[];
  moveDetailsList: MoveDetails [];
  displayedColumns = ['id', 'name', 'type', 'power', 'accuracy', 'pp'];
  dataSource = new MatTableDataSource<MoveDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokeService: PokeServiceService, private pokeHelperService: PokeHelperService) {
    this.moves = [];
    this.moveDetailsList = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getMoves();
    this.dataSource = new MatTableDataSource(this.moveDetailsList);

  }

  getMoves() {
    this.pokeService.getAllMoves().subscribe((data: any) => {
      this.moves = data.results;
      const observables = this.moves.map(move => this.pokeService.getPokeMoves(move.url));
  
      forkJoin(observables).subscribe((moveDetails: any) => {
        this.moveDetailsList = moveDetails;
        this.dataSource.data = this.moveDetailsList;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  getTypeRetroImageUrl(type: string): string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }
  
  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

}
