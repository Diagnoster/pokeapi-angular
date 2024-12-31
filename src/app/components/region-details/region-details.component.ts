import { Component, Input, OnInit } from '@angular/core';
import { MapLocation } from '../../models/map-location';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeService } from '../../services/poke.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css'
})
export class RegionDetailsComponent implements OnInit {

  location: MapLocation;
  
  constructor(private router: Router, private pokeService: PokeService) { 
    const navigation = this.router.getCurrentNavigation();
    this.location = navigation?.extras?.state?.['location'];
  }

  ngOnInit(): void {
    this.pokeService.getRegion(this.location.url).subscribe((data: any) => {
      console.log(data);
      const imageBasePath = 'assets/regions/';
      const imageName = `${this.location.name}.png`;
      this.location.img = `${imageBasePath}${imageName}`;
    });
  }
  
}
