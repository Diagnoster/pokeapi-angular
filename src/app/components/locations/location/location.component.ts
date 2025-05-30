import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../../services/poke.service';
import { MapLocation } from '../../../models/map-location';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { Router } from '@angular/router';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    UpperFirstLetterPipe
],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  animations: [
  trigger('bounceIn', [
    transition(':enter', [
      style({ transform: 'scale(0.3)', opacity: 0 }),
      animate('800ms cubic-bezier(.68,-0.55,.27,1.55)', style({ transform: 'scale(1)', opacity: 1 }))
    ])
    ])
  ]
})
export class LocationComponent implements OnInit {

  locations: MapLocation[];
  
  constructor (private pokeService: PokeService, private router: Router) {
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

  onLocationClick(location: MapLocation): void {
    this.router.navigate([`/region-details/${location.id}`]);
  }
  
}
