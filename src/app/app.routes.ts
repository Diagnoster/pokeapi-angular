import { Routes } from '@angular/router';
import { MoveListComponent } from './components/move-list/move-list.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';

export const routes: Routes = [
    { path: '', component: HomeComponentComponent},
    { path: 'home', component: HomeComponentComponent},
    { path: 'moves', component: MoveListComponent},
    { path: 'pokedex', component: PokeListComponent},
    { path: 'items', component: ItemListComponent}
];
