import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { ItemDetails } from '../../models/item-details';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
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

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService) {
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

  selectItem(item: string) {
    this.itemDetailsList = [];
    this.loading = true;
    this.pokeService.getSelectOption(item).subscribe(data => {
      this.items = data.items;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}