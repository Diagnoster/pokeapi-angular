import { Component, Inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokeServiceService } from '../../services/poke-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonType } from '../../models/pokemon-type';


@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {

  pokemon!: any;
  pokeDetail: any;
  total!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeService: PokeServiceService) {
    this.pokemon = data.pokemon;
  }
  
  ngOnInit(): void {
    this.pokeService.getPokemon(this.pokemon.name).subscribe((data) => {
      this.pokeDetail = data;
      this.calculateTotalStats();
     //console.log(this.pokeDetail);
    })
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

  upperFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getTypeImageUrl(type: string): string {
    const imagePath = `assets/details-icons/${type.toLowerCase()}.png`;
    return imagePath;
  }
  
  calculateTotalStats(): void {
    this.total = this.pokeDetail.stats.reduce((sum: any, stat: { base_stat: any; }) => sum + stat.base_stat, 0);
  }

  
}
