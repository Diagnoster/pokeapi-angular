import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../../services/poke.service';
import { MapLocation } from '../../../models/map-location';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  locations: MapLocation[];
  
  constructor (private pokeService: PokeService, private pokeHelperService: PokeHelperService, private router: Router) {
    this.locations = [];
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.pokeService.getAllLocations().subscribe((data: any) => {
      this.locations = data.results;
    
      const imageBasePath = 'assets/locations/';
    
      this.locations.forEach((location, index) => {
        location.id = index + 1;
        const imageName = `${location.name}.png`;
        location.img = `${imageBasePath}${imageName}`;
      });
    });
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelperService.upperFirstLetter(word, gen);
  }

  onLocationClick(location: MapLocation): void {
    this.router.navigate([`/region-details/${location.id}`]);
  }
  
}
