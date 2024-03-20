import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { AbilitiesDetails } from '../../models/abilities-details';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoadingComponent } from '../loading/loading.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BaseClass } from '../../models/base/base-class';
import { PokemonLearnComponent } from '../pokemon-learn/pokemon-learn.component';

@Component({
  selector: 'app-ability-list',
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
    MatSortModule,
    LoadingComponent,
    MatCardModule,
    PokemonLearnComponent
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './ability-list.component.html',
  styleUrl: './ability-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityListComponent implements OnInit {
  abilities: BaseClass[] = [];
  ability: AbilitiesDetails[] = [];
  dataSource = new MatTableDataSource<AbilitiesDetails>();
  displayedColumns = ['id', 'name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: AbilitiesDetails | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading: boolean = true;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private pokeService: PokeService,  private pokeHelperService: PokeHelperService, private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource();
    this.expandedElement = null;
  }

  ngOnInit(): void {
    this.getAbilities();
  }

  getAbilities() {
    this.pokeService.getAbilities().subscribe((data: any) => {
      this.abilities = data.results;
      this.abilities.forEach(value => {
        this.pokeService.getAbility(value.url).subscribe(data => {
          this.ability.push(data);
          this.dataSource.data = this.ability;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        })
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  formatType(pokemon: AbilitiesDetails) {
    const listaBaseClass: BaseClass[] = [];
    
    for (const ability of pokemon.pokemon) {
      const baseClassItem = new BaseClass(ability.pokemon.name, ability.pokemon.url);
      listaBaseClass.push(baseClassItem);
    }
    return listaBaseClass;
  }

}
