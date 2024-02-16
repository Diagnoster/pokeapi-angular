import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  card: any[] = [
    {title: 'Pokedex', description: 'Encyclopedia that has all species of pokemon.', image: '../../../assets/pokedex.png', route: ''},
    {title: 'Moves List',  description: 'List of all moves in the game.', image: '../../../assets/moveList.png', route: ''},
    {title: 'Items List', description: 'List of items that appear in the Items Pocket.', image: '../../../assets/items.jpg', route: ''},
  ];
}
