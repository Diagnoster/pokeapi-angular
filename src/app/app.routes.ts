import { Routes } from '@angular/router';
import { MoveListComponent } from './components/move-list/move-list.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { HomeComponent } from './components/home/home.component';
import { BattleSetupComponent } from './components/battle-setup/battle-setup.component';
import { AbilityListComponent } from './components/ability-list/ability-list.component';
import { NatureListComponent } from './components/nature-list/nature-list.component';
import { LocationComponent } from './components/location/location.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'moves', component: MoveListComponent },
    { path: 'pokedex', component: PokeListComponent } ,
    { path: 'items', component: ItemListComponent },
    { path: 'battle', component: BattleSetupComponent },
    { path: 'abilities', component: AbilityListComponent },
    { path: 'natures', component: NatureListComponent },
    { path: 'location', component: LocationComponent}
];
