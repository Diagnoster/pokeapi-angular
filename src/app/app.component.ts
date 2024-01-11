import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PokeListComponent } from "./poke-list/poke-list.component";
import { HeaderComponent } from './header/header.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, PokeListComponent, HeaderComponent]
})
export class AppComponent {
  title = 'pokeapi';
}
