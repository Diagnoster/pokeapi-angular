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

export interface poke {
  name: string;
  url: string;
  chance: number;
  method: string;
  max_level: number;
  min_level: number;
  version: string;
}

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
  displayedColumns: string[] = ['pokemon', 'chance', 'version', 'method'];
  dataSource = new MatTableDataSource<poke>();
  name: string | null = null;
  url: string | null = null; // api url
  locationDetails: LocationDetails | undefined;
  locationArea: LocationArea | undefined;
  areasDetails: any;
  pokemonList: poke[] = [];

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

          this.locationArea?.pokemon_encounters.forEach((poke) => {
            poke.version_details.forEach((details) => {
              details.encounter_details.forEach((encounterDetails) => {
                const pokezim: poke = {
                  name: poke.pokemon.name,
                  url: poke.pokemon.url,
                  chance: encounterDetails.chance,
                  method: encounterDetails.method.name,
                  max_level: encounterDetails.max_level,
                  min_level: encounterDetails.min_level,
                  version: details.version.name,
                }; 
                this.pokemonList.push(pokezim);
              })
            })
          });

          if(this.locationArea) {
            
            this.dataSource.data = this.pokemonList;
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
