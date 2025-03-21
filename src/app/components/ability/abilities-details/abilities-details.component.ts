import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeService } from '../../../services/poke.service';
import { MatCardModule } from '@angular/material/card';
import { AbilitiesDetails } from '../../../models/abilities-details';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { Pokemon } from '../../../models/pokemon';
import { PokemonType } from '../../../models/enums/pokemon-type';
import { CommonModule } from '@angular/common';
import { BaseClass } from '../../../models/base/base-class';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";

@Component({
  selector: 'app-abilities-details',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    UpperFirstLetterPipe
],
  templateUrl: './abilities-details.component.html',
  styleUrl: './abilities-details.component.css'
})
export class AbilitiesDetailsComponent implements OnInit {

  abilities: BaseClass;
  pokemon: Pokemon;
  ability: AbilitiesDetails[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeService: PokeService) {
    this.abilities = data.abilities;
    this.pokemon = data.pokemon;
    this.ability = [];
  }

  ngOnInit(): void {
    this.getAbility(this.abilities.url);
  }

  getAbility(abilityUrl: string): void {
    this.pokeService.getAbility(abilityUrl).subscribe((data: any) => {
      this.ability.push(data);
    });
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

}
