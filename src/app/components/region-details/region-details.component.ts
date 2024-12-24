import { Component, Input, OnInit } from '@angular/core';
import { MapLocation } from '../../models/map-location';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css'
})
export class RegionDetailsComponent implements OnInit {

  location?: MapLocation;
  
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.location = navigation?.extras?.state?.['location'];
  }

  ngOnInit(): void {
    console.log(this.location);
  }
  
}
