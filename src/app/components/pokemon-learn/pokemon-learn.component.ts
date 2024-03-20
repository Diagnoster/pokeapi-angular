import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Pokemon } from '../../models/pokemon';
import { PokeAbility } from '../../poke-ability';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-learn',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './pokemon-learn.component.html',
  styleUrl: './pokemon-learn.component.css'
})
export class PokemonLearnComponent  implements OnInit{
  
  @Input() pokemon: PokeAbility[] | undefined;

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, public dialog: MatDialog) {    
  }

  ngOnInit(): void {
    console.log(this.pokemon);
  }

  extractValidPokemon(poke: any): boolean {
    const parts: string[] = poke.url.split('/');
    const pokeID = parseInt(parts[parts.length - 2]); // catch ID
    if(pokeID <= 899) {
      return true;
    } else {
      return false;
    }
  };

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
