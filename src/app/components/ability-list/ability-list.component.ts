import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { AbilitiesDetails } from '../../models/abilities-details';

@Component({
  selector: 'app-ability-list',
  standalone: true,
  imports: [],
  templateUrl: './ability-list.component.html',
  styleUrl: './ability-list.component.css'
})
export class AbilityListComponent implements OnInit {
  ability: AbilitiesDetails[];

  constructor(private pokeService: PokeService,  private pokeHelperService: PokeHelperService) {
    this.ability = [];
  }

  ngOnInit(): void {
    this.getAbilities();
  }

  getAbilities() {
    this.pokeService.getAbilities().subscribe((data: any) => {
      this.ability = data.results;
      console.log(this.ability);
    });
  }
}
