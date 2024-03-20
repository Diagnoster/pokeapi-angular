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

  @Input() pokemon: any[] | undefined;

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  extractValidPokemon(poke: BaseClass | AbilitiesDetails): boolean {
    let pokeURL: string;
  
    if ('url' in poke) {
      pokeURL = poke.url as string; 
    } else if ('pokemon' in poke && 'url' in poke.pokemon) {
      pokeURL = poke.pokemon.url as string; 
    } else {
      throw new Error('Invalid object for poke');
    }
  
    const parts: string[] = pokeURL.split('/');
    const pokeID = parseInt(parts[parts.length - 2]); // captura ID
    return pokeID <= 899;
  }

  getPokemonName(poke: any | AbilitiesDetails): string {
    if ('name' in poke) { // BaseClass type
      return this.upperFirstLetter(poke.name);
    } else if ('pokemon' in poke && 'name' in poke.pokemon) { // AbilitiesDetails type
      return this.upperFirstLetter(poke.pokemon.name);
    } else {
      throw new Error('Invalid object for poke');
    }
  }

  getPokemonNameForDetails(poke: any | AbilitiesDetails): string {
    if ('name' in poke) { // BaseClass type
      return poke.name;
    } else if ('pokemon' in poke && 'name' in poke.pokemon) { // AbilitiesDetails type
      return poke.pokemon.name;
    } else {
      throw new Error('Invalid object for poke');
    }
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
