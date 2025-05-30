import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { PokeService } from '../../../services/poke.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MoveDetails } from '../../../models/move-details';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { BaseClass } from '../../../models/base/base-class';
import { PokemonLearnComponent } from '../../pokemon/pokemon-learn/pokemon-learn.component';
import { DamageCategoryColor } from '../../../models/enums/damage-category-color';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";
import { FormatGenerationNamePipe } from "../../../pipes/format-generation-name.pipe";

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    LoadingComponent,
    MatSortModule,
    MatTooltipModule,
    MatCardModule,
    PokemonLearnComponent,
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    UpperFirstLetterPipe,
    FormatGenerationNamePipe
],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListComponent implements OnInit {

  moves: BaseClass[];
  moveDetailsList: MoveDetails [];
  displayedColumns = ['name', 'type', 'power', 'accuracy'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<MoveDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading: boolean = true;
  expandedElement: MoveDetails | null;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  gen: BaseClass[];
  icons: string[] = [];
  selectedGenerations: string[] = [];
  selectedTypes: string[] = [];
  readonly panelOpenState = signal(false);

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {
    this.moves = [];
    this.moveDetailsList = [];
    this.dataSource = new MatTableDataSource();
    this.expandedElement = null;
    this.gen = [];
  }

  ngOnInit() {
    this.getMoves();
    this.getGenerations();
    this.loadIcons();
  }

  getMoves() {
    this.pokeService.getAllMoves().subscribe((data: any) => {
      this.moves = data.results;
      const observables = this.moves.map(move => this.pokeService.getPokeMoves(move.url));
  
      forkJoin(observables).subscribe((moveDetails: any) => {
        this.moveDetailsList = moveDetails;
        this.dataSource.data = this.moveDetailsList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });
    });
  }

  getGenerations() {
    this.pokeService.getAllGenerations().subscribe((data: any) => {
      this.gen = data.results;
      console.log(this.gen);
    });
  }

  getTypeRetroImageUrl(type: string): string {
    return this.pokeHelperService.getTypeRetroImageUrl(type);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getColorForType(damage: string): string {
    return DamageCategoryColor[damage as keyof typeof DamageCategoryColor];
  }
  
  loadIcons() {
    const iconFiles = [
      'bug',
      'dark',
      'dragon',
      'electric',
      'fairy',
      'fighting',
      'fire',
      'flying',
      'ghost',
      'grass',
      'ground',
      'ice',
      'normal',
      'poison',
      'psychic',
      'rock',
      'shadow',
      'steel',
      'water'
    ];
  
    this.icons = iconFiles;
  }

  applyGenerationFilter(generationName: string) {
    const index = this.selectedGenerations.indexOf(generationName);
    if (index > -1) {
      this.selectedGenerations.splice(index, 1);
    } else {
      this.selectedGenerations.push(generationName);
    }
    this.applyFilters();
  }
  
  applyTypeFilter(type: string) {
    const index = this.selectedTypes.indexOf(type);
    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.dataSource.data = this.moveDetailsList.filter(move => {
      const matchesGeneration = this.selectedGenerations.length === 0 || this.selectedGenerations.includes(move.generation.name);
      const matchesType = this.selectedTypes.length === 0 || this.selectedTypes.some(type => move.type.name === type);
      return matchesGeneration && matchesType;
    });
  }

  removeGenerationFilter(generationName: string) {
    const index = this.selectedGenerations.indexOf(generationName);
    if (index > -1) {
      this.selectedGenerations.splice(index, 1);
    }
    this.applyFilters();
  }
  
  removeTypeFilter(type: string) {
    const index = this.selectedTypes.indexOf(type);
    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    }
    this.applyFilters();
  }
}
