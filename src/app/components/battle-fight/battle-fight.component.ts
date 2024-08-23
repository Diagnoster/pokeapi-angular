import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoveDetails } from '../../models/move-details';
import { Pokemon } from '../../models/pokemon';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { BattleStats } from '../../models/battle-stats';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-battle-fight',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './battle-fight.component.html',
  styleUrl: './battle-fight.component.css'
})
export class BattleFightComponent implements OnInit {
  playerPokemon: Pokemon;
  enemyPokemon: Pokemon;
  playerSelectedMoves: MoveDetails[] = [];
  enemySelectedMoves: MoveDetails[] = [];
  playerMaxHp: number = 0;
  enemyMaxHp: number = 0;
  playerStats: BattleStats = { hp: 0, attack: 0, defense: 0, special_attack: 0, special_defense: 0, speed: 0 };
  enemyStats: BattleStats = { hp: 0, attack: 0, defense: 0, special_attack: 0, special_defense: 0, speed: 0 };
  selectedMove: MoveDetails | null = null;
  battleText: string = "Choose a move to use";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokeHelper: PokeHelperService) {
    this.playerPokemon = data.playerPokemon;
    this.enemyPokemon = data.enemyPokemon;
    this.playerSelectedMoves = data.playerSelectedMoves;
    this.enemySelectedMoves = data.enemySelectedMoves;
  }

  ngOnInit(): void {
    this.calcStats(this.playerPokemon);
    this.calcStats2(this.enemyPokemon);
    console.log(this.playerStats);
    console.log(this.enemyStats);
  }

  upperFirstLetter(word: string, gen?: boolean): string {
    return this.pokeHelper.upperFirstLetter(word);
  }

  calcStats(pokemon: Pokemon) {
    pokemon.stats.forEach((stat, index) => {
      switch (index) {
        case 0:
          this.playerStats.hp = stat.base_stat;
          this.playerMaxHp = stat.base_stat;
          break;
        case 1:
          this.playerStats.attack = stat.base_stat;
          break;
        case 2:
          this.playerStats.defense = stat.base_stat;
          break;
        case 3:
          this.playerStats.special_attack = stat.base_stat;
          break;
        case 4:
          this.playerStats.special_defense = stat.base_stat;
          break;
        case 5:
          this.playerStats.speed = stat.base_stat;
          break;
        default:
          break;
      }
    });
  }

  calcStats2(pokemon: Pokemon) {
    pokemon.stats.forEach((stat, index) => {
      switch (index) {
        case 0:
          this.enemyStats.hp = stat.base_stat;
          this.enemyMaxHp = stat.base_stat;
          break;
        case 1:
          this.enemyStats.attack = stat.base_stat;
          break;
        case 2:
          this.enemyStats.defense = stat.base_stat;
          break;
        case 3:
          this.enemyStats.special_attack = stat.base_stat;
          break;
        case 4:
          this.enemyStats.special_defense = stat.base_stat;
          break;
        case 5:
          this.enemyStats.speed = stat.base_stat;
          break;
        default:
          break;
      }
    });
  }

  selectMove(move: MoveDetails) {
    this.selectedMove = move;
    this.startBattle();
  }

  startBattle() {
    if (!this.selectedMove) {
      console.error('No move selected!');
      return;
    }
    if (this.playerStats.hp > 0 && this.enemyStats.hp > 0) {
      this.attack(this.playerStats, this.enemyStats, this.selectedMove);
      setTimeout(() => {
        if (this.enemyStats.hp > 0) {
          this.attack2(this.enemyStats, this.playerStats, this.enemySelectedMoves[0]);
          if(this.playerStats.hp <= 0) {
            this.battleText = "You lost!"
          }
        }
        else {
          this.battleText = "You win!";
        }
      }, 1300); // 1300 milliseconds delay
    }
  }

  attack2(attacker: BattleStats, playerStats: BattleStats, move: MoveDetails) {
    if (playerStats.hp > 0) {
      playerStats.hp -= move.power;
      this.battleText = `Attacks with ${move.name} causing ${move.power} damage.`;
    }
    this.selectedMove = null;
  }


  attack(attacker: BattleStats, defender: BattleStats, move: MoveDetails) {
    if (defender.hp > 0) {
      defender.hp -= move.power;
      this.battleText = `Attacks with ${move.name} causing ${move.power} damage.`;
    }
    this.selectedMove = null;
  }

  getHpPercentage(playerStats: BattleStats): number {
    return (playerStats.hp / this.playerMaxHp) * 100;
  }

  getStatBarColor(statValue: number, maxValue: number): string {
    let hp = (statValue / maxValue) * 100;
    if (hp <= 25) {
      return 'red';
    } else if (hp <= 70) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

}
