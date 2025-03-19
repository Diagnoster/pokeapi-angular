import { Routes } from '@angular/router';
import { MoveListComponent } from './components/movements/move-list/move-list.component';
import { PokeListComponent } from './components/pokemon/poke-list/poke-list.component';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { HomeComponent } from './components/home/home.component';
import { BattleSetupComponent } from './components/battle/battle-setup/battle-setup.component';
import { AbilityListComponent } from './components/ability/ability-list/ability-list.component';
import { NatureListComponent } from './components/natures/nature-list/nature-list.component';
import { LocationComponent } from './components/locations/location/location.component';
import { RegionDetailsComponent } from './components/locations/region-details/region-details.component';
import { AreaDetailsComponent } from './components/locations/area-details/area-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'moves', component: MoveListComponent },
    { path: 'pokedex', component: PokeListComponent } ,
    { path: 'items', component: ItemListComponent },
    { path: 'battle', component: BattleSetupComponent },
    { path: 'abilities', component: AbilityListComponent },
    { path: 'natures', component: NatureListComponent },
    { path: 'location', component: LocationComponent},
    { path: 'region-details/:id', component: RegionDetailsComponent },
    { path: 'areas', component: AreaDetailsComponent },
];
