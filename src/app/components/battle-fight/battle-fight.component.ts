import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoveDetails } from '../../models/move-details';
import { Pokemon } from '../../models/pokemon';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-battle-fight',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './battle-fight.component.html',
  styleUrl: './battle-fight.component.css'
})
export class BattleFightComponent implements OnInit{
  playerPokemon: Pokemon;
  enemyPokemon: Pokemon;
  playerSelectedMoves: MoveDetails[] = [];
  enemySelectedMoves: MoveDetails[] = [];
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeHelper: PokeHelperService) {
    this.playerPokemon = data.playerPokemon;
    this.enemyPokemon = data.enemyPokemon;
    this.playerSelectedMoves = data.playerSelectedMoves;
    this.enemySelectedMoves = data.enemySelectedMoves;
  }

  ngOnInit(): void {
    console.log(this.playerSelectedMoves);
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelper.upperFirstLetter(word);
  }

}
