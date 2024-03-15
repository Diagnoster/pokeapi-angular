import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../../models/item';
import { Nature } from '../../models/nature';

@Component({
  selector: 'app-nature-list',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './nature-list.component.html',
  styleUrl: './nature-list.component.css'
})
export class NatureListComponent implements OnInit{
  natures: Item[] = [];
  natureDetails: Nature[] = [];

  constructor(private pokeService: PokeService, private pokeHelper: PokeHelperService){}

  ngOnInit() {
    this.getNatures();
    console.log(this.natureDetails);

  }

  getNatures() {
    this.pokeService.getNatures().subscribe(data => {
      data.results.forEach( (ntr: any) => {
        this.pokeService.getNatureDetails(ntr.url).subscribe(nature => {
          this.natureDetails.push(nature);
        });
      });
    });
  }
}
