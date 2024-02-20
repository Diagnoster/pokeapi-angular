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
    {title: 'Pokedex', image: '../../../assets/pokedex.png', route: '/pokedex'},
    {title: 'Moves List', image: '../../../assets/moveList.png', route: '/moves'},
    {title: 'Items List', image: '../../../assets/items.jpg', route: '/items'},
  ];
}
