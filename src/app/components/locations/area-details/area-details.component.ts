import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../../../services/poke.service';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { LocationDetails } from '../../../models/location-details';
import { LocationArea } from '../../../models/location-area';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { PokeFound } from '../../../models/poke-found';
import { PokemonDetailsComponent } from '../../pokemon/pokemon-details/pokemon-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BasicFilterComponent } from '../../shared/basic-filter/basic-filter.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-area-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatDividerModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    BasicFilterComponent,
    MatTooltipModule,
    UpperFirstLetterPipe
],
  templateUrl: './area-details.component.html',
  styleUrl: './area-details.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AreaDetailsComponent implements OnInit {
  displayedColumns: string[] = ['pokemon', 'chance', 'version', 'method'];
  dataSource = new MatTableDataSource<PokeFound>();
  name: string | null = null;
  url: string | null = null; // api url
  locationDetails: LocationDetails | undefined;
  locationArea: LocationArea | undefined;
  areasDetails: any;
  pokemonList: PokeFound[] = [];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: ActivatedRoute, private pokeService: PokeService, public dialog: MatDialog) {}

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
          if (this.locationArea?.pokemon_encounters) {
            this.pokemonList = [];
  
            this.locationArea.pokemon_encounters.forEach((poke) => {
              poke.version_details.forEach((details) => {
                details.encounter_details.forEach((encounterDetails) => {
                  // Get pokémon icon
                  this.pokeService.getPokeDetails(poke.pokemon.url).subscribe({
                    next: (pokeDetails: any) => {
                      const iconUrl = pokeDetails.sprites.versions["generation-viii"].icons.front_default;
  
                      const pokezim: PokeFound = {
                        name: poke.pokemon.name,
                        url: poke.pokemon.url,
                        chance: encounterDetails.chance,
                        method: encounterDetails.method.name,
                        max_level: encounterDetails.max_level,
                        min_level: encounterDetails.min_level,
                        version: details.version.name,
                        icon: iconUrl,
                      };
  
                      this.pokemonList.push(pokezim);
  
                      this.dataSource.data = [...this.pokemonList];
                      this.dataSource.sort = this.sort;
                    },
                    error: (err) => {
                      console.error(`Erro ao obter detalhes do Pokémon ${poke.pokemon.name}:`, err);
                    },
                  });
                });
              });
            });
          }
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes da área:', err);
        },
      });
    } else {
      console.warn('URL inválida.');
    }
  }

    pokeModal(pokemon: any): void {
      this.pokeService.getPokemon(pokemon).subscribe(pokemon => {
        this.dialog.open(PokemonDetailsComponent, {
          width: '750px',
          data: { pokemon },
        });
      });
    }

    applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
