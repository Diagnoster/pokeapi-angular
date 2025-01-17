import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { LocationDetails } from '../../models/location-details';
import { PokemonEncounters } from '../../models/pokemon-encounters';
import { LocationArea } from '../../models/location-area';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-area-details',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './area-details.component.html',
  styleUrl: './area-details.component.css'
})
export class AreaDetailsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = new MatTableDataSource<PokemonEncounters>();
  name: string | null = null;
  url: string | null = null; // api url
  locationDetails: LocationDetails | undefined;
  locationArea: LocationArea | undefined;
  areasDetails: any;

  constructor(private route: ActivatedRoute, private pokeService: PokeService, private pokeHelperService: PokeHelperService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.url = params['url'];
      this.getAreas(params['url']);
    });
  }

  getAreas(url: string) {
    if (url) {
      this.pokeService.getAllAreas(url).subscribe({
        next: (data: any) => {
          this.locationDetails = data;
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      console.warn('Invalid URL.');
    }
  }

  searchLocationAreaDetails(url: string) {
    if (url) {
      this.pokeService.getLocationAreaDetails(url).subscribe({
        next: (data: any) => {         
          this.locationArea = data;
          console.log('variavel locationArea abaixo');
          console.log(this.locationArea);

          if(this.locationArea) {
            this.dataSource.data = this.locationArea?.pokemon_encounters;
            console.log('varivel data source abaixo');
            console.log(this.dataSource.data);
          }

        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      console.warn('Invalid URL.');
    }
  }
  
  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelperService.upperFirstLetter(word, gen);
  }

}
