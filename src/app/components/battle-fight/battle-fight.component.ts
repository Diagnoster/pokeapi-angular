import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoveDetails } from '../../models/move-details';
import { Pokemon } from '../../models/pokemon';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { BattleStats } from '../../models/battle-stats';

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
export class BattleFightComponent implements OnInit {
  playerPokemon: Pokemon;
  enemyPokemon: Pokemon;
  playerSelectedMoves: MoveDetails[] = [];
  enemySelectedMoves: MoveDetails[] = [];
  playerStats: BattleStats = { hp: 0, attack: 0, defense: 0, special_attack: 0, special_defense: 0, speed: 0 };
  enemyStats: BattleStats = { hp: 0, attack: 0, defense: 0, special_attack: 0, special_defense: 0, speed: 0 };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeHelper: PokeHelperService) {
    this.playerPokemon = data.playerPokemon;
    this.enemyPokemon = data.enemyPokemon;
    this.playerSelectedMoves = data.playerSelectedMoves;
    this.enemySelectedMoves = data.enemySelectedMoves;
  }

  ngOnInit(): void {
    console.log(this.playerSelectedMoves);
    this.calcStats(this.playerPokemon, this.playerStats);
    this.calcStats(this.enemyPokemon, this.enemyStats);
    this.startBattle();
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelper.upperFirstLetter(word);
  }

  calcStats(pokemon: Pokemon, stats: BattleStats) {
    pokemon.stats.forEach((stat, index) => {
      switch (index) {
        case 0:
          stats.hp = stat.base_stat;
          break;
        case 1:
          stats.attack = stat.base_stat;
          break;
        case 2:
          stats.defense = stat.base_stat;
          break;
        case 3:
          stats.special_attack = stat.base_stat;
          break;
        case 4:
          stats.special_defense = stat.base_stat;
          break;
        case 5:
          stats.speed = stat.base_stat;
          break;
        default:
          break;
      }
    });
  }

  startBattle() {
    while(this.playerStats.hp > 0 && this.enemyStats.hp > 0) {
      
    }
    if(this.playerStats.hp === 0) {
      console.log('player lost');
    } else {
      console.log('enemy lost');
    }
  }

}
