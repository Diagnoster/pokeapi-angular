import { Component, Input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PokeService } from '../../../services/poke.service';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { BaseClass } from '../../../models/base/base-class';
import { MatExpansionModule } from '@angular/material/expansion';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";

@Component({
  selector: 'app-pokemon-learn',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    UpperFirstLetterPipe
],
  templateUrl: './pokemon-learn.component.html',
  styleUrl: './pokemon-learn.component.css'
})
export class PokemonLearnComponent implements OnInit {

  @Input() pokemon: BaseClass[] | undefined;
  readonly panelOpenState = signal(false);

  constructor(private pokeService: PokeService, public dialog: MatDialog) {
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

}
