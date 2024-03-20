import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { PokeHelperService } from '../../services/poke-helper.service';
import { MatCardModule } from '@angular/material/card';
import { Nature } from '../../models/nature';
import { BaseClass } from '../../models/base/base-class';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nature-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './nature-list.component.html',
  styleUrl: './nature-list.component.css'
})
export class NatureListComponent implements OnInit{
  natures: BaseClass[] = [];
  natureDetails: Nature[] = [];

  constructor(private pokeService: PokeService, private pokeHelperService: PokeHelperService){}

  ngOnInit() {
    this.getNatures();
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

  upperFirstLetter(word: string): string {
    return this.pokeHelperService.upperFirstLetter(word);
  }
}
