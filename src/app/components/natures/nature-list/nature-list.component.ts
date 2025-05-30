import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../../services/poke.service';
import { MatCardModule } from '@angular/material/card';
import { Nature } from '../../../models/nature';
import { BaseClass } from '../../../models/base/base-class';
import { MatDividerModule } from '@angular/material/divider';
import { UpperFirstLetterPipe } from "../../../pipes/upper-first-letter.pipe";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-nature-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    UpperFirstLetterPipe
],
  templateUrl: './nature-list.component.html',
  styleUrl: './nature-list.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }), // Start <- to ->
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
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
