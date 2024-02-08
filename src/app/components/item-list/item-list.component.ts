import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokeServiceService } from '../../services/poke-service.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { ItemDetails } from '../../models/item-details';
import { Item } from '../../models/item';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';


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
    MatMenuModule
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  items: any[];
  itemDetailsList: ItemDetails [];
  displayedColumns = ['sprite', 'name', 'cost', 'effect_entries'];
  dataSource = new MatTableDataSource<ItemDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading: boolean = true;

  constructor(private pokeService: PokeServiceService, private pokeHelperService: PokeHelperService) {
    this.items = [];
    this.itemDetailsList = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    const observables: Observable<any>[] = [];
    
    const url = 'https://pokeapi.co/api/v2/item/6/';
    if (url) {
      observables.push(this.pokeService.getItens(url));
    }

    forkJoin(observables).subscribe((results: any[]) => {
      this.itemDetailsList = results;
      this.dataSource.data = this.itemDetailsList;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
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