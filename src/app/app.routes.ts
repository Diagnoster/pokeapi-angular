import { Routes } from '@angular/router';
import { MoveListComponent } from './components/move-list/move-list.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';

export const routes: Routes = [
    { path: '', component: PokeListComponent},
    { path: 'moves', component: MoveListComponent},
    { path: 'pokedex', component: PokeListComponent}
];
