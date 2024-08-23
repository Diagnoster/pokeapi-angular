import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokeAbility } from '../../models/poke-ability';
import { BaseClass } from '../../models/base/base-class';
import { AbilitiesDetails } from '../../models/abilities-details';

@Component({
  selector: 'app-pokemon-learn',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './pokemon-learn.component.html',
  styleUrl: './pokemon-learn.component.css'
})
export class PokemonLearnComponent implements OnInit {

  @Input() pokemon: BaseClass[] | undefined;

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  pokeModal(pokemon: any): void {
    this.pokeService.getPokemon(pokemon).subscribe(pokemon => {
      this.dialog.open(PokemonDetailsComponent, {
        width: '750px',
        data: { pokemon },
      });
    });
  }

  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

}
