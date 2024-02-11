import { Routes } from '@angular/router';
import { MoveListComponent } from './components/move-list/move-list.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';

export const routes: Routes = [
    { path: '', component: MoveListComponent},
    { path: 'moves', component: MoveListComponent},
    { path: 'pokedex', component: PokeListComponent},
    { path: 'items', component: ItemListComponent}
];
