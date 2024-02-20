import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { Move } from '../../models/move';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MoveDetails } from '../../models/move-details';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListComponent implements OnInit {

  moves: Move[];
  moveDetailsList: MoveDetails [];
  displayedColumns = ['name', 'type', 'power', 'accuracy', 'pp'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<MoveDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading: boolean = true;
  expandedElement: MoveDetails | null;


  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService) {
    this.moves = [];
    this.moveDetailsList = [];
    this.dataSource = new MatTableDataSource();
    this.expandedElement = null;
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
        this.loading = false;
      });
    });
  }

  getTypeRetroImageUrl(type: string): string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }
  
  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
