import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoveDetails } from '../../../models/move-details';
import { Pokemon } from '../../../models/pokemon';
import { MatCardModule } from '@angular/material/card';
import { PokeHelperService } from '../../../services/poke-helper.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BattleStats } from '../../../models/battle-stats';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";

@Component({
  selector: 'app-battle-fight',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    UpperFirstLetterPipe
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cdr: ChangeDetectorRef) {
    this.playerPokemon = data.playerPokemon;
    this.enemyPokemon = data.enemyPokemon;
    this.playerSelectedMoves = data.playerSelectedMoves;
    this.enemySelectedMoves = data.enemySelectedMoves;
  }

  ngOnInit(): void {
    this.calcStats(this.playerPokemon, this.playerStats, true);
    this.calcStats(this.enemyPokemon, this.enemyStats, false);
  }

  calcStats(pokemon: Pokemon, stats: BattleStats, isPlayer: boolean): void {
    pokemon.stats.forEach((stat, index) => {
      switch (index) {
        case 0:
          stats.hp = stat.base_stat;
          if (isPlayer) this.playerMaxHp = stat.base_stat;
          else this.enemyMaxHp = stat.base_stat;
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
      this.executeAttack(this.playerStats, this.enemyStats, this.selectedMove);
      setTimeout(() => {
        if (this.enemyStats.hp > 0) {
          this.executeAttack(this.enemyStats, this.playerStats, this.enemySelectedMoves[0]);
          this.battleText = this.playerStats.hp <= 0 ? "You lost!" : this.battleText;
        } else {
          this.battleText = "You win!";
        }
      }, 1300); // 1300 milliseconds delay
    }
  }

  executeAttack(attacker: BattleStats, defender: BattleStats, move: MoveDetails): void {
    if (defender.hp > 0) {
      defender.hp -= move.power;
      if(defender.hp < 0)
          defender.hp = 0;
      this.cdr.detectChanges();
      this.battleText = `Attacks with ${move.name} causing ${move.power} damage.`;
    }
    this.selectedMove = null;
  }

  getHpPercentage(stats: BattleStats, maxHp: number): number {
    return (stats.hp / maxHp) * 100;
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
