import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokeService } from '../../services/poke.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PokemonType } from '../../models/enums/pokemon-type';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoveDetails } from '../../models/move-details';
import { MatInputModule } from '@angular/material/input';
import { AbilitiesDetailsComponent } from '../abilities-details/abilities-details.component';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MovesComponent } from '../moves/moves.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Chain } from '../../models/chain';
import { EvolutionLine } from '../../models/evolution-line';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MovesComponent,
    MatSnackBarModule,
    MatIconModule,
    LoadingComponent
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})

export class PokemonDetailsComponent implements OnInit {

  pokemon!: Pokemon;
  total!: number;
  moves: MoveDetails[];
  displayedColumns = ['name', 'type', 'power', 'accuracy'];
  dataSource = new MatTableDataSource<MoveDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  evolutionChain: any;
  evolutions: Chain[] = [];
  pokeImages: EvolutionLine[] = [];
  loading: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private pokeService: PokeService, private pokeHelperService: PokeHelperService, private snackBar: MatSnackBar) {
    this.pokemon = data.pokemon;
    this.moves = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.calculateTotalStats();
    this.getSpecie();
  }

  getColorForType(type: string): string {
    return PokemonType[type as keyof typeof PokemonType];
  }

  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }

  getTypeDetailImageUrl(type: string): string {
    return this.pokeHelperService.getTypeDetailImageUrl(type);
  }

  calculateTotalStats(): void {
    this.total = 0;
    this.pokemon.stats.forEach(stat => {
      this.total = this.total + stat.base_stat;
    });
  }

  getSpecie() {
    this.loading = true;
    if (this.pokemon.species) {
      this.pokeService.getSpecie(this.pokemon.species.url)
        .pipe(
          switchMap((data: any) => this.pokeService.getEvolutionChain(data.evolution_chain.url))
        )
        .subscribe((data: any) => {
          this.evolutionChain = data.results;
          this.getEvolution(data.chain);
          this.getPokeImage(this.evolutions);
          this.loading = false;
        });
    }
  }

  getEvolution(evolution: Chain): Chain[] {
    this.evolutions = [];
    this.pokeImages = [];
    
    if (evolution && evolution.species && evolution.species.name) {
      const newEvolution = new Chain(
        evolution.species,
        evolution.is_baby,
        evolution.evolution_details,
        evolution.evolves_to
      );
      this.evolutions.push(newEvolution);
    }
    if (Array.isArray(evolution.evolves_to) && evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach((evo: any) => {
        // recursive
        this.evolutions = this.evolutions.concat(this.getEvolution(evo));
      });
    }
    return this.evolutions;
  }

  getPokeImage(evolution: Chain[]) {
    this.pokeImages = [];
    let lvlUp: number | null;
    let item: string;
    let trigger: string;

    evolution.forEach((poke: Chain) => {
      this.pokeService.getPokemon(poke.species.name).subscribe((data: Pokemon) => {
         if (poke.evolution_details.length == 0) {
          const firstPokemonLineEvolution = new EvolutionLine(
            data.sprites.front_default,
            null,
            "",
            "",
            poke.species.name
          );
          this.pokeImages.push(firstPokemonLineEvolution);
         }
         else {
          const details = poke.evolution_details[0];
          lvlUp = details?.min_level ? parseInt(details.min_level, 10) : null;
          item = details?.item ? details.item.name : 'null';
          trigger = details?.trigger ? details.trigger.name : 'null';
          
          const pokeInfo = new EvolutionLine(
            data.sprites.front_default,
            lvlUp,
            item,
            trigger,
            poke.species.name
          );
          this.pokeImages.push(pokeInfo);
         }
      });
    });
  }

  abilitiesModal(abilities: any): void {
    this.dialog.open(AbilitiesDetailsComponent, {
      data: {
        abilities,
        pokemon: this.pokemon
      },
    });
  }

  nextPokemon(pokemonID: number, foreign: boolean) {
    if (foreign && pokemonID === 1) {
      this.snackBar.open('It is not possible to return from the first Pokémon', 'Close', {
        duration: 3000,
      });
      return;
    }
    if (foreign) {
      pokemonID -= 1;
    } else {
      pokemonID += 1;
    }
    this.pokeService.getPokemonById(pokemonID).subscribe((data: any) => {
      this.pokemon = data;
      this.evolutions = [];
      this.pokeImages = [];
      this.getSpecie();
      this.calculateTotalStats();
    });
  }

  nextPokemonByName(pokemonName: string) {
    this.pokeService.getPokemon(pokemonName).subscribe((data: Pokemon) => {
      this.pokemon = data;
      this.evolutions = [];
      this.pokeImages = [];
      this.getSpecie();
      this.calculateTotalStats();
    });
  }

  changeArrowImage(isLeftArrow: boolean, isHovered: boolean): void {
    const arrowImage = isLeftArrow ? 'left_arrow.png' : 'right_arrow.png';
    const selectedArrowImage = isLeftArrow ? 'selected_left_arrow.png' : 'selected_right_arrow.png';

    const imgElement = document.querySelector(isLeftArrow ? '.arrow-left' : '.arrow-right') as HTMLImageElement;

    imgElement.src = isHovered ? `../../../assets/${selectedArrowImage}` : `../../../assets/${arrowImage}`;
  }

}
