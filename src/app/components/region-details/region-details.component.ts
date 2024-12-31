import { Component, Input, OnInit } from '@angular/core';
import { MapLocation } from '../../models/map-location';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeService } from '../../services/poke.service';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css'
})
export class RegionDetailsComponent implements OnInit {

  location: any = {};
  
  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.location = navigation.location || {};

    console.log('Localização específica:', this.location);
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelperService.upperFirstLetter(word, gen);
  }
  
}
