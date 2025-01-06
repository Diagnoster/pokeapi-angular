import { Component, Input, OnInit } from '@angular/core';
import { MapLocation } from '../../models/map-location';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeService } from '../../services/poke.service';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { RegionDetails } from '../../models/region-details';

const ELEMENT_DATA = [
  {name: 'Hydrogen'},
  {name: 'Helium'},
  {name: 'Lithium'},
  {name: 'Beryllium'},
  {name: 'Boron'},
  {name: 'Carbon'},
  {name: 'Nitrogen'},
  {name: 'Oxygen'},
  {name: 'Fluorine'},
  {name: 'Neon'},
];


@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatRippleModule
  ],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css'
})
export class RegionDetailsComponent implements OnInit {

  location!: RegionDetails;
  locationId: number | null = null;
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;
  
  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.locationId = Number(id);  
      if (this.locationId) {
        this.getLocationDetails(this.locationId);
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
      },
      error: (err) => {
        console.error('Erro ao buscar a localização:', err);
      }
    });
  }
  
}
