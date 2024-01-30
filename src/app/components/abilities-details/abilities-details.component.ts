import { Component, Inject, OnInit } from '@angular/core';
import { Ability } from '../../models/ability';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeServiceService } from '../../services/poke-service.service';
import { MatCardModule}  from '@angular/material/card';
import { AbilitiesDetails } from '../../models/abilities-details';
import { CommonModule } from '@angular/common';
import { PokeHelperService } from '../../services/poke-helper.service';


@Component({
  selector: 'app-abilities-details',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './abilities-details.component.html',
  styleUrl: './abilities-details.component.css'
})
export class AbilitiesDetailsComponent implements OnInit{

  abilities: Ability;
  ability: AbilitiesDetails [];
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeService: PokeServiceService, private pokeHelperService: PokeHelperServic) {
    this.abilities = data.abilities;
    this.ability = [];
  }

  ngOnInit(): void {
    console.log(this.abilities.url);
    this.getAbility(this.abilities.url);
  }

  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

  getAbility(abilityUrl: string): void {
    this.pokeService.getAbility(abilityUrl).subscribe((data: any) => {
      this.ability.push(data);
    });
    console.log(this.ability);
  }

}
