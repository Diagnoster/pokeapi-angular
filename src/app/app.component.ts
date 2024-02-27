import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PokeListComponent } from "./components/poke-list/poke-list.component";
import { HeaderComponent } from './components/header/header.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { MovesComponent } from './components/moves/moves.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PokeListComponent, HeaderComponent, RouterLink, RouterLinkActive, MoveListComponent, MovesComponent]
})
export class AppComponent {
  title = 'pokeapi';
}
