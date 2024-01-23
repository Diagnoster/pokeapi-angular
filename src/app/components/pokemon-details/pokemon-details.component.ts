import { Component, Inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokeServiceService } from '../../services/poke-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonType } from '../../models/pokemon-type';
import { DamageRelations } from '../../models/damage-relations';
import { TypeRelations } from '../../models/type-relations';


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

  pokemon!: Pokemon;
  total!: number;
  typeRelations: TypeRelations [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeService: PokeServiceService) {
    this.pokemon = data.pokemon;
    this.typeRelations = [];
  }
  
  ngOnInit(): void {
    this.calculateTotalStats();
    this.pokemon.types.forEach(pokeurl => {
      this.pokeService.getDamageRelations(pokeurl.type.url).subscribe((data: any) => {
        this.typeRelations.push(data);
        console.log(this.typeRelations);
        console.log(data);
      });
    });
    
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
    this.total = 0;
    this.pokemon.stats.forEach(stat => {
      this.total = this.total + stat.base_stat;
    });
  
  }
  
}
