import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';

@Component({
  selector: 'app-nature-list',
  standalone: true,
  imports: [],
  templateUrl: './nature-list.component.html',
  styleUrl: './nature-list.component.css'
})
export class NatureListComponent implements OnInit{

  constructor(private pokeService: PokeService, private pokeHelper: PokeHelperService){}

  ngOnInit() {
    this.getNatures();
  }

  getNatures() {
    this.pokeService.getNatures().subscribe((data: any) => {
      console.log(data.results);
    });
  }
}
