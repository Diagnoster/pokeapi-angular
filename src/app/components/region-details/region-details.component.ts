import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapLocation } from '../../models/map-location';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeService } from '../../services/poke.service';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { RegionDetails } from '../../models/region-details';
import { BaseClass } from '../../models/base/base-class';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatRippleModule,
    MatPaginatorModule
  ],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css'
})
export class RegionDetailsComponent implements OnInit {

  location: RegionDetails = {
    id: 0,
    url: '',
    name: '',
    img: '',
    pokedexes: [],
    version_groups: [],
    main_generation: null,
    introduction: '',
    description: '',
    locations: []
  };  
  tableLocationsName: BaseClass[] = [];
  locationId: number | null = null;
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<BaseClass>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, private route: ActivatedRoute, private http: HttpClient) { 
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.locationId = Number(id);  
      if (this.locationId) {
        this.getLocationDetails(this.locationId);
        this.loadLocations();
      } else {
        console.error('ID inválido');
      }
    }
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelperService.upperFirstLetter(word, gen);
  }

  formatGenerationName(word: string): string {
    return this.pokeHelperService.formatGenerationName(word);
  }

  getLocationDetails(id: number): void {
    this.pokeService.getRegion(id).subscribe({
      next: (data: any) => {
        this.location = data;
        const imageBasePath = 'assets/regions/';
        const imageName = `${this.location.name}.png`;
        this.location.img = `${imageBasePath}${imageName}`;  
        console.log('Localização encontrada:', this.location);
  
        this.dataSource.data = this.location.locations;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erro ao buscar a localização:', err);
      }
    });
  }

  loadLocations(): void {
    this.http.get<any>('assets/data/locations.json').subscribe((data) => {
      // Acess property of JSON
      const locationArray = data.locations;
      
      if (Array.isArray(locationArray)) {
        const locationData = locationArray.find((loc: any) => loc.id === this.locationId);
        if (locationData) {
          this.location.description = locationData.description;
          this.location.introduction = locationData.introduction;
        } else {
          console.error('No location found with ID:', this.locationId);
        }
      } else {
        console.error('Unexpected data structure. "locations" is not an array:', locationArray);
      }
    }, error => {
      console.error('Error loading data from locations.json:', error);
    });
  }
  
  
}
