import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../../services/poke.service';
import { MatCardModule } from '@angular/material/card';
import { Nature } from '../../../models/nature';
import { BaseClass } from '../../../models/base/base-class';
import { MatDividerModule } from '@angular/material/divider';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";

@Component({
  selector: 'app-nature-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    UpperFirstLetterPipe
],
  templateUrl: './nature-list.component.html',
  styleUrl: './nature-list.component.css'
})
export class NatureListComponent implements OnInit{
  natures: BaseClass[] = [];
  natureDetails: Nature[] = [];

  constructor(private pokeService: PokeService){}

  ngOnInit() {
    this.getNatures();
  }

  getNatures() {
    this.pokeService.getNatures().subscribe(data => {
      data.results.forEach( (nature : any) => {
        this.pokeService.getNatureDetails(nature.url).subscribe(nature => {
          this.natureDetails.push(nature);
        });
      });
    });
  }
}
