import { Component, Inject, OnInit } from '@angular/core';
import { Ability } from '../../models/ability';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeServiceService } from '../../services/poke-service.service';
import { MatCardModule}  from '@angular/material/card';


@Component({
  selector: 'app-abilities-details',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './abilities-details.component.html',
  styleUrl: './abilities-details.component.css'
})
export class AbilitiesDetailsComponent implements OnInit{

  abilities: Ability;
  ability: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeService: PokeServiceService) {
    this.abilities = data.abilities;
    this.ability = null;
  }

  ngOnInit(): void {
    console.log(this.abilities.url);
    this.getAbility(this.abilities.url);
  }

  getAbility(abilityUrl: string): void {
    this.pokeService.getAbility(abilityUrl).subscribe ((data: any) => {
      this.ability = data;
    });
    console.log(this.ability);
  }

}
