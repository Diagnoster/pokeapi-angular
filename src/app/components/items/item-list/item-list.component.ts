import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokeService } from '../../../services/poke.service';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { ItemDetails } from '../../../models/item-details';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BasicFilterComponent } from '../../shared/basic-filter/basic-filter.component';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    LoadingComponent,
    MatSortModule,
    BasicFilterComponent,
    UpperFirstLetterPipe
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
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {

  items: any[];
  itemDetailsList: ItemDetails[];
  displayedColumns = ['id', 'sprite', 'name', 'cost'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<ItemDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading: boolean = true;
  expandedElement: ItemDetails | null;
  nameCategory = '';
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private pokeService: PokeService, private _liveAnnouncer: LiveAnnouncer) {
    this.items = [];
    this.itemDetailsList = [];
    this.dataSource = new MatTableDataSource();
    this.expandedElement = null;
  }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    const url = 'item-category/34/';
    this.loading = true;
    this.pokeService.getSelectOption(url).subscribe(data => {
      this.items = data.items;
      this.nameCategory = data.name;
      this.items.forEach(value => {
        this.pokeService.getItens(value.url).subscribe(data => {       
          this.itemDetailsList.push(data);
          this.dataSource.data = this.itemDetailsList;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        });
      });
    });
  }

  selectItem(item: string) {
    this.itemDetailsList = [];
    this.loading = true;
    this.pokeService.getSelectOption(item).subscribe(data => {
      this.items = data.items;
      this.nameCategory = data.name;
      this.items.forEach(value => {
        this.pokeService.getItens(value.url).subscribe(data => {
          this.itemDetailsList.push(data);
          this.dataSource.data = this.itemDetailsList;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        });
      });
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}