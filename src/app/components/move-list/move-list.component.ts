import { Component, OnInit } from '@angular/core';
import { PokeServiceService } from '../../services/poke-service.service';
import { Move } from '../../models/move';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css'
})
export class MoveListComponent implements OnInit {
  move: Move[];

  constructor(private pokeService: PokeServiceService) {
    this.move = [];
  }

  ngOnInit(): void {
    
  }


  getAllMoves() {
    this.pokeService.getMoves().subscribe((data: any) => {
      this.move.push(data);
    });
    console.log(this.move);
  }

}
